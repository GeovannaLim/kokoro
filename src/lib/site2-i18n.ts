/** Identidade 2 (estética Costura Inovadora): textos do site em PT, EN e ES.
 *  Specs, métricas e slides continuam vindo de site-i18n.ts (mesmo conteúdo, só a forma muda). */
import type { Lang } from "./i18n";

type Feature = { n: string; nome: string; desc: string; itens: string[]; tela: string };
type Faq = [string, string];

export type Site2 = {
  nav: { conceito: string; recursos: string; perguntas: string; produto: string; sobre: string; comecar: string; menu: string; fechar: string; idioma: string; pausar: string; tocar: string };
  home: {
    h1a: string; h1small: string; h1b: string; h1c: string;
    lead: string; cta1: string; cta2: string;
    tag: string; statement: string;
    barra: string; pills: string[];
    recursosTitulo: string; recursosBtn: string; features: Feature[];
    cinema: string; comecar: string;
    faqTag: string; faqT1: string; faqT2: string; faq: Faq[];
    fim1: string; fim2: string;
  };
  produto: { tag: string; h1a: string; h1b: string; lead: string; modeloTag: string; modeloTitulo: string; slidesTag: string };
  sobre: {
    tag: string; h1a: string; h1b: string; lead: string;
    numeros: [string, number, number, string, string][];
    missaoTag: string; missao: string; criamos: string; reune: string; cta: string;
  };
  footer: { slogan: string; acessar: string; navegacao: string; creditos: string; creditosLista: string[]; cvv: string; direitos: string };
};

const CREDITOS = ["Vídeo: Artem Podrez / Pexels", "Fotos: Kampus Production, MART PRODUCTION e outros / Pexels"];

