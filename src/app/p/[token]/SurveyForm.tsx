"use client";
import { useState, useTransition } from "react";
import { t, to, tq, tv, type Lang } from "@/lib/i18n";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";
import { enviarResposta } from "./actions";
import { Enso } from "@/components/kk/Pincel";

type Passo = { id: string; texto: string; opcoes: { label: string; value: string | number | null }[]; tipo: "contexto" | "cultura" };

const X: Record<Lang, { tag: string; perguntas: string; minutos: string; grupos: string; barra: string; demo: string; demoFim: string; letra: string }> = {
  pt: { tag: "Pesquisa anônima", perguntas: "perguntas", minutos: "minutos", grupos: "pessoas por grupo, no mínimo", barra: "Ninguém vê o que você respondeu", demo: "Modo demonstração: nada do que você responder será gravado.", demoFim: "Modo demonstração: esta resposta não foi gravada.", letra: "ABCDEFGH" },
  en: { tag: "Anonymous survey", perguntas: "questions", minutos: "minutes", grupos: "people per group, minimum", barra: "Nobody sees what you answered", demo: "Demo mode: nothing you answer will be saved.", demoFim: "Demo mode: this answer was not saved.", letra: "ABCDEFGH" },
  es: { tag: "Encuesta anónima", perguntas: "preguntas", minutos: "minutos", grupos: "personas por grupo, como mínimo", barra: "Nadie ve lo que respondiste", demo: "Modo demostración: nada de lo que respondas se guardará.", demoFim: "Modo demostración: esta respuesta no se guardó.", letra: "ABCDEFGH" },
};

/** vidro escuro esfumado com luz mostarda (mesma estética das colunas do Plano) */
const VIDRO = { background: "radial-gradient(75% 55% at 15% 0%, rgba(217,196,143,.42), transparent 72%), radial-gradient(60% 45% at 95% 100%, rgba(120,128,140,.22), transparent 70%), linear-gradient(160deg, rgba(255,255,255,.1), rgba(255,255,255,0) 45%), #25262a" };
const CARTAO = "rounded-[24px] border border-white/90 bg-[linear-gradient(160deg,rgba(255,255,255,.85),rgba(255,255,255,.6))] shadow-[inset_0_1px_0_#fff,0_24px_50px_-30px_rgba(41,37,33,.3)] backdrop-blur-xl";

