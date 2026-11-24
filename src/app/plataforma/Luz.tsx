"use client";
import { useEffect } from "react";

/** Brilho suave que acompanha o cursor dentro dos cartões [data-luz] (como o vidro da Costura). */
export function Luz() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-luz]");
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => { document.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
