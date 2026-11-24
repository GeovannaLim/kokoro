import Link from "next/link";
import { Fx2 } from "@/components/site2/Fx2";
import { HeroVideo } from "@/components/site2/HeroVideo";
import { getLang } from "@/lib/lang";
import { SITE2 } from "@/lib/site2-i18n";

export const metadata = { title: "Kokoro — saúde mental organizacional" };

export default async function Inicio() {
  const lang = await getLang();
  const h = SITE2[lang].home;
  const nav = SITE2[lang].nav;
  return (
    <>
      {/* 1 · abertura: vídeo em tela cheia, título grande com uma palavra pequena no meio */}
      <section className="c2-hero" id="topo">
        <HeroVideo pausar={nav.pausar} tocar={nav.tocar} />
        <div className="c2-hero__shade" aria-hidden />
        <h1 className="c2-hero__title">
          <span className="c2-line"><span>{h.h1a}</span> <small>{h.h1small}</small> <span>{h.h1b}</span></span>
          <span className="c2-line"><span>{h.h1c}</span></span>
        </h1>
        <div className="c2-hero__foot">
          <p>{h.lead}</p>
          <div className="c2-hero__ctas">
            <Link href="/plataforma" className="c2-btn c2-btn--light">{h.cta1}</Link>
            <a href="#recursos" className="c2-btn c2-btn--ghost">{h.cta2}</a>
          </div>
        </div>
      </section>

      <div className="c2-sheet">
      {/* 2 · manifesto */}
      <section className="c2-wrap c2-statement" id="conceito">
        <span className="c2-tag c2-reveal">{h.tag}</span>
        <p className="c2-statement__text c2-reveal">{h.statement}</p>
      </section>

      {/* 3 · foto grande com barra flutuante */}
      <section className="c2-wrap">
        <div className="c2-photo c2-reveal" data-zoom>
          <img src="/site2/conversa.webp" alt="" />
          <div className="c2-photo__bar">
            <span>{h.barra}</span>
            <span className="c2-photo__pills">{h.pills.map((p) => <span key={p}>{p}</span>)}</span>
          </div>
        </div>
      </section>

      {/* 4 · seção escura: lista fixa à esquerda, cards com as telas reais à direita */}
      <section className="c2-dark" id="recursos">
        <div className="c2-wrap c2-feat">
          <div className="c2-feat__side">
            <h2 className="c2-h2">{h.recursosTitulo}</h2>
            <nav className="c2-feat__list" aria-label={h.recursosTitulo}>
              {h.features.map((f, i) => <a key={f.n} href={`#f-${f.tela}`} data-feat-link={`f-${f.tela}`} className={i === 0 ? "is-on" : ""}>{f.nome}</a>)}
            </nav>
            <Link href="/plataforma" className="c2-btn c2-btn--light c2-btn--sm">{h.recursosBtn}</Link>
          </div>
          <div className="c2-feat__cards">
            {h.features.map((f) => (
              <article key={f.n} id={`f-${f.tela}`} data-feat className="c2-fcard c2-reveal">
                <p className="c2-fcard__n">{f.n}</p>
                <div className="c2-browser"><i /><i /><i /><img src={`/site2/telas/${f.tela}-${lang}.webp?v=refino`} alt={f.nome} loading="lazy" /></div>
                <h3 className="c2-fcard__title">{f.nome}</h3>
                <p className="c2-fcard__desc">{f.desc}</p>
                <ul className="c2-fcard__list">{f.itens.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · cena de cinema: foto em tela cheia, frase à direita, atalhos embaixo */}
      <section className="c2-cinema">
        <img className="c2-cinema__media" src="/site2/janela.webp" alt="" data-zoom />
        <div className="c2-cinema__shade" aria-hidden />
        <h2 className="c2-cinema__title c2-reveal">{h.cinema}</h2>
        <div className="c2-cinema__foot">
          <p>{h.comecar}</p>
          <div className="c2-cinema__pills">
            {h.features.map((f) => <Link key={f.n} href="/plataforma">{f.nome}</Link>)}
          </div>
        </div>
      </section>

      {/* 6 · perguntas frequentes */}
      <section className="c2-wrap c2-faq" id="perguntas">
        <div className="c2-faq__head c2-reveal">
          <span className="c2-tag c2-tag--box">{h.faqTag}</span>
          <h2 className="c2-h2"><span>{h.faqT1}</span><br /><span className="c2-muted">{h.faqT2}</span></h2>
        </div>
        <div className="c2-faq__list">
          {h.faq.map(([q, a], i) => (
            <details key={q} className="c2-faq__item c2-reveal" open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      </div>
      <Fx2 />
    </>
  );
}
