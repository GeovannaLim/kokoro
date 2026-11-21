/** Textos da plataforma em português, inglês e espanhol. Os dados (áreas, códigos) ficam em português no banco;
 *  aqui só se traduz o que aparece na tela. */
export type Lang = "pt" | "en" | "es";
export const LANGS: Lang[] = ["pt", "en", "es"];
export const LOCALE: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };
export const LANG_COOKIE = "kk-lang";

type Tri = Record<Lang, string>;
const T = <K extends string>(o: Record<K, Tri>) => o;

export const UI = T({
  nav_dashboard: { pt: "Dashboard", en: "Dashboard", es: "Panel" },
  nav_pesquisa: { pt: "Pesquisa", en: "Survey", es: "Encuesta" },
  nav_assistente: { pt: "Assistente", en: "Assistant", es: "Asistente" },
  nav_perfis: { pt: "Perfis", en: "Profiles", es: "Perfiles" },
  nav_plano: { pt: "Plano de ação", en: "Action plan", es: "Plan de acción" },
  nav_relatorio: { pt: "Relatório NR-1", en: "NR-1 report", es: "Informe NR-1" },
  menu: { pt: "Menu", en: "Menu", es: "Menú" },
  fechar: { pt: "Fechar", en: "Close", es: "Cerrar" },
  idioma: { pt: "Idioma", en: "Language", es: "Idioma" },
  sintetico: { pt: "dados sintéticos", en: "synthetic data", es: "datos sintéticos" },
  misto: { pt: "dados reais + sintéticos", en: "real + synthetic data", es: "datos reales + sintéticos" },
  rodape: { pt: "Recortes com menos de 5 pessoas não são exibidos · Em sofrimento agora? Ligue 188 (CVV), 24 horas, gratuito.", en: "Breakdowns with fewer than 5 people are never shown · Struggling right now? In Brazil, call 188 (CVV), 24/7, free.", es: "Nunca se muestran desgloses con menos de 5 personas · ¿Lo estás pasando mal? En Brasil, llama al 188 (CVV), 24 horas, gratis." },
  em_construcao: { pt: "Em construção.", en: "Under construction.", es: "En construcción." },
  // dashboard
  dash_l1: { pt: "Diagnóstico de cultura", en: "Culture diagnosis", es: "Diagnóstico de cultura" },
  respostas: { pt: "respostas", en: "responses", es: "respuestas" },
  pessoas: { pt: "pessoas", en: "people", es: "personas" },
  calibrado: { pt: "dados sintéticos calibrados na OSMI 2016", en: "synthetic data calibrated on OSMI 2016", es: "datos sintéticos calibrados con OSMI 2016" },
  inclui_reais: { pt: "inclui respostas reais da pesquisa", en: "includes real survey responses", es: "incluye respuestas reales de la encuesta" },
  ref_osmi: { pt: "Referência OSMI", en: "OSMI reference", es: "Referencia OSMI" },
  melhor: { pt: "melhor que a referência", en: "better than the reference", es: "mejor que la referencia" },
  pior: { pt: "pior que a referência", en: "worse than the reference", es: "peor que la referencia" },
  apoio: { pt: "Apoio", en: "Support", es: "Apoyo" },
  estigma: { pt: "Estigma", en: "Stigma", es: "Estigma" },
  abertura: { pt: "Abertura", en: "Openness", es: "Apertura" },
  apoio_hint: { pt: "Quanto a empresa oferece suporte", en: "How much support the company offers", es: "Cuánto apoyo ofrece la empresa" },
  estigma_hint: { pt: "Quanto falar do tema ainda pesa", en: "How heavy it still is to talk about it", es: "Cuánto pesa todavía hablar del tema" },
  abertura_hint: { pt: "Quanto se conversa sobre saúde mental", en: "How much people talk about mental health", es: "Cuánto se habla de salud mental" },
  mapa_titulo: { pt: "Mapa das áreas", en: "Map of areas", es: "Mapa de áreas" },
  mapa_desc: { pt: "Cada círculo é uma área: quanto mais à esquerda e acima, mais seguro é falar. O tamanho mostra quantas pessoas responderam.", en: "Each circle is an area: the further left and up, the safer it is to speak up. Size shows how many people answered.", es: "Cada círculo es un área: cuanto más a la izquierda y arriba, más seguro es hablar. El tamaño indica cuántas personas respondieron." },
  seguro: { pt: "Seguro para falar", en: "Safe to speak up", es: "Seguro para hablar" },
  prioridade: { pt: "Prioridade", en: "Priority", es: "Prioridad" },
  eixo_estigma: { pt: "Estigma →", en: "Stigma →", es: "Estigma →" },
  eixo_abertura: { pt: "Abertura →", en: "Openness →", es: "Apertura →" },
  por_area: { pt: "Índices por área", en: "Indexes by area", es: "Índices por área" },
  por_area_desc: { pt: "A linha tracejada é a referência real da OSMI 2016.", en: "The dashed line is the real OSMI 2016 reference.", es: "La línea discontinua es la referencia real de OSMI 2016." },
  perfis_titulo: { pt: "Perfis de equipe", en: "Team profiles", es: "Perfiles de equipo" },
  perfis_desc: { pt: "Como as pessoas se agrupam, na empresa e em cada área.", en: "How people group together, company-wide and in each area.", es: "Cómo se agrupan las personas, en la empresa y en cada área." },
  empresa_toda: { pt: "Empresa toda", en: "Whole company", es: "Toda la empresa" },
  perguntas_titulo: { pt: "As 16 perguntas de cultura", en: "The 16 culture questions", es: "Las 16 preguntas de cultura" },
  perguntas_desc: { pt: "Média de cada pergunta, de 0 a 100. Passe o mouse para ver a pergunta inteira.", en: "Average of each question, 0 to 100. Hover to read the full question.", es: "Promedio de cada pregunta, de 0 a 100. Pasa el ratón para leer la pregunta completa." },
  observou_inv: { pt: "O que viu acontecer com outras pessoas não tirou a vontade de se abrir aqui (invertida)", en: "What happened to others did not make them less willing to open up here (inverted)", es: "Lo que vio que les pasó a otros no le quitó las ganas de abrirse aquí (invertida)" },
  ver_tabela: { pt: "Ver como tabela", en: "View as table", es: "Ver como tabla" },
  area: { pt: "Área", en: "Area", es: "Área" },
  // pesquisa
  pesq_l1: { pt: "Pesquisa", en: "Anonymous", es: "Encuesta" },
  pesq_mark: { pt: "anônima.", en: "survey.", es: "anónima." },
  pesq_envie: { pt: "Envie o link para a equipe. Leva cerca de 5 minutos, pelo celular.", en: "Send the link to the team. It takes about 5 minutes, on the phone.", es: "Envía el enlace al equipo. Lleva unos 5 minutos, desde el móvil." },
  pesq_abrir: { pt: "Abrir a pesquisa ↗", en: "Open the survey ↗", es: "Abrir la encuesta ↗" },
  pesq_copiar: { pt: "Copiar link", en: "Copy link", es: "Copiar enlace" },
  pesq_copiado: { pt: "Link copiado", en: "Link copied", es: "Enlace copiado" },
  pesq_sem_banco: { pt: "O link aparece aqui assim que o banco estiver conectado.", en: "The link shows up here once the database is connected.", es: "El enlace aparece aquí cuando la base de datos esté conectada." },
  pesq_reais: { pt: "reais", en: "real", es: "reales" },
  pesq_sinteticas: { pt: "sintéticas (demo)", en: "synthetic (demo)", es: "sintéticas (demo)" },
  pesq_20: { pt: "As 20 perguntas", en: "The 20 questions", es: "Las 20 preguntas" },
  contexto: { pt: "contexto", en: "context", es: "contexto" },
  // pesquisa pública
  form_titulo: { pt: "Pesquisa de cultura", en: "Culture survey", es: "Encuesta de cultura" },
  form_anonima: { pt: "anônima", en: "anonymous", es: "anónima" },
  form_intro: { pt: "20 perguntas, cerca de 5 minutos. Ninguém vê o que você respondeu: o RH só recebe números de grupos com 5 pessoas ou mais.", en: "20 questions, about 5 minutes. Nobody sees your answers: HR only gets numbers from groups of 5 people or more.", es: "20 preguntas, unos 5 minutos. Nadie ve lo que respondiste: RR. HH. solo recibe números de grupos de 5 personas o más." },
  form_comecar: { pt: "Começar", en: "Start", es: "Empezar" },
  form_voltar: { pt: "← Voltar", en: "← Back", es: "← Volver" },
  form_pergunta: { pt: "Pergunta", en: "Question", es: "Pregunta" },
  form_de: { pt: "de", en: "of", es: "de" },
  form_enviar: { pt: "Enviar respostas", en: "Submit answers", es: "Enviar respuestas" },
  form_enviando: { pt: "Enviando…", en: "Sending…", es: "Enviando…" },
  form_obrigado: { pt: "Obrigado.", en: "Thank you.", es: "Gracias." },
  form_obrigado_txt: { pt: "Sua resposta é anônima e só aparece somada às de pelo menos outras 4 pessoas.", en: "Your answer is anonymous and only shows up added to those of at least 4 other people.", es: "Tu respuesta es anónima y solo aparece sumada a las de al menos otras 4 personas." },
  form_indisponivel: { pt: "Esta pesquisa não está disponível.", en: "This survey is not available.", es: "Esta encuesta no está disponible." },
  carregando: { pt: "Carregando…", en: "Loading…", es: "Cargando…" },
});
export type UIKey = keyof typeof UI;
export const t = (lang: Lang, k: UIKey) => UI[k][lang];

