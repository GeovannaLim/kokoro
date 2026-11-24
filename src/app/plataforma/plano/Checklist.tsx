"use client";
import { useEffect, useState } from "react";
import { CARTAO_CLARO, vidroClaro } from "@/components/kk/Brand";
import { Traco } from "@/components/kk/Pincel";

export type AcaoView = { id: string; prazo: 30 | 60 | 90; titulo: string; como: string; dono: string; evidencia: string; cor: string };

const KEY = "kk-plano-feitas";

/** Colunas em vidro claro com névoa de cor no alto (o vidro escuro ficou pesado):
 *  30 dias em mostarda (o mais urgente), 60 em madeira de bambu, 90 em cinza frio. */
const LUZ: Record<30 | 60 | 90, { glow: string; ponto: string }> = {
  30: { glow: "rgba(201,162,74,.34)", ponto: "#a9822a" },
  60: { glow: "rgba(217,196,143,.42)", ponto: "#c2a668" },
  90: { glow: "rgba(150,160,172,.28)", ponto: "#8c96a2" },
};

/** Plano em três colunas (30, 60 e 90 dias). O que foi marcado como feito fica guardado neste navegador. */
export function Checklist({ itens, labels }: { itens: AcaoView[]; labels: { dias: string; dono: string; feito: string; marcar: string; acoes: string; feitas: string } }) {
  const [feitas, setFeitas] = useState<string[]>([]);
  const [recem, setRecem] = useState<string | null>(null); // ação que acabou de ser marcada (toca o "momento")
  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem(KEY) ?? "[]"); if (Array.isArray(v)) queueMicrotask(() => setFeitas(v)); } catch {}
  }, []);
  function alterna(id: string) {
    setRecem(feitas.includes(id) ? null : id);
    setFeitas((f) => { const n = f.includes(id) ? f.filter((x) => x !== id) : [...f, id]; try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} return n; });
  }
  const total = itens.length, ok = itens.filter((i) => feitas.includes(i.id)).length;
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sumi/10"><div className="relative h-2 overflow-hidden rounded-full bg-[linear-gradient(90deg,#e3d2a3,#b89c5c)] transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: `${(ok / Math.max(total, 1)) * 100}%` }}><i key={ok} aria-hidden className="kk-brilho absolute inset-0" /></div></div>
        <span className="text-sm tabular-nums text-sumi-soft">{ok}/{total} {labels.feitas}</span>
      </div>
      <div className="mt-8 grid gap-3 lg:grid-cols-3" style={{ perspective: "1400px" }}>
        {([30, 60, 90] as const).map((prazo, col) => (
          <div key={prazo} data-luz data-urgente={prazo === 30 ? "" : undefined} style={{ ...vidroClaro(LUZ[prazo].glow), "--c": col } as React.CSSProperties} className={`kk-coluna p-5 sm:p-6 ${CARTAO_CLARO}`}>
            <div className="flex items-center justify-between">
              <p className="text-5xl leading-none font-medium tracking-[-0.04em]">{prazo}<span className="ml-2 text-xl font-normal tracking-normal text-sumi-soft">{labels.dias}</span></p>
              <span className="inline-flex items-center gap-2 rounded-full border border-sumi/10 bg-white/70 px-3 py-1.5 text-xs text-sumi-soft tabular-nums">
                <i className="h-2 w-2 rounded-full" style={{ background: LUZ[prazo].ponto, boxShadow: `0 0 10px ${LUZ[prazo].ponto}` }} />
                {itens.filter((i) => i.prazo === prazo).length} {labels.acoes}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {itens.filter((i) => i.prazo === prazo).map((it, k) => {
                const on = feitas.includes(it.id);
                return (
                  <article key={it.id} className={`kk-carta kk-acao rounded-[18px] border border-[rgba(41,37,33,.07)] bg-[#fdfcf9] p-5 text-[#292521] shadow-[0_10px_24px_-18px_rgba(41,37,33,.35)] transition-opacity duration-700 ${on ? "opacity-60" : ""} ${on && recem === it.id ? "kk-feito" : ""}`} style={{ "--c": col, "--k": k, "--d-1": "#d9c48f", "--d-2": "#33302c", "--d-3": "#a9822a" } as React.CSSProperties}>
                    <div className="flex items-start gap-3">
                      <i className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: it.cor }} />
                      <div className="flex-1">
                        <h3 className="relative text-[19px] leading-snug font-semibold tracking-[-0.02em]">{it.titulo}{on && <Traco className="absolute top-[45%] -left-1 h-[7px] w-[calc(100%+8px)] text-[#292521]/70" delay={recem === it.id ? 0.05 : 0} />}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#5e5750]">{it.como}</p>
                        <p className="mt-3 text-xs text-[#8f8478]">{it.evidencia}</p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-[#f1e8cf] px-3 py-1.5 text-xs text-[#5e5750]">{labels.dono}: {it.dono}</span>
                          <button type="button" onClick={() => alterna(it.id)} aria-pressed={on}
                            className={`rounded-full px-4 py-2 text-xs transition ${on ? "bg-[#292521] text-[#f7f3ec]" : "text-[#292521] shadow-[inset_0_0_0_1px_rgba(41,37,33,.28)] hover:bg-black/[0.04]"}`}>
                            {on ? `✓ ${labels.feito}` : labels.marcar}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
