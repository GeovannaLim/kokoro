/** Identidade 2: madeira de bambu, carvão e mostarda fosco (valores em globals.css, com variante para o modo escuro).
 *  Cores de dados do Kokoro (usadas no servidor e no navegador).
 *  Índices: cada gráfico mostra um índice só, na cor dele (mesma dos cards).
 *  Categorias (perfis): índigo, preto e vermelho, as cores da marca. Separação validada (inclusive daltonismo, ΔE ≥ 31);
 *  o preto é neutro de propósito, por isso os perfis levam sempre legenda e porcentagem escrita. */
export const SERIES = { apoio: "var(--d-2)", estigma: "var(--d-3)", abertura: "var(--d-1)" } as const;
export const CAT = ["var(--d-1)", "var(--d-2)", "var(--d-3)"] as const;