export function SurveyForm({ token, empresa, areas, lang, demo = false }: { token: string; empresa: string; areas: string[]; lang: Lang; demo?: boolean }) {
  const x = X[lang];
  const passos: Passo[] = [
    ...CONTEXTO.map((c) => ({ id: c.id, texto: tq(lang, c.id, c.texto), tipo: "contexto" as const,
      opcoes: ("opcoes" in c ? [...c.opcoes] : areas).map((o) => ({ label: tv(lang, o), value: o })) })),
    ...PERGUNTAS.map((q) => ({ id: q.id, texto: tq(lang, q.id, q.texto), tipo: "cultura" as const, opcoes: q.opcoes.map((o) => ({ label: to(lang, o.label), value: o.code })) })),
  ];
  const [i, setI] = useState(-1);
  const [ctx, setCtx] = useState<Record<string, string>>({});
  const [resp, setResp] = useState<Record<string, number | null>>({});
  const [fim, setFim] = useState(false);
  const [erro, setErro] = useState("");
  const [pending, start] = useTransition();

  function escolher(p: Passo, value: string | number | null) {
    if (p.tipo === "contexto") setCtx((c) => ({ ...c, [p.id]: String(value) }));
    else setResp((r) => ({ ...r, [p.id]: value as number | null }));
    if (i < passos.length - 1) setTimeout(() => setI(i + 1), 180);
  }
  function enviar() {
    setErro("");
    if (demo) { setFim(true); return; } // demonstração: não grava nada
    start(async () => {
      const r = await enviarResposta({ token, contexto: ctx, respostas: resp });
      if (r.ok) setFim(true); else setErro(r.erro ?? "Não foi possível enviar.");
    });
  }

  /* ---------- fim: cartão de vidro escuro ---------- */
  if (fim) return (
    <div className="kk-reveal is-in mx-auto max-w-xl pt-6">
      <div style={VIDRO} className="rounded-[26px] border border-white/10 p-10 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_40px_80px_-40px_rgba(0,0,0,.6)] sm:p-14">
        <span className="kk-respira relative mx-auto grid h-20 w-20 place-items-center text-[#e9dcc0]"><Enso className="absolute inset-0 h-full w-full" delay={0.3} /><span className="kk-kokoro-kanji text-[32px]">心</span></span>
        <h1 className="kk-display mt-6 text-6xl">{t(lang, "form_obrigado")}</h1>
        <p className="mx-auto mt-4 max-w-[38ch] text-white/75">{t(lang, "form_obrigado_txt")}</p>
        {demo && <p className="mt-6 text-xs text-white/50">{x.demoFim}</p>}
      </div>
      <p className="mt-8 text-center text-xs text-stone">{t(lang, "rodape").split(" · ")[1]}</p>
    </div>
  );

  /* ---------- abertura: texto à esquerda, foto com barra de vidro à direita ---------- */
  if (i < 0) return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <div className="kk-reveal is-in">
        <span className="inline-block rounded-lg bg-[#e8ddcb] px-3 py-1.5 text-[13px] font-medium text-sumi-soft">{x.tag}</span>
        <p className="mt-6 text-sm text-stone">{empresa}</p>
        <h1 className="kk-display mt-2 text-[clamp(50px,6.6vw,92px)] leading-[1]">{t(lang, "form_titulo")}<br /><span className="text-sumi/45">{t(lang, "form_anonima")}.</span></h1>
        <p className="mt-6 max-w-[46ch] text-[17px] text-sumi-soft">{t(lang, "form_intro")}</p>
        <div className="mt-8 grid max-w-md grid-cols-3 border-t border-sumi/10">
          {[["20", x.perguntas], ["5", x.minutos], ["5+", x.grupos]].map(([n, l]) => (
            <div key={l} className="pt-4 pr-3"><p className="text-3xl font-medium tracking-[-0.03em]">{n}</p><p className="mt-1 text-xs leading-snug text-stone">{l}</p></div>
          ))}
        </div>
        <button onClick={() => setI(0)} className="mt-10 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-sumi px-7 text-[15px] font-medium text-washi transition hover:-translate-y-0.5">
          {t(lang, "form_comecar")} <span aria-hidden>→</span>
        </button>
        {demo && <p className="mt-4 text-xs text-stone">{x.demo}</p>}
      </div>
      <div className="relative h-[clamp(360px,62vh,620px)] overflow-hidden rounded-[26px] bg-[#e8ddcb] shadow-[0_40px_80px_-40px_rgba(41,37,33,.45)]">
        <img src="/site2/janela.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-[rgba(41,37,33,.42)] px-5 py-4 text-[15px] font-medium text-white backdrop-blur-xl sm:inset-x-6 sm:bottom-6">
          <span className="kk-respira-ponto h-2 w-2 rounded-full bg-[#d9c48f] shadow-[0_0_10px_#d9c48f]" />{x.barra}
        </div>
      </div>
    </div>
  );

  /* ---------- pergunta: cartão de vidro claro, opções com letra ---------- */
  const p = passos[i];
  const atual = p.tipo === "contexto" ? ctx[p.id] : resp[p.id];
  const respondido = p.tipo === "contexto" ? p.id in ctx : p.id in resp;
  const ultimo = i === passos.length - 1;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-[13px] text-stone">
        <button onClick={() => setI(Math.max(-1, i - 1))} className="rounded-lg px-3 py-2 font-medium hover:bg-sumi/[0.06]">{t(lang, "form_voltar")}</button>
        <span className="tabular-nums">{t(lang, "form_pergunta")} {i + 1} {t(lang, "form_de")} {passos.length}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sumi/10">
        <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#e3d2a3,#b89c5c)] transition-[width] duration-500" style={{ width: `${((i + (respondido ? 1 : 0)) / passos.length) * 100}%` }} />
      </div>
      <div className={`mt-8 p-6 sm:p-10 ${CARTAO}`}>
        <h2 key={p.id} className="kk-reveal is-in text-[clamp(26px,3.6vw,38px)] leading-[1.1] font-medium tracking-[-0.03em]">{p.texto}</h2>
        <div className="mt-8 grid gap-2">
          {p.opcoes.map((o, k) => {
            const on = respondido && atual === o.value;
            return (
              <button key={o.label} onClick={() => escolher(p, o.value)}
                className={`group flex items-center gap-4 rounded-[14px] border px-4 py-3.5 text-left text-[15px] font-medium transition ${on ? "border-sumi bg-sumi text-washi" : "border-sumi/10 bg-white/70 text-sumi hover:border-sumi/25 hover:bg-white"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-semibold ${on ? "bg-washi/15 text-washi" : "bg-[#e8ddcb]/70 text-sumi-soft"}`}>{x.letra[k]}</span>
                {o.label}
              </button>
            );
          })}
        </div>
        {ultimo && respondido && (
          <div className="mt-8 border-t border-sumi/10 pt-6 text-right">
            <button onClick={enviar} disabled={pending} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-sumi px-7 text-[15px] font-medium text-washi transition hover:-translate-y-0.5 disabled:opacity-60">
              {pending ? t(lang, "form_enviando") : t(lang, "form_enviar")} <span aria-hidden>→</span>
            </button>
            {erro && <p className="mt-4 text-sm text-[#8a6d1f]">{erro}</p>}
          </div>
        )}
      </div>
      {demo && <p className="mt-4 text-center text-xs text-stone">{x.demo}</p>}
    </div>
  );
}
