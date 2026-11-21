"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Revela o conteúdo (sobe do desfoque) quando entra na tela. */
export function Reveal({ children, k = 0, className = "" }: { children: ReactNode; k?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`kk-reveal ${inView ? "is-in" : ""} ${className}`} style={{ "--k": k } as CSSProperties}>{children}</div>;
}

/** Número que conta de 0 até o valor quando aparece. */
export function CountUp({ value, decimals = 0, suffix = "", locale = "pt-BR" }: { value: number; decimals?: number; suffix?: string; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      if (reduce) { setV(value); return; }
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / 1500); setV(value * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.3 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="tabular-nums">{v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

/** Barra que enche até a porcentagem quando aparece. */
export function Bar({ value, color = "currentColor", track = "rgba(17,17,17,.08)" }: { value: number; color?: string; track?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-2 w-full overflow-hidden rounded-full" style={{ background: track }}>
      <div className="h-2 rounded-full transition-[width] duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: on ? `${value}%` : 0, background: color }} />
    </div>
  );
}
