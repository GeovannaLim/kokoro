/** Textos do site institucional (Início, Produto, Sobre nós) em PT, EN e ES.
 *  Mesmo idioma da plataforma: cookie kk-lang, senão o idioma do navegador (ver lib/lang.ts). */
import type { Lang } from "./i18n";

export type Hero = { l1: string; l2a: string; l2b: string };
type Spec = { nome: string; linhas: [string, string][] };

type SiteText = {
  nav: { inicio: string; produto: string; sobre: string; comecar: string; menu: string; fechar: string; idioma: string };
  footer: { titulo: [string, string]; produto: string; sobre: string; comecar: string; cvv: string };
  home: {
    hero: Hero & { video: string };
    telas: [string, string];
    dashboard: [string, string]; assistente: string; pesquisa: [string, string, string];
    perfis: string; plano: string; relatorio: [string, string];
    sobreTitulo: [string, string]; feito: [string, string]; sobreBtn: string;
  };
  produto: {
    hero: Hero;
    specsTitulo: string; specs: Spec[]; pdf: string; pdfHref: string; cores: [string, string, string];
    acuracia: [string, string]; ficha: [string, string][]; metricas: [string, string, number][];
    modelos: [string, string]; stack: string; codigo: [string, string];
    apresentacao: string; anterior: string; proximo: string; slidesAlt: string[];
  };
  sobre: {
    hero: Hero;
    nasceu: [string, string]; acreditamos: string; maioria: [string, string];
    missao: string; criamos: string; reune: string;
  };
};

