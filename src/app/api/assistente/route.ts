import { respostaDemo, sistema } from "@/lib/assistente";
import { getDadosEmpresa } from "@/lib/data";
import { LANGS, type Lang } from "@/lib/i18n";

/** Assistente: API gratuita da NVIDIA (build.nvidia.com, compatível com o formato OpenAI).
 *  Sem NVIDIA_API_KEY, responde em modo demonstração com os próprios números. */
const URL_NVIDIA = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODELO = process.env.NVIDIA_MODEL || "google/gemma-4-31b-it";

type Msg = { role: "user" | "assistant"; content: string };

const texto = (s: string) => new Response(s, { headers: { "content-type": "text/plain; charset=utf-8", "x-kokoro-modo": "demo" } });

export async function POST(req: Request) {
  let body: { lang?: string; messages?: Msg[] };
  try { body = await req.json(); } catch { return new Response("JSON inválido", { status: 400 }); }

  const lang: Lang = LANGS.includes(body.lang as Lang) ? (body.lang as Lang) : "pt";
  // só as últimas mensagens, com tamanho limitado
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-10).map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  const ultima = messages.at(-1);
  if (!ultima || ultima.role !== "user") return new Response("Sem pergunta", { status: 400 });

  const d = await getDadosEmpresa();
  // tolera chave colada com espaços, aspas ou "Bearer " na frente
  const key = process.env.NVIDIA_API_KEY?.trim().replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "").trim();
  if (!key) return texto(respostaDemo(d, lang, ultima.content));

  const r = await fetch(URL_NVIDIA, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify({ model: MODELO, stream: true, temperature: 0.4, max_tokens: 700, messages: [{ role: "system", content: sistema(d, lang) }, ...messages] }),
  }).catch(() => null);

  // limite de uso (40/min no plano grátis) ou erro: cai no modo demonstração em vez de quebrar
  if (!r || !r.ok || !r.body) {
    if (r) console.error("NVIDIA", r.status, (await r.text().catch(() => "")).slice(0, 300));
    return texto(respostaDemo(d, lang, ultima.content));
  }

  // converte o SSE da NVIDIA em texto puro, pedaço a pedaço
  const dec = new TextDecoder(), enc = new TextEncoder();
  let buf = "";
  const stream = r.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, ctl) {
      buf += dec.decode(chunk, { stream: true });
      const linhas = buf.split("\n");
      buf = linhas.pop() ?? "";
      for (const l of linhas) {
        const s = l.trim();
        if (!s.startsWith("data:")) continue;
        const dado = s.slice(5).trim();
        if (dado === "[DONE]") continue;
        try {
          const delta = JSON.parse(dado).choices?.[0]?.delta?.content;
          if (delta) ctl.enqueue(enc.encode(delta));
        } catch { /* linha incompleta */ }
      }
    },
  }));
  return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8", "x-kokoro-modo": "ia", "cache-control": "no-store" } });
}
