/** Cores de dados do Kokoro (usadas no servidor e no navegador).
 *  Índices: cada gráfico mostra um índice só, na cor dele (mesma dos cards).
 *  Categorias (perfis): índigo, preto e vermelho, as cores da marca. Separação validada (inclusive daltonismo, ΔE ≥ 31);
 *  o preto é neutro de propósito, por isso os perfis levam sempre legenda e porcentagem escrita. */
export const SERIES = { apoio: "#22336b", estigma: "#b5382c", abertura: "#111111" } as const;
export const CAT = ["#3d5aa8", "#111111", "#c2493b"] as const;
