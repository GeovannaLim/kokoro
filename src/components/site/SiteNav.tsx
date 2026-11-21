"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveLang } from "@/components/kk/LangPills";
import { LANGS, type Lang } from "@/lib/i18n";

/** Grava o idioma (mesmo cookie da plataforma) e ajusta o lang da página. */
function aplicaIdioma(x: Lang) {
  saveLang(x);
  document.documentElement.lang = x === "pt" ? "pt-BR" : x;
}

type L = { inicio: string; produto: string; sobre: string; comecar: string; menu: string; fechar: string; idioma: string };

/** Cabeçalho do site: logo a pincel, menu em pílula, idiomas e "Começar". No celular, menu hambúrguer. */
export function SiteNav({ lang, l }: { lang: Lang; l: L }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const links: [string, string][] = [["/", l.inicio], ["/produto", l.produto], ["/sobre", l.sobre]];
  const pick = (x: Lang) => { aplicaIdioma(x); router.refresh(); };
  return (
    <>
      <nav className="ks-nav" aria-label="Kokoro">
        <Link href="/" className="ks-logo" aria-label="Kokoro" />
        <div className="ks-nav__right">
          <div className="ks-nav__links">
            {links.map(([h, t]) => <Link key={h} href={h} aria-current={path === h ? "page" : undefined}>{t}</Link>)}
          </div>
          <div className="ks-lang" role="group" aria-label={l.idioma}>
            {LANGS.map((x) => <button key={x} type="button" aria-pressed={x === lang} onClick={() => pick(x)}>{x.toUpperCase()}</button>)}
          </div>
          <Link href="/plataforma" className="btn">{l.comecar}</Link>
          <button type="button" className="ks-burger" aria-expanded={open} aria-controls="ks-menu" aria-label={open ? l.fechar : l.menu} onClick={() => setOpen((o) => !o)}><span><i /><i /></span></button>
        </div>
      </nav>
      <div id="ks-menu" className={`ks-menu${open ? " is-open" : ""}`} inert={!open}>
        {links.map(([h, t]) => <Link key={h} href={h} onClick={() => setOpen(false)} aria-current={path === h ? "page" : undefined}>{t}</Link>)}
        <Link href="/plataforma" className="btn" onClick={() => setOpen(false)}>{l.comecar}</Link>
      </div>
    </>
  );
}