const PT: SiteText = {
  nav: { inicio: "Início", produto: "Produto", sobre: "Sobre nós", comecar: "Começar", menu: "Menu", fechar: "Fechar", idioma: "Idioma" },
  footer: { titulo: ["Saúde mental organizacional,", "escutada com cuidado."], produto: "Produto", sobre: "Sobre", comecar: "Começar", cvv: "Em sofrimento agora? Ligue 188 (CVV), 24 horas, gratuito." },
  home: {
    hero: { l1: "Escute sua equipe.", l2a: "", l2b: "Cuide da cultura.", video: "Tour pelo Dashboard da plataforma Kokoro" },
    telas: ["Conheça as telas", "da plataforma"],
    dashboard: ["Dashboard", "Apoio, estigma e abertura por área, num painel só."],
    assistente: "Assistente com IA",
    pesquisa: ["Pesquisa", "anônima", "Vinte perguntas pelo celular, sem identificar ninguém."],
    perfis: "Perfis de equipe", plano: "Plano de ação",
    relatorio: ["Relatório NR-1", "Diagnóstico de riscos psicossociais e plano de ação em PDF, prontos para auditoria e para a diretoria."],
    sobreTitulo: ["Saúde mental no trabalho,", "levada a sério"], feito: ["Feito no Brasil", "com dados reais"], sobreBtn: "Sobre nós",
  },
  produto: {
    hero: { l1: "Da escuta anônima", l2a: "ao", l2b: "plano de ação." },
    specsTitulo: "Especificações",
    specs: [
      { nome: "Visão geral", linhas: [["Produto", "Plataforma de saúde mental organizacional"], ["Para quem", "RH e lideranças"], ["Acesso", "Pelo navegador, no computador ou no celular"], ["Idioma", "Português, inglês e espanhol"]] },
      { nome: "Pesquisa anônima", linhas: [["Perguntas", "20"], ["Tempo para responder", "Cerca de 5 minutos"], ["Envio", "Link único para a equipe"], ["Anonimato", "Resultados só para grupos de 5 pessoas ou mais"]] },
      { nome: "Índices de cultura", linhas: [["Apoio", "Quanto a empresa oferece suporte"], ["Estigma", "Quanto falar do tema ainda pesa"], ["Abertura", "Quanto se conversa sobre saúde mental"], ["Recortes", "Por área e por perfil de equipe"]] },
      { nome: "Modelos", linhas: [["Validação", "1.433 respostas reais (OSMI 2016)"], ["F1 · transtorno atual", "0,917"], ["F1 · busca por tratamento", "0,861"], ["Perfis de equipe", "3 grupos"]] },
      { nome: "Assistente com IA", linhas: [["Conversa", "Por texto ou por voz"], ["Dados usados", "Só números agregados da empresa"], ["Respostas", "Explica os índices e sugere ações"], ["Limite", "Não faz diagnóstico"]] },
      { nome: "Relatório NR-1", linhas: [["Formato", "PDF"], ["Conteúdo", "Diagnóstico e plano de ação"], ["Base", "Riscos psicossociais da NR-1"]] },
      { nome: "Privacidade", linhas: [["Lei", "LGPD"], ["Dados individuais", "O RH nunca vê respostas de uma pessoa"], ["Apoio imediato", "CVV 188, 24 horas, gratuito"]] },
    ],
    pdf: "Baixar PDF", pdfHref: "/site/pdf/kokoro-especificacoes-pt.pdf?v=id2", cores: ["Preto", "Azul", "Vermelho"],
    acuracia: ["Acurácia", "Medida pelo F1, que equilibra os acertos e os alarmes falsos do modelo."],
    metricas: [["F1 · transtorno", "0,917", 0.917], ["F1 · tratamento", "0,861", 0.861]],
    ficha: [["classes", "balanceadas"], ["variáveis", "top 10"], ["perfis", "K-means · 3"], ["índices", "3 de cultura"]],
    modelos: ["Modelos validados", "Dois classificadores de regressão logística treinados com 1.433 respostas reais da pesquisa OSMI 2016: um para transtorno atual e outro para busca por tratamento."],
    stack: "Python · pandas · scikit-learn",
    codigo: ["Código aberto", "Pipeline em Python, do tratamento dos dados aos índices de cultura e aos perfis de equipe. Repositório público no GitHub."],
    apresentacao: "Apresentação", anterior: "Slide anterior", proximo: "Próximo slide",
    slidesAlt: ["Kokoro: escute sua equipe, cuide da cultura", "Problema: 546 mil afastamentos por transtornos mentais em 2025, cerca de R$ 1 bi pagos pelo INSS", "Solução: pesquisa, índices, perfis e plano, relatório NR-1", "Por que agora: a NR-1 exige avaliar riscos psicossociais desde 26/05/2026", "Mercado: 57,1 milhões de vínculos formais", "Concorrência", "Produto: telas da plataforma", "Por dentro: dados reais da OSMI e privacidade", "Modelo de negócio: software por pessoa por mês", "Impacto: da escuta à ação", "Equipe: Geovanna Lim", "Próximos passos"],
  },
  sobre: {
    hero: { l1: "Empresas onde é seguro", l2a: "falar de", l2b: "saúde mental." },
    nasceu: ["Somos uma empresa brasileira que nasceu de dados reais: os modelos do Kokoro começaram no EY AI & Data Challenge, com respostas de", "profissionais de tecnologia"],
    acreditamos: "Acreditamos que cuidar da saúde mental no trabalho precisa ser simples, anônimo e baseado em evidências",
    maioria: ["Mas a maioria das empresas ainda não sabe por onde começar:", "nunca discutiram o tema formalmente, e quase metade das pessoas teme que falar sobre isso prejudique a carreira"],
    missao: "Nossa missão é ajudar cada empresa a escutar sua equipe e cuidar da cultura",
    criamos: "Por isso criamos o Kokoro: a plataforma que transforma escuta anônima em plano de ação",
    reune: "O Kokoro reúne pesquisa anônima, índices de cultura, assistente com IA e relatório NR-1 para o RH agir com segurança e confiança",
  },
};

