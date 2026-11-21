import { Count, Title, Words } from "@/components/site/Title";
import { LOCALE } from "@/lib/i18n";
import { SiteFx } from "@/components/site/SiteFx";
import { getLang } from "@/lib/lang";
import { SITE } from "@/lib/site-i18n";

export const metadata = { title: "Sobre nós | Kokoro — saúde mental organizacional" };

export default async function Sobre() {
  const lang = await getLang();
  const t = SITE[lang].sobre;
  const loc = LOCALE[lang];
  return (
    <>
      <section className="ks-hero wrap"><Title hero={t.hero} /></section>
      <section className="ks-sobre">
        <div className="ks-sbento">
          <div className="ks-sc ks-sc--red ks-s1 ks-reveal">
            <p className="h4">{t.nasceu[0]} <Count to={1433} locale={loc} /> {t.nasceu[1]}</p>
          </div>
          <div className="ks-sc ks-sc--white ks-s2 ks-reveal">
            <p className="h2">{t.acreditamos}</p>
            <p className="h4">{t.maioria[0]} <Count to={70.9} dec={1} suffix="%" locale={loc} /> {t.maioria[1]}</p>
          </div>
        </div>
        <div className="ks-sc ks-sc--ai ks-mission ks-reveal ks-split"><p><Words text={t.missao} /></p></div>
        <div className="ks-sbento2">
          <div className="ks-sc ks-sc--grey ks-reveal">
            <div className="ks-hop" aria-hidden><span /><img src="/site/kokoro-sumi-flat.webp" alt="" /></div>
          </div>
          <div className="ks-sc ks-sc--sumi ks-reveal ks-split"><p className="h2"><Words text={t.criamos} /></p></div>
          <div className="ks-sc ks-sc--red ks-card--waves ks-card--waves-bottom ks-s5 ks-reveal"><p className="h4">{t.reune}</p></div>
        </div>
      </section>
      <div className="ks-signature" role="img" aria-label="Kokoro" />
      <SiteFx />
    </>
  );
}
