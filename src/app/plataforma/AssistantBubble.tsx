"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type L = { abrir: string; sub: string; oi: string; breve: string; qs: string[]; placeholder: string; fechar: string; erro: string; enviar: string };
type Msg = { role: "user" | "assistant"; content: string };

/** Bolinha flutuante com o rosto do Kokoro: abre o pop-up do assistente em qualquer tela da plataforma. */
export function AssistantBubble({ l, lang }: { l: L; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [txt, setTxt] = useState("");
  const [busy, setBusy] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight }); }, [msgs]);

  async function perguntar(q: string) {
    const pergunta = q.trim();
    if (!pergunta || busy) return;
    const hist: Msg[] = [...msgs, { role: "user", content: pergunta }];
    setMsgs([...hist, { role: "assistant", content: "" }]);
    setTxt("");
    setBusy(true);
    const escreve = (s: string) => setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: s }]);
    try {
      const r = await fetch("/api/assistente", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, messages: hist }) });
      if (!r.ok || !r.body) throw new Error(String(r.status));
      const reader = r.body.getReader(), dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        escreve(acc);
      }
      if (!acc.trim()) escreve(l.erro);
    } catch {
      escreve(l.erro);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const bolha = "max-w-[88%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap";

  return (
    <>
      <section role="dialog" aria-modal="false" aria-label={l.abrir} inert={!open}
        className={`fixed right-4 bottom-28 z-50 flex max-h-[min(640px,calc(100dvh-140px))] w-[min(400px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[28px] bg-washi-deep shadow-[0_30px_80px_-30px_rgba(17,17,17,.45),inset_0_0_0_1px_rgba(17,17,17,0.09)] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] sm:right-8 ${open ? "scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}>
        <header className="flex shrink-0 items-center gap-3 bg-sumi px-5 py-4 text-washi">
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-washi"><Image src="/brand/kokoro-face.png" alt="" fill sizes="44px" className="scale-125 object-cover object-top" /></span>
          <div className="flex-1">
            <p className="font-serif text-2xl leading-none">Kokoro</p>
            <p className="mt-1 text-xs text-washi/60">{l.sub}</p>
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={l.fechar} className="grid h-9 w-9 place-items-center rounded-full text-washi/80 hover:bg-washi/10">✕</button>
        </header>

        <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
          <p className={`${bolha} rounded-tl-md bg-[#fbf4e9] text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)]`}>{l.oi}</p>
          {msgs.length === 0 && (
            <div className="flex flex-col items-end gap-2 pt-1">
              {l.qs.map((q) => (
                <button key={q} type="button" onClick={() => perguntar(q)}
                  className="rounded-full px-4 py-2 text-right text-[13px] text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.18)] transition hover:bg-sumi hover:text-washi">{q}</button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => m.role === "user"
            ? <p key={i} className={`${bolha} ml-auto rounded-tr-md bg-sumi text-washi`}>{m.content}</p>
            : <p key={i} className={`${bolha} rounded-tl-md bg-[#fbf4e9] text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)]`}>
                {m.content || <span className="inline-flex gap-1" aria-label="…">{[0, 1, 2].map((k) => <span key={k} className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone" style={{ animationDelay: `${k * 0.2}s` }} />)}</span>}
              </p>)}
        </div>

        <form className="shrink-0 border-t border-sumi/10 p-3" onSubmit={(e) => { e.preventDefault(); perguntar(txt); }}>
          <div className="flex items-center gap-2 rounded-full bg-washi py-1.5 pr-1.5 pl-4 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]">
            <input ref={inputRef} value={txt} onChange={(e) => setTxt(e.target.value)} maxLength={500} placeholder={l.placeholder} aria-label={l.placeholder}
              className="min-w-0 flex-1 bg-transparent text-[14px] text-sumi outline-none placeholder:text-stone" />
            <button type="submit" disabled={busy || !txt.trim()} aria-label={l.enviar}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sumi text-washi transition disabled:bg-sumi/20">↑</button>
          </div>
          <p className="pt-2 text-center text-[11px] text-stone">{l.breve}</p>
        </form>
      </section>

      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={l.abrir}
        className="group fixed right-4 bottom-6 z-50 sm:right-8">
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 rounded-full bg-sumi px-4 py-2 text-[13px] whitespace-nowrap text-washi opacity-0 transition group-hover:opacity-100">{l.abrir}</span>
        {!open && <span aria-hidden className="kk-ping absolute inset-0 rounded-full ring-2 ring-ai/40" />}
        <span className="kk-bob relative block h-[68px] w-[68px] overflow-hidden rounded-full bg-washi shadow-[0_14px_30px_-12px_rgba(17,17,17,.45),inset_0_0_0_1px_rgba(17,17,17,0.12)] transition group-hover:-translate-y-0.5">
          <Image src="/brand/kokoro-face.png" alt="" fill sizes="68px" className="scale-125 object-cover object-top" />
        </span>
      </button>
    </>
  );
}
