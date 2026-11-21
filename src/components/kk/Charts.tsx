"use client";
/* Gráficos do Kokoro em SVG próprio: traço fino, pontas arredondadas, grade discreta, dica ao passar o mouse
   e tabela opcional. Cores: índices na cor de cada um (um índice por gráfico); categorias = paleta validada. */
import { useEffect, useRef, useState, type ReactNode } from "react";

import { CAT } from "@/lib/colors";

const mkFmt = (locale: string) => (n: number) => n.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

type Tip = { x: number; y: number; body: ReactNode } | null;
function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div role="tooltip" className="pointer-events-none absolute z-20 max-w-[260px] -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-2xl bg-sumi px-4 py-3 text-[13px] leading-snug text-washi shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)]"
      style={{ left: tip.x, top: tip.y }}>{tip.body}</div>
  );
}

export function TableToggle({ label, head, rows }: { label: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="group mt-4 text-sm">
      <summary className="w-fit cursor-pointer list-none rounded-full px-4 py-2 text-xs text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.15)] hover:bg-sumi/[0.05]">{label}</summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left tabular-nums">
          <thead><tr className="text-xs text-stone">{head.map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-sumi/10">{r.map((c, j) => <td key={j} className="py-2 pr-4">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </details>
  );
}

/* ───────── Mapa das áreas: estigma (x) × abertura (y), tamanho = pessoas ───────── */
export type MapPoint = { label: string; x: number; y: number; n: number; detail: ReactNode };
export function AreaMap({ points, refPoint: refPt, labels }: {
  points: MapPoint[]; refPoint: { x: number; y: number };
  labels: { seguro: string; prioridade: string; x: string; y: string; refName: string };
}) {
  const [box, on] = useInView<HTMLDivElement>();
  const [tip, setTip] = useState<Tip>(null);
  const W = 720, H = 420, L = 56, R = 24, T = 24, B = 48;
  const xs = [...points.map((p) => p.x), refPt.x], ys = [...points.map((p) => p.y), refPt.y];
  const x0 = Math.floor((Math.min(...xs) - 8) / 10) * 10, x1 = Math.ceil((Math.max(...xs) + 8) / 10) * 10;
  const y0 = Math.floor((Math.min(...ys) - 8) / 10) * 10, y1 = Math.ceil((Math.max(...ys) + 8) / 10) * 10;
  const sx = (v: number) => L + ((v - x0) / (x1 - x0)) * (W - L - R);
  const sy = (v: number) => H - B - ((v - y0) / (y1 - y0)) * (H - T - B);
  const nMax = Math.max(...points.map((p) => p.n));
  const rr = (n: number) => 9 + 17 * Math.sqrt(n / nMax);
  const ticks = (a: number, b: number) => Array.from({ length: Math.floor((b - a) / 10) + 1 }, (_, i) => a + i * 10);
  return (
    <div ref={box} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label={`${labels.x} × ${labels.y}`}>
        {/* quadrantes: seguro (baixo estigma, alta abertura) e prioridade (alto estigma, baixa abertura) */}
        <rect x={L} y={T} width={sx(refPt.x) - L} height={sy(refPt.y) - T} fill="#22336b" opacity=".06" rx="14" />
        <rect x={sx(refPt.x)} y={sy(refPt.y)} width={W - R - sx(refPt.x)} height={H - B - sy(refPt.y)} fill="#b5382c" opacity=".07" rx="14" />
        <text x={L + 12} y={T + 22} className="fill-sumi-soft text-[12px]">{labels.seguro}</text>
        <text x={W - R - 12} y={H - B - 12} textAnchor="end" className="fill-sumi-soft text-[12px]">{labels.prioridade}</text>
        {ticks(x0, x1).map((v) => <g key={`x${v}`}><line x1={sx(v)} x2={sx(v)} y1={T} y2={H - B} stroke="#111" opacity=".06" /><text x={sx(v)} y={H - B + 18} textAnchor="middle" className="fill-stone text-[11px] tabular-nums">{v}</text></g>)}
        {ticks(y0, y1).map((v) => <g key={`y${v}`}><line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} stroke="#111" opacity=".06" /><text x={L - 10} y={sy(v) + 4} textAnchor="end" className="fill-stone text-[11px] tabular-nums">{v}</text></g>)}
        <text x={W - R} y={H - 8} textAnchor="end" className="fill-sumi-soft text-[12px]">{labels.x}</text>
        <text x={L - 44} y={T - 8} className="fill-sumi-soft text-[12px]">{labels.y}</text>
        {/* referência OSMI */}
        <line x1={sx(refPt.x)} x2={sx(refPt.x)} y1={T} y2={H - B} stroke="#111" strokeDasharray="4 5" opacity=".35" />
        <line x1={L} x2={W - R} y1={sy(refPt.y)} y2={sy(refPt.y)} stroke="#111" strokeDasharray="4 5" opacity=".35" />
        <text x={sx(refPt.x) + 6} y={T + 12} className="fill-stone text-[11px]">{labels.refName}</text>
        {(() => {
          // rótulos sem colisão: cada rótulo desce até não encostar em NENHUM já posicionado
          // (largura estimada pelo texto, mín. 18px entre linhas)
          const pos = points.map((p) => ({ p, cx: sx(p.x), cy: sy(p.y), r: rr(p.n) })).sort((a, b) => a.cy - b.cy);
          const placed: { x: number; y: number; w: number }[] = [];
          const largura = (s: string) => s.length * 7.4 + 8;
          const labelled = pos.map((o) => {
            let ly = o.cy + 4;
            const lx = o.cx + o.r + 10, w = largura(o.p.label);
            for (let k = 0; k < 24; k++) {
              const hit = placed.find((q) => Math.abs(q.y - ly) < 17.5 && lx < q.x + q.w && q.x < lx + w);
              if (!hit) break;
              ly = hit.y + 18;
            }
            placed.push({ x: lx, y: ly, w });
            return { ...o, lx, ly };
          });
          const anim = (i: number) => ({ transition: "opacity .8s ease, transform 1s cubic-bezier(.2,.7,.2,1)", transitionDelay: `${i * 90}ms`, opacity: on ? 1 : 0, transform: on ? "none" : "translateY(14px)" });
          return (
            <>
              {labelled.map((o, i) => <circle key={`c${o.p.label}`} style={anim(i)} cx={o.cx} cy={o.cy} r={o.r} fill="#111" fillOpacity=".82" stroke="#f5f0e6" strokeWidth="2" />)}
              {labelled.map((o, i) => (
                <g key={`l${o.p.label}`} style={anim(i)}>
                  {Math.abs(o.ly - 4 - o.cy) > 6 && <line x1={o.cx + o.r * 0.7} y1={o.cy} x2={o.lx - 4} y2={o.ly - 4} stroke="#111" strokeWidth="1" opacity=".35" />}
                  <text x={o.lx} y={o.ly} className="fill-sumi text-[13px]" paintOrder="stroke" stroke="#ebe5d8" strokeWidth="4" strokeLinejoin="round">{o.p.label}</text>
                </g>
              ))}
              {labelled.map((o) => (
                <circle key={`h${o.p.label}`} cx={o.cx} cy={o.cy} r={Math.max(o.r + 8, 22)} fill="transparent" className="cursor-pointer"
                  onMouseEnter={(e) => { const b = box.current!.getBoundingClientRect(); const c = (e.target as SVGElement).getBoundingClientRect(); setTip({ x: c.left - b.left + c.width / 2, y: c.top - b.top + 8, body: o.p.detail }); }}
                  onMouseLeave={() => setTip(null)} />
              ))}
            </>
          );
        })()}
      </svg>
      <Tooltip tip={tip} />
    </div>
  );
}

