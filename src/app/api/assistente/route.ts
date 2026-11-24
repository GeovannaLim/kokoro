import { respostaDemo, sistema } from "@/lib/assistente";
import { getDadosEmpresa } from "@/lib/data";
import { LANGS, type Lang } from "@/lib/i18n";

/** Assistente: API gratuita da NVIDIA (build.nvidia.com, compatível com o formato OpenAI).
 *  Sem NVIDIA_API_KEY, responde em modo demonstração com os próprios números. */
const URL_NVIDIA = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODELO = process.env.NVIDIA_MODEL || "google/gemma-4-31b-it";
/** Teste temporário de velocidade: permite escolher entre modelos gratuitos da lista (sem outros efeitos). */
const TESTE = ["google/gemma-4-31b-it", "google/gemma-3-12b-it", "nvidia/nemotron-3.5-lightning-30b-a3b", "nvidia/nemotron-3.5-bolt-e4b", "z-ai/glm-5.3-flash", "minimaxai/minimax-m3.1-flash", "mistralai/mistral-large-4-1t-a52b"];

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

  const pedido = req.headers.get("x-kokoro-modelo");
  const modelo = pedido && TESTE.includes(pedido) ? pedido : MODELO;
  const semPensar = req.headers.get("x-kokoro-pensar") !== "1";
  const r = await fetch(URL_NVIDIA, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify({
      model: modelo, stream: true, temperature: 0.4, max_tokens: 500,
      // resposta direta, sem a fase de "raciocínio" silencioso (que atrasava a primeira palavra em ~15 s)
      ...(semPensar ? { chat_template_kwargs: { enable_thinking: false, thinking: false } } : {}),
      messages: [{ role: "system", content: sistema(d, lang) }, ...messages],
    }),
    signal: AbortSignal.timeout(30000),
  }).catch((e) => { console.error("NVIDIA falhou/tempo", modelo, String(e).slice(0, 120)); return null; });

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
  return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8", "x-kokoro-modo": "ia", "x-kokoro-modelo-usado": modelo, "cache-control": "no-store" } });
}
