"use server";
import { updateTag } from "next/cache";
import { sql } from "@/lib/db";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";

export type Envio = { token: string; contexto: Record<string, string>; respostas: Record<string, number | null> };

/** Grava uma resposta anônima: sem nome, e-mail, IP ou horário (só a data, preenchida pelo banco). */
export async function enviarResposta(e: Envio): Promise<{ ok: boolean; erro?: string }> {
  if (!sql) return { ok: false, erro: "O banco ainda não está configurado." };
  const p = (await sql`select p.id, e.areas from pesquisas p join empresas e on e.id = p.empresa_id where p.token = ${e.token}`)[0] as { id: number; areas: string[] } | undefined;
  if (!p) return { ok: false, erro: "Pesquisa não encontrada." };
  if (!p.areas.includes(e.contexto.area)) return { ok: false, erro: "Escolha a sua área." };
  for (const c of CONTEXTO) {
    if ("opcoes" in c && e.contexto[c.id] && !(c.opcoes as readonly string[]).includes(e.contexto[c.id])) return { ok: false, erro: "Resposta inválida." };
  }
  const limpas: Record<string, number | null> = {};
  for (const q of PERGUNTAS) {
    const v = e.respostas[q.id];
    if (v === undefined) return { ok: false, erro: "Responda todas as perguntas." };
    if (!q.opcoes.some((o) => o.code === v)) return { ok: false, erro: "Resposta inválida." };
    limpas[q.id] = v;
  }
  await sql`insert into respostas (pesquisa_id, area, tempo_casa, modelo, time, respostas)
            values (${p.id}, ${e.contexto.area}, ${e.contexto.tempo_casa ?? null}, ${e.contexto.modelo ?? null}, ${e.contexto.time ?? null}, ${JSON.stringify(limpas)}::jsonb)`;
  updateTag("respostas");
  return { ok: true };
}
