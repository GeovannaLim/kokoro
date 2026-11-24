"use client";
import { useEffect } from "react";

/** Efeitos do site (identidade 2): revelação ao rolar, números que contam, lista fixa que acompanha
 *  o card visível na seção escura, leve aproximação das fotos ao rolar e botão de pausa do vídeo.
 *  Quem pede menos movimento vê tudo já pronto. */
export function Fx2() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".c2");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("c2-fx");

    const count = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.count || "0"), dec = +(el.dataset.dec || 0), suf = el.dataset.suf || "", loc = el.dataset.loc || "pt-BR";
      const fmt = (v: number) => v.toLocaleString(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (reduce) { el.textContent = fmt(to); return; }
      let t0 = 0;
      const step = (t: number) => { if (!t0) t0 = t; const p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const reveal = (el: Element) => { if (el.classList.contains("is-in")) return; el.classList.add("is-in"); el.querySelectorAll<HTMLElement>("[data-count]").forEach(count); };
    const targets = document.querySelectorAll(".c2-reveal");
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) targets.forEach(reveal);
    else {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io!.unobserve(e.target); } }), { threshold: 0.15 });
      targets.forEach((el) => io!.observe(el));
    }

    // lista fixa da seção escura: destaca o recurso cujo card está no meio da tela
    const pills = [...document.querySelectorAll<HTMLAnchorElement>("[data-feat-link]")];
    let io2: IntersectionObserver | null = null;
    if (pills.length && "IntersectionObserver" in window) {
      io2 = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = (e.target as HTMLElement).id;
        pills.forEach((p) => p.classList.toggle("is-on", p.dataset.featLink === id));
        document.querySelectorAll("[data-feat]").forEach((c) => c.classList.toggle("is-active", c.id === id));
      }), { rootMargin: "-45% 0px -45% 0px" });
      document.querySelectorAll("[data-feat]").forEach((c) => io2!.observe(c));
    }

    // fotos com leve aproximação conforme a rolagem (parallax de escala)
    const zooms = [...document.querySelectorAll<HTMLElement>("[data-zoom]")];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        zooms.forEach((z) => {
          const r = z.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, 1 - (r.top + r.height / 2) / (vh + r.height / 2)));
          z.style.setProperty("--z", (1.14 - p * 0.14).toFixed(4));
        });
        ticking = false;
      });
    };
    if (!reduce && zooms.length) { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

    return () => { io?.disconnect(); io2?.disconnect(); window.removeEventListener("scroll", onScroll); root.classList.remove("c2-fx"); };
  }, []);
  return null;
}
