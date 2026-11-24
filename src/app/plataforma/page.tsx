import Link from "next/link";
import { KkCard } from "@/components/kk/Brand";
import { AreaMap, QuestionBars } from "@/components/kk/Charts";
import { CAT, SERIES } from "@/lib/colors";
import { CountUp, Reveal } from "@/components/kk/Motion";
import type { Grupo, Idx } from "@/lib/analytics";
import { getDadosEmpresa } from "@/lib/data";
import { LOCALE, PERFIS, t, tq, tv, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { RISCO_TXT, risco, type Risco } from "@/lib/plano";
import { Saudacao } from "./Saudacao";
import { Enso } from "@/components/kk/Pincel";
import "./dash.css";

const INDICES = ["apoio", "estigma", "abertura"] as const;
const COR_PERFIL = CAT;

/** Textos só desta tela (identidade 2, estilo do painel da Costura Inovadora). */
const L: Record<Lang, Record<string, string>> = {
  pt: { frase1: "tem", resp: "respostas", e: "e", prio: "como área prioritária", respostas: "Respostas", areas: "áreas", ref: "Referência OSMI", melhor: "melhor", pior: "pior", porArea: "Índices por área", porAreaD: "De 0 a 100, em cada área da empresa.", perfis: "Perfis de equipe", perfisD: "Agrupamento K-means da equipe toda.", verPerfis: "Ver perfis →", pessoas: "pessoas", tabela: "Áreas", tabelaD: "Recortes com 5 pessoas ou mais.", verPlano: "Ver plano de ação →", area: "Área", risco: "Risco", prioridade: "Prioridade" },
  en: { frase1: "has", resp: "responses", e: "and", prio: "as the priority area", respostas: "Responses", areas: "areas", ref: "OSMI reference", melhor: "better", pior: "worse", porArea: "Indexes by area", porAreaD: "From 0 to 100, in each area of the company.", perfis: "Team profiles", perfisD: "K-means clustering of the whole team.", verPerfis: "See profiles →", pessoas: "people", tabela: "Areas", tabelaD: "Breakdowns with 5 or more people.", verPlano: "See action plan →", area: "Area", risco: "Risk", prioridade: "Priority" },
  es: { frase1: "tiene", resp: "respuestas", e: "y", prio: "como área prioritaria", respostas: "Respuestas", areas: "áreas", ref: "Referencia OSMI", melhor: "mejor", pior: "peor", porArea: "Índices por área", porAreaD: "De 0 a 100, en cada área de la empresa.", perfis: "Perfiles de equipo", perfisD: "Agrupamiento K-means de todo el equipo.", verPerfis: "Ver perfiles →", pessoas: "personas", tabela: "Áreas", tabelaD: "Desgloses con 5 personas o más.", verPlano: "Ver plan de acción →", area: "Área", risco: "Riesgo", prioridade: "Prioridad" },
};
const TIT: Record<Lang, Record<string, string>> = {"pt": {"porAreaT": "{area}: onde o estigma mais pesa", "porAreaD2": "Apoio, estigma e abertura de 0 a 100, em cada área.", "perfisT": "{pct}% da equipe ainda não fala", "perfisD2": "Três perfis que o K-means encontrou na equipe toda.", "tabelaT": "Por onde começar", "tabelaD2": "Áreas em ordem de risco. Recortes com 5 pessoas ou mais.", "mapaT": "Onde é seguro falar", "mapaD": "Estigma × abertura de cada área, com a referência da OSMI.", "ver": "Ver mapa", "ver16": "Ver as 16 perguntas", "fechar": "Fechar", "pergT": "A pergunta que mais preocupa", "pergD": "Média de cada pergunta, de 0 a 100. Passe o mouse para ler a pergunta inteira."}, "en": {"porAreaT": "{area}: where stigma weighs most", "porAreaD2": "Support, stigma and openness from 0 to 100, in each area.", "perfisT": "{pct}% of the team still doesn't speak up", "perfisD2": "Three profiles K-means found across the whole team.", "tabelaT": "Where to start", "tabelaD2": "Areas ranked by risk. Breakdowns with 5 or more people.", "mapaT": "Where it's safe to speak", "mapaD": "Stigma × openness for each area, against the OSMI reference.", "ver": "See map", "ver16": "See all 16 questions", "fechar": "Close", "pergT": "The question that worries most", "pergD": "Average of each question, from 0 to 100. Hover to read the full question."}, "es": {"porAreaT": "{area}: donde el estigma más pesa", "porAreaD2": "Apoyo, estigma y apertura de 0 a 100, en cada área.", "perfisT": "El {pct}% del equipo aún no habla", "perfisD2": "Tres perfiles que el K-means encontró en todo el equipo.", "tabelaT": "Por dónde empezar", "tabelaD2": "Áreas en orden de riesgo. Desgloses con 5 personas o más.", "mapaT": "Dónde es seguro hablar", "mapaD": "Estigma × apertura de cada área, con la referencia de la OSMI.", "ver": "Ver mapa", "ver16": "Ver las 16 preguntas", "fechar": "Cerrar", "pergT": "La pregunta que más preocupa", "pergD": "Promedio de cada pregunta, de 0 a 100. Pasa el mouse para leerla entera."}};
const ORDEM: Record<Risco, number> = { baixo: 0, moderado: 1, alto: 2 };

export default async function Dashboard() {
  const [lang, data] = await Promise.all([getLang(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const x = L[lang];
  const y = TIT[lang];
  const fmt = (n: number) => n.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const total = data.total as Grupo;
  const ref = data.referencia_osmi.indices as Idx;
  const areas = Object.entries(data.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto && g.indices);
  const prioridade = [...areas].sort((a, b) => (b[1].indices!.estigma - b[1].indices!.abertura) - (a[1].indices!.estigma - a[1].indices!.abertura))[0]?.[0];
  const empresa = tv(lang, data.empresa).replace(/\.$/, "");
  const perfis = data.perfis_def.map((p, i) => {
    const pct = (total.perfis as Record<string, number>)[p.id];
    return { id: p.id, nome: PERFIS[p.id]?.nome[lang] ?? p.nome, pct, n: Math.round((pct * total.n) / 100), cor: COR_PERFIL[i] };
  });
  const pior = [...data.perguntas]
    .map((q) => ({ q, media: q.id === "abertura_observou" ? 100 - q.media : q.media }))
    .map((o) => ({ ...o, risco: o.q.indice === "estigma" ? o.media : 100 - o.media }))
    .sort((a, b) => b.risco - a.risco)
    .map((o) => ({ texto: o.q.id === "abertura_observou" ? t(lang, "observou_inv") : tq(lang, o.q.id, o.q.texto), media: o.media }))[0];
  const piorRisco = (g: Grupo): Risco => INDICES.map((k) => risco(k, g.indices![k])).sort((a, b) => ORDEM[b] - ORDEM[a])[0];

  return (
    <div className="db pt-8 sm:pt-10">
      {/* boas-vindas: foto com zoom lento e feixe de luz */}
      <section className="db-brand kk-abertura">
        <span className="db-brand__luz" aria-hidden />
        <div className="db-welcome">
          <Saudacao lang={lang} locale={loc} />
          <p>
            {empresa} {x.frase1} <strong>{total.n.toLocaleString(loc)} {x.resp}</strong>
            {prioridade && <> {x.e} <strong>{tv(lang, prioridade)}</strong> {x.prio}</>}.
          </p>
        </div>
      </section>

      {/* indicadores */}
      <section className="db-ind" aria-label={t(lang, "dash_l1")}>
        <Link href="/plataforma/pesquisa" data-luz className="db-card db-ind__item db-ind__item--big">
          <span className="db-ind__rot">{x.respostas}</span>
          <strong className="db-ind__val"><CountUp value={total.n} locale={loc} /></strong>
          <span className="db-ind__nota">{areas.length} {x.areas} · {data.periodo}</span>
        </Link>
        {INDICES.map((k) => {
          const v = total.indices![k], r = ref[k], d = v - r;
          const bom = k === "estigma" ? d <= 0 : d >= 0;
          return (
            <div key={k} data-luz className="db-card db-ind__item">
              <span className="db-ind__rot"><i style={{ background: SERIES[k] }} />{t(lang, k)}</span>
              <strong className="db-ind__val"><CountUp value={v} decimals={1} locale={loc} /></strong>
              <span className="db-ind__nota">{x.ref} {fmt(r)} · <b className={bom ? "" : "db-neg"}>{d >= 0 ? "+" : ""}{fmt(d)}</b> {bom ? x.melhor : x.pior}</span>
            </div>
          );
        })}
      </section>

      <div className="db-graf">
        {/* colunas agrupadas: 3 índices por área */}
        <section data-luz className="db-card db-g">
          <div className="db-g__topo">
            <div><h3>{prioridade ? y.porAreaT.replace("{area}", tv(lang, prioridade)) : x.porArea}</h3><p>{y.porAreaD2}</p></div>
            <ul className="db-g__leg">{INDICES.map((k) => <li key={k}><i style={{ background: SERIES[k] }} />{t(lang, k)}</li>)}</ul>
          </div>
          <div className="db-col-scroll"><div className="db-col" role="img" aria-label={`${x.porArea}: ${areas.map(([n, g]) => `${tv(lang, n)} ${INDICES.map((k) => `${t(lang, k)} ${fmt(g.indices![k])}`).join(", ")}`).join("; ")}`}>
            <div className="db-col__grade" aria-hidden><span style={{ "--y": "100%" } as React.CSSProperties}>100</span><span style={{ "--y": "50%" } as React.CSSProperties}>50</span><span style={{ "--y": "0%" } as React.CSSProperties}>0</span></div>
            <div className="db-col__area" style={{ gridTemplateColumns: `repeat(${areas.length}, 1fr)` }}>
              {areas.map(([nome, g], i) => (
                <div key={nome} className={`db-col__grupo${nome === prioridade ? " is-prio" : ""}`} tabIndex={0}>
                  <div className="db-col__trilho">
                    {INDICES.map((k, j) => <div key={k} className="db-col__barra" style={{ "--h": `${g.indices![k]}%`, "--i": i * 3 + j, background: SERIES[k] } as React.CSSProperties} />)}
                  </div>
                  <span className="db-col__nome">{tv(lang, nome)}</span>
                  <span className="db-dica" role="tooltip"><strong>{tv(lang, nome)} · {g.n} {x.pessoas}</strong>{INDICES.map((k) => `${t(lang, k)} ${fmt(g.indices![k])}`).join(" · ")}</span>
                </div>
              ))}
            </div>
          </div></div>
        </section>

        {/* pilha: perfis de equipe */}
        <section data-luz className="db-card db-g">
          <div className="db-g__topo">
            <div><h3>{y.perfisT.replace("{pct}", Math.round(perfis[2]?.pct ?? 0).toString())}</h3><p>{y.perfisD2}</p></div>
            <Link href="/plataforma/perfis" className="db-g__link">{x.verPerfis}</Link>
          </div>
          <div className="db-total"><strong>{total.n.toLocaleString(loc)}</strong><span>{x.pessoas}</span></div>
          <div className="db-pilha" role="img" aria-label={perfis.map((p) => `${p.nome} ${fmt(p.pct)}%`).join(", ")}>
            {perfis.map((p, i) => (
              <div key={p.id} className="db-pilha__parte" tabIndex={0} style={{ "--w": `${p.pct}%`, "--i": i, background: p.cor } as React.CSSProperties}>
                <span className="db-dica" role="tooltip"><strong>{p.nome}</strong>{p.n} {x.pessoas} · {fmt(p.pct)}%</span>
              </div>
            ))}
          </div>
          <ul className="db-leg">
            {perfis.map((p) => (
              <li key={p.id}><i style={{ background: p.cor }} /><span className="db-leg__nome">{p.nome}</span><span className="db-leg__val">{p.n}</span><span className="db-leg__pct">{Math.round(p.pct)}%</span></li>
            ))}
          </ul>
        </section>
      </div>

      {/* tabela de áreas, como "pedidos recentes" */}
      <section data-luz className="db-card db-tab" id="areas">
        <div className="db-tab__topo">
          <div><h3>{y.tabelaT}</h3><p>{y.tabelaD2}</p></div>
          <Link href="/plataforma/plano">{x.verPlano}</Link>
        </div>
        <div className="db-tab__scroll">
          <table>
            <thead><tr><th>{x.area}</th><th>{x.pessoas}</th>{INDICES.map((k) => <th key={k} className="db-col-idx">{t(lang, k)}</th>)}<th>{x.risco}</th></tr></thead>
            <tbody>
              {[...areas].sort((a, b) => ORDEM[piorRisco(b[1])] - ORDEM[piorRisco(a[1])] || b[1].indices!.estigma - a[1].indices!.estigma).map(([nome, g]) => {
                const r = piorRisco(g);
                return (
                  <tr key={nome}>
                    <td className="db-tab__area">{nome === prioridade ? <span className="relative inline-block px-1">{tv(lang, nome)}<Enso className="absolute top-[-9px] left-[-14px] h-[calc(100%+18px)] w-[calc(100%+28px)] text-[#a9822a]" delay={0.9} /></span> : tv(lang, nome)}{nome === prioridade && <span className="db-flag">{x.prioridade}</span>}</td>
                    <td>{g.n}</td>
                    {INDICES.map((k) => <td key={k} className="db-col-idx tabular-nums">{fmt(g.indices![k])}</td>)}
                    <td><span className={`db-badge db-badge--${r}`}>{RISCO_TXT[r][lang]}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* mapa das áreas */}
      <Reveal className="mt-4">
        <KkCard tone="washi" className="p-6 sm:p-8">
          <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <div><h3 className="text-[19px] font-semibold tracking-tight">{y.mapaT}</h3><p className="mt-1 text-[13px] text-stone">{y.mapaD}</p></div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-sumi/12 bg-white/60 px-3.5 py-2 text-[13px] font-medium text-sumi-soft transition group-open:bg-sumi group-open:text-washi"><span className="group-open:hidden">{y.ver}</span><span className="hidden group-open:inline">{y.fechar}</span><i aria-hidden className="not-italic transition-transform duration-300 group-open:rotate-45">+</i></span>
          </summary>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">
            <div>
              <div>
                <AreaMap
                  refPoint={{ x: ref.estigma, y: ref.abertura }}
                  labels={{ seguro: t(lang, "seguro"), prioridade: t(lang, "prioridade"), x: t(lang, "eixo_estigma"), y: t(lang, "eixo_abertura"), refName: "OSMI" }}
                  points={areas.map(([nome, g]) => ({
                    label: tv(lang, nome), x: g.indices!.estigma, y: g.indices!.abertura, n: g.n,
                    detail: <><b className="font-medium">{tv(lang, nome)}</b> · {g.n} {t(lang, "pessoas")}<br />{t(lang, "apoio")} {fmt(g.indices!.apoio)} · {t(lang, "estigma")} {fmt(g.indices!.estigma)} · {t(lang, "abertura")} {fmt(g.indices!.abertura)}</>,
                  }))}
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-sumi-soft lg:pt-6">{t(lang, "mapa_desc")}</p>
          </div>
          </details>
        </KkCard>
      </Reveal>

      {/* as 16 perguntas */}
      <Reveal className="mt-4">
        <KkCard tone="washi" className="p-6 sm:p-8">
          <details className="group">
          <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <div>
              <h3 className="text-[19px] font-semibold tracking-tight">{y.pergT}</h3>
              {pior && <p className="mt-1 max-w-[70ch] text-[15px] text-sumi-soft">“{pior.texto}” <span className="ml-1 rounded-md bg-[#c9a24a]/20 px-1.5 py-0.5 text-[12px] font-semibold text-[#6f5714] tabular-nums">{fmt(pior.media)}</span></p>}
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-sumi/12 bg-white/60 px-3.5 py-2 text-[13px] font-medium text-sumi-soft transition group-open:bg-sumi group-open:text-washi"><span className="group-open:hidden">{y.ver16}</span><span className="hidden group-open:inline">{y.fechar}</span><i aria-hidden className="not-italic transition-transform duration-300 group-open:rotate-45">+</i></span>
          </summary>
          <p className="mt-6 text-[13px] text-stone">{y.pergD}</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-3">
            {INDICES.map((k) => (
              <QuestionBars key={k} title={t(lang, k)} color={SERIES[k]} locale={loc}
                rows={data.perguntas.filter((q) => q.indice === k).map((q) => q.id === "abertura_observou"
                  ? { texto: t(lang, "observou_inv"), media: Math.round((100 - q.media) * 10) / 10 }
                  : { texto: tq(lang, q.id, q.texto), media: q.media })} />
            ))}
          </div>
          </details>
        </KkCard>
      </Reveal>
    </div>
  );
}
