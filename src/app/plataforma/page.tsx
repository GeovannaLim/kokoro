import Image from "next/image";
import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { AreaMap, IndexBars, ProfileStack, QuestionBars, TableToggle } from "@/components/kk/Charts";
import { SERIES } from "@/lib/colors";
import { CountUp, Reveal } from "@/components/kk/Motion";
import type { Grupo, Idx } from "@/lib/analytics";
import { getDadosEmpresa } from "@/lib/data";
import { LOCALE, PERFIS, t, tq, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

const INDICES = ["apoio", "estigma", "abertura"] as const;
const KANJI = { apoio: "支援", estigma: "偏見", abertura: "開放" } as const;
const TONE = { apoio: "ai", estigma: "shu", abertura: "sumi" } as const;

export default async function Dashboard() {
  const [lang, data] = await Promise.all([getLang(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const fmt = (n: number) => n.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const total = data.total as Grupo;
  const ref = data.referencia_osmi.indices as Idx;
  const areas = Object.entries(data.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto && g.indices);
  const prioridade = [...areas].sort((a, b) => (b[1].indices!.estigma - b[1].indices!.abertura) - (a[1].indices!.estigma - a[1].indices!.abertura))[0]?.[0];
  const perfis = data.perfis_def.map((p) => ({ id: p.id, nome: PERFIS[p.id]?.nome[lang] ?? p.nome }));
  const empresa = tv(lang, data.empresa);

  return (
    <div className="pt-10 sm:pt-14">
      <div className="text-center">
        <div className="mx-auto w-fit"><KkTitle line1={t(lang, "dash_l1")} mark={`${empresa.replace(/\.$/, "")}.`} size="md" /></div>
        <p className="mt-8 text-sm text-stone">
          {total.n.toLocaleString(loc)} {t(lang, "respostas")} · {data.periodo} · {data.sintetico ? t(lang, "calibrado") : t(lang, "inclui_reais")}
        </p>
      </div>

      {/* 1. os três índices, com a referência real da OSMI */}
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {INDICES.map((k, i) => {
          const v = total.indices![k], r = ref[k], d = v - r;
          const bom = k === "estigma" ? d <= 0 : d >= 0;
          return (
            <Reveal key={k} k={i}>
              <KkCard tone={TONE[k]} waves={k === "estigma"} className="flex min-h-[290px] flex-col justify-between p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl">{t(lang, k)}</p>
                    <p className="mt-1 max-w-[22ch] text-sm text-white/70">{t(lang, `${k}_hint`)}</p>
                  </div>
                  <Hanko text={KANJI[k]} tone="light" size={60} rotate={i % 2 ? -4 : 3} delay={0.8 + i * 0.15} />
                </div>
                <div>
                  <p className="font-serif text-7xl leading-none"><CountUp value={v} decimals={1} locale={loc} /></p>
                  {/* barra com a marca da referência */}
                  <div className="relative mt-5 h-1.5 rounded-full bg-white/20" aria-hidden>
                    <div className="h-1.5 rounded-full bg-white" style={{ width: `${v}%` }} />
                    <span className="absolute -top-1.5 h-[18px] w-[2px] rounded bg-white/80" style={{ left: `${r}%` }} />
                  </div>
                  <p className="mt-3 text-[13px] text-white/75">
                    {t(lang, "ref_osmi")} {fmt(r)} · <span className="text-white">{d >= 0 ? "+" : ""}{fmt(d)}</span> {bom ? t(lang, "melhor") : t(lang, "pior")}
                  </p>
                </div>
              </KkCard>
            </Reveal>
          );
        })}
      </div>

      {/* 2. mapa das áreas */}
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="font-serif text-4xl">{t(lang, "mapa_titulo")}</h2>
              <div className="mt-6">
                <AreaMap
                  refPoint={{ x: ref.estigma, y: ref.abertura }}
                  labels={{ seguro: t(lang, "seguro"), prioridade: t(lang, "prioridade"), x: t(lang, "eixo_estigma"), y: t(lang, "eixo_abertura"), refName: "OSMI" }}
                  points={areas.map(([nome, g]) => ({
                    label: tv(lang, nome), x: g.indices!.estigma, y: g.indices!.abertura, n: g.n,
                    detail: <><b className="font-medium">{tv(lang, nome)}</b> · {g.n} {t(lang, "pessoas")}<br />{t(lang, "apoio")} {fmt(g.indices!.apoio)} · {t(lang, "estigma")} {fmt(g.indices!.estigma)} · {t(lang, "abertura")} {fmt(g.indices!.abertura)}</>,
                  }))}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 lg:pt-16">
              <p className="text-sm leading-relaxed text-sumi-soft">{t(lang, "mapa_desc")}</p>
              {prioridade && (
                <div className="rounded-[22px] bg-shu p-6 text-white">
                  <p className="text-xs tracking-[0.06em] text-white/75 uppercase">{t(lang, "prioridade")}</p>
                  <p className="mt-1 font-serif text-4xl">{tv(lang, prioridade)}</p>
                  <p className="mt-2 text-[13px] text-white/80">
                    {t(lang, "estigma")} {fmt(data.areas[prioridade].indices!.estigma)} · {t(lang, "abertura")} {fmt(data.areas[prioridade].indices!.abertura)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <TableToggle label={t(lang, "ver_tabela")} head={[t(lang, "area"), t(lang, "pessoas"), t(lang, "apoio"), t(lang, "estigma"), t(lang, "abertura")]}
            rows={areas.map(([nome, g]) => [tv(lang, nome), g.n, fmt(g.indices!.apoio), fmt(g.indices!.estigma), fmt(g.indices!.abertura)])} />
        </KkCard>
      </Reveal>

      {/* 3. índices por área: um painel por índice */}
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-4xl">{t(lang, "por_area")}</h2>
            <p className="text-sm text-stone">{t(lang, "por_area_desc")}</p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {INDICES.map((k) => (
              <IndexBars key={k} title={t(lang, k)} color={SERIES[k]} refValue={ref[k]} refName="OSMI" locale={loc}
                rows={areas.map(([nome, g]) => ({ label: tv(lang, nome), value: g.indices![k], n: g.n }))} />
            ))}
          </div>
        </KkCard>
      </Reveal>

      {/* 4. perfis de equipe */}
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <KkCard tone="paper" className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-8">
            <Image src="/brand/kokoro-ai-flat.png" alt="" width={240} height={240} className="kk-bob pointer-events-none absolute -right-8 -bottom-8 w-52 opacity-95" />
            <div className="relative">
              <h2 className="font-serif text-4xl">{t(lang, "perfis_titulo")}</h2>
              <p className="mt-2 max-w-[30ch] text-sm text-sumi-soft">{t(lang, "perfis_desc")}</p>
            </div>
            <div className="relative space-y-4">
              {data.perfis_def.map((p, i) => (
                <div key={p.id} className="max-w-[62%]">
                  <p className="flex items-baseline gap-3"><span className="font-serif text-4xl tabular-nums"><CountUp value={(total.perfis as Record<string, number>)[p.id]} decimals={1} suffix="%" locale={loc} /></span><span className="text-sm">{PERFIS[p.id]?.nome[lang] ?? p.nome}</span></p>
                  <p className="text-[13px] text-sumi-soft">{PERFIS[p.id]?.descricao[lang] ?? p.descricao}</p>
                  {i < 2 && <hr className="mt-4 border-sumi/10" />}
                </div>
              ))}
            </div>
          </KkCard>
        </Reveal>
        <Reveal k={1}>
          <KkCard tone="washi" className="h-full p-6 sm:p-8">
            <ProfileStack locale={loc} series={perfis}
              rows={[{ label: t(lang, "empresa_toda"), parts: total.perfis as Record<string, number>, strong: true },
                ...areas.map(([nome, g]) => ({ label: tv(lang, nome), parts: g.perfis! }))]} />
            <TableToggle label={t(lang, "ver_tabela")} head={[t(lang, "area"), ...perfis.map((p) => p.nome)]}
              rows={[[t(lang, "empresa_toda"), ...perfis.map((p) => `${fmt((total.perfis as Record<string, number>)[p.id])}%`)],
                ...areas.map(([nome, g]) => [tv(lang, nome), ...perfis.map((p) => `${fmt(g.perfis![p.id])}%`)])]} />
          </KkCard>
        </Reveal>
      </div>

      {/* 5. as 16 perguntas */}
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-4xl">{t(lang, "perguntas_titulo")}</h2>
            <p className="text-sm text-stone">{t(lang, "perguntas_desc")}</p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {INDICES.map((k) => (
              <QuestionBars key={k} title={t(lang, k)} color={SERIES[k]} locale={loc}
                rows={data.perguntas.filter((q) => q.indice === k).map((q) => q.id === "abertura_observou"
                  ? { texto: t(lang, "observou_inv"), media: Math.round((100 - q.media) * 10) / 10 }
                  : { texto: tq(lang, q.id, q.texto), media: q.media })} />
            ))}
          </div>
        </KkCard>
      </Reveal>
    </div>
  );
}
