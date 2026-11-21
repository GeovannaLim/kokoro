/** As 20 perguntas da pesquisa do Kokoro: 16 de cultura (mesma base dos índices da v1, OSMI 2016) + 4 de contexto.
 *  Cada opção tem um código 0–1 (null = "não sei / não se aplica", não entra na média). */
export type Indice = "apoio" | "estigma" | "abertura";
export type Opcao = { label: string; code: number | null };
export type Pergunta = { id: string; indice: Indice; texto: string; opcoes: Opcao[]; inverte?: boolean };

const YN: Opcao[] = [{ label: "Sim", code: 1 }, { label: "Não", code: 0 }, { label: "Não sei", code: null }];
const YNM: Opcao[] = [{ label: "Sim", code: 1 }, { label: "Talvez", code: 0.5 }, { label: "Não", code: 0 }];
const PREV: Opcao[] = [{ label: "Sim, em todos", code: 1 }, { label: "Em alguns", code: 0.5 }, { label: "Em nenhum", code: 0 }, { label: "Não se aplica", code: null }];
const REVEAL: Opcao[] = [{ label: "Sim, sempre", code: 1 }, { label: "Às vezes, se o assunto surgir", code: 0.5 }, { label: "Não, porque não faz diferença", code: 0.25 }, { label: "Não, porque me prejudicaria", code: 0 }, { label: "Não se aplica", code: null }];
const LEAVE: Opcao[] = [{ label: "Muito fácil", code: 0 }, { label: "Um pouco fácil", code: 0.25 }, { label: "Nem fácil nem difícil", code: 0.5 }, { label: "Um pouco difícil", code: 0.75 }, { label: "Muito difícil", code: 1 }, { label: "Não sei", code: null }];

export const PERGUNTAS: Pergunta[] = [
  { id: "apoio_beneficio", indice: "apoio", texto: "A empresa oferece benefício de saúde mental no plano de saúde?", opcoes: YN },
  { id: "apoio_conhece", indice: "apoio", texto: "Você conhece as opções de cuidado em saúde mental que o seu plano cobre?", opcoes: YN },
  { id: "apoio_discutiu", indice: "apoio", texto: "A empresa já falou formalmente sobre saúde mental (campanha, comunicado)?", opcoes: YN },
  { id: "apoio_recursos", indice: "apoio", texto: "A empresa oferece materiais para entender saúde mental e onde buscar ajuda?", opcoes: YN },
  { id: "apoio_anonimato", indice: "apoio", texto: "Seu anonimato é protegido se você usar os recursos de cuidado da empresa?", opcoes: YN },
  { id: "estigma_consequencia", indice: "estigma", texto: "Falar de um transtorno mental com a empresa traria consequências negativas?", opcoes: YNM },
  { id: "estigma_fisica", indice: "estigma", texto: "Falar de um problema de saúde física com a empresa traria consequências negativas?", opcoes: YNM },
  { id: "estigma_colegas", indice: "estigma", texto: "Você já viu colegas sofrerem consequências por falar abertamente de saúde mental aqui?", opcoes: YN },
  { id: "estigma_anterior", indice: "estigma", texto: "Em empregos anteriores, falar de saúde mental traria consequências negativas?", opcoes: PREV },
  { id: "estigma_colegas_antes", indice: "estigma", texto: "Em empregos anteriores, você viu colegas sofrerem consequências por isso?", opcoes: PREV },
  { id: "estigma_licenca", indice: "estigma", texto: "Se precisasse de afastamento por saúde mental, pedir seria:", opcoes: LEAVE },
  { id: "abertura_colegas", indice: "abertura", texto: "Você se sentiria à vontade para falar de saúde mental com colegas?", opcoes: YNM },
  { id: "abertura_lideranca", indice: "abertura", texto: "Você se sentiria à vontade para falar de saúde mental com sua liderança?", opcoes: YNM },
  { id: "abertura_seriedade", indice: "abertura", texto: "A empresa leva saúde mental tão a sério quanto a saúde física?", opcoes: YNM },
  { id: "abertura_revela", indice: "abertura", texto: "Se você tivesse um diagnóstico, contaria para colegas?", opcoes: REVEAL },
  { id: "abertura_observou", indice: "abertura", texto: "O que você viu acontecer com outras pessoas te deixou com menos vontade de se abrir aqui?", opcoes: YNM, inverte: true },
];

export const CONTEXTO = [
  { id: "area", texto: "Em qual área você trabalha?" },
  { id: "tempo_casa", texto: "Há quanto tempo você está na empresa?", opcoes: ["Menos de 1 ano", "1 a 3 anos", "3 a 5 anos", "Mais de 5 anos"] },
  { id: "modelo", texto: "Qual é o seu modelo de trabalho?", opcoes: ["Presencial", "Híbrido", "Remoto"] },
  { id: "time", texto: "Quantas pessoas há no seu time?", opcoes: ["Até 5 pessoas", "6 a 15 pessoas", "Mais de 15 pessoas"] },
] as const;

/** Código usado no índice (aplica a inversão da última pergunta de abertura, como na v1). */
export function codigoIndice(p: Pergunta, code: number | null): number | null {
  if (code === null || Number.isNaN(code)) return null;
  return p.inverte ? 1 - code : code;
}