/** Telas ainda em construção (título + descrição). */
export const STUB = T({
  assistente_l1: { pt: "Assistente", en: "AI", es: "Asistente" }, assistente_mark: { pt: "com IA.", en: "assistant.", es: "con IA." },
  assistente_desc: { pt: "Converse com o Kokoro sobre os números da sua empresa.", en: "Talk to Kokoro about your company's numbers.", es: "Habla con Kokoro sobre los números de tu empresa." },
  perfis_l1: { pt: "Perfis", en: "Team", es: "Perfiles" }, perfis_mark: { pt: "de equipe.", en: "profiles.", es: "de equipo." },
  perfis_desc: { pt: "Como as pessoas se agrupam em apoio, estigma e abertura.", en: "How people group by support, stigma and openness.", es: "Cómo se agrupan las personas en apoyo, estigma y apertura." },
  plano_l1: { pt: "Plano", en: "Action", es: "Plan" }, plano_mark: { pt: "de ação.", en: "plan.", es: "de acción." },
  plano_desc: { pt: "Prioridades e ações sugeridas a partir do diagnóstico.", en: "Priorities and suggested actions from the diagnosis.", es: "Prioridades y acciones sugeridas a partir del diagnóstico." },
  relatorio_l1: { pt: "Relatório", en: "NR-1", es: "Informe" }, relatorio_mark: { pt: "NR-1.", en: "report.", es: "NR-1." },
  relatorio_desc: { pt: "Diagnóstico de riscos psicossociais e plano de ação em PDF.", en: "Psychosocial risk assessment and action plan in PDF.", es: "Diagnóstico de riesgos psicosociales y plan de acción en PDF." },
});
export const ts = (lang: Lang, k: keyof typeof STUB) => STUB[k][lang];

