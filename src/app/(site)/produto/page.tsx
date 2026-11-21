import { Slides } from "@/components/site/Slides";
import { Specs } from "@/components/site/Specs";
import { Count, Title } from "@/components/site/Title";
import { LOCALE } from "@/lib/i18n";
import { SiteFx } from "@/components/site/SiteFx";
import { getLang } from "@/lib/lang";
import { GITHUB, SITE } from "@/lib/site-i18n";

export const metadata = { title: "Produto | Kokoro — saúde mental organizacional" };

export default async function Produto() {
  const lang = await getLang();
  const t = SITE[lang].produto;
  const loc = LOCALE[lang];
  return (
    <>
      <section className="ks-hero wrap">
        <Title hero={t.hero} />
        <Specs specs={t.specs} l={{ titulo: t.specsTitulo, pdf: t.pdf, pdfHref: t.pdfHref, cores: t.cores }} />
      </section>

      <section className="wrap">
        <div className="ks-pbento">
          <div className="ks-card ks-card--ai ks-p1 ks-reveal">
            <div className="ks-p1__head">
              <span className="ks-stamp ks-stamp--seal ks-stamp--keep">検証済</span><span className="ring" />
              <h3 className="h4">{t.acuracia[0]}</h3>
              <p className="txt">{t.acuracia[1]}</p>
            </div>
            <div className="ks-code">
              {t.metricas.map(([a, b, v]) => (
                <p key={a}><span>{a}</span><b><Count to={v} dec={3} locale={loc} /></b><i className="ks-bar" style={{ "--v": v } as React.CSSProperties} /></p>
              ))}
              {t.ficha.map(([a, b]) => <p key={a}><span>{a}</span>{b}</p>)}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="ks-card ks-card--sumi ks-p2 ks-reveal">
              <h3 className="h4">{t.modelos[0]}</h3>
              <p className="txt">{t.modelos[1]}</p>
              <span className="ks-stamp ks-stamp--frame ks-stamp--tall">分析</span>
            </div>
            <div className="ks-card ks-p3 ks-reveal">
              <img className="ks-media ks-media--ken" src={`/site/dash-${lang}.webp`} alt="" />
              <div className="ks-tag">{t.stack}</div>
            </div>
          </div>
          <div className="ks-card ks-card--red ks-card--waves ks-card--waves-top ks-p4 ks-reveal">
            <h3 className="h4">{t.codigo[0]}</h3>
            <p className="txt">{t.codigo[1]}</p>
            <a className="txt" href={GITHUB} target="_blank" rel="noreferrer">github.com/GeovannaLim/kokoro</a>
            <div className="ks-arch"><video src="/site/video/kokoro-codigo.mp4" autoPlay loop muted playsInline aria-hidden /></div>
          </div>
        </div>
      </section>

      <Slides lang={lang} titulo={t.apresentacao} alts={t.slidesAlt} l={{ anterior: t.anterior, proximo: t.proximo }} />
      <div className="ks-signature" role="img" aria-label="Kokoro" />
      <SiteFx />
    </>
  );
}
