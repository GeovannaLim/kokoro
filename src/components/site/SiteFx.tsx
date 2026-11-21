"use client";
import { useEffect } from "react";

/** Fica no fim de cada página (roda depois que a página hidrata).
 *  Efeitos do site: faixas de cinema + grão na abertura, revelação ao rolar, palavras e números animados,
 *  título que se afasta ao rolar. Sem movimento quando a pessoa pede menos animação. */
export function SiteFx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ks");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("ks-fx");
    const extras: HTMLElement[] = [];
    if (!reduce && !sessionStorage.getItem("ks-intro")) {
      sessionStorage.setItem("ks-intro", "1");
      const lb = document.createElement("div"); lb.className = "ks-letterbox"; lb.setAttribute("aria-hidden", "true");
      root.appendChild(lb); extras.push(lb);
      setTimeout(() => lb.classList.add("is-open"), 350);
      setTimeout(() => lb.remove(), 2200);
    }
    const gr = document.createElement("div"); gr.className = "ks-grain"; gr.setAttribute("aria-hidden", "true");
    root.appendChild(gr); extras.push(gr);


    const count = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.count || "0"), dec = +(el.dataset.dec || 0), suf = el.dataset.suf || "", loc = el.dataset.loc || "pt-BR";
      const fmt = (v: number) => v.toLocaleString(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (reduce) { el.textContent = fmt(to); return; }
      let t0 = 0;
      const step = (t: number) => { if (!t0) t0 = t; const p = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const reveal = (el: Element) => { if (el.classList.contains("ks-in")) return; el.classList.add("ks-in"); el.querySelectorAll<HTMLElement>("[data-count]").forEach(count); };
    const targets = document.querySelectorAll(".ks-reveal, .ks-split");
    let io: IntersectionObserver | null = null;
    if (reduce || !("IntersectionObserver" in window)) targets.forEach(reveal);
    else {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io!.unobserve(e.target); } }), { threshold: 0.18 });
      targets.forEach((el) => io!.observe(el));
    }

    const title = document.querySelector<HTMLElement>(".ks-title");
    let ticking = false;
    const onScroll = () => {
      if (ticking || !title) return; ticking = true;
      requestAnimationFrame(() => { title.style.setProperty("--p", Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.7))).toFixed(3)); ticking = false; });
    };
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io?.disconnect(); window.removeEventListener("scroll", onScroll); extras.forEach((x) => x.remove()); root.classList.remove("ks-fx"); };
  }, []);
  return null;
}
