"use client";
import { useEffect, useRef, useState } from "react";

/** Carrossel da apresentação: setas, pontinhos, teclado e arrastar com o mouse. */
export function Slides({ lang, titulo, alts, l }: { lang: string; titulo: string; alts: string[]; l: { anterior: string; proximo: string } }) {
  const track = useRef<HTMLOListElement>(null);
  const [atual, setAtual] = useState(0);
  const n = alts.length;

  const current = () => {
    const t = track.current; if (!t) return 0;
    let best = 0, bd = Infinity;
    [...t.children].forEach((s, i) => { const d = Math.abs((s as HTMLElement).offsetLeft - t.offsetLeft - t.scrollLeft); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  const go = (i: number) => {
    const t = track.current; if (!t) return;
    const k = Math.max(0, Math.min(n - 1, i)), s = t.children[k] as HTMLElement;
    t.scrollTo({ left: s.offsetLeft - t.offsetLeft, behavior: "smooth" });
  };
  useEffect(() => {
    const t = track.current; if (!t) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(() => setAtual(current()), 60); };
    t.addEventListener("scroll", onScroll, { passive: true });
    let down = false, sx = 0, sl = 0;
    const pd = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = t.scrollLeft; t.classList.add("is--drag"); };
    const pm = (e: PointerEvent) => { if (down) t.scrollLeft = sl - (e.clientX - sx); };
    const pu = () => { if (!down) return; down = false; t.classList.remove("is--drag"); go(current()); };
    t.addEventListener("pointerdown", pd); window.addEventListener("pointermove", pm); window.addEventListener("pointerup", pu);
    return () => { t.removeEventListener("scroll", onScroll); t.removeEventListener("pointerdown", pd); window.removeEventListener("pointermove", pm); window.removeEventListener("pointerup", pu); };
  }, []);

  return (
    <section className="ks-slides wrap ks-reveal" aria-roledescription="carrossel" aria-label={titulo}>
      <div className="ks-slides__head">
        <h2 className="ks-slides__title">{titulo}</h2>
        <div className="ks-slides__nav">
          <span className="ks-slides__count"><b>{String(atual + 1).padStart(2, "0")}</b> / <span>{String(n).padStart(2, "0")}</span></span>
          <button type="button" className="ks-slides__btn" aria-label={l.anterior} onClick={() => go(current() - 1)}>&#8592;</button>
          <button type="button" className="ks-slides__btn" aria-label={l.proximo} onClick={() => go(current() + 1)}>&#8594;</button>
        </div>
      </div>
      <ol ref={track} className="ks-slides__track" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(current() + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(current() - 1); } }}>
        {alts.map((a, i) => (
          <li key={i} className={`ks-slide${i === atual ? " is--active" : ""}`}>
            <img src={`/site/slides/${lang}/${String(i + 1).padStart(2, "0")}.webp?v=id2`} alt={a} loading={i < 2 ? "eager" : "lazy"} draggable={false} />
          </li>
        ))}
      </ol>
      <div className="ks-slides__dots">
        {alts.map((_, i) => <button key={i} type="button" className="ks-slides__dot" aria-label={`${i + 1}`} aria-current={i === atual ? "true" : "false"} onClick={() => go(i)} />)}
      </div>
    </section>
  );
}