/* ───────── Barras horizontais de um índice (um painel por índice) ───────── */
export function IndexBars({ title, color, rows, refValue, refName, locale }: {
  title: string; color: string; rows: { label: string; value: number; n: number }[]; refValue: number; refName: string; locale: string;
}) {
  const fmt = mkFmt(locale);
  const [box, on] = useInView<HTMLDivElement>();
  const [tip, setTip] = useState<Tip>(null);
  const sorted = [...rows].sort((a, b) => b.value - a.value);
  return (
    <div ref={box} className="relative">
      <div className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /><p className="font-serif text-2xl">{title}</p></div>
      <div className="relative mt-4 space-y-3">
        <div className="pointer-events-none absolute inset-y-0 border-l border-dashed border-sumi/40" style={{ left: `calc(96px + (100% - 96px - 44px) * ${refValue / 100})` }}>
          <span className="absolute -top-5 -translate-x-1/2 text-[11px] whitespace-nowrap text-stone">{refName} {fmt(refValue)}</span>
        </div>
        {sorted.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[96px_1fr_44px] items-center gap-0"
            onMouseEnter={(e) => { const b = box.current!.getBoundingClientRect(); const c = e.currentTarget.getBoundingClientRect(); setTip({ x: c.left - b.left + c.width / 2, y: c.top - b.top, body: <><b className="font-medium">{r.label}</b> · {title} {fmt(r.value)}<br />{r.n} · {refName} {fmt(refValue)}</> }); }}
            onMouseLeave={() => setTip(null)}>
            <span className="truncate pr-3 text-[13px] text-sumi-soft">{r.label}</span>
            <div className="h-3 rounded-r-[4px] bg-sumi/[0.06]">
              <div className="h-3 rounded-r-[4px] transition-[width] duration-[1300ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: on ? `${r.value}%` : 0, background: color, transitionDelay: `${i * 70}ms` }} />
            </div>
            <span className="text-right text-[13px] tabular-nums">{fmt(r.value)}</span>
          </div>
        ))}
      </div>
      <Tooltip tip={tip} />
    </div>
  );
}