const PT: Site2 = {
  nav: { conceito: "Conceito", recursos: "Recursos", perguntas: "Perguntas", produto: "Produto", sobre: "Sobre nós", comecar: "Começar", menu: "Menu", fechar: "Fechar", idioma: "Idioma", pausar: "Pausar vídeo", tocar: "Tocar vídeo" },
  home: {
    h1a: "Sua equipe", h1small: "inteira", h1b: "merece ser", h1c: "escutada.",
    lead: "O Kokoro transforma uma pesquisa anônima em índices de cultura, perfis de equipe e um plano de ação para o RH cuidar da saúde mental e cumprir a NR-1.",
    cta1: "Conhecer a plataforma", cta2: "Ver os recursos",
    tag: "HR tech",
    statement: "Aqui, a escuta vem primeiro e a ação acompanha. Reunimos num só lugar o que o RH precisa para entender a equipe, sem expor ninguém.",
    barra: "Da escuta à ação", pills: ["Pesquisa", "Índices", "Perfis", "Plano"],
    recursosTitulo: "Ferramentas que cuidam da sua equipe", recursosBtn: "Começar agora",
    features: [
      { n: "01", nome: "Dashboard", desc: "Apoio, estigma e abertura de 0 a 100, por área, comparados com a referência real da OSMI.", itens: ["Três índices de cultura", "Mapa das áreas", "Área prioritária em destaque", "As 16 perguntas, uma a uma"], tela: "dashboard" },
      { n: "02", nome: "Perfis de equipe", desc: "Agrupamento K-means treinado com 1.433 respostas reais mostra quem se sente acolhido e quem está em silêncio.", itens: ["Acolhidos, Abertos sem apoio, Em silêncio", "Recortes por área, tempo de casa e modelo de trabalho", "O que fazer com cada grupo"], tela: "perfis" },
      { n: "03", nome: "Plano de ação", desc: "Ações de 30, 60 e 90 dias geradas a partir das perguntas com pior resultado e das áreas prioritárias.", itens: ["Responsável por ação", "Marcar como feito", "Progresso do plano"], tela: "plano" },
      { n: "04", nome: "Relatório NR-1", desc: "Diagnóstico de riscos psicossociais e plano de ação em PDF, prontos para o PGR, a auditoria e a diretoria.", itens: ["Pronto para imprimir em PDF", "Apoia o PGR", "Não substitui profissional habilitado"], tela: "relatorio" },
    ],
    cinema: "Para os dias em que a equipe não fala.",
    comecar: "Escolha por onde começar, no seu ritmo",
    faqTag: "Perguntas", faqT1: "Tudo o que você precisa saber", faqT2: "antes de escutar a sua equipe.",
    faq: [
      ["Para quem é o Kokoro?", "Para o RH e as lideranças de empresas que querem entender a cultura de saúde mental da equipe e cumprir a NR-1, que exige avaliar riscos psicossociais desde 26 de maio de 2026."],
      ["As respostas são mesmo anônimas?", "Sim. A pesquisa não pede nome, e-mail, IP ou horário, e nenhum resultado aparece para grupos com menos de 5 pessoas. O RH nunca vê a resposta de uma pessoa."],
      ["O Kokoro faz diagnóstico?", "Não. O Kokoro mede a cultura da empresa, não a saúde de cada pessoa. Quem está em sofrimento deve buscar um profissional; o CVV atende pelo 188, 24 horas."],
      ["Como o assistente com IA usa os dados?", "Ele só recebe números agregados da empresa e conversa por texto ou por voz para explicar os índices e sugerir ações."],
    ],
    fim1: "Escuta com", fim2: "cuidado",
  },
  produto: { tag: "Produto", h1a: "Da escuta anônima", h1b: "ao plano de ação.", lead: "Tudo o que o Kokoro faz, do envio da pesquisa ao relatório da NR-1, com dados reais por trás de cada número.", modeloTag: "Por dentro", modeloTitulo: "Modelos treinados com dados reais", slidesTag: "Apresentação" },
  sobre: {
    tag: "Sobre nós", h1a: "Empresas onde é seguro", h1b: "falar de saúde mental.",
    lead: "Somos uma empresa brasileira que nasceu de dados reais: os modelos do Kokoro começaram no EY AI & Data Challenge.",
    numeros: [
      ["respostas reais de profissionais de tecnologia treinam os modelos", 1433, 0, "", "OSMI 2016"],
      ["das empresas nunca discutiram saúde mental formalmente", 70.9, 1, "%", "OSMI 2016"],
      ["afastamentos por transtornos mentais no Brasil em 2025", 546, 0, " mil", "INSS"],
    ],
    missaoTag: "Missão", missao: "Ajudar cada empresa a escutar a sua equipe e cuidar da cultura.",
    criamos: "Por isso criamos o Kokoro: a plataforma que transforma escuta anônima em plano de ação.",
    reune: "Pesquisa anônima, índices de cultura, assistente com IA e relatório NR-1 para o RH agir com segurança e confiança.",
    cta: "Conhecer a plataforma",
  },
  footer: { slogan: "Saúde mental organizacional, escutada com cuidado.", acessar: "Acessar a plataforma", navegacao: "Navegação", creditos: "Créditos", creditosLista: CREDITOS, cvv: "Em sofrimento agora? Ligue 188 (CVV), 24 horas, gratuito.", direitos: "© 2026 Kokoro. Todos os direitos reservados." },
};

