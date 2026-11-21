import type { Hero } from "@/lib/site-i18n";

/** Título grande do site: palavras surgem em tinta, uma a uma; pincelada sob a 2ª linha. */
export function Title({ hero, wide = false }: { hero: Hero; wide?: boolean }) {
  const w1 = hero.l1.split(" ");
  const w2 = hero.l2a ? hero.l2a.split(" ") : [];
  let i = 0;
  return (
    <h1 className={`ks-title${wide ? " ks-title--wide" : ""}`} aria-label={`${hero.l1} ${hero.l2a} ${hero.l2b}`.replace(/\s+/g, " ")}>
      <span className="ks-title__line" aria-hidden>
        {w1.map((w, k) => <span key={k}><span className="ks-w" style={{ "--i": i++ } as React.CSSProperties}>{w}</span>{k < w1.length - 1 ? " " : ""}</span>)}
      </span>
      <span className="ks-title__line" aria-hidden>
        {w2.map((w, k) => <span key={k}><span className="ks-w" style={{ "--i": i++ } as React.CSSProperties}>{w}</span>{" "}</span>)}
        <span className="ks-w ks-w--mark" style={{ "--i": i++ } as React.CSSProperties}>{hero.l2b}</span>
        <svg className="ks-title__stroke" viewBox="0 0 400 24" preserveAspectRatio="none"><path d="M4 16 C 90 8, 210 6, 396 12" /></svg>
      </span>
    </h1>
  );
}

/** Frase que aparece palavra por palavra quando entra na tela. */
export function Words({ text }: { text: string }) {
  return <>{text.split(" ").map((w, k, a) => <span key={k}><span className="ks-word" style={{ "--w": k } as React.CSSProperties}>{w}</span>{k < a.length - 1 ? " " : ""}</span>)}</>;
}

/** Número que conta até o valor quando aparece. */
export function Count({ to, dec = 0, suffix = "", locale }: { to: number; dec?: number; suffix?: string; locale: string }) {
  const final = to.toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
  return <span className="ks-num" data-count={to} data-dec={dec} data-suf={suffix} data-loc={locale}>{final}</span>;
}
