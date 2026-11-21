/** Carimbo quadrado com 心 + nome em mincho. */
export function Seal({ className = "h-9 w-9 text-lg" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[10px] bg-sumi font-serif leading-none font-semibold text-washi ${className}`}
    >
      心
    </span>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Seal />
      <span className="font-serif text-xl font-semibold tracking-[0.04em] lowercase">kokoro</span>
    </span>
  );
}
