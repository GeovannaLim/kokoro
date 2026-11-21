/** Plano de ação e classificação de risco, gerados a partir dos dados agregados da empresa (sem diagnóstico individual).
 *  Mesmas regras para a tela de Plano e para o Relatório NR-1. */
import type { DadosEmpresa, Grupo } from "./analytics";
import type { Lang } from "./i18n";

type Tri = Record<Lang, string>;
export type Indice = "apoio" | "estigma" | "abertura";
export type Risco = "baixo" | "moderado" | "alto";

/** Faixas de risco por índice (0–100). Estigma é o único em que "mais" é pior. */
export function risco(ind: Indice, v: number): Risco {
  if (ind === "estigma") return v >= 45 ? "alto" : v >= 30 ? "moderado" : "baixo";
  return v < 40 ? "alto" : v < 60 ? "moderado" : "baixo";
}
export const RISCO_TXT: Record<Risco, Tri> = {
  baixo: { pt: "Baixo", en: "Low", es: "Bajo" },
  moderado: { pt: "Moderado", en: "Moderate", es: "Moderado" },
  alto: { pt: "Alto", en: "High", es: "Alto" },
};
export const RISCO_COR: Record<Risco, string> = { baixo: "#22336b", moderado: "#111111", alto: "#b5382c" };

/** Fator de risco psicossocial associado a cada índice (linguagem do inventário de riscos do PGR). */
export const FATOR: Record<Indice, Tri> = {
  apoio: { pt: "Falta de suporte organizacional", en: "Lack of organizational support", es: "Falta de apoyo organizacional" },
  estigma: { pt: "Medo de retaliação e estigma", en: "Fear of retaliation and stigma", es: "Miedo a represalias y estigma" },
  abertura: { pt: "Comunicação e clima de confiança", en: "Communication and climate of trust", es: "Comunicación y clima de confianza" },
};

