import Image from "next/image";
import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { ProfileStack } from "@/components/kk/Charts";
import { CountUp, Reveal } from "@/components/kk/Motion";
import type { Grupo } from "@/lib/analytics";
import { getDadosEmpresa } from "@/lib/data";
import { LOCALE, PERFIS, t, tp, ts, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

const TOM = { acolhidos: "ai", sem_apoio: "sumi", em_silencio: "shu" } as const;
const KANJI = { acolhidos: "安心", sem_apoio: "開放", em_silencio: "沈黙" } as const;

export default async function Perfis() {
  const [lang, d] = await Promise.all([getLang(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const total = d.total as Grupo;
  const series = d.perfis_def.map((p) => ({ id: p.id, nome: PERFIS[p.id]?.nome[lang] ?? p.nome }));
  const linhas = (grupos: Record<string, Grupo>) =>
    Object.entries(grupos).filter(([, g]) => !g.oculto && g.perfis).map(([k, g]) => ({ label: tv(lang, k), parts: g.perfis! }));

  return (
    <div className="pt-10 sm:pt-14">
      <div className="text-center">
        <div className="mx-auto w-fit"><KkTitle line1={ts(lang, "perfis_l1")} mark={ts(lang, "perfis_mark")} size="md" /></div>
        <p className="mx-auto mt-8 max-w-xl text-sm text-stone">{tp(lang, "perf_intro")}</p>
      </div>

      <div className="mt-12 grid gap-3 lg:grid-cols-3">
        {d.perfis_def.map((p, i) => {
          const id = p.id as keyof typeof TOM;
          const pct = (total.perfis as Record<string, number>)[p.id];
          const pessoas = Math.round((pct / 100) * total.n);
          return (
            <Reveal key={p.id} k={i}>
              <KkCard tone={TOM[id]} waves={id === "em_silencio"} className="flex h-full flex-col gap-8 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-4xl leading-tight">{PERFIS[p.id]?.nome[lang]}</p>
                    <p className="mt-2 max-w-[28ch] text-sm text-white/75">{PERFIS[p.id]?.descricao[lang]}</p>
                  </div>
                  <Hanko text={KANJI[id]} size={58} rotate={i % 2 ? -3 : 3} delay={0.8 + i * 0.15} />
                </div>
                <div>
                  <p className="font-serif text-7xl leading-none"><CountUp value={pct} decimals={1} suffix="%" locale={loc} /></p>
                  <p className="mt-2 text-sm text-white/70">{pessoas.toLocaleString(loc)} {t(lang, "pessoas")}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.06em] text-white/60 uppercase">{tp(lang, "perf_retrato")}</p>
                  <div className="mt-3 space-y-2.5">
                    {(["apoio", "estigma", "abertura"] as const).map((k) => (
                      <div key={k} className="grid grid-cols-[84px_1fr_36px] items-center gap-3 text-[13px]">
                        <span className="text-white/80">{t(lang, k)}</span>
                        <div className="h-1.5 rounded-full bg-white/20"><div className="h-1.5 rounded-full bg-white" style={{ width: `${p.centro[k]}%` }} /></div>
                        <span className="text-right tabular-nums">{Math.round(p.centro[k])}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-auto rounded-[20px] bg-white/10 p-5">
                  <p className="text-xs tracking-[0.06em] text-white/60 uppercase">{tp(lang, "perf_fazer")}</p>
                  <p className="mt-2 text-sm leading-relaxed">{tp(lang, `perf_fazer_${id}` as "perf_fazer_acolhidos")}</p>
                </div>
              </KkCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-3">
        <KkCard tone="washi" className="relative overflow-hidden p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl">{tp(lang, "perf_recortes")}</h2>
            <Image src="/brand/kokoro-ai-flat.png" alt="" width={140} height={140} className="kk-bob hidden w-24 sm:block" />
          </div>
          <div className="mt-8 grid gap-12 lg:grid-cols-3">
            {([["perf_por_area", d.areas], ["perf_por_modelo", d.modelo], ["perf_por_tempo", d.tempo_casa]] as const).map(([k, g]) => (
              <div key={k}>
                <p className="mb-4 font-serif text-2xl">{tp(lang, k)}</p>
                <ProfileStack locale={loc} series={series} rows={linhas(g as Record<string, Grupo>)} />
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-stone">{t(lang, "rodape").split(" · ")[0]}</p>
        </KkCard>
      </Reveal>
    </div>
  );
}
