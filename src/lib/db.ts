import { neon } from "@neondatabase/serverless";

/** Conexão com o Postgres (Neon). Sem DATABASE_URL, a plataforma usa só os dados sintéticos do JSON. */
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
