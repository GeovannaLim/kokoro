"use client";
import { useEffect, useRef, useState } from "react";

type Spec = { nome: string; linhas: [string, string][] };
type L = { titulo: string; pdf: string; pdfHref: string; cores: [string, string, string] };
const CORES = [
  { id: "sumi", c: "#111111" }, { id: "ai", c: "#22336b" }, { id: "shu", c: "#b5382c" },
] as const;

/** Especificações (abas que levam à seção e acompanham a rolagem) + galeria do Kokoro com seletor de cor. */
export function Specs({ specs, l }: { specs: Spec[]; l: L }) {
  const body = useRef<HTMLDivElement>(null);
  const [ativa, setAtiva] = useState(0);
  const [prog, setProg] = useState(0);
  const [cor, setCor] = useState<(typeof CORES)[number]["id"]>("shu");

  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const onScroll = () => {
      const secs = [...el.querySelectorAll<HTMLElement>("[data-sec]")];
      const y = el.scrollTop + 8;
      let i = 0;
      secs.forEach((s, k) => { if (s.offsetTop - el.offsetTop <= y) i = k; });
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) i = secs.length - 1;
      const s = secs[i], top = s.offsetTop - el.offsetTop, h = s.offsetHeight || 1;
      setAtiva(i);
      setProg(Math.max(0, Math.min(1, (y - top) / h)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const ir = (i: number) => {
    const el = body.current, s = el?.querySelectorAll<HTMLElement>("[data-sec]")[i];
    if (el && s) el.scrollTo({ top: s.offsetTop - el.offsetTop, behavior: "smooth" });
  };

  const linhas = (sp: Spec) => sp.linhas.map(([a, b]) => <div key={a} className="ks-specs__row"><div>{a}</div><div>{b}</div></div>);

  return (
    <div className="ks-wizard">
      <div className="ks-specs ks-reveal">
        <div className="ks-specs__head">
          <h2 className="h2">{l.titulo}</h2>
          <div className="ks-specs__tabs">
            {specs.map((s, i) => <button key={s.nome} type="button" aria-pressed={i === ativa} onClick={() => ir(i)}>{s.nome}</button>)}
          </div>
        </div>
        <div ref={body} className="ks-specs__body">
          {specs.map((s) => (
            <div key={s.nome} className="ks-specs__sec" data-sec>
              <p className="ks-specs__name">{s.nome}</p>
              <div>{linhas(s)}</div>
            </div>
          ))}
        </div>
        <div className="ks-specs__acc">
          {specs.map((s, i) => <details key={s.nome} open={i === 0}><summary>{s.nome}</summary>{linhas(s)}</details>)}
        </div>
        <div className="ks-specs__foot"><a className="btn" href={l.pdfHref} target="_blank" rel="noreferrer">{l.pdf}</a></div>
      </div>

      <div className="ks-gallery ks-reveal">
        <div className="ks-gallery__main">
          {CORES.map((k) => <img key={k.id} src={`/site/kokoro-${k.id}-flat.webp`} alt={k.id === cor ? "Kokoro" : ""} style={{ opacity: k.id === cor ? 1 : 0 }} />)}
          <div className="ks-progress" aria-hidden>
            {specs.map((s, i) => <i key={s.nome} className={i === ativa ? "on" : ""}><b style={{ "--f": `${i < ativa ? 100 : i === ativa ? Math.max(14, prog * 100) : 0}%` } as React.CSSProperties} /></i>)}
          </div>
          <div className="ks-picker" role="group">
            {CORES.map((k, i) => <button key={k.id} type="button" className="ks-color" aria-label={l.cores[i]} aria-pressed={k.id === cor} style={{ "--kk": k.c } as React.CSSProperties} onClick={() => setCor(k.id)} />)}
          </div>
        </div>
        <div className="ks-thumbs">
          {CORES.map((k, i) => <button key={k.id} type="button" aria-label={l.cores[i]} aria-pressed={k.id === cor} onClick={() => setCor(k.id)}><img src={`/site/kokoro-${k.id}-flat.webp`} alt="" /></button>)}
        </div>
      </div>
    </div>
  );
}
