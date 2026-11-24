import Link from "next/link";
import { CONTATO, GITHUB } from "@/lib/site-i18n";
import type { Site2 } from "@/lib/site2-i18n";

/** Fecho de todas as páginas: frase gigante em dois tons e o rodapé escuro em cartão. */
export function Footer2({ f, fim, nav, inicio }: { f: Site2["footer"]; fim: [string, string]; nav: Site2["nav"]; inicio: string }) {
  return (
    <>
      <p className="c2-giant c2-reveal" aria-hidden><span>{fim[0]}</span> <span>{fim[1]}</span></p>
      <footer className="c2-footer">
        <div className="c2-footer__card">
          <div className="c2-footer__grid">
            <div>
              <img className="c2-footer__logo" src="/brand/logo-kokoro-fino.png" alt="Kokoro" width={1168} height={187} />
              <p className="c2-footer__slogan">{f.slogan}</p>
              <Link href="/plataforma" className="c2-btn c2-btn--light c2-btn--sm">{f.acessar}</Link>
            </div>
            <div>
              <p className="c2-footer__label">{f.navegacao}</p>
              <ul>
                <li><Link href="/">{inicio}</Link></li>
                <li><Link href="/produto">{nav.produto}</Link></li>
                <li><Link href="/sobre">{nav.sobre}</Link></li>
                <li><Link href="/plataforma">{nav.comecar}</Link></li>
              </ul>
            </div>
            <div>
              <p className="c2-footer__label">{f.creditos}</p>
              <ul>{f.creditosLista.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
          <div className="c2-footer__bottom">
            <span>{f.direitos} · <a href={`mailto:${CONTATO}`}>{CONTATO}</a> · <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></span>
            <span>{f.cvv}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
