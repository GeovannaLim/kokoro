import demo from "@/data/empresa-demo.json";
import { PERGUNTAS, codigoIndice, type Indice } from "./questions";

/** Mesma lógica do analytics/build_dashboard_data.py, em TypeScript, para respostas vindas do banco.
 *  Índices: média dos códigos de cada índice × 100. Perfis: centro mais próximo (K-means treinado na OSMI). */
export const MIN_GRUPO = 5;
export type Idx = Record<Indice, number>;
export type Grupo = { n: number; oculto?: boolean; indices?: Idx; perfis?: Record<string, number> };
export type Resposta = { area: string; tempo_casa: string | null; modelo: string | null; time: string | null; respostas: Record<string, number | null> };
export type DadosEmpresa = {
  empresa: string; periodo: string; sintetico: boolean; min_grupo: number; total: Grupo;
  areas: Record<string, Grupo>; modelo: Record<string, Grupo>; tempo_casa: Record<string, Grupo>;
  perfis_def: typeof demo.perfis_def; referencia_osmi: typeof demo.referencia_osmi;
  perguntas: { id: string; indice: string; texto: string; media: number; distribuicao: Record<string, number> }[];
};

const INDICES: Indice[] = ["apoio", "estigma", "abertura"];

export function indicesDe(r: Resposta): Idx {
  const out = {} as Idx;
  for (const ind of INDICES) {
    const vals = PERGUNTAS.filter((p) => p.indice === ind).map((p) => codigoIndice(p, r.respostas[p.id] ?? null)).filter((v): v is number => v !== null);
    out[ind] = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) * 100 : NaN;
  }
  return out;
}

export function perfilDe(i: Idx): string {
  let best = demo.perfis_def[0].id, bd = Infinity;
  for (const p of demo.perfis_def) {
    const d = INDICES.reduce((s, k) => s + ((Number.isNaN(i[k]) ? p.centro[k] : i[k]) - p.centro[k]) ** 2, 0);
    if (d < bd) { bd = d; best = p.id; }
  }
  return best;
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const media = (xs: number[]) => { const v = xs.filter((x) => !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };

function resumo(rows: { idx: Idx; perfil: string }[]): Grupo {
  if (rows.length < MIN_GRUPO) return { n: rows.length, oculto: true };
  return {
    n: rows.length,
    indices: { apoio: r1(media(rows.map((r) => r.idx.apoio))), estigma: r1(media(rows.map((r) => r.idx.estigma))), abertura: r1(media(rows.map((r) => r.idx.abertura))) },
    perfis: Object.fromEntries(demo.perfis_def.map((p) => [p.id, r1((rows.filter((r) => r.perfil === p.id).length / rows.length) * 100)])),
  };
}

function agrupa(rows: (Resposta & { idx: Idx; perfil: string })[], key: "area" | "modelo" | "tempo_casa") {
  const m = new Map<string, (typeof rows)[number][]>();
  for (const r of rows) { const k = r[key] ?? "—"; m.set(k, [...(m.get(k) ?? []), r]); }
  return Object.fromEntries([...m.entries()].map(([k, v]) => [k, resumo(v)]));
}

export function calcula(empresa: string, respostas: Resposta[], sintetico: boolean, periodo: string): DadosEmpresa {
  const rows = respostas.map((r) => { const idx = indicesDe(r); return { ...r, idx, perfil: perfilDe(idx) }; });
  const perguntas = PERGUNTAS.map((p) => {
    const vals = respostas.map((r) => r.respostas[p.id]).filter((v): v is number => v !== null && v !== undefined);
    const dist: Record<string, number> = {};
    for (const v of vals) dist[String(v)] = (dist[String(v)] ?? 0) + 1;
    for (const k of Object.keys(dist)) dist[k] = r1((dist[k] / Math.max(vals.length, 1)) * 100);
    return { id: p.id, indice: p.indice, texto: p.texto, media: r1(media(vals) * 100), distribuicao: dist };
  });
  return {
    empresa, periodo, sintetico, min_grupo: MIN_GRUPO, total: resumo(rows),
    areas: agrupa(rows, "area"), modelo: agrupa(rows, "modelo"), tempo_casa: agrupa(rows, "tempo_casa"),
    perfis_def: demo.perfis_def, referencia_osmi: demo.referencia_osmi, perguntas,
  };
}
