import Link from "next/link";
import { CONTATO, GITHUB } from "@/lib/site-i18n";

type L = { titulo: [string, string]; produto: string; sobre: string; comecar: string; cvv: string };

/** Rodapé com as ondas seigaiha do cachecol do Kokoro deslizando devagar. */
export function SiteFooter({ l }: { l: L }) {
  return (
    <footer className="ks-footer">
      <div className="ks-footer__box">
        <div className="ks-footer__row">
          <h2 className="ks-footer__title">{l.titulo[0]}<br />{l.titulo[1]}</h2>
          <ul className="ks-footer__links">
            <li><Link href="/produto">{l.produto}</Link></li>
            <li><Link href="/sobre">{l.sobre}</Link></li>
            <li><Link href="/plataforma" className="u">{l.comecar}</Link></li>
          </ul>
        </div>
        <div className="ks-footer__bottom">
          <span>© 2026 Kokoro · <a href={`mailto:${CONTATO}`}>{CONTATO}</a> · <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></span>
          <span>{l.cvv}</span>
        </div>
      </div>
    </footer>
  );
}
