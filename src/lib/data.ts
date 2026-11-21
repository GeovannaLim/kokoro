import { cacheLife, cacheTag } from "next/cache";
import demo from "@/data/empresa-demo.json";
import { calcula, type DadosEmpresa, type Resposta } from "./analytics";
import { sql } from "./db";

export const EMPRESA_DEMO = "aurora";

/** Números da empresa: do banco (Neon) quando configurado; senão, o JSON sintético gerado pelo analytics/. */
export async function getDadosEmpresa(slug = EMPRESA_DEMO): Promise<DadosEmpresa> {
  "use cache";
  cacheLife("minutes");
  cacheTag("respostas");
  if (!sql) return demo as unknown as DadosEmpresa;
  const emp = (await sql`select id, nome from empresas where slug = ${slug}`)[0] as { id: number; nome: string } | undefined;
  if (!emp) return demo as unknown as DadosEmpresa;
  const rows = (await sql`
    select r.area, r.tempo_casa, r.modelo, r.time, r.respostas, r.sintetica
    from respostas r join pesquisas p on p.id = r.pesquisa_id
    where p.empresa_id = ${emp.id}`) as (Resposta & { sintetica: boolean })[];
  const periodo = new Date().toLocaleDateString("pt-BR", { month: "short", year: "numeric" }).replace(".", "");
  return calcula(emp.nome, rows, rows.every((r) => r.sintetica), periodo.charAt(0).toUpperCase() + periodo.slice(1));
}

export type PesquisaInfo = { token: string; titulo: string; empresa: string; areas: string[]; respostas: number; reais: number };

export async function getPesquisa(token?: string): Promise<PesquisaInfo | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("respostas");
  if (!sql) return null;
  const p = (token
    ? await sql`select p.id, p.token, p.titulo, e.nome, e.areas from pesquisas p join empresas e on e.id = p.empresa_id where p.token = ${token}`
    : await sql`select p.id, p.token, p.titulo, e.nome, e.areas from pesquisas p join empresas e on e.id = p.empresa_id where e.slug = ${EMPRESA_DEMO} order by p.id limit 1`
  )[0] as { id: number; token: string; titulo: string; nome: string; areas: string[] } | undefined;
  if (!p) return null;
  const c = (await sql`select count(*)::int as n, count(*) filter (where not sintetica)::int as reais from respostas where pesquisa_id = ${p.id}`)[0] as { n: number; reais: number };
  return { token: p.token, titulo: p.titulo, empresa: p.nome, areas: p.areas, respostas: c.n, reais: c.reais };
}
