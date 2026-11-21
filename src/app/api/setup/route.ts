// Rota de USO ÚNICO: cria as tabelas no Neon e grava a empresa demo (fictícia) com as respostas sintéticas.
// Protegida por KK_SETUP_TOKEN (variável só de produção). Será removida depois de rodar.
import { randomBytes } from "node:crypto";
import { sql } from "@/lib/db";
import seed from "@/data/respostas-sinteticas.json";

const SCHEMA = [
  `create table if not exists empresas (id serial primary key, slug text unique not null, nome text not null, areas text[] not null default '{}')`,
  `create table if not exists pesquisas (id serial primary key, empresa_id int not null references empresas(id), token text unique not null, titulo text not null, criada_em date not null default current_date)`,
  `create table if not exists respostas (id bigserial primary key, pesquisa_id int not null references pesquisas(id), area text not null, tempo_casa text, modelo text, time text, respostas jsonb not null, sintetica boolean not null default false, data date not null default current_date)`,
  `create index if not exists respostas_pesquisa on respostas(pesquisa_id)`,
];

export async function POST(req: Request) {
  const token = process.env.KK_SETUP_TOKEN;
  if (!token || req.headers.get("x-setup-token") !== token) return new Response("não autorizado", { status: 401 });
  if (!sql) return new Response("sem DATABASE_URL", { status: 500 });
  for (const s of SCHEMA) await sql.query(s);
  const [emp] = (await sql`insert into empresas (slug, nome, areas) values ('aurora', ${seed.empresa}, ${seed.areas})
    on conflict (slug) do update set nome = excluded.nome, areas = excluded.areas returning id`) as { id: number }[];
  let [pes] = (await sql`select id, token from pesquisas where empresa_id = ${emp.id} order by id limit 1`) as { id: number; token: string }[];
  if (!pes) [pes] = (await sql`insert into pesquisas (empresa_id, token, titulo) values (${emp.id}, ${randomBytes(6).toString("base64url")}, 'Diagnóstico de cultura 2026') returning id, token`) as { id: number; token: string }[];
  await sql`delete from respostas where pesquisa_id = ${pes.id} and sintetica`;
  await sql.query(
    "insert into respostas (pesquisa_id, area, tempo_casa, modelo, time, respostas, sintetica) select $1, x.area, x.tempo_casa, x.modelo, x.time, x.respostas, true from jsonb_to_recordset($2::jsonb) as x(area text, tempo_casa text, modelo text, time text, respostas jsonb)",
    [pes.id, JSON.stringify(seed.respostas)],
  );
  const [{ n }] = (await sql`select count(*)::int as n from respostas where pesquisa_id = ${pes.id}`) as { n: number }[];
  return Response.json({ ok: true, empresa: emp.id, pesquisa: pes.id, token: pes.token, respostas: n });
}
