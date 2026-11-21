/** Assistente Kokoro: contexto com dados AGREGADOS da empresa (nunca respostas individuais)
 *  e respostas de demonstração para quando não há chave de IA configurada. */
import type { DadosEmpresa, Grupo } from "./analytics";
import { PERFIS, tv, type Lang } from "./i18n";
import { DONO, FATOR, RISCO_TXT, montarPlano, prioridades, risco, type Indice } from "./plano";

const IND: Indice[] = ["apoio", "estigma", "abertura"];
const NOME_IND: Record<Indice, Record<Lang, string>> = {
  apoio: { pt: "apoio", en: "support", es: "apoyo" },
  estigma: { pt: "estigma", en: "stigma", es: "estigma" },
  abertura: { pt: "abertura", en: "openness", es: "apertura" },
};
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Resumo compacto que vai para o modelo. Só agregados, grupos com 5+ pessoas. */
export function contexto(d: DadosEmpresa, lang: Lang) {
  const total = d.total as Grupo;
  const grupos = (g: Record<string, Grupo>) => Object.fromEntries(Object.entries(g).filter(([, x]) => !x.oculto && x.indices)
    .map(([k, x]) => [tv(lang, k), { pessoas: x.n, ...Object.fromEntries(IND.map((i) => [i, r1(x.indices![i])])) }]));
  return {
    empresa: tv(lang, d.empresa), respostas: total.n, periodo: d.periodo, dados_sinteticos: d.sintetico,
    escala: "0 a 100. Apoio e abertura: maior é melhor. Estigma: maior é pior.",
    indices_empresa: Object.fromEntries(IND.map((i) => [i, { valor: r1(total.indices![i]), risco: RISCO_TXT[risco(i, total.indices![i])][lang], referencia_osmi: r1((d.referencia_osmi.indices as Record<string, number>)[i]) }])),
    perfis: Object.fromEntries(d.perfis_def.map((p) => [PERFIS[p.id]?.nome[lang] ?? p.nome, { percentual: r1((total.perfis as Record<string, number>)[p.id]), descricao: PERFIS[p.id]?.descricao[lang] }])),
    por_area: grupos(d.areas as Record<string, Grupo>),
    por_tempo_de_casa: grupos(d.tempo_casa as Record<string, Grupo>),
    por_modelo_de_trabalho: grupos(d.modelo as Record<string, Grupo>),
    areas_prioritarias: prioridades(d).slice(0, 3).map((p) => tv(lang, p.nome)),
    perguntas: d.perguntas.map((q) => ({ indice: q.indice, pergunta: q.texto, media: r1(q.media) })),
    plano_de_acao: montarPlano(d).map((a) => ({ prazo_dias: a.prazo, acao: a.titulo[lang].replace("{area}", tv(lang, a.area ?? "")), como: a.como[lang], responsavel: DONO[a.dono][lang], fator: FATOR[a.indice][lang] })),
  };
}

const IDIOMA: Record<Lang, string> = { pt: "português do Brasil", en: "English", es: "español" };

export function sistema(d: DadosEmpresa, lang: Lang) {
  return `Você é o Kokoro, assistente de cultura e saúde mental organizacional de uma plataforma usada pelo RH.
Responda SEMPRE em ${IDIOMA[lang]}.

Regras:
- Use apenas os dados agregados abaixo. Cite números quando ajudar. Se a resposta não estiver nos dados, diga isso.
- Nunca faça diagnóstico, nunca tente identificar pessoas e nunca fale de grupos com menos de 5 pessoas (eles não aparecem nos dados).
- Seja breve: até 3 parágrafos curtos ou uma lista curta. Texto simples, sem markdown, sem asteriscos e sem títulos.
- Tom acolhedor e prático, para quem trabalha com pessoas. Sugira ações concretas, de preferência as do plano de ação.
- Se alguém relatar sofrimento ou risco agora, oriente a procurar ajuda: no Brasil, CVV 188 (24h, gratuito) ou SAMU 192.

Dados da empresa (JSON):
${JSON.stringify(contexto(d, lang))}`;
}

