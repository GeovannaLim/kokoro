"use client";
import { useRef, useState } from "react";

/** Vídeo de fundo da abertura com botão de pausa (acessibilidade: movimento que a pessoa pode parar). */
export function HeroVideo({ pausar, tocar }: { pausar: string; tocar: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(true);
  const toggle = () => {
    const el = v.current; if (!el) return;
    if (el.paused) { el.play(); setOn(true); } else { el.pause(); setOn(false); }
  };
  return (
    <>
      <video ref={v} className="c2-hero__media" src="/site2/hero.mp4" poster="/site2/hero-poster.jpg" autoPlay loop muted playsInline aria-hidden />
      <button type="button" className="c2-hero__pause" aria-label={on ? pausar : tocar} aria-pressed={!on} onClick={toggle}>
        {on ? <svg viewBox="0 0 16 16" aria-hidden><rect x="4" y="3" width="2.6" height="10" rx="1" /><rect x="9.4" y="3" width="2.6" height="10" rx="1" /></svg>
            : <svg viewBox="0 0 16 16" aria-hidden><path d="M5 3.2v9.6c0 .5.5.8.9.5l7.3-4.8a.6.6 0 0 0 0-1L5.9 2.7c-.4-.3-.9 0-.9.5z" /></svg>}
      </button>
    </>
  );
}