/** Nomes das áreas e das opções de contexto (o banco guarda em português). */
const VALORES: Record<string, Tri> = {
  "Produto": { pt: "Produto", en: "Product", es: "Producto" },
  "Engenharia": { pt: "Engenharia", en: "Engineering", es: "Ingeniería" },
  "Comercial": { pt: "Comercial", en: "Sales", es: "Comercial" },
  "Operações": { pt: "Operações", en: "Operations", es: "Operaciones" },
  "Atendimento": { pt: "Atendimento", en: "Customer care", es: "Atención al cliente" },
  "RH": { pt: "RH", en: "HR", es: "RR. HH." },
  "Menos de 1 ano": { pt: "Menos de 1 ano", en: "Less than 1 year", es: "Menos de 1 año" },
  "1 a 3 anos": { pt: "1 a 3 anos", en: "1 to 3 years", es: "1 a 3 años" },
  "3 a 5 anos": { pt: "3 a 5 anos", en: "3 to 5 years", es: "3 a 5 años" },
  "Mais de 5 anos": { pt: "Mais de 5 anos", en: "More than 5 years", es: "Más de 5 años" },
  "Presencial": { pt: "Presencial", en: "On-site", es: "Presencial" },
  "Híbrido": { pt: "Híbrido", en: "Hybrid", es: "Híbrido" },
  "Remoto": { pt: "Remoto", en: "Remote", es: "Remoto" },
  "Até 5 pessoas": { pt: "Até 5 pessoas", en: "Up to 5 people", es: "Hasta 5 personas" },
  "6 a 15 pessoas": { pt: "6 a 15 pessoas", en: "6 to 15 people", es: "6 a 15 personas" },
  "Mais de 15 pessoas": { pt: "Mais de 15 pessoas", en: "More than 15 people", es: "Más de 15 personas" },
  "Empresa Aurora": { pt: "Empresa Aurora", en: "Aurora Inc.", es: "Empresa Aurora" },
  "Diagnóstico de cultura 2026": { pt: "Diagnóstico de cultura 2026", en: "Culture diagnosis 2026", es: "Diagnóstico de cultura 2026" },
};
export const tv = (lang: Lang, v: string) => VALORES[v]?.[lang] ?? v;

