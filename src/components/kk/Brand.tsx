import { Traco } from "./Pincel";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Logo: lettering "KOKORO" a pincel (traço fino). */
export function LogoBrush({ className = "h-7 w-auto" }: { className?: string }) {
  return <Image src="/brand/logo-kokoro-fino.png" alt="Kokoro" width={1168} height={187} className={className} preload />;
}

type HankoProps = { text: string; shape?: "square" | "round"; tone?: "light" | "dark" | "red"; size?: number; rotate?: number; delay?: number; filled?: boolean };
/** Carimbo hanko com kanji (Shippori Mincho), textura de tinta e queda com impacto. */
export function Hanko({ text, shape = "square", tone = "light", size = 92, rotate = 2, delay = 0.6, filled = false }: HankoProps) {
  const color = tone === "light" ? "#ffffff" : tone === "red" ? "#a9822a" : "#292521";
  const vertical = shape === "square" && text.length > 1;
  const style = {
    width: size, height: shape === "round" ? size : Math.round(size * (text.length > 1 ? 1.3 : 1)),
    color: filled ? "#fbf9f4" : color, background: filled ? color : "transparent",
    border: `${shape === "round" ? 3 : 5}px solid ${color}`,
    outline: shape === "square" ? `1.5px solid ${filled ? "#fbf9f4" : color}` : undefined, outlineOffset: shape === "square" ? -11 : undefined,
    borderRadius: shape === "round" ? "50%" : 4,
    fontSize: shape === "round" ? size * 0.3 : size * (text.length > 2 ? 0.3 : 0.42),
    writingMode: vertical ? "vertical-rl" : undefined, lineHeight: 1.05,
    "--r": `${rotate}deg`, "--d": `${delay}s`,
  } as CSSProperties;
  return <span aria-hidden className="kk-hanko kk-stamp grid place-content-center" style={style}>{text}</span>;
}

/** Título grande padrão (igual ao do site): palavras surgindo como tinta + pincelada sob o trecho em itálico. */
export function KkTitle({ line1, line2 = "", mark, size = "lg" }: { line1: string; line2?: string; mark: string; size?: "lg" | "md" }) {
  let i = 0;
  const words = (t: string) => t.split(/\s+/).filter(Boolean).map((w) => <span key={`${w}-${i}`} className="kk-w" style={{ "--i": i++ } as CSSProperties}>{w}&nbsp;</span>);
  return (
    <h1 className={`kk-display leading-[1.02] text-sumi ${size === "lg" ? "text-[clamp(46px,6.6vw,100px)]" : "text-[clamp(40px,4.8vw,74px)]"}`}>
      <span className="block">{words(line1)}</span>
      <span className="relative block w-fit">
        {line2 && words(line2)}
        <span className="kk-w italic" style={{ "--i": i } as CSSProperties}>{mark}</span>
        <Traco className="absolute right-0 -bottom-[.26em] h-[.22em] w-[72%] text-sumi" delay={1.1} />
      </span>
    </h1>
  );
}

/** Card com a paleta do Kokoro. */
export function KkCard({ tone = "washi", className = "", waves = false, children }: { tone?: "washi" | "ai" | "shu" | "sumi" | "paper"; className?: string; waves?: boolean; children: ReactNode }) {
  // Identidade 2: todos os cartões claros e foscos, como na Costura (bronze só em detalhes).
  // Os tons antigos (ai, shu, sumi) viram cartões claros com um fio de cor no topo; o texto branco deles é
  // reescrito para tinta escura via .kk-lite (globals.css). No modo escuro, .kk-glass vira vidro escuro.
  const glass = "kk-glass bg-[linear-gradient(160deg,rgba(255,255,255,.82),rgba(255,255,255,.55))] text-sumi shadow-[inset_0_1px_0_rgba(255,255,255,1),0_24px_50px_-30px_rgba(41,37,33,.28)] border border-white/90 backdrop-blur-xl";
  const tones = {
    washi: glass,
    paper: glass,
    ai: `${glass} kk-lite kk-lite--1`,
    shu: `${glass} kk-lite kk-lite--2`,
    sumi: `${glass} kk-lite kk-lite--3`,
  };
  return <div data-luz className={`rounded-[22px] ${tones[tone]} ${waves ? "kk-waves" : ""} ${className}`}>{children}</div>;
}

/** Vidro claro com névoa de cor no alto (identidade 2): mais leve que o vidro escuro, para páginas
 *  com vários cards de destaque (Perfis, Pesquisa). No modo escuro vira vidro escuro (.kk-glass). */
export const vidroClaro = (luz: string) => ({
  backgroundImage: `radial-gradient(80% 60% at 12% 0%, ${luz}, transparent 70%), linear-gradient(160deg, rgba(255,255,255,.92), rgba(255,255,255,.62))`,
});
export const CARTAO_CLARO = "kk-glass relative overflow-hidden rounded-[24px] border border-white/90 text-sumi shadow-[inset_0_1px_0_#fff,0_24px_50px_-30px_rgba(41,37,33,.3)] backdrop-blur-xl";
