import { Suspense, type ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { getLang } from "@/lib/lang";
import { SITE } from "@/lib/site-i18n";
import "./site.css";

async function Nav() {
  const lang = await getLang();
  return <SiteNav lang={lang} l={SITE[lang].nav} />;
}
async function Footer() {
  const lang = await getLang();
  return <SiteFooter l={SITE[lang].footer} />;
}

/** Site institucional (Início, Produto, Sobre nós). A plataforma fica em /plataforma, com layout próprio. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ks">
      <Suspense fallback={null}><Nav /></Suspense>
      <main>
        <Suspense fallback={<div style={{ height: "100vh" }} />}>{children}</Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}
