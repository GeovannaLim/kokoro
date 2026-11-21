import Image from "next/image";
import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { Bar, CountUp, Reveal } from "@/components/kk/Motion";
import { getDadosEmpresa } from "@/lib/data";
import type { Grupo, Idx } from "@/lib/analytics";


const KPIS = [
  { key: "apoio", label: "Apoio", tone: "ai", kanji: "支援", hint: "Quanto a empresa oferece suporte", better: "alto" },
  { key: "estigma", label: "Estigma", tone: "shu", kanji: "偏見", hint: "Quanto falar do tema ainda pesa", better: "baixo" },
  { key: "abertura", label: "Abertura", tone: "sumi", kanji: "開放", hint: "Quanto se conversa sobre saúde mental", better: "alto" },
] as const;

export default async function Dashboard() {
  const data = await getDadosEmpresa();
  const total = data.total as Grupo;
  const ref = data.referencia_osmi.indices as Idx;
  const areas = Object.entries(data.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto && g.indices);
  // prioridade: maior estigma menos abertura
  const prioridade = [...areas].sort((a, b) => (b[1].indices!.estigma - b[1].indices!.abertura) - (a[1].indices!.estigma - a[1].indices!.abertura))[0]?.[0];
  const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className="pt-10 sm:pt-14">
      <div className="text-center">
        <div className="mx-auto w-fit"><KkTitle line1="Diagnóstico de cultura" mark={`${data.empresa}.`} size="md" /></div>
        <p className="mt-8 text-sm text-stone">{total.n} respostas · {data.periodo} · {data.sintetico ? "dados sintéticos calibrados na OSMI 2016" : "inclui respostas reais da pesquisa"}</p>
      </div>

      {/* índices */}
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {KPIS.map((k, i) => {
          const v = total.indices![k.key]; const r = ref[k.key]; const d = v - r;
          const bom = k.better === "alto" ? d >= 0 : d <= 0;
          return (
            <Reveal key={k.key} k={i}>
              <KkCard tone={k.tone} waves={k.tone === "shu"} className="flex min-h-[260px] flex-col justify-between p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl">{k.label}</p>
                    <p className="mt-1 text-sm text-white/70">{k.hint}</p>
                  </div>
                  <Hanko text={k.kanji} tone="light" size={64} rotate={i % 2 ? -4 : 3} delay={0.8 + i * 0.15} />
                </div>
                <div>
                  <p className="font-serif text-7xl leading-none"><CountUp value={v} decimals={1} /></p>
                  <p className="mt-3 text-sm text-white/75">
                    Referência OSMI: {fmt(r)} · <span className="text-white">{d >= 0 ? "+" : ""}{fmt(d)}</span> {bom ? "melhor que a referência" : "pior que a referência"}
                  </p>
                </div>
              </KkCard>
            </Reveal>
          );
        })}
      </div>

      {/* por área */}
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-4xl">Por área</h2>
            <div className="flex gap-4 text-xs text-sumi-soft">
              <span className="flex items-center gap-2"><i className="h-2 w-5 rounded-full bg-ai" />Apoio</span>
              <span className="flex items-center gap-2"><i className="h-2 w-5 rounded-full bg-shu" />Estigma</span>
              <span className="flex items-center gap-2"><i className="h-2 w-5 rounded-full bg-sumi" />Abertura</span>
            </div>
          </div>
          <div className="mt-8 divide-y divide-sumi/10">
            {areas.map(([nome, g]) => (
              <div key={nome} className="grid items-center gap-3 py-4 sm:grid-cols-[180px_1fr_1fr_1fr]">
                <div>
                  <p className="font-medium">{nome}{nome === prioridade && <span className="ml-2 rounded-full bg-shu px-2.5 py-1 text-[11px] text-white">Prioridade</span>}</p>
                  <p className="text-xs text-stone">{g.n} pessoas</p>
                </div>
                {(["apoio", "estigma", "abertura"] as const).map((k) => (
                  <div key={k} className="flex items-center gap-3">
                    <Bar value={g.indices![k]} color={k === "apoio" ? "#22336b" : k === "estigma" ? "#b5382c" : "#111"} />
                    <span className="w-10 text-right text-sm tabular-nums">{fmt(g.indices![k])}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </KkCard>
      </Reveal>

      {/* perfis */}
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {data.perfis_def.map((p, i) => (
          <Reveal key={p.id} k={i}>
            <KkCard tone="paper" className="relative flex min-h-[240px] flex-col justify-between overflow-hidden p-8">
              {i === 0 && <Image src="/brand/kokoro-ai-flat.png" alt="" width={220} height={220} className="kk-bob pointer-events-none absolute -right-6 -bottom-6 w-44 opacity-90" />}
              <div>
                <p className="font-serif text-3xl">{p.nome}</p>
                <p className="mt-2 max-w-[24ch] text-sm text-sumi-soft">{p.descricao}</p>
              </div>
              <p className="font-serif text-6xl"><CountUp value={(total.perfis as Record<string, number>)[p.id]} decimals={1} suffix="%" /></p>
            </KkCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