type Acao = { titulo: Tri; como: Tri; dono: "rh" | "lideranca" | "diretoria" };
/** Biblioteca de ações: cada uma ataca uma pergunta específica da pesquisa. */
export const ACOES: Record<string, Acao> = {
  apoio_beneficio: { dono: "diretoria", titulo: { pt: "Incluir saúde mental no plano de saúde", en: "Add mental health to the health plan", es: "Incluir salud mental en el plan de salud" }, como: { pt: "Negociar cobertura de psicoterapia e psiquiatria com a operadora ou um benefício de apoio psicológico.", en: "Negotiate therapy and psychiatry coverage with the insurer, or a psychological support benefit.", es: "Negociar cobertura de psicoterapia y psiquiatría con la aseguradora o un beneficio de apoyo psicológico." } },
  apoio_conhece: { dono: "rh", titulo: { pt: "Explicar o que o plano cobre", en: "Explain what the plan covers", es: "Explicar qué cubre el plan" }, como: { pt: "Um guia de uma página com a cobertura de saúde mental, como agendar e quanto custa.", en: "A one-page guide to mental health coverage, how to book and what it costs.", es: "Una guía de una página con la cobertura de salud mental, cómo pedir cita y cuánto cuesta." } },
  apoio_discutiu: { dono: "diretoria", titulo: { pt: "Falar oficialmente sobre saúde mental", en: "Talk about mental health officially", es: "Hablar oficialmente de salud mental" }, como: { pt: "Comunicado da diretoria e uma campanha trimestral, com o canal de apoio sempre visível.", en: "A board announcement and a quarterly campaign, with the support channel always visible.", es: "Comunicado de la dirección y una campaña trimestral, con el canal de apoyo siempre visible." } },
  apoio_recursos: { dono: "rh", titulo: { pt: "Reunir materiais de apoio", en: "Gather support materials", es: "Reunir materiales de apoyo" }, como: { pt: "Uma página interna com onde buscar ajuda, números de emergência (CVV 188) e conteúdos curtos.", en: "An internal page with where to get help, emergency numbers (CVV 188 in Brazil) and short content.", es: "Una página interna con dónde buscar ayuda, números de emergencia (CVV 188 en Brasil) y contenidos breves." } },
  apoio_anonimato: { dono: "rh", titulo: { pt: "Garantir e explicar o sigilo", en: "Guarantee and explain confidentiality", es: "Garantizar y explicar la confidencialidad" }, como: { pt: "Deixar claro, por escrito, que o uso dos recursos de cuidado não chega à liderança.", en: "State in writing that using care resources never reaches management.", es: "Dejar claro, por escrito, que el uso de los recursos de cuidado no llega a la jefatura." } },
  estigma_consequencia: { dono: "lideranca", titulo: { pt: "Liderança falando do tema", en: "Leaders talking about it", es: "Liderazgo hablando del tema" }, como: { pt: "Líderes abrem reuniões contando como cuidam da própria saúde mental. O exemplo reduz o medo.", en: "Leaders open meetings sharing how they care for their own mental health. Example reduces fear.", es: "Los líderes abren reuniones contando cómo cuidan su propia salud mental. El ejemplo reduce el miedo." } },
  estigma_fisica: { dono: "rh", titulo: { pt: "Rever como a empresa trata afastamentos", en: "Review how leaves are handled", es: "Revisar cómo se gestionan las bajas" }, como: { pt: "Mapear se pedidos de saúde geram cobrança ou perda de oportunidade, e corrigir.", en: "Check whether health requests lead to pressure or lost opportunities, and fix it.", es: "Revisar si las solicitudes de salud generan presión o pérdida de oportunidades, y corregirlo." } },
  estigma_colegas: { dono: "diretoria", titulo: { pt: "Política contra retaliação", en: "Anti-retaliation policy", es: "Política contra represalias" }, como: { pt: "Publicar a política, abrir um canal de denúncia independente e responder cada relato.", en: "Publish the policy, open an independent reporting channel and answer every report.", es: "Publicar la política, abrir un canal de denuncia independiente y responder cada caso." } },
  estigma_licenca: { dono: "rh", titulo: { pt: "Simplificar o afastamento por saúde mental", en: "Simplify mental health leave", es: "Simplificar la baja por salud mental" }, como: { pt: "Um passo a passo claro, sem exigir explicações à liderança, com retorno acolhido.", en: "A clear step-by-step, with no explanations owed to managers, and a supported return.", es: "Un paso a paso claro, sin dar explicaciones a la jefatura, con un regreso acompañado." } },
  abertura_colegas: { dono: "rh", titulo: { pt: "Rodas de conversa", en: "Conversation circles", es: "Rondas de conversación" }, como: { pt: "Encontros mensais mediados por profissional de saúde, opcionais e sem a liderança direta.", en: "Monthly sessions led by a health professional, optional and without direct managers.", es: "Encuentros mensuales mediados por un profesional de salud, opcionales y sin la jefatura directa." } },
  abertura_lideranca: { dono: "lideranca", titulo: { pt: "Treinar líderes para conversas de cuidado", en: "Train leaders for care conversations", es: "Formar líderes para conversaciones de cuidado" }, como: { pt: "Treinamento prático: perceber sinais, acolher sem julgar e encaminhar ao apoio certo.", en: "Hands-on training: noticing signs, listening without judgment and referring to the right help.", es: "Formación práctica: notar señales, escuchar sin juzgar y derivar a la ayuda adecuada." } },
  abertura_seriedade: { dono: "diretoria", titulo: { pt: "Saúde mental com o mesmo peso da física", en: "Mental health weighted like physical health", es: "Salud mental con el mismo peso que la física" }, como: { pt: "Rever políticas e metas para que saúde mental tenha o mesmo tratamento da saúde física.", en: "Review policies and goals so mental health gets the same treatment as physical health.", es: "Revisar políticas y metas para que la salud mental tenga el mismo trato que la física." } },
  abertura_revela: { dono: "rh", titulo: { pt: "Histórias reais, com consentimento", en: "Real stories, with consent", es: "Historias reales, con consentimiento" }, como: { pt: "Pessoas que quiserem contam sua experiência. Mostra que falar não traz prejuízo.", en: "People who want to share their experience. It shows speaking up does no harm.", es: "Quien quiera cuenta su experiencia. Muestra que hablar no trae perjuicio." } },
  abertura_observou: { dono: "lideranca", titulo: { pt: "Reparar o que as pessoas viram", en: "Repair what people witnessed", es: "Reparar lo que la gente vio" }, como: { pt: "Reconhecer situações passadas mal conduzidas e mostrar o que mudou.", en: "Acknowledge past situations that were handled badly and show what changed.", es: "Reconocer situaciones pasadas mal gestionadas y mostrar qué cambió." } },
};
export const DONO: Record<Acao["dono"], Tri> = {
  rh: { pt: "RH", en: "HR", es: "RR. HH." },
  lideranca: { pt: "Lideranças", en: "Leadership", es: "Liderazgos" },
  diretoria: { pt: "Diretoria", en: "Board", es: "Dirección" },
};

