import Image from "next/image";

/* Mockups da interface do Kokoro. Empresa e números fictícios (dados sintéticos). */

const areas = [
  { name: "Produto", apoio: 72, estigma: 21, abertura: 68 },
  { name: "Engenharia", apoio: 58, estigma: 34, abertura: 51 },
  { name: "Comercial", apoio: 41, estigma: 52, abertura: 29 },
  { name: "Operações", apoio: 36, estigma: 47, abertura: 33 },
];

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-sumi/[0.06]">
      <div className="h-2 rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

/** Dashboard principal (usado no hero). */
export function DashboardMock() {
  return (
    <div className="w-full rounded-[28px] bg-washi p-5 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.18)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-stone">Empresa Aurora · exemplo</p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight">Diagnóstico de cultura</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-washi-deep px-3 py-1.5">Nov 2026</span>
          <span className="rounded-full bg-washi-deep px-3 py-1.5">286 respostas</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Apoio", value: 54, color: "var(--ai)", bg: "bg-ai-soft" },
          { label: "Estigma", value: 37, color: "var(--sumi)", bg: "bg-washi-deep" },
          { label: "Abertura", value: 47, color: "var(--sumi)", bg: "bg-washi-deep" },
        ].map((k) => (
          <div key={k.label} className={`rounded-2xl ${k.bg} p-4`}>
            <p className="text-xs text-sumi-soft">{k.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: k.color }}>
              {k.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3.5">
        <div className="grid grid-cols-[76px_1fr_1fr_1fr] gap-3 text-[11px] text-stone sm:grid-cols-[96px_1fr_1fr_1fr]">
          <span>Área</span>
          <span>Apoio</span>
          <span>Estigma</span>
          <span>Abertura</span>
        </div>
        {areas.map((a) => (
          <div key={a.name} className="grid grid-cols-[76px_1fr_1fr_1fr] items-center gap-3 sm:grid-cols-[96px_1fr_1fr_1fr]">
            <span className="truncate text-xs text-sumi-soft sm:text-sm">{a.name}</span>
            <Bar value={a.apoio} color="var(--ai)" />
            <Bar value={a.estigma} color="var(--stone)" />
            <Bar value={a.abertura} color="var(--sumi)" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Conversa com o assistente. */
export function ChatMock() {
  return (
    <div className="w-full max-w-xl rounded-[28px] bg-washi p-5 shadow-[0_40px_80px_-40px_rgba(17,17,17,0.18)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-washi-deep">
          <Image src="/kokoro/kokoro-ai.png" alt="" width={44} height={44} className="h-11 w-11 object-cover" />
        </span>
        <div>
          <p className="font-semibold tracking-tight">Kokoro</p>
          <p className="text-xs text-stone">Assistente de cultura</p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-sumi px-4 py-2.5 text-washi">
          Qual área precisa de atenção primeiro?
        </p>
        <div className="max-w-[92%] space-y-2 rounded-2xl rounded-bl-md bg-washi-deep px-4 py-3 leading-relaxed text-sumi-soft">
          <p>
            <span className="font-medium text-ai">Comercial.</span> Tem o maior estigma (52) e a menor
            abertura (29).
          </p>
          <p>Comece por conversas conduzidas pela liderança e divulgue o canal de apoio.</p>
        </div>
      </div>
    </div>
  );
}

/** Celular com a pesquisa anônima. */
export function PhoneMock() {
  return (
    <div className="mx-auto w-[190px] rounded-[30px] bg-sumi p-2">
      <div className="rounded-[24px] bg-washi p-4">
        <div className="mx-auto h-1 w-10 rounded-full bg-sumi/15" />
        <p className="mt-4 text-[10px] text-stone">Pergunta 7 de 20 · anônima</p>
        <p className="mt-2 text-[13px] leading-snug font-medium">
          Você se sentiria à vontade para falar de saúde mental com sua liderança?
        </p>
        <div className="mt-3 space-y-1.5 text-[11px]">
          {["Sim", "Talvez", "Não"].map((o, i) => (
            <div
              key={o}
              className={`rounded-xl px-3 py-2 ${i === 1 ? "bg-ai text-washi" : "bg-washi-deep text-sumi-soft"}`}
            >
              {o}
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 rounded-full bg-sumi/10">
          <div className="h-1 w-[35%] rounded-full bg-ai" />
        </div>
      </div>
    </div>
  );
}

/** Relatório NR-1. */
export function ReportMock() {
  return (
    <div className="mx-auto w-[200px] rotate-[-3deg] rounded-xl bg-washi p-4 shadow-[0_24px_40px_-24px_rgba(17,17,17,0.2)]">
      <p className="text-[9px] tracking-wider text-stone uppercase">Relatório · NR-1</p>
      <p className="mt-1 text-sm font-semibold tracking-tight">Riscos psicossociais</p>
      <div className="mt-3 space-y-1.5">
        {[90, 75, 82, 60].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-sumi/10" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <span className="h-8 rounded-md bg-ai/30" />
        <span className="h-8 rounded-md bg-stone/30" />
        <span className="h-8 rounded-md bg-sumi/15" />
      </div>
      <div className="mt-3 space-y-1.5">
        {[85, 70].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-sumi/10" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/** Perfis de equipe (clusters). */
export function ClusterMock() {
  // pontos distribuídos de forma determinística (ângulo áureo) em volta de cada centro
  const centers = [
    [28, 34],
    [70, 38],
    [50, 74],
  ];
  const dots = Array.from({ length: 48 }, (_, i) => {
    const g = i % 3;
    const k = Math.floor(i / 3);
    const r = 3 + 12 * Math.sqrt((k + 0.5) / 16);
    const a = k * 2.39996 + g;
    return { cx: centers[g][0] + r * Math.cos(a), cy: centers[g][1] + r * Math.sin(a), g };
  });
  const colors = ["var(--ai)", "var(--stone)", "var(--sumi)"];
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-40 w-40" aria-hidden>
      {centers.map(([x, y], g) => (
        <circle key={g} cx={x} cy={y} r="17" fill={colors[g]} opacity="0.12" />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx.toFixed(2)} cy={d.cy.toFixed(2)} r="1.8" fill={colors[d.g]} />
      ))}
    </svg>
  );
}
