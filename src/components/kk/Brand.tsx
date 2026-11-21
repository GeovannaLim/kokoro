import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Logo: lettering "KOKORO" a pincel (traço fino). */
export function LogoBrush({ className = "h-7 w-auto" }: { className?: string }) {
  return <Image src="/brand/logo-kokoro-fino.png" alt="Kokoro" width={1168} height={187} className={className} preload />;
}

type HankoProps = { text: string; shape?: "square" | "round"; tone?: "light" | "dark" | "red"; size?: number; rotate?: number; delay?: number; filled?: boolean };
/** Carimbo hanko com kanji (Shippori Mincho), textura de tinta e queda com impacto. */
export function Hanko({ text, shape = "square", tone = "light", size = 92, rotate = 2, delay = 0.6, filled = false }: HankoProps) {
  const color = tone === "light" ? "#ffffff" : tone === "red" ? "#b5382c" : "#111111";
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
    <h1 className={`font-serif font-medium leading-[1.04] tracking-[-0.01em] text-sumi ${size === "lg" ? "text-[clamp(40px,6vw,92px)]" : "text-[clamp(34px,4.2vw,64px)]"}`}>
      <span className="block">{words(line1)}</span>
      <span className="relative block w-fit">
        {line2 && words(line2)}
        <span className="kk-w italic" style={{ "--i": i } as CSSProperties}>{mark}</span>
        <svg className="kk-stroke absolute right-0 -bottom-[.3em] h-[.2em] w-[64%] overflow-visible text-sumi" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden>
          <path d="M4 16 C 90 8, 210 6, 396 12" />
        </svg>
      </span>
    </h1>
  );
}

/** Card com a paleta do Kokoro. */
export function KkCard({ tone = "washi", className = "", waves = false, children }: { tone?: "washi" | "ai" | "shu" | "sumi" | "paper"; className?: string; waves?: boolean; children: ReactNode }) {
  const tones = {
    washi: "bg-washi-deep/80 text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]",
    paper: "bg-[#fbf4e9] text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)]",
    ai: "bg-ai text-white",
    shu: "bg-shu text-white",
    sumi: "bg-sumi text-white",
  };
  return <div className={`rounded-[28px] ${tones[tone]} ${waves ? "kk-waves" : ""} ${className}`}>{children}</div>;
}