const EN: SiteText = {
  nav: { inicio: "Home", produto: "Product", sobre: "About us", comecar: "Get started", menu: "Menu", fechar: "Close", idioma: "Language" },
  footer: { titulo: ["Organizational mental health,", "listened to with care."], produto: "Product", sobre: "About", comecar: "Get started", cvv: "Struggling right now? In Brazil, call 188 (CVV), 24/7, free of charge." },
  home: {
    hero: { l1: "Listen to your team.", l2a: "", l2b: "Care for the culture.", video: "Tour of the Kokoro platform dashboard" },
    telas: ["Meet the screens", "of the platform"],
    dashboard: ["Dashboard", "Support, stigma and openness by area, in a single dashboard."],
    assistente: "AI assistant",
    pesquisa: ["Anonymous", "survey", "Twenty questions on the phone, without identifying anyone."],
    perfis: "Team profiles", plano: "Action plan",
    relatorio: ["NR-1 report", "Psychosocial risk assessment and action plan in PDF, ready for audits and for the board."],
    sobreTitulo: ["Mental health at work,", "taken seriously"], feito: ["Made in Brazil", "with real data"], sobreBtn: "About us",
  },
  produto: {
    hero: { l1: "From anonymous listening", l2a: "to an", l2b: "action plan." },
    specsTitulo: "Specifications",
    specs: [
      { nome: "Overview", linhas: [["Product", "Organizational mental health platform"], ["For whom", "HR and leadership"], ["Access", "In the browser, on computer or phone"], ["Language", "Portuguese, English and Spanish"]] },
      { nome: "Anonymous survey", linhas: [["Questions", "20"], ["Time to answer", "About 5 minutes"], ["Delivery", "One link for the whole team"], ["Anonymity", "Results only for groups of 5 people or more"]] },
      { nome: "Culture indexes", linhas: [["Support", "How much support the company offers"], ["Stigma", "How heavy it still is to talk about it"], ["Openness", "How much people talk about mental health"], ["Breakdowns", "By area and by team profile"]] },
      { nome: "Models", linhas: [["Validation", "1,433 real responses (OSMI 2016)"], ["F1 · current disorder", "0.917"], ["F1 · treatment seeking", "0.861"], ["Team profiles", "3 groups"]] },
      { nome: "AI assistant", linhas: [["Conversation", "By text or by voice"], ["Data used", "Only the company's aggregated numbers"], ["Answers", "Explains the indexes and suggests actions"], ["Limit", "Does not diagnose"]] },
      { nome: "NR-1 report", linhas: [["Format", "PDF"], ["Content", "Assessment and action plan"], ["Basis", "NR-1 psychosocial risks"]] },
      { nome: "Privacy", linhas: [["Law", "LGPD"], ["Individual data", "HR never sees an individual's answers"], ["Immediate support", "CVV 188 (Brazil), 24/7, free"]] },
    ],
    pdf: "Download PDF", pdfHref: "/site/pdf/kokoro-especificacoes-en.pdf?v=id2", cores: ["Black", "Blue", "Red"],
    acuracia: ["Accuracy", "Measured by F1, which balances the model's hits and false alarms."],
    metricas: [["F1 · disorder", "0.917", 0.917], ["F1 · treatment", "0.861", 0.861]],
    ficha: [["classes", "balanced"], ["features", "top 10"], ["profiles", "K-means · 3"], ["indexes", "3 on culture"]],
    modelos: ["Validated models", "Two logistic regression classifiers trained on 1,433 real responses from the OSMI 2016 survey: one for current disorder and one for treatment seeking."],
    stack: "Python · pandas · scikit-learn",
    codigo: ["Open source", "A Python pipeline, from data cleaning to culture indexes and team profiles. Public GitHub repository."],
    apresentacao: "Presentation", anterior: "Previous slide", proximo: "Next slide",
    slidesAlt: ["Kokoro: listen to your team, care for the culture", "Problem: 546k sick leaves for mental disorders in 2025, about R$ 1B paid by the INSS", "Solution: survey, indexes, profiles and plan, NR-1 report", "Why now: NR-1 requires assessing psychosocial risks since May 26, 2026", "Market: 57.1 million formal jobs", "Competition", "Product: platform screens", "Under the hood: real OSMI data and privacy", "Business model: software per person per month", "Impact: from listening to action", "Team: Geovanna Lim", "Next steps"],
  },
  sobre: {
    hero: { l1: "Companies where it's safe", l2a: "to talk about", l2b: "mental health." },
    nasceu: ["We are a Brazilian company born from real data: Kokoro's models started at the EY AI & Data Challenge, with answers from", "tech professionals"],
    acreditamos: "We believe caring for mental health at work has to be simple, anonymous and evidence-based",
    maioria: ["But most companies still don't know where to start:", "have never discussed the topic formally, and almost half of people fear that talking about it will hurt their careers"],
    missao: "Our mission is to help every company listen to its team and care for its culture",
    criamos: "That's why we created Kokoro: the platform that turns anonymous listening into an action plan",
    reune: "Kokoro brings together an anonymous survey, culture indexes, an AI assistant and an NR-1 report so HR can act safely and confidently",
  },
};

