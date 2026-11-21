/** Configuração central da marca — troque aqui e reflete no site todo. */
export const brand = {
  name: "Kokoro",
  kanji: "心",
  tagline: "Saúde mental organizacional, escutada com cuidado.",
  mascot: "Kokoro", // robô redondo de cachecol (personagem da fundadora)
  // TODO: definir e-mail comercial oficial antes de publicar
  contactEmail: "",
};

/**
 * Números agregados da pesquisa pública OSMI Mental Health in Tech 2016
 * (1.433 profissionais de tecnologia, licença CC BY 4.0). Só percentuais,
 * nenhum dado individual.
 */
export const osmi = {
  respondents: 1433,
  careerHarm: 46.6,        // acham que ser identificado prejudicaria (ou já prejudicou) a carreira
  wouldTellInterview: 7.8, // falariam de saúde mental numa entrevista de emprego
  neverDiscussed: 70.9,    // empresa nunca discutiu saúde mental formalmente
  unsureSerious: 43.0,     // não sabem se a empresa leva saúde mental tão a sério quanto a física
  source: "OSMI Mental Health in Tech Survey 2016 (CC BY 4.0)",
};
