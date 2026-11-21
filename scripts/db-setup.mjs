// Cria as tabelas no Neon e grava a empresa demo (fictícia) com as respostas sintéticas.
// Uso: node --env-file=.env.local scripts/db-setup.mjs   (precisa de DATABASE_URL e de analytics/out/respostas_sinteticas.csv)
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const sql = neon(process.env.DATABASE_URL);
for (const stmt of readFileSync("db/schema.sql", "utf8").split(";").map((s) => s.trim()).filter(Boolean)) await sql.query(stmt);

const csv = readFileSync("analytics/out/respostas_sinteticas.csv", "utf8").trim().split("\n");
const head = csv[0].split(",");
const rows = csv.slice(1).map((l) => Object.fromEntries(l.split(",").map((v, i) => [head[i], v])));
const ids = head.filter((h) => /^(apoio|estigma|abertura)_/.test(h));
const areas = [...new Set(rows.map((r) => r.area))];

const [emp] = await sql`insert into empresas (slug, nome, areas) values ('aurora', ${rows[0].empresa}, ${areas})
  on conflict (slug) do update set nome = excluded.nome, areas = excluded.areas returning id`;
let [pes] = await sql`select id, token from pesquisas where empresa_id = ${emp.id} order by id limit 1`;
if (!pes) [pes] = await sql`insert into pesquisas (empresa_id, token, titulo) values (${emp.id}, ${randomBytes(6).toString("base64url")}, 'Diagnóstico de cultura 2026') returning id, token`;

await sql`delete from respostas where pesquisa_id = ${pes.id} and sintetica`;
for (let i = 0; i < rows.length; i += 50) {
  const chunk = rows.slice(i, i + 50);
  await sql.query(
    "insert into respostas (pesquisa_id, area, tempo_casa, modelo, time, respostas, sintetica) select $1, x.area, x.tempo_casa, x.modelo, x.time, x.respostas, true from jsonb_to_recordset($2::jsonb) as x(area text, tempo_casa text, modelo text, time text, respostas jsonb)",
    [pes.id, JSON.stringify(chunk.map((r) => ({ area: r.area, tempo_casa: r.tempo_casa, modelo: r.modelo, time: r.time,
      respostas: Object.fromEntries(ids.map((k) => [k, r[k] === "" ? null : Number(r[k])])) })))],
  );
}
const [{ n }] = await sql`select count(*)::int as n from respostas where pesquisa_id = ${pes.id}`;
console.log(`ok: empresa ${emp.id}, pesquisa ${pes.id} (token ${pes.token}), ${n} respostas`);