export type ItemPlano = { id: string; prazo: 30 | 60 | 90; indice: Indice; pergunta: string; score: number; area?: string; titulo: Tri; como: Tri; dono: Acao["dono"] };

/** "Gravidade" de uma pergunta no sentido do índice: quanto maior, pior. */
function gravidade(ind: Indice, id: string, media: number) {
  const v = id === "abertura_observou" ? 100 - media : media;   // invertida, como no índice
  return { score: Math.round(v * 10) / 10, gap: ind === "estigma" ? v : 100 - v };
}

export function prioridades(d: DadosEmpresa) {
  return Object.entries(d.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto && g.indices)
    .map(([nome, g]) => ({ nome, g, risco: g.indices!.estigma - g.indices!.abertura + (100 - g.indices!.apoio) / 2 }))
    .sort((a, b) => b.risco - a.risco);
}

export function montarPlano(d: DadosEmpresa): ItemPlano[] {
  const ranking = d.perguntas
    .filter((q) => ACOES[q.id])
    .map((q) => ({ q, ...gravidade(q.indice as Indice, q.id, q.media) }))
    .sort((a, b) => b.gap - a.gap);
  // as 2 piores perguntas de cada índice
  const escolhidas: typeof ranking = [];
  for (const ind of ["apoio", "estigma", "abertura"] as Indice[]) escolhidas.push(...ranking.filter((r) => r.q.indice === ind).slice(0, 2));
  escolhidas.sort((a, b) => b.gap - a.gap);
  const itens: ItemPlano[] = escolhidas.map((r, i) => ({
    id: r.q.id, prazo: i < 2 ? 30 : i < 4 ? 60 : 90, indice: r.q.indice as Indice, pergunta: r.q.texto, score: r.score,
    titulo: ACOES[r.q.id].titulo, como: ACOES[r.q.id].como, dono: ACOES[r.q.id].dono,
  }));
  // as 2 áreas mais críticas ganham uma ação dedicada nos primeiros 30 dias
  for (const p of prioridades(d).slice(0, 2)) {
    const pior = (["apoio", "estigma", "abertura"] as Indice[])
      .map((k) => ({ k, gap: k === "estigma" ? p.g.indices![k] : 100 - p.g.indices![k] })).sort((a, b) => b.gap - a.gap)[0].k;
    itens.unshift({
      id: `area_${p.nome}`, prazo: 30, indice: pior, pergunta: "", score: p.g.indices![pior], area: p.nome, dono: "lideranca",
      titulo: { pt: "Conversa guiada com a liderança de {area}", en: "Guided conversation with {area} leadership", es: "Conversación guiada con el liderazgo de {area}" },
      como: { pt: "Apresentar os números da área, ouvir o time em grupo e combinar 2 compromissos visíveis.", en: "Share the area's numbers, listen to the team as a group and agree on 2 visible commitments.", es: "Presentar los números del área, escuchar al equipo en grupo y acordar 2 compromisos visibles." },
    });
  }
  return itens;
}
