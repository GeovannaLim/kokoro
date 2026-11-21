"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { t, to, tq, tv, type Lang } from "@/lib/i18n";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";
import { enviarResposta } from "./actions";

type Passo = { id: string; texto: string; opcoes: { label: string; value: string | number | null }[]; tipo: "contexto" | "cultura" };

export function SurveyForm({ token, empresa, areas, lang }: { token: string; empresa: string; areas: string[]; lang: Lang }) {
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
    start(async () => {
      const r = await enviarResposta({ token, contexto: ctx, respostas: resp });
      if (r.ok) setFim(true); else setErro(r.erro ?? "Não foi possível enviar.");
    });
  }

  if (fim) return (
    <div className="kk-reveal is-in mx-auto max-w-lg text-center">
      <Image src="/brand/kokoro-ai-flat.png" alt="" width={220} height={220} className="kk-bob mx-auto w-44" />
      <h1 className="mt-6 font-serif text-5xl">{t(lang, "form_obrigado")}</h1>
      <p className="mt-4 text-sumi-soft">{t(lang, "form_obrigado_txt")}</p>
      <p className="mt-10 text-xs text-stone">{t(lang, "rodape").split(" · ")[1]}</p>
    </div>
  );

  if (i < 0) return (
    <div className="mx-auto max-w-lg text-center">
      <Image src="/brand/kokoro-ai-flat.png" alt="" width={200} height={200} className="kk-bob mx-auto w-40" />
      <p className="mt-6 text-sm text-stone">{empresa}</p>
      <h1 className="mt-2 font-serif text-5xl leading-tight">{t(lang, "form_titulo")} <span className="italic">{t(lang, "form_anonima")}</span></h1>
      <p className="mt-5 text-sumi-soft">{t(lang, "form_intro")}</p>
      <button onClick={() => setI(0)} className="mt-10 rounded-full bg-sumi px-8 py-4 text-sm text-washi transition hover:-translate-y-px hover:bg-[#2b2b2b]">{t(lang, "form_comecar")}</button>
    </div>
  );

  const p = passos[i];
  const atual = p.tipo === "contexto" ? ctx[p.id] : resp[p.id];
  const respondido = p.tipo === "contexto" ? p.id in ctx : p.id in resp;
  const ultimo = i === passos.length - 1;
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-between text-xs text-stone">
        <button onClick={() => setI(Math.max(-1, i - 1))} className="rounded-full px-3 py-2 hover:bg-sumi/[0.06]">{t(lang, "form_voltar")}</button>
        <span className="tabular-nums">{t(lang, "form_pergunta")} {i + 1} {t(lang, "form_de")} {passos.length}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-sumi/10">
        <div className="h-1 rounded-full bg-sumi transition-[width] duration-500" style={{ width: `${((i + (respondido ? 1 : 0)) / passos.length) * 100}%` }} />
      </div>
      <h2 key={p.id} className="kk-reveal is-in mt-10 font-serif text-[clamp(28px,4vw,40px)] leading-tight">{p.texto}</h2>
      <div className="mt-8 grid gap-2">
        {p.opcoes.map((o) => {
          const on = respondido && atual === o.value;
          return (
            <button key={o.label} onClick={() => escolher(p, o.value)}
              className={`rounded-full px-6 py-4 text-left text-[15px] transition ${on ? "bg-sumi text-washi" : "bg-washi-deep/80 text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)] hover:bg-washi-deep"}`}>
              {o.label}
            </button>
          );
        })}
      </div>
      {ultimo && respondido && (
        <div className="mt-10 text-center">
          <button onClick={enviar} disabled={pending} className="rounded-full bg-sumi px-8 py-4 text-sm text-washi transition hover:bg-[#2b2b2b] disabled:opacity-60">
            {pending ? t(lang, "form_enviando") : t(lang, "form_enviar")}
          </button>
          {erro && <p className="mt-4 text-sm text-shu">{erro}</p>}
        </div>
      )}
    </div>
  );
}