export const PERFIS: Record<string, { nome: Tri; descricao: Tri }> = {
  acolhidos: { nome: { pt: "Acolhidos", en: "Supported", es: "Acogidos" }, descricao: { pt: "Sentem apoio e falam com mais liberdade.", en: "They feel supported and speak more freely.", es: "Se sienten apoyados y hablan con más libertad." } },
  sem_apoio: { nome: { pt: "Abertos, sem apoio", en: "Open, unsupported", es: "Abiertos, sin apoyo" }, descricao: { pt: "Falam com liberdade, mas quase não encontram estrutura de apoio.", en: "They speak freely but find almost no support structure.", es: "Hablan con libertad, pero casi no encuentran estructura de apoyo." } },
  em_silencio: { nome: { pt: "Em silêncio", en: "Silent", es: "En silencio" }, descricao: { pt: "Percebem pouco apoio e muito risco em se abrir.", en: "They see little support and a lot of risk in opening up.", es: "Perciben poco apoyo y mucho riesgo en abrirse." } },
};

/** Perguntas e opções traduzidas (ids e códigos iguais aos de questions.ts). */
export const PERGUNTAS_I18N: Record<string, Record<Exclude<Lang, "pt">, string>> = {
  area: { en: "Which area do you work in?", es: "¿En qué área trabajas?" },
  tempo_casa: { en: "How long have you been at the company?", es: "¿Cuánto tiempo llevas en la empresa?" },
  modelo: { en: "What is your work arrangement?", es: "¿Cuál es tu modalidad de trabajo?" },
  time: { en: "How many people are on your team?", es: "¿Cuántas personas hay en tu equipo?" },
  apoio_beneficio: { en: "Does the company offer mental health benefits in its health plan?", es: "¿La empresa ofrece beneficios de salud mental en el plan de salud?" },
  apoio_conhece: { en: "Do you know the mental health care options your plan covers?", es: "¿Conoces las opciones de atención en salud mental que cubre tu plan?" },
  apoio_discutiu: { en: "Has the company ever formally talked about mental health (campaign, announcement)?", es: "¿La empresa ha hablado formalmente de salud mental (campaña, comunicado)?" },
  apoio_recursos: { en: "Does the company offer materials to understand mental health and where to find help?", es: "¿La empresa ofrece materiales para entender la salud mental y dónde buscar ayuda?" },
  apoio_anonimato: { en: "Is your anonymity protected if you use the company's care resources?", es: "¿Tu anonimato está protegido si usas los recursos de atención de la empresa?" },
  estigma_consequencia: { en: "Would talking about a mental disorder with the company have negative consequences?", es: "¿Hablar de un trastorno mental con la empresa tendría consecuencias negativas?" },
  estigma_fisica: { en: "Would talking about a physical health issue with the company have negative consequences?", es: "¿Hablar de un problema de salud física con la empresa tendría consecuencias negativas?" },
  estigma_colegas: { en: "Have you seen coworkers suffer consequences for talking openly about mental health here?", es: "¿Has visto a compañeros sufrir consecuencias por hablar abiertamente de salud mental aquí?" },
  estigma_anterior: { en: "In previous jobs, would talking about mental health have had negative consequences?", es: "En empleos anteriores, ¿hablar de salud mental habría tenido consecuencias negativas?" },
  estigma_colegas_antes: { en: "In previous jobs, did you see coworkers suffer consequences for it?", es: "En empleos anteriores, ¿viste a compañeros sufrir consecuencias por ello?" },
  estigma_licenca: { en: "If you needed a mental health leave, asking for it would be:", es: "Si necesitaras una baja por salud mental, pedirla sería:" },
  abertura_colegas: { en: "Would you feel comfortable talking about mental health with coworkers?", es: "¿Te sentirías cómodo hablando de salud mental con compañeros?" },
  abertura_lideranca: { en: "Would you feel comfortable talking about mental health with your manager?", es: "¿Te sentirías cómodo hablando de salud mental con tu jefe?" },
  abertura_seriedade: { en: "Does the company take mental health as seriously as physical health?", es: "¿La empresa se toma la salud mental tan en serio como la física?" },
  abertura_revela: { en: "If you had a diagnosis, would you tell coworkers?", es: "Si tuvieras un diagnóstico, ¿se lo contarías a tus compañeros?" },
  abertura_observou: { en: "Has what you saw happen to others made you less willing to open up here?", es: "¿Lo que viste que les pasó a otros te ha quitado ganas de abrirte aquí?" },
};
export const OPCOES_I18N: Record<string, Record<Exclude<Lang, "pt">, string>> = {
  "Sim": { en: "Yes", es: "Sí" }, "Não": { en: "No", es: "No" }, "Não sei": { en: "I don't know", es: "No sé" }, "Talvez": { en: "Maybe", es: "Quizás" },
  "Sim, em todos": { en: "Yes, in all of them", es: "Sí, en todos" }, "Em alguns": { en: "In some", es: "En algunos" }, "Em nenhum": { en: "In none", es: "En ninguno" }, "Não se aplica": { en: "Not applicable", es: "No aplica" },
  "Sim, sempre": { en: "Yes, always", es: "Sí, siempre" }, "Às vezes, se o assunto surgir": { en: "Sometimes, if it comes up", es: "A veces, si sale el tema" },
  "Não, porque não faz diferença": { en: "No, because it makes no difference", es: "No, porque no hace diferencia" }, "Não, porque me prejudicaria": { en: "No, because it would hurt me", es: "No, porque me perjudicaría" },
  "Muito fácil": { en: "Very easy", es: "Muy fácil" }, "Um pouco fácil": { en: "Somewhat easy", es: "Algo fácil" }, "Nem fácil nem difícil": { en: "Neither easy nor difficult", es: "Ni fácil ni difícil" },
  "Um pouco difícil": { en: "Somewhat difficult", es: "Algo difícil" }, "Muito difícil": { en: "Very difficult", es: "Muy difícil" },
};
export const tq = (lang: Lang, id: string, pt: string) => (lang === "pt" ? pt : PERGUNTAS_I18N[id]?.[lang] ?? pt);
export const to = (lang: Lang, pt: string) => (lang === "pt" ? pt : OPCOES_I18N[pt]?.[lang] ?? VALORES[pt]?.[lang] ?? pt);

