"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LOCALE, type Lang } from "@/lib/i18n";

type L = {
  abrir: string; sub: string; oi: string; breve: string; qs: string[]; placeholder: string; fechar: string; erro: string; enviar: string;
  falar: string; ouvindo: string; falando: string; parar: string; som: string;
};
type Msg = { role: "user" | "assistant"; content: string };

// Reconhecimento de voz do navegador (Chrome, Edge, Safari). Tipos mínimos, porque ainda não estão no lib.dom.
type Rec = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null; onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
type RecCtor = new () => Rec;
const recCtor = (): RecCtor | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};
const noop = () => () => {};
/** Tira do áudio o que é só nota visual (modo demonstração). */
const paraFala = (s: string) => s.replace(/\((Modo|Demo)[^)]*\)/g, "").trim();

/** Bolinha flutuante com o rosto do Kokoro: abre o assistente, por texto ou por voz, em qualquer tela da plataforma. */
export function AssistantBubble({ l, lang }: { l: L; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [txt, setTxt] = useState("");
  const [busy, setBusy] = useState(false);
  const [ouvindo, setOuvindo] = useState(false);
  const [falando, setFalando] = useState(false);
  const [voz, setVoz] = useState(false);          // conversa por voz ligada (mãos livres)
  const [som, setSom] = useState(true);           // Kokoro responde em voz alta
  const temVoz = useSyncExternalStore(noop, () => !!recCtor() && "speechSynthesis" in window, () => false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<Rec | null>(null);
  const vozRef = useRef(false);
  const somRef = useRef(true);
  const ultimaFala = useRef<SpeechSynthesisUtterance | null>(null);
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight }); }, [msgs]);

  // fechar o pop-up encerra a conversa por voz
  useEffect(() => { if (!open) pararVoz(); }, [open]);

  function pararVoz() {
    vozRef.current = false;
    setVoz(false);
    recRef.current?.abort();
    recRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setOuvindo(false);
    setFalando(false);
  }

  function falar(trecho: string, fim?: () => void) {
    const s = paraFala(trecho);
    if (!s || !somRef.current) { fim?.(); return; }
    const u = new SpeechSynthesisUtterance(s);
    u.lang = LOCALE[lang];
    const vozes = window.speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").startsWith(LOCALE[lang].slice(0, 2)));
    u.voice = vozes.find((v) => v.lang.replace("_", "-") === LOCALE[lang] && /google|natural|premium|enhanced|luciana|samantha/i.test(v.name))
      ?? vozes.find((v) => v.lang.replace("_", "-") === LOCALE[lang]) ?? vozes[0] ?? null;
    u.rate = 1.03;
    u.onstart = () => setFalando(true);
    u.onend = u.onerror = () => {
      if (ultimaFala.current === u) { ultimaFala.current = null; setFalando(false); fim?.(); }
    };
    ultimaFala.current = u;
    window.speechSynthesis.speak(u);
  }

  function ouvir() {
    const C = recCtor();
    if (!C || busy) return;
    window.speechSynthesis.cancel();
    const rec = new C();
    rec.lang = LOCALE[lang];
    rec.interimResults = true;
    rec.continuous = false;
    let final = "";
    rec.onresult = (e) => {
      let parcial = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript; else parcial += r[0].transcript;
      }
      setTxt((final + parcial).trim());
    };
    rec.onerror = (e) => { if (e.error === "no-speech" || e.error === "not-allowed" || e.error === "aborted") { vozRef.current = false; setVoz(false); } };
    rec.onend = () => {
      setOuvindo(false);
      recRef.current = null;
      if (final.trim()) perguntar(final);
      else if (vozRef.current) { vozRef.current = false; setVoz(false); }
    };
    recRef.current = rec;
    setOuvindo(true);
    rec.start();
  }

  function micClick() {
    if (voz) { pararVoz(); return; }
    // no Safari, a primeira fala precisa nascer de um clique: "destrava" o áudio aqui
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    vozRef.current = true;
    setVoz(true);
    ouvir();
  }

  async function perguntar(q: string) {
    const pergunta = q.trim();
    if (!pergunta || busy) return;
    const hist: Msg[] = [...msgsRef.current, { role: "user", content: pergunta }];
    setMsgs([...hist, { role: "assistant", content: "" }]);
    setTxt("");
    setBusy(true);
    const porVoz = vozRef.current;
    const escreve = (s: string) => setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: s }]);
    // depois que o Kokoro termina de falar, volta a ouvir (mãos livres)
    const continuar = () => { if (vozRef.current) ouvir(); };
    let acc = "", falado = 0;
    try {
      const r = await fetch("/api/assistente", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, messages: hist }) });
      if (!r.ok || !r.body) throw new Error(String(r.status));
      const reader = r.body.getReader(), dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        escreve(acc);
        // fala frase por frase enquanto o texto chega
        if (porVoz) {
          const corte = Math.max(acc.lastIndexOf(". "), acc.lastIndexOf("? "), acc.lastIndexOf("! "), acc.lastIndexOf("\n"));
          if (corte >= falado) { falar(acc.slice(falado, corte + 1)); falado = corte + 1; }
        }
      }
      if (!acc.trim()) { acc = l.erro; escreve(acc); }
    } catch {
      acc = l.erro;
      falado = 0;
      escreve(acc);
    } finally {
      setBusy(false);
      if (porVoz && vozRef.current) {
        const resto = acc.slice(falado);
        if (paraFala(resto) && somRef.current) falar(resto, continuar);
        else if (ultimaFala.current) ultimaFala.current.onend = () => { ultimaFala.current = null; setFalando(false); continuar(); };
        else continuar();
      } else inputRef.current?.focus();
    }
  }

  const bolha = "max-w-[88%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap";
  const estado = ouvindo ? l.ouvindo : falando ? l.falando : null;

  return (
    <>
      <section role="dialog" aria-modal="false" aria-label={l.abrir} inert={!open}
        className={`fixed right-4 bottom-28 z-50 flex max-h-[min(640px,calc(100dvh-140px))] w-[min(400px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[26px] border border-white/[0.14] bg-[rgba(34,35,38,.84)] bg-[image:linear-gradient(160deg,rgba(255,255,255,.16)_0%,rgba(255,255,255,.04)_45%,rgba(255,255,255,.08)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22),0_40px_90px_-30px_rgba(0,0,0,.6)] backdrop-blur-[28px] backdrop-saturate-150 transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] sm:right-8 ${open ? "scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}>
        <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-5 py-4 text-white">
          <span className="relative h-11 w-11">
            {(falando || ouvindo) && <span aria-hidden className={`kk-ping absolute inset-0 rounded-full ring-2 ${ouvindo ? "ring-white/70" : "ring-white/50"}`} />}
            <span className="kk-kmark relative grid h-11 w-11 place-items-center rounded-full bg-[rgba(18,19,21,.74)] bg-[image:radial-gradient(120%_90%_at_30%_15%,rgba(255,255,255,.28)_0%,rgba(255,255,255,.06)_38%,rgba(255,255,255,0)_60%),linear-gradient(160deg,rgba(255,255,255,.12)_0%,rgba(255,255,255,.02)_50%,rgba(255,255,255,.07)_100%)] backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.35),inset_0_-8px_16px_rgba(0,0,0,.25)]"><img src="/brand/k-branco.png" alt="" className="h-[22px] w-auto" /></span>
          </span>
          <div className="flex-1">
            <p className="text-[19px] leading-none font-semibold tracking-[-0.02em]">Kokoro</p>
            <p className="mt-1 text-xs text-white/55" aria-live="polite">{estado ?? l.sub}</p>
          </div>
          {temVoz && (
            <button type="button" aria-pressed={som} aria-label={l.som} title={l.som}
              onClick={() => { const v = !som; setSom(v); somRef.current = v; if (!v) window.speechSynthesis.cancel(); }}
              className="grid h-9 w-9 place-items-center rounded-full text-white/75 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
                {som ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="m16 9.5 5 5m0-5-5 5" />}
              </svg>
            </button>
          )}
          <button type="button" onClick={() => setOpen(false)} aria-label={l.fechar} className="grid h-9 w-9 place-items-center rounded-full text-white/75 hover:bg-white/10">✕</button>
        </header>

        <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
          <p className={`${bolha} rounded-tl-md border border-white/10 bg-white/[0.08] text-white/85`}>{l.oi}</p>
          {msgs.length === 0 && (
            <div className="flex flex-col items-end gap-2 pt-1">
              {l.qs.map((q) => (
                <button key={q} type="button" onClick={() => perguntar(q)}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-right text-[13px] text-white/85 backdrop-blur transition hover:bg-white hover:text-[#1a1b1d]">{q}</button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => m.role === "user"
            ? <p key={i} className={`${bolha} ml-auto rounded-tr-md bg-white/90 text-[#1a1b1d]`}>{m.content}</p>
            : <p key={i} className={`${bolha} rounded-tl-md border border-white/10 bg-white/[0.08] text-white/85`}>
                {m.content || <span className="inline-flex gap-1" aria-label="…">{[0, 1, 2].map((k) => <span key={k} className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" style={{ animationDelay: `${k * 0.2}s` }} />)}</span>}
              </p>)}
        </div>

        <form className="shrink-0 border-t border-white/10 p-3" onSubmit={(e) => { e.preventDefault(); perguntar(txt); }}>
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] py-1.5 pr-1.5 pl-4 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
            <input ref={inputRef} value={txt} onChange={(e) => setTxt(e.target.value)} maxLength={500} placeholder={ouvindo ? l.ouvindo : l.placeholder} aria-label={l.placeholder}
              className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/45" />
            {temVoz && (
              <button type="button" onClick={micClick} aria-pressed={voz} aria-label={voz ? l.parar : l.falar} title={voz ? l.parar : l.falar}
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${voz ? "bg-white text-[#1a1b1d]" : "text-white/80 hover:bg-white/10"}`}>
                {ouvindo && <span aria-hidden className="kk-ping absolute inset-0 rounded-full ring-2 ring-white/50" />}
                {voz && !ouvindo
                  ? <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor" /></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>}
              </button>
            )}
            <button type="submit" disabled={busy || !txt.trim() || ouvindo} aria-label={l.enviar}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#1a1b1d] transition disabled:bg-white/15 disabled:text-white/40">↑</button>
          </div>
          <p className="pt-2 text-center text-[11px] text-white/45">{l.breve}</p>
        </form>
      </section>

      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={l.abrir}
        className="group fixed right-4 bottom-6 z-50 sm:right-8">
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 rounded-full border border-white/12 bg-[rgba(32,33,36,.78)] px-4 py-2 text-[13px] whitespace-nowrap text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">{l.abrir}</span>
        {!open && <span aria-hidden className="kk-respira-halo absolute -inset-1 rounded-full" />}
        <span className="kk-kmark relative grid h-14 w-14 place-items-center rounded-full bg-[rgba(18,19,21,.74)] bg-[image:radial-gradient(120%_90%_at_30%_15%,rgba(255,255,255,.28)_0%,rgba(255,255,255,.06)_38%,rgba(255,255,255,0)_60%),linear-gradient(160deg,rgba(255,255,255,.12)_0%,rgba(255,255,255,.02)_50%,rgba(255,255,255,.07)_100%)] backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.35),inset_0_-8px_16px_rgba(0,0,0,.25)] transition group-hover:-translate-y-0.5"><span aria-hidden className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(20,21,23,.35),rgba(20,21,23,0))] blur-md" /><img src="/brand/k-branco.png" alt="" className="h-[28px] w-auto" /></span>
      </button>
    </>
  );
}