/* ───────── Barras 100% empilhadas: perfis na empresa e por área ───────── */
export function ProfileStack({ series, rows, locale }: {
  series: { id: string; nome: string }[]; rows: { label: string; parts: Record<string, number>; strong?: boolean }[]; locale: string;
}) {
  const fmt = mkFmt(locale);
  const [box, on] = useInView<HTMLDivElement>();
  const [tip, setTip] = useState<Tip>(null);
  return (
    <div ref={box} className="relative">
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-sumi-soft">
        {series.map((s, i) => <span key={s.id} className="flex items-center gap-2"><i className="h-2.5 w-5 rounded-full" style={{ background: CAT[i] }} />{s.nome}</span>)}
      </div>
      <div className="mt-6 space-y-3">
        {rows.map((r, ri) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr] items-center gap-3">
            <span className={`truncate text-[13px] ${r.strong ? "font-medium text-sumi" : "text-sumi-soft"}`}>{r.label}</span>
            <div className={`flex ${r.strong ? "h-7" : "h-4"} gap-[2px] overflow-hidden rounded-[6px]`}>
              {series.map((s, i) => {
                const v = r.parts[s.id] ?? 0;
                return (
                  <div key={s.id} className="relative h-full transition-[flex-basis] duration-[1300ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                    style={{ flexBasis: on ? `${v}%` : "0%", background: CAT[i], transitionDelay: `${ri * 60}ms` }}
                    onMouseEnter={(e) => { const b = box.current!.getBoundingClientRect(); const c = e.currentTarget.getBoundingClientRect(); setTip({ x: c.left - b.left + c.width / 2, y: c.top - b.top, body: <><b className="font-medium">{r.label}</b><br />{s.nome}: {fmt(v)}%</> }); }}
                    onMouseLeave={() => setTip(null)}>
                    {r.strong && v >= 12 && <span className="absolute inset-0 grid place-items-center text-[12px] font-medium text-white tabular-nums">{fmt(v)}%</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Tooltip tip={tip} />
    </div>
  );
}

/* ───────── Perguntas: média 0–100 de cada pergunta, um painel por índice ───────── */
export function QuestionBars({ title, color, rows, locale }: { title: string; color: string; rows: { texto: string; media: number }[]; locale: string }) {
  const fmt = mkFmt(locale);
  const [box, on] = useInView<HTMLDivElement>();
  const [tip, setTip] = useState<Tip>(null);
  return (
    <div ref={box} className="relative">
      <div className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /><p className="font-serif text-2xl">{title}</p></div>
      <div className="mt-4 space-y-3">
        {[...rows].sort((a, b) => b.media - a.media).map((r, i) => (
          <div key={r.texto}
            onMouseEnter={(e) => { const b = box.current!.getBoundingClientRect(); const c = e.currentTarget.getBoundingClientRect(); setTip({ x: c.left - b.left + c.width / 2, y: c.top - b.top, body: <>{r.texto}<br /><b className="font-medium">{fmt(r.media)}</b></> }); }}
            onMouseLeave={() => setTip(null)}>
            <div className="flex items-baseline justify-between gap-3 text-[13px]"><span className="truncate text-sumi-soft">{r.texto}</span><span className="tabular-nums">{fmt(r.media)}</span></div>
            <div className="mt-1.5 h-2 rounded-r-[4px] bg-sumi/[0.06]">
              <div className="h-2 rounded-r-[4px] transition-[width] duration-[1300ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: on ? `${r.media}%` : 0, background: color, transitionDelay: `${i * 60}ms` }} />
            </div>
          </div>
        ))}
      </div>
      <Tooltip tip={tip} />
    </div>
  );
}
