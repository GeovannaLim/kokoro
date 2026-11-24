"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveLang } from "@/components/kk/LangPills";
import { LANGS, type Lang } from "@/lib/i18n";
import type { Site2 } from "@/lib/site2-i18n";

/** Grava o idioma (mesmo cookie da plataforma) e ajusta o lang da página. */
function aplicaIdioma(x: Lang) {
  saveLang(x);
  document.documentElement.lang = x === "pt" ? "pt-BR" : x;
}

/** Menu flutuante em pílula (estética Costura): logo, links e "Começar"; idiomas numa pílula à parte. */
export function Nav2({ lang, l, inicio }: { lang: Lang; l: Site2["nav"]; inicio: string }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const links: [string, string][] = [["/", inicio], ["/produto", l.produto], ["/sobre", l.sobre]];
  const pick = (x: Lang) => { aplicaIdioma(x); router.refresh(); };
  return (
    <>
      <nav className={`c2-nav${solid ? " is-solid" : ""}`} aria-label="Kokoro">
        <div className="c2-nav__pill">
          <Link href="/" className="c2-nav__logo" aria-label="Kokoro"><img src="/brand/logo-kokoro-fino.png" alt="" width={1168} height={187} /></Link>
          <div className="c2-nav__links">
            {links.map(([h, t]) => <Link key={h} href={h} aria-current={path === h ? "page" : undefined}>{t}</Link>)}
          </div>
          <Link href="/plataforma" className="c2-btn c2-btn--dark c2-btn--sm">{l.comecar}</Link>
          <button type="button" className="c2-burger" aria-expanded={open} aria-controls="c2-menu" aria-label={open ? l.fechar : l.menu} onClick={() => setOpen((o) => !o)}><i /><i /></button>
        </div>
        <div className="c2-lang" role="group" aria-label={l.idioma}>
          {LANGS.map((x) => <button key={x} type="button" aria-pressed={x === lang} onClick={() => pick(x)}>{x.toUpperCase()}</button>)}
        </div>
      </nav>
      <div id="c2-menu" className={`c2-menu${open ? " is-open" : ""}`} inert={!open}>
        {links.map(([h, t]) => <Link key={h} href={h} onClick={() => setOpen(false)} aria-current={path === h ? "page" : undefined}>{t}</Link>)}
        <div className="c2-menu__lang">
          {LANGS.map((x) => <button key={x} type="button" aria-pressed={x === lang} onClick={() => { pick(x); setOpen(false); }}>{x.toUpperCase()}</button>)}
        </div>
      </div>
    </>
  );
}
