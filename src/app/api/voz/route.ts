/** Voz do Kokoro: transforma o texto da resposta em áudio com o NVIDIA Magpie TTS (mesma chave do assistente).
 *  Se a chave faltar, o modelo não aceitar ou demorar, responde 503 e o navegador usa a voz dele de reserva. */

import { connection } from "next/server";

const BASE = "https://877104f7-e885-42b9-8de8-f6e4c6303969.invocation.api.nvcf.nvidia.com/v1/audio";
const IDIOMA = { pt: "pt-BR", en: "en-US", es: "es-US" } as const;
type Lang = keyof typeof IDIOMA;

const chave = () => process.env.NVIDIA_API_KEY?.trim().replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "").trim();

/** Lista de vozes guardada entre chamadas (a função do servidor fica quente por um tempo). */
let vozesCache: { em: number; nomes: string[] } | null = null;

async function vozes(key: string): Promise<string[]> {
  if (vozesCache && Date.now() - vozesCache.em < 6 * 3600_000) return vozesCache.nomes;
  const r = await fetch(`${BASE}/list_voices`, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`list_voices ${r.status}`);
  // o formato é {"idioma": {"voices": ["Magpie-Multilingual.PT-BR.Nome", ...]}}; achamos os nomes onde estiverem
  const nomes = [...new Set(JSON.stringify(await r.json()).match(/Magpie-Multilingual\.[A-Za-z-]+\.[A-Za-z0-9_.-]+/g) ?? [])];
  vozesCache = { em: Date.now(), nomes };
  return nomes;
}

/** Escolhe a voz: a definida no Vercel (NVIDIA_VOZ_PT etc.) ou a primeira do idioma, preferindo voz feminina calma. */
function escolher(nomes: string[], lang: Lang): string | null {
  const fixa = process.env[`NVIDIA_VOZ_${lang.toUpperCase()}`];
  if (fixa) return fixa;
  const tag = `.${IDIOMA[lang].toUpperCase()}.`;
  const doIdioma = nomes.filter((n) => n.toUpperCase().includes(tag));
  const base = doIdioma.filter((n) => !/\.(Angry|Happy|Sad|Fearful|Disgusted|Pleasant_Surprised)$/i.test(n));
  return base.find((n) => /Calm|Neutral/i.test(n)) ?? base[0] ?? doIdioma[0] ?? null;
}

export async function GET() {
  await connection(); // sempre na hora: nunca pré-gerar no build
  const key = chave();
  if (!key) return Response.json({ ok: false, erro: "sem chave" }, { status: 503 });
  try {
    const nomes = await vozes(key);
    return Response.json({ ok: true, pt: escolher(nomes, "pt"), en: escolher(nomes, "en"), es: escolher(nomes, "es"), total: nomes.length, vozes: nomes });
  } catch (e) {
    return Response.json({ ok: false, erro: String(e) }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const key = chave();
  if (!key) return new Response(null, { status: 503 });
  const { texto, lang: l, voz: pedida } = (await req.json().catch(() => ({}))) as { texto?: string; lang?: string; voz?: string };
  const lang: Lang = l === "en" || l === "es" ? l : "pt";
  const t = String(texto ?? "").replace(/\s+/g, " ").trim().slice(0, 600);
  if (!t) return new Response(null, { status: 400 });
  try {
    const nomes = await vozes(key);
    // permite escolher outra voz da lista (para comparar), nunca um valor arbitrário
    const voz = pedida && nomes.includes(pedida) ? pedida : escolher(nomes, lang);
    if (!voz) return new Response(null, { status: 503, headers: { "x-kokoro-voz": "sem voz no idioma" } });
    const f = new FormData();
    f.set("text", t);
    f.set("language", IDIOMA[lang]);
    f.set("voice", voz);
    f.set("encoding", "LINEAR_PCM");
    f.set("sample_rate_hz", "22050");
    const r = await fetch(`${BASE}/synthesize`, { method: "POST", headers: { Authorization: `Bearer ${key}` }, body: f, signal: AbortSignal.timeout(15000) });
    if (!r.ok || !r.body) return new Response(null, { status: 503, headers: { "x-kokoro-voz": `nvidia ${r.status}` } });
    return new Response(r.body, { headers: { "content-type": r.headers.get("content-type") || "audio/wav", "cache-control": "no-store", "x-kokoro-voz": voz } });
  } catch (e) {
    return new Response(null, { status: 503, headers: { "x-kokoro-voz": String(e).slice(0, 120) } });
  }
}
