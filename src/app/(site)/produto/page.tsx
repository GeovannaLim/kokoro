import { Slides } from "@/components/site/Slides";
import { Fx2 } from "@/components/site2/Fx2";
import { LOCALE } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { GITHUB, SITE } from "@/lib/site-i18n";
import { SITE2 } from "@/lib/site2-i18n";

export const metadata = { title: "Produto | Kokoro — saúde mental organizacional" };

/** Número que conta até o valor quando aparece (o Fx2 anima os [data-count]). */
function N({ to, dec = 0, suf = "", loc }: { to: number; dec?: number; suf?: string; loc: string }) {
  return <span data-count={to} data-dec={dec} data-suf={suf} data-loc={loc}>{to.toLocaleString(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf}</span>;
}

export default async function Produto() {
  const lang = await getLang();
  const t = SITE[lang].produto;
  const p = SITE2[lang].produto;
  const loc = LOCALE[lang];
  return (
    <>
      <section className="c2-wrap c2-pagehead">
        <span className="c2-tag c2-reveal">{p.tag}</span>
        <h1 className="c2-h1 c2-reveal"><span>{p.h1a}</span><br /><span className="c2-muted">{p.h1b}</span></h1>
        <p className="c2-lead c2-reveal">{p.lead}</p>
      </section>

      <section className="c2-wrap">
        <div className="c2-browser c2-browser--big c2-reveal" data-zoom><i /><i /><i /><img src={`/site2/telas/dashboard-${lang}.webp?v=refino`} alt="Dashboard" /></div>
      </section>

      {/* especificações: cada grupo numa linha, com fios bronze */}
      <section className="c2-wrap c2-specs">
        <div className="c2-specs__head c2-reveal">
          <h2 className="c2-h2">{t.specsTitulo}</h2>
          <a className="c2-btn c2-btn--line c2-btn--sm" href={t.pdfHref} download>{t.pdf}</a>
        </div>
        {t.specs.map((s) => (
          <div key={s.nome} className="c2-specs__group c2-reveal">
            <h3>{s.nome}</h3>
            <dl>{s.linhas.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          </div>
        ))}
      </section>

      {/* por dentro: modelos e código, na seção escura */}
      <section className="c2-dark c2-dark--round">
        <div className="c2-wrap">
          <span className="c2-tag c2-tag--dark c2-reveal">{p.modeloTag}</span>
          <h2 className="c2-h2 c2-reveal" style={{ marginTop: 20 }}>{p.modeloTitulo}</h2>
          <div className="c2-bento">
            <article className="c2-dcard c2-reveal">
              <h3>{t.acuracia[0]}</h3>
              <p className="c2-dcard__txt">{t.acuracia[1]}</p>
              <div className="c2-metrics">
                {t.metricas.map(([a, , v]) => (
                  <div key={a}><p><span>{a}</span><b><N to={v} dec={3} loc={loc} /></b></p><i style={{ "--v": v } as React.CSSProperties} /></div>
                ))}
              </div>
              <dl className="c2-ficha">{t.ficha.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
            </article>
            <article className="c2-dcard c2-reveal">
              <h3>{t.modelos[0]}</h3>
              <p className="c2-dcard__txt">{t.modelos[1]}</p>
              <p className="c2-dcard__big"><N to={1433} loc={loc} /></p>
              <p className="c2-dcard__cap">OSMI 2016 · CC BY 4.0</p>
            </article>
            <article className="c2-dcard c2-reveal">
              <h3>{t.codigo[0]}</h3>
              <p className="c2-dcard__txt">{t.codigo[1]}</p>
              <span className="c2-pill">{t.stack}</span>
              <a className="c2-btn c2-btn--light c2-btn--sm" href={GITHUB} target="_blank" rel="noreferrer">github.com/GeovannaLim/kokoro</a>
            </article>
          </div>
        </div>
      </section>

      <div className="c2-slideswrap">
        <span className="c2-tag c2-reveal">{p.slidesTag}</span>
        <Slides lang={lang} titulo={t.apresentacao} alts={t.slidesAlt} l={{ anterior: t.anterior, proximo: t.proximo }} />
      </div>
      <Fx2 />
    </>
  );
}
