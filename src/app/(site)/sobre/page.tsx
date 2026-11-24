import Link from "next/link";
import { Fx2 } from "@/components/site2/Fx2";
import { LOCALE } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { SITE2 } from "@/lib/site2-i18n";

export const metadata = { title: "Sobre nós | Kokoro — saúde mental organizacional" };

export default async function Sobre() {
  const lang = await getLang();
  const s = SITE2[lang].sobre;
  const loc = LOCALE[lang];
  return (
    <>
      <section className="c2-wrap c2-pagehead">
        <span className="c2-tag c2-reveal">{s.tag}</span>
        <h1 className="c2-h1 c2-reveal"><span>{s.h1a}</span><br /><span className="c2-muted">{s.h1b}</span></h1>
        <p className="c2-lead c2-reveal">{s.lead}</p>
      </section>

      <section className="c2-wrap">
        {/* a logo escrita letra por letra, em marfim, sobre fumaça escura */}
        <div className="c2-kcena c2-reveal" role="img" aria-label="Kokoro">
          <i aria-hidden /><i aria-hidden /><i aria-hidden />
          <div className="c2-kwrite" aria-hidden>
            <span style={{ left: "0.428%", width: "17.637%", backgroundSize: "566.990% 100%", backgroundPosition: "0.520% 0", "--i": 0 } as React.CSSProperties} />
            <span style={{ left: "19.092%", width: "11.301%", backgroundSize: "884.848% 100%", backgroundPosition: "21.525% 0", "--i": 1 } as React.CSSProperties} />
            <span style={{ left: "36.815%", width: "16.781%", backgroundSize: "595.918% 100%", backgroundPosition: "44.239% 0", "--i": 2 } as React.CSSProperties} />
            <span style={{ left: "54.538%", width: "11.216%", backgroundSize: "891.603% 100%", backgroundPosition: "61.427% 0", "--i": 3 } as React.CSSProperties} />
            <span style={{ left: "72.688%", width: "15.753%", backgroundSize: "634.783% 100%", backgroundPosition: "86.280% 0", "--i": 4 } as React.CSSProperties} />
            <span style={{ left: "88.356%", width: "11.301%", backgroundSize: "884.848% 100%", backgroundPosition: "99.614% 0", "--i": 5 } as React.CSSProperties} />
          </div>
        </div>
      </section>

      <section className="c2-wrap c2-numbers">
        {s.numeros.map(([txt, to, dec, suf, fonte]) => (
          <div key={txt} className="c2-number c2-reveal">
            <p className="c2-number__n"><span data-count={to} data-dec={dec} data-suf={suf} data-loc={loc}>{to.toLocaleString(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf}</span></p>
            <p className="c2-number__t">{txt}</p>
            <p className="c2-number__s">{fonte}</p>
          </div>
        ))}
      </section>

      <section className="c2-dark c2-dark--round c2-mission">
        <div className="c2-wrap">
          <span className="c2-tag c2-tag--dark c2-reveal">{s.missaoTag}</span>
          <p className="c2-mission__big c2-reveal">{s.missao}</p>
          <div className="c2-mission__row">
            <p className="c2-reveal">{s.criamos}</p>
            <p className="c2-reveal">{s.reune}</p>
          </div>
          <Link href="/plataforma" className="c2-btn c2-btn--light c2-reveal">{s.cta}</Link>
        </div>
      </section>
      <Fx2 />
    </>
  );
}