/** Textos das telas de Perfis, Plano de ação e Relatório NR-1. */
export const P = T({
  // perfis
  perf_intro: { pt: "Agrupamento K-means treinado em 1.433 respostas reais da OSMI 2016 e aplicado às respostas da empresa.", en: "K-means clustering trained on 1,433 real OSMI 2016 responses and applied to the company's answers.", es: "Agrupamiento K-means entrenado con 1.433 respuestas reales de OSMI 2016 y aplicado a las respuestas de la empresa." },
  perf_retrato: { pt: "Retrato do grupo", en: "Group portrait", es: "Retrato del grupo" },
  perf_fazer: { pt: "O que fazer", en: "What to do", es: "Qué hacer" },
  perf_fazer_acolhidos: { pt: "Transformar em aliados: convidar para rodas de conversa e para contar experiências, com consentimento.", en: "Turn them into allies: invite them to conversation circles and to share experiences, with consent.", es: "Convertirlos en aliados: invitarlos a rondas de conversación y a contar experiencias, con consentimiento." },
  perf_fazer_sem_apoio: { pt: "Já falam: falta estrutura. Divulgar o plano de saúde, o canal de apoio e o sigilo garantido.", en: "They already speak up: what's missing is structure. Promote the health plan, the support channel and guaranteed confidentiality.", es: "Ya hablan: falta estructura. Difundir el plan de salud, el canal de apoyo y la confidencialidad garantizada." },
  perf_fazer_em_silencio: { pt: "Primeiro, segurança: política contra retaliação, líderes dando o exemplo e apoio sigiloso.", en: "Safety first: anti-retaliation policy, leaders setting the example and confidential support.", es: "Primero, seguridad: política contra represalias, líderes dando el ejemplo y apoyo confidencial." },
  perf_recortes: { pt: "Perfis por recorte", en: "Profiles by breakdown", es: "Perfiles por desglose" },
  perf_por_area: { pt: "Por área", en: "By area", es: "Por área" },
  perf_por_modelo: { pt: "Por modelo de trabalho", en: "By work arrangement", es: "Por modalidad de trabajo" },
  perf_por_tempo: { pt: "Por tempo de casa", en: "By tenure", es: "Por antigüedad" },
  // plano
  plano_intro: { pt: "Gerado a partir das perguntas com pior resultado e das áreas prioritárias. Marque o que já foi feito.", en: "Built from the worst-scoring questions and the priority areas. Check off what's done.", es: "Generado a partir de las preguntas con peor resultado y las áreas prioritarias. Marca lo que ya está hecho." },
  plano_acoes: { pt: "ações", en: "actions", es: "acciones" },
  plano_feitas: { pt: "feitas", en: "done", es: "hechas" },
  plano_areas: { pt: "Áreas prioritárias", en: "Priority areas", es: "Áreas prioritarias" },
  plano_dias: { pt: "dias", en: "days", es: "días" },
  plano_dono: { pt: "Responsável", en: "Owner", es: "Responsable" },
  plano_evid_pergunta: { pt: "Pergunta", en: "Question", es: "Pregunta" },
  plano_evid_area: { pt: "Área", en: "Area", es: "Área" },
  plano_feito: { pt: "Feito", en: "Done", es: "Hecho" },
  plano_marcar: { pt: "Marcar como feito", en: "Mark as done", es: "Marcar como hecho" },
  // relatório
  rel_gerar: { pt: "Gerar PDF", en: "Create PDF", es: "Generar PDF" },
  rel_dica: { pt: "Na janela de impressão, escolha \"Salvar como PDF\".", en: "In the print dialog, choose \"Save as PDF\".", es: "En la ventana de impresión, elige \"Guardar como PDF\"." },
  rel_titulo: { pt: "Relatório de riscos psicossociais", en: "Psychosocial risk report", es: "Informe de riesgos psicosociales" },
  rel_sub: { pt: "Apoio ao inventário de riscos do PGR · NR-1", en: "Support for the PGR risk inventory · NR-1 (Brazil)", es: "Apoyo al inventario de riesgos del PGR · NR-1 (Brasil)" },
  rel_empresa: { pt: "Empresa", en: "Company", es: "Empresa" },
  rel_periodo: { pt: "Período da pesquisa", en: "Survey period", es: "Periodo de la encuesta" },
  rel_emissao: { pt: "Emitido em", en: "Issued on", es: "Emitido el" },
  rel_s1: { pt: "1. Metodologia", en: "1. Methodology", es: "1. Metodología" },
  rel_metodo: { pt: "Pesquisa anônima de 20 perguntas (16 de cultura e 4 de contexto), respondida por {n} pessoas. As respostas formam três índices de 0 a 100: Apoio, Estigma e Abertura, e as pessoas são agrupadas em perfis por um modelo K-means treinado em 1.433 respostas reais da OSMI 2016. Nenhum recorte com menos de 5 pessoas é exibido e nenhuma pessoa é identificada.", en: "Anonymous 20-question survey (16 on culture, 4 on context), answered by {n} people. Answers form three 0–100 indexes: Support, Stigma and Openness, and people are grouped into profiles by a K-means model trained on 1,433 real OSMI 2016 responses. No breakdown with fewer than 5 people is shown and no one is identified.", es: "Encuesta anónima de 20 preguntas (16 de cultura y 4 de contexto), respondida por {n} personas. Las respuestas forman tres índices de 0 a 100: Apoyo, Estigma y Apertura, y las personas se agrupan en perfiles con un modelo K-means entrenado con 1.433 respuestas reales de OSMI 2016. No se muestra ningún desglose con menos de 5 personas y nadie es identificado." },
  rel_sintetico: { pt: "Este relatório usa dados sintéticos de demonstração.", en: "This report uses synthetic demo data.", es: "Este informe usa datos sintéticos de demostración." },
  rel_s2: { pt: "2. Resultado geral", en: "2. Overall result", es: "2. Resultado general" },
  rel_s3: { pt: "3. Matriz de risco por área", en: "3. Risk matrix by area", es: "3. Matriz de riesgo por área" },
  rel_faixas: { pt: "Faixas: Apoio e Abertura abaixo de 40 = alto, 40–60 = moderado; Estigma a partir de 45 = alto, 30–45 = moderado.", en: "Bands: Support and Openness below 40 = high, 40–60 = moderate; Stigma 45+ = high, 30–45 = moderate.", es: "Rangos: Apoyo y Apertura por debajo de 40 = alto, 40–60 = moderado; Estigma desde 45 = alto, 30–45 = moderado." },
  rel_s4: { pt: "4. Fatores de risco identificados", en: "4. Risk factors identified", es: "4. Factores de riesgo identificados" },
  rel_areas_afetadas: { pt: "Áreas com risco alto", en: "Areas at high risk", es: "Áreas con riesgo alto" },
  rel_nenhuma: { pt: "nenhuma", en: "none", es: "ninguna" },
  rel_s5: { pt: "5. Plano de ação", en: "5. Action plan", es: "5. Plan de acción" },
  rel_prazo: { pt: "Prazo", en: "Deadline", es: "Plazo" },
  rel_acao: { pt: "Ação", en: "Action", es: "Acción" },
  rel_aviso: { pt: "Este relatório apoia o inventário de riscos psicossociais do Programa de Gerenciamento de Riscos (PGR) previsto na NR-1. Ele não faz diagnóstico individual e não substitui a avaliação de um profissional habilitado.", en: "This report supports the psychosocial risk inventory of the Risk Management Program (PGR) required by Brazil's NR-1. It makes no individual diagnosis and does not replace an assessment by a qualified professional.", es: "Este informe apoya el inventario de riesgos psicosociales del Programa de Gestión de Riesgos (PGR) previsto en la NR-1 de Brasil. No hace diagnósticos individuales y no sustituye la evaluación de un profesional habilitado." },
  rel_ass_tecnico: { pt: "Responsável técnico (SST)", en: "Technical lead (OHS)", es: "Responsable técnico (SST)" },
  rel_ass_rh: { pt: "Responsável de RH", en: "HR lead", es: "Responsable de RR. HH." },
});
export const tp = (lang: Lang, k: keyof typeof P) => P[k][lang];
