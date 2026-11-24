/** O único gesto feito à mão da identidade 2: o traço de pincel (mesmo espírito do K da logo).
 *  Usado com parcimônia: sob o trecho principal dos títulos, no item ativo do menu e no ensō da área prioritária.
 *  A borda irregular vem do filtro #kk-pincel, definido uma vez em <PincelDefs /> no layout. */

export function PincelDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="kk-pincel" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/** Pincelada afinando nas pontas, desenhada da esquerda para a direita. */
export function Traco({ className = "", delay = 0.9 }: { className?: string; delay?: number }) {
  return (
    <svg className={`kk-traco pointer-events-none overflow-visible ${className}`} viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden style={{ animationDelay: `${delay}s` }}>
      <path filter="url(#kk-pincel)" fill="currentColor"
        d="M3 17 C 40 12, 110 8, 200 7.5 C 280 7, 350 8.5, 398 10 C 399 11.5, 396 13.5, 390 13.8 C 330 14.5, 250 14, 170 15.8 C 110 17.2, 50 20, 9 21.5 C 4 21.6, 1 19.5, 3 17 Z" />
    </svg>
  );
}

/** Ensō: o círculo de pincel japonês, aberto no alto, desenhado num gesto só. */
export function Enso({ className = "", delay = 0.6 }: { className?: string; delay?: number }) {
  return (
    <svg className={`kk-enso pointer-events-none overflow-visible ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden style={{ animationDelay: `${delay}s` }}>
      <path filter="url(#kk-pincel)" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" pathLength={1} vectorEffect="non-scaling-stroke"
        d="M74 16 C 56 4, 22 8, 11 36 C 1 62, 18 92, 50 94 C 80 96, 98 70, 92 44 C 89 32, 84 26, 79 22" />
    </svg>
  );
}