const EN: Site2 = {
  nav: { conceito: "Concept", recursos: "Features", perguntas: "Questions", produto: "Product", sobre: "About us", comecar: "Get started", menu: "Menu", fechar: "Close", idioma: "Language", pausar: "Pause video", tocar: "Play video" },
  home: {
    h1a: "Your", h1small: "whole", h1b: "team deserves", h1c: "to be heard.",
    lead: "Kokoro turns an anonymous survey into culture indexes, team profiles and an action plan, so HR can care for mental health and comply with NR-1.",
    cta1: "Explore the platform", cta2: "See the features",
    tag: "HR tech",
    statement: "Here, listening comes first and action follows. We bring together everything HR needs to understand the team, without exposing anyone.",
    barra: "From listening to action", pills: ["Survey", "Indexes", "Profiles", "Plan"],
    recursosTitulo: "Tools that take care of your team", recursosBtn: "Get started now",
    features: [
      { n: "01", nome: "Dashboard", desc: "Support, stigma and openness from 0 to 100, by area, compared with the real OSMI reference.", itens: ["Three culture indexes", "Map of the areas", "Priority area highlighted", "All 16 questions, one by one"], tela: "dashboard" },
      { n: "02", nome: "Team profiles", desc: "K-means clustering trained on 1,433 real responses shows who feels supported and who stays silent.", itens: ["Supported, Open but unsupported, Silent", "Breakdowns by area, tenure and work model", "What to do with each group"], tela: "perfis" },
      { n: "03", nome: "Action plan", desc: "30, 60 and 90-day actions generated from the lowest-scoring questions and the priority areas.", itens: ["An owner for each action", "Mark as done", "Plan progress"], tela: "plano" },
      { n: "04", nome: "NR-1 report", desc: "Psychosocial risk assessment and action plan in PDF, ready for the risk program, audits and the board.", itens: ["Ready to print as PDF", "Supports the risk program", "Does not replace a licensed professional"], tela: "relatorio" },
    ],
    cinema: "For the days when the team doesn't speak up.",
    comecar: "Choose where to start, at your own pace",
    faqTag: "Questions", faqT1: "Everything you need to know", faqT2: "before listening to your team.",
    faq: [
      ["Who is Kokoro for?", "For HR and leaders at companies that want to understand their team's mental health culture and comply with NR-1, which has required psychosocial risk assessment since May 26, 2026."],
      ["Are the answers really anonymous?", "Yes. The survey asks for no name, email, IP or time, and no result is shown for groups smaller than 5 people. HR never sees an individual's answers."],
      ["Does Kokoro diagnose people?", "No. Kokoro measures the company's culture, not each person's health. Anyone in distress should seek a professional; in Brazil, CVV answers at 188, 24 hours a day."],
      ["How does the AI assistant use the data?", "It only receives the company's aggregated numbers and talks by text or voice to explain the indexes and suggest actions."],
    ],
    fim1: "Listening with", fim2: "care",
  },
  produto: { tag: "Product", h1a: "From anonymous listening", h1b: "to an action plan.", lead: "Everything Kokoro does, from sending the survey to the NR-1 report, with real data behind every number.", modeloTag: "Under the hood", modeloTitulo: "Models trained on real data", slidesTag: "Pitch deck" },
  sobre: {
    tag: "About us", h1a: "Workplaces where it's safe", h1b: "to talk about mental health.",
    lead: "We are a Brazilian company born from real data: Kokoro's models started at the EY AI & Data Challenge.",
    numeros: [
      ["real responses from tech professionals train the models", 1433, 0, "", "OSMI 2016"],
      ["of companies have never formally discussed mental health", 70.9, 1, "%", "OSMI 2016"],
      ["sick leaves for mental disorders in Brazil in 2025", 546, 0, "k", "INSS"],
    ],
    missaoTag: "Mission", missao: "Help every company listen to its team and care for its culture.",
    criamos: "That's why we built Kokoro: the platform that turns anonymous listening into an action plan.",
    reune: "Anonymous survey, culture indexes, AI assistant and NR-1 report so HR can act with safety and confidence.",
    cta: "Explore the platform",
  },
  footer: { slogan: "Workplace mental health, listened to with care.", acessar: "Open the platform", navegacao: "Navigation", creditos: "Credits", creditosLista: ["Video: Artem Podrez / Pexels", "Photos: Kampus Production, MART PRODUCTION and others / Pexels"], cvv: "In distress right now? In Brazil, call 188 (CVV), 24 hours, free.", direitos: "© 2026 Kokoro. All rights reserved." },
};

