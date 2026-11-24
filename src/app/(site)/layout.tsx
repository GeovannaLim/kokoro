import { Suspense, type ReactNode } from "react";
import { Footer2 } from "@/components/site2/Footer2";
import { Nav2 } from "@/components/site2/Nav2";
import { getLang } from "@/lib/lang";
import { SITE } from "@/lib/site-i18n";
import { SITE2 } from "@/lib/site2-i18n";
import "./c2.css";

async function Nav() {
  const lang = await getLang();
  return <Nav2 lang={lang} l={SITE2[lang].nav} inicio={SITE[lang].nav.inicio} />;
}
async function Footer() {
  const lang = await getLang();
  const s = SITE2[lang];
  return <Footer2 f={s.footer} fim={[s.home.fim1, s.home.fim2]} nav={s.nav} inicio={SITE[lang].nav.inicio} />;
}

/** Site institucional, identidade 2 (estética Costura Inovadora). A plataforma fica em /plataforma. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="c2">
      <Suspense fallback={null}><Nav /></Suspense>
      <main>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>{children}</Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}
