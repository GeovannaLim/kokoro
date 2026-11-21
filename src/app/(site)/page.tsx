import Link from "next/link";
import { Title } from "@/components/site/Title";
import { SiteFx } from "@/components/site/SiteFx";
import { getLang } from "@/lib/lang";
import { SITE } from "@/lib/site-i18n";

export default async function Inicio() {
  const lang = await getLang();
  const t = SITE[lang].home;
  return (
    <>
      <section className="ks-hero wrap">
        <Title hero={t.hero} wide />
        <div className="ks-home__video ks-reveal" style={{ "--k": 0 } as React.CSSProperties}>
          <video className="ks-media" src={`/site/video/kokoro-dashboard-${lang}.mp4`} poster="/site/dash-hero.webp" autoPlay loop muted playsInline aria-label={t.hero.video} />
        </div>
      </section>

      <section className="ks-home__telas wrap">
        <h2 className="h5">{t.telas[0]}<br />{t.telas[1]}</h2>
        <div className="ks-bento">
          <div className="ks-bento__col">
            <div className="ks-card ks-card--red ks-b1 ks-reveal">
              <h3 className="h4">{t.dashboard[0]}</h3>
              <p className="desc" style={{ color: "rgba(255,255,255,.82)" }}>{t.dashboard[1]}</p>
              <div className="ks-b1__stamp"><span className="ks-stamp ks-stamp--square">指標</span></div>
            </div>
            <div className="ks-card ks-card--deep ks-bvid v1 ks-reveal">
              <video className="ks-media ks-media--ken" src="/site/video/kokoro-perfis.mp4" autoPlay loop muted playsInline aria-hidden />
              <div className="ks-tag">{t.perfis}</div>
            </div>
          </div>
          <div className="ks-bento__col">
            <div className="ks-card ks-card--paper ks-b2 ks-reveal">
              <h3 className="h4">{t.assistente}</h3>
              <img src="/site/kokoro-ai.webp" alt="" />
            </div>
            <div className="ks-card ks-card--sumi ks-b6 ks-reveal">
              <span className="ks-stamp ks-stamp--round">報</span>
              <h3 className="h4">{t.relatorio[0]}</h3>
              <p className="txt">{t.relatorio[1]}</p>
            </div>
          </div>
          <div className="ks-bento__col">
            <div className="ks-card ks-card--ai ks-b3 ks-reveal">
              <span className="ks-stamp ks-stamp--frame">匿名</span>
              <h3 className="h2">{t.pesquisa[0]}<br />{t.pesquisa[1]}</h3>
              <p className="desc" style={{ color: "rgba(255,255,255,.82)" }}>{t.pesquisa[2]}</p>
            </div>
            <div className="ks-card ks-card--deep ks-bvid v2 ks-reveal">
              <video className="ks-media ks-media--ken" style={{ animationDelay: "-8s" }} src="/site/video/kokoro-plano.mp4" autoPlay loop muted playsInline aria-hidden />
              <div className="ks-tag">{t.plano}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="ks-home__sobre wrap">
        <h2 className="h5">{t.sobreTitulo[0]}<br />{t.sobreTitulo[1]}</h2>
        <div className="ks-about">
          <div className="ks-about__left ks-reveal">
            <div className="ks-about__shape"><h3 className="h4">{t.feito[0]}<br />{t.feito[1]}</h3></div>
            <Link href="/sobre" className="btn">{t.sobreBtn}</Link>
          </div>
          <div className="ks-wave ks-reveal" style={{ "--k": 1 } as React.CSSProperties} aria-hidden>
            <img className="ks-wave__body" src="/site/kokoro-ai-body.webp" alt="" />
            <img className="ks-wave__arm" src="/site/kokoro-ai-arm.webp" alt="" />
          </div>
        </div>
      </section>
      <div className="ks-signature" role="img" aria-label="Kokoro" />
      <SiteFx />
    </>
  );
}