const ES: Site2 = {
  nav: { conceito: "Concepto", recursos: "Recursos", perguntas: "Preguntas", produto: "Producto", sobre: "Nosotros", comecar: "Empezar", menu: "Menú", fechar: "Cerrar", idioma: "Idioma", pausar: "Pausar video", tocar: "Reproducir video" },
  home: {
    h1a: "Todo tu", h1small: "equipo", h1b: "merece ser", h1c: "escuchado.",
    lead: "Kokoro convierte una encuesta anónima en índices de cultura, perfiles de equipo y un plan de acción para que RR. HH. cuide la salud mental y cumpla la NR-1.",
    cta1: "Conocer la plataforma", cta2: "Ver los recursos",
    tag: "HR tech",
    statement: "Aquí, la escucha va primero y la acción la acompaña. Reunimos en un solo lugar lo que RR. HH. necesita para entender al equipo, sin exponer a nadie.",
    barra: "De la escucha a la acción", pills: ["Encuesta", "Índices", "Perfiles", "Plan"],
    recursosTitulo: "Herramientas que cuidan a tu equipo", recursosBtn: "Empezar ahora",
    features: [
      { n: "01", nome: "Dashboard", desc: "Apoyo, estigma y apertura de 0 a 100, por área, comparados con la referencia real de la OSMI.", itens: ["Tres índices de cultura", "Mapa de las áreas", "Área prioritaria destacada", "Las 16 preguntas, una a una"], tela: "dashboard" },
      { n: "02", nome: "Perfiles de equipo", desc: "Un agrupamiento K-means entrenado con 1.433 respuestas reales muestra quién se siente acogido y quién calla.", itens: ["Acogidos, Abiertos sin apoyo, En silencio", "Desgloses por área, antigüedad y modelo de trabajo", "Qué hacer con cada grupo"], tela: "perfis" },
      { n: "03", nome: "Plan de acción", desc: "Acciones a 30, 60 y 90 días generadas a partir de las preguntas con peor resultado y de las áreas prioritarias.", itens: ["Responsable por acción", "Marcar como hecho", "Progreso del plan"], tela: "plano" },
      { n: "04", nome: "Informe NR-1", desc: "Diagnóstico de riesgos psicosociales y plan de acción en PDF, listos para el programa de riesgos, la auditoría y la dirección.", itens: ["Listo para imprimir en PDF", "Apoya el programa de riesgos", "No sustituye a un profesional habilitado"], tela: "relatorio" },
    ],
    cinema: "Para los días en que el equipo no habla.",
    comecar: "Elige por dónde empezar, a tu ritmo",
    faqTag: "Preguntas", faqT1: "Todo lo que necesitas saber", faqT2: "antes de escuchar a tu equipo.",
    faq: [
      ["¿Para quién es Kokoro?", "Para RR. HH. y los líderes de empresas que quieren entender la cultura de salud mental de su equipo y cumplir la NR-1, que exige evaluar riesgos psicosociales desde el 26 de mayo de 2026."],
      ["¿Las respuestas son realmente anónimas?", "Sí. La encuesta no pide nombre, correo, IP ni hora, y no se muestra ningún resultado de grupos de menos de 5 personas. RR. HH. nunca ve las respuestas de una persona."],
      ["¿Kokoro hace diagnósticos?", "No. Kokoro mide la cultura de la empresa, no la salud de cada persona. Quien esté en sufrimiento debe buscar a un profesional; en Brasil, el CVV atiende en el 188, las 24 horas."],
      ["¿Cómo usa los datos el asistente con IA?", "Solo recibe números agregados de la empresa y conversa por texto o por voz para explicar los índices y sugerir acciones."],
    ],
    fim1: "Escucha con", fim2: "cuidado",
  },
  produto: { tag: "Producto", h1a: "De la escucha anónima", h1b: "al plan de acción.", lead: "Todo lo que hace Kokoro, del envío de la encuesta al informe de la NR-1, con datos reales detrás de cada número.", modeloTag: "Por dentro", modeloTitulo: "Modelos entrenados con datos reales", slidesTag: "Presentación" },
  sobre: {
    tag: "Nosotros", h1a: "Empresas donde es seguro", h1b: "hablar de salud mental.",
    lead: "Somos una empresa brasileña que nació de datos reales: los modelos de Kokoro empezaron en el EY AI & Data Challenge.",
    numeros: [
      ["respuestas reales de profesionales de tecnología entrenan los modelos", 1433, 0, "", "OSMI 2016"],
      ["de las empresas nunca habló formalmente de salud mental", 70.9, 1, "%", "OSMI 2016"],
      ["bajas por trastornos mentales en Brasil en 2025", 546, 0, " mil", "INSS"],
    ],
    missaoTag: "Misión", missao: "Ayudar a cada empresa a escuchar a su equipo y cuidar su cultura.",
    criamos: "Por eso creamos Kokoro: la plataforma que convierte la escucha anónima en un plan de acción.",
    reune: "Encuesta anónima, índices de cultura, asistente con IA e informe NR-1 para que RR. HH. actúe con seguridad y confianza.",
    cta: "Conocer la plataforma",
  },
  footer: { slogan: "Salud mental organizacional, escuchada con cuidado.", acessar: "Abrir la plataforma", navegacao: "Navegación", creditos: "Créditos", creditosLista: ["Video: Artem Podrez / Pexels", "Fotos: Kampus Production, MART PRODUCTION e outros / Pexels"], cvv: "¿En sufrimiento ahora? En Brasil, llama al 188 (CVV), 24 horas, gratis.", direitos: "© 2026 Kokoro. Todos los derechos reservados." },
};

export const SITE2: Record<Lang, Site2> = { pt: PT, en: EN, es: ES };