/** Sem chave de IA: respostas montadas direto dos números, para a demo nunca ficar muda. */
export function respostaDemo(d: DadosEmpresa, lang: Lang, pergunta: string) {
  const q = pergunta.toLowerCase();
  const prio = prioridades(d);
  const plano = montarPlano(d);
  const fmt = (n: number) => r1(n).toLocaleString(lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR");
  const area = prio.find((p) => q.includes(p.nome.toLowerCase()) || q.includes(tv(lang, p.nome).toLowerCase()));
  const nota = { pt: "(Modo demonstração: resposta montada direto dos números.)", en: "(Demo mode: answer built straight from the numbers.)", es: "(Modo demostración: respuesta armada directamente con los números.)" }[lang];

  if (area) {
    const i = area.g.indices!;
    const pior = IND.map((k) => ({ k, gap: k === "estigma" ? i[k] : 100 - i[k] })).sort((a, b) => b.gap - a.gap)[0].k;
    const acao = plano.find((a) => a.area === area.nome) ?? plano.find((a) => a.indice === pior);
    const nome = tv(lang, area.nome);
    const t = {
      pt: `Em ${nome} (${area.g.n} pessoas), apoio está em ${fmt(i.apoio)}, estigma em ${fmt(i.estigma)} e abertura em ${fmt(i.abertura)}. O ponto mais sensível é ${NOME_IND[pior].pt}.`,
      en: `In ${nome} (${area.g.n} people), support is ${fmt(i.apoio)}, stigma ${fmt(i.estigma)} and openness ${fmt(i.abertura)}. The most sensitive point is ${NOME_IND[pior].en}.`,
      es: `En ${nome} (${area.g.n} personas), el apoyo está en ${fmt(i.apoio)}, el estigma en ${fmt(i.estigma)} y la apertura en ${fmt(i.abertura)}. El punto más sensible es ${NOME_IND[pior].es}.`,
    }[lang];
    const a = acao ? `\n\n${acao.titulo[lang].replace("{area}", nome)}: ${acao.como[lang].charAt(0).toLowerCase()}${acao.como[lang].slice(1)}` : "";
    return `${t}${a}\n\n${nota}`;
  }

  if (/plano|plan|come[cç]|empiez|start|primeir|first/.test(q)) {
    const it = plano.filter((a) => a.prazo === 30).slice(0, 3);
    const head = { pt: "Para os primeiros 30 dias, eu começaria por:", en: "For the first 30 days, I'd start with:", es: "Para los primeros 30 días, empezaría por:" }[lang];
    return `${head}\n\n${it.map((a, k) => `${k + 1}. ${a.titulo[lang].replace("{area}", tv(lang, a.area ?? ""))} (${DONO[a.dono][lang]})`).join("\n")}\n\n${nota}`;
  }

  const p = prio[0];
  const nome = tv(lang, p.nome);
  const tot = (d.total as Grupo).indices!;
  return {
    pt: `A empresa toda está com apoio ${fmt(tot.apoio)}, estigma ${fmt(tot.estigma)} e abertura ${fmt(tot.abertura)}. A área que pede atenção primeiro é ${nome}: estigma ${fmt(p.g.indices!.estigma)} e abertura ${fmt(p.g.indices!.abertura)}.\n\nUm bom primeiro passo é uma conversa guiada com a liderança de ${nome}, apresentando os números e combinando 2 compromissos visíveis.\n\n${nota}`,
    en: `The whole company has support ${fmt(tot.apoio)}, stigma ${fmt(tot.estigma)} and openness ${fmt(tot.abertura)}. The area that needs attention first is ${nome}: stigma ${fmt(p.g.indices!.estigma)} and openness ${fmt(p.g.indices!.abertura)}.\n\nA good first step is a guided conversation with ${nome} leadership, sharing the numbers and agreeing on 2 visible commitments.\n\n${nota}`,
    es: `La empresa entera tiene apoyo ${fmt(tot.apoio)}, estigma ${fmt(tot.estigma)} y apertura ${fmt(tot.abertura)}. El área que necesita atención primero es ${nome}: estigma ${fmt(p.g.indices!.estigma)} y apertura ${fmt(p.g.indices!.abertura)}.\n\nUn buen primer paso es una conversación guiada con el liderazgo de ${nome}, presentando los números y acordando 2 compromisos visibles.\n\n${nota}`,
  }[lang];
}