const ES: SiteText = {
  nav: { inicio: "Inicio", produto: "Producto", sobre: "Sobre nosotros", comecar: "Empezar", menu: "Menú", fechar: "Cerrar", idioma: "Idioma" },
  footer: { titulo: ["Salud mental organizacional,", "escuchada con cuidado."], produto: "Producto", sobre: "Nosotros", comecar: "Empezar", cvv: "¿Lo estás pasando mal? En Brasil, llama al 188 (CVV), las 24 horas, gratis." },
  home: {
    hero: { l1: "Escucha a tu equipo.", l2a: "", l2b: "Cuida la cultura.", video: "Recorrido por el panel de la plataforma Kokoro" },
    telas: ["Conoce las pantallas", "de la plataforma"],
    dashboard: ["Panel", "Apoyo, estigma y apertura por área, en un solo panel."],
    assistente: "Asistente con IA",
    pesquisa: ["Encuesta", "anónima", "Veinte preguntas desde el móvil, sin identificar a nadie."],
    perfis: "Perfiles de equipo", plano: "Plan de acción",
    relatorio: ["Informe NR-1", "Diagnóstico de riesgos psicosociales y plan de acción en PDF, listos para auditoría y para la dirección."],
    sobreTitulo: ["Salud mental en el trabajo,", "tomada en serio"], feito: ["Hecho en Brasil", "con datos reales"], sobreBtn: "Sobre nosotros",
  },
  produto: {
    hero: { l1: "De la escucha anónima", l2a: "al", l2b: "plan de acción." },
    specsTitulo: "Especificaciones",
    specs: [
      { nome: "Visión general", linhas: [["Producto", "Plataforma de salud mental organizacional"], ["Para quién", "RR. HH. y liderazgos"], ["Acceso", "Desde el navegador, en el ordenador o el móvil"], ["Idioma", "Portugués, inglés y español"]] },
      { nome: "Encuesta anónima", linhas: [["Preguntas", "20"], ["Tiempo para responder", "Unos 5 minutos"], ["Envío", "Un único enlace para el equipo"], ["Anonimato", "Resultados solo para grupos de 5 personas o más"]] },
      { nome: "Índices de cultura", linhas: [["Apoyo", "Cuánto apoyo ofrece la empresa"], ["Estigma", "Cuánto pesa todavía hablar del tema"], ["Apertura", "Cuánto se habla de salud mental"], ["Desgloses", "Por área y por perfil de equipo"]] },
      { nome: "Modelos", linhas: [["Validación", "1.433 respuestas reales (OSMI 2016)"], ["F1 · trastorno actual", "0,917"], ["F1 · búsqueda de tratamiento", "0,861"], ["Perfiles de equipo", "3 grupos"]] },
      { nome: "Asistente con IA", linhas: [["Conversación", "Por texto o por voz"], ["Datos usados", "Solo números agregados de la empresa"], ["Respuestas", "Explica los índices y sugiere acciones"], ["Límite", "No hace diagnósticos"]] },
      { nome: "Informe NR-1", linhas: [["Formato", "PDF"], ["Contenido", "Diagnóstico y plan de acción"], ["Base", "Riesgos psicosociales de la NR-1"]] },
      { nome: "Privacidad", linhas: [["Ley", "LGPD"], ["Datos individuales", "RR. HH. nunca ve las respuestas de una persona"], ["Apoyo inmediato", "CVV 188 (Brasil), 24 horas, gratis"]] },
    ],
    pdf: "Descargar PDF", pdfHref: "/site/pdf/kokoro-especificacoes-es.pdf?v=id2", cores: ["Negro", "Azul", "Rojo"],
    acuracia: ["Precisión", "Medida con el F1, que equilibra los aciertos y las falsas alarmas del modelo."],
    metricas: [["F1 · trastorno", "0,917", 0.917], ["F1 · tratamiento", "0,861", 0.861]],
    ficha: [["clases", "balanceadas"], ["variables", "top 10"], ["perfiles", "K-means · 3"], ["índices", "3 de cultura"]],
    modelos: ["Modelos validados", "Dos clasificadores de regresión logística entrenados con 1.433 respuestas reales de la encuesta OSMI 2016: uno para trastorno actual y otro para búsqueda de tratamiento."],
    stack: "Python · pandas · scikit-learn",
    codigo: ["Código abierto", "Pipeline en Python, del tratamiento de los datos a los índices de cultura y los perfiles de equipo. Repositorio público en GitHub."],
    apresentacao: "Presentación", anterior: "Diapositiva anterior", proximo: "Siguiente diapositiva",
    slidesAlt: ["Kokoro: escucha a tu equipo, cuida la cultura", "Problema: 546 mil bajas por trastornos mentales en 2025, unos R$ 1.000 M pagados por el INSS", "Solución: encuesta, índices, perfiles y plan, informe NR-1", "Por qué ahora: la NR-1 exige evaluar los riesgos psicosociales desde el 26/05/2026", "Mercado: 57,1 millones de empleos formales", "Competencia", "Producto: pantallas de la plataforma", "Por dentro: datos reales de la OSMI y privacidad", "Modelo de negocio: software por persona al mes", "Impacto: de la escucha a la acción", "Equipo: Geovanna Lim", "Próximos pasos"],
  },
  sobre: {
    hero: { l1: "Empresas donde es seguro", l2a: "hablar de", l2b: "salud mental." },
    nasceu: ["Somos una empresa brasileña que nació de datos reales: los modelos de Kokoro empezaron en el EY AI & Data Challenge, con respuestas de", "profesionales de tecnología"],
    acreditamos: "Creemos que cuidar la salud mental en el trabajo tiene que ser simple, anónimo y basado en evidencia",
    maioria: ["Pero la mayoría de las empresas aún no sabe por dónde empezar: el", "nunca ha tratado el tema formalmente, y casi la mitad de las personas teme que hablar de ello perjudique su carrera"],
    missao: "Nuestra misión es ayudar a cada empresa a escuchar a su equipo y cuidar su cultura",
    criamos: "Por eso creamos Kokoro: la plataforma que convierte la escucha anónima en un plan de acción",
    reune: "Kokoro reúne encuesta anónima, índices de cultura, asistente con IA e informe NR-1 para que RR. HH. actúe con seguridad y confianza",
  },
};

export const SITE: Record<Lang, SiteText> = { pt: PT, en: EN, es: ES };
export const GITHUB = "https://github.com/GeovannaLim/kokoro";
export const CONTATO = "geovannalim2012@gmail.com";
