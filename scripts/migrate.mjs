// Migrações do banco (Neon), aplicadas automaticamente antes de cada build na Vercel.
// Cada migração roda uma vez só (registro na tabela _migracoes). Sem DATABASE_URL (ex.: local), não faz nada.
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

if (!process.env.DATABASE_URL) { console.log("migrate: sem DATABASE_URL, pulando"); process.exit(0); }
const sql = neon(process.env.DATABASE_URL);
await sql`create table if not exists _migracoes (id text primary key, aplicada_em timestamptz not null default now())`;
const feitas = new Set((await sql`select id from _migracoes`).map((r) => r.id));

const MIGRACOES = [
  ["001_schema", async () => {
    for (const s of readFileSync("db/schema.sql", "utf8").split(";").map((x) => x.trim()).filter(Boolean)) await sql.query(s);
  }],
  // 002: regrava as respostas sintéticas com o código ORIGINAL de cada resposta
  // (a pergunta "abertura_observou" estava gravada já invertida e era invertida de novo no índice)
  ["002_sinteticas_codigo_original", async () => {
    const seed = JSON.parse(readFileSync("src/data/respostas-sinteticas.json", "utf8"));
    const [emp] = await sql`insert into empresas (slug, nome, areas) values ('aurora', ${seed.empresa}, ${seed.areas})
      on conflict (slug) do update set nome = excluded.nome, areas = excluded.areas returning id`;
    let [pes] = await sql`select id from pesquisas where empresa_id = ${emp.id} order by id limit 1`;
    if (!pes) [pes] = await sql`insert into pesquisas (empresa_id, token, titulo) values (${emp.id}, ${randomBytes(6).toString("base64url")}, 'Diagnóstico de cultura 2026') returning id`;
    await sql`delete from respostas where pesquisa_id = ${pes.id} and sintetica`;
    await sql.query(
      "insert into respostas (pesquisa_id, area, tempo_casa, modelo, time, respostas, sintetica) select $1, x.area, x.tempo_casa, x.modelo, x.time, x.respostas, true from jsonb_to_recordset($2::jsonb) as x(area text, tempo_casa text, modelo text, time text, respostas jsonb)",
      [pes.id, JSON.stringify(seed.respostas)],
    );
  }],
];

for (const [id, fn] of MIGRACOES) {
  if (feitas.has(id)) continue;
  await fn();
  await sql`insert into _migracoes (id) values (${id})`;
  console.log("migrate: aplicada", id);
}
console.log("migrate: ok");
