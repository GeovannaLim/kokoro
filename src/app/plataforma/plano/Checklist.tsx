"use client";
import { useEffect, useState } from "react";

export type AcaoView = { id: string; prazo: 30 | 60 | 90; titulo: string; como: string; dono: string; evidencia: string; cor: string };

const KEY = "kk-plano-feitas";

/** Plano em três colunas (30, 60 e 90 dias). O que foi marcado como feito fica guardado neste navegador. */
export function Checklist({ itens, labels }: { itens: AcaoView[]; labels: { dias: string; dono: string; feito: string; marcar: string; acoes: string; feitas: string } }) {
  const [feitas, setFeitas] = useState<string[]>([]);
  useEffect(() => {
    try { const v = JSON.parse(localStorage.getItem(KEY) ?? "[]"); if (Array.isArray(v)) queueMicrotask(() => setFeitas(v)); } catch {}
  }, []);
  function alterna(id: string) {
    setFeitas((f) => { const n = f.includes(id) ? f.filter((x) => x !== id) : [...f, id]; try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} return n; });
  }
  const total = itens.length, ok = itens.filter((i) => feitas.includes(i.id)).length;
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sumi/10"><div className="h-2 rounded-full bg-sumi transition-[width] duration-700" style={{ width: `${(ok / Math.max(total, 1)) * 100}%` }} /></div>
        <span className="text-sm tabular-nums text-sumi-soft">{ok}/{total} {labels.feitas}</span>
      </div>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {([30, 60, 90] as const).map((prazo, col) => (
          <div key={prazo} className="rounded-[28px] bg-washi-deep/80 p-5 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)] sm:p-6">
            <div className="flex items-baseline justify-between">
              <p className="font-serif text-5xl leading-none">{prazo}<span className="ml-2 text-xl text-sumi-soft">{labels.dias}</span></p>
              <span className="text-xs text-stone tabular-nums">{itens.filter((i) => i.prazo === prazo).length} {labels.acoes}</span>
            </div>
            <div className="mt-6 space-y-3">
              {itens.filter((i) => i.prazo === prazo).map((it, k) => {
                const on = feitas.includes(it.id);
                return (
                  <article key={it.id} className={`kk-reveal is-in rounded-[22px] bg-[#fbf4e9] p-5 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)] transition-opacity ${on ? "opacity-55" : ""}`} style={{ transitionDelay: `${col * 120 + k * 80}ms` }}>
                    <div className="flex items-start gap-3">
                      <i className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: it.cor }} />
                      <div className="flex-1">
                        <h3 className={`font-serif text-2xl leading-snug ${on ? "line-through decoration-1" : ""}`}>{it.titulo}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-sumi-soft">{it.como}</p>
                        <p className="mt-3 text-xs text-stone">{it.evidencia}</p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-washi-deep px-3 py-1.5 text-xs text-sumi-soft">{labels.dono}: {it.dono}</span>
                          <button type="button" onClick={() => alterna(it.id)} aria-pressed={on}
                            className={`rounded-full px-4 py-2 text-xs transition ${on ? "bg-sumi text-washi" : "text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.22)] hover:bg-sumi/[0.05]"}`}>
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
