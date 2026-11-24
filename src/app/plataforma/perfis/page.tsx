import { CARTAO_CLARO, KkCard, KkTitle, vidroClaro } from "@/components/kk/Brand";
import { ProfileStack } from "@/components/kk/Charts";
import { CountUp, Reveal } from "@/components/kk/Motion";
import type { Grupo } from "@/lib/analytics";
import { getDadosEmpresa } from "@/lib/data";
import { LOCALE, PERFIS, t, tp, ts, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

/** Cards em vidro claro com névoa de cor no alto: Acolhidos em madeira de bambu,
 *  Abertos sem apoio em cinza frio, Em silêncio em mostarda (o vidro escuro ficou pesado aqui). */
const LUZ = {
  acolhidos: { luz: "rgba(217,196,143,.38)", cor: "#c2a668" },
  sem_apoio: { luz: "rgba(150,160,172,.26)", cor: "var(--d-2)" },
  em_silencio: { luz: "rgba(201,162,74,.32)", cor: "#a9822a" },
} as const;

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
          const id = p.id as keyof typeof LUZ;
          const pct = (total.perfis as Record<string, number>)[p.id];
          const pessoas = Math.round((pct / 100) * total.n);
          return (
            <Reveal key={p.id} k={i}>
              <div data-luz style={vidroClaro(LUZ[id].luz)} className={`flex h-full flex-col gap-8 p-8 ${CARTAO_CLARO}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[34px] leading-tight font-medium tracking-[-0.035em]">{PERFIS[p.id]?.nome[lang]}</p>
                    <p className="mt-2 max-w-[28ch] text-sm text-sumi-soft">{PERFIS[p.id]?.descricao[lang]}</p>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-full border border-sumi/10 bg-white/70 px-3 py-1.5 text-xs text-sumi-soft tabular-nums">
                    <i className="h-2 w-2 rounded-full" style={{ background: LUZ[id].cor, boxShadow: `0 0 10px ${LUZ[id].cor}` }} />
                    {pessoas.toLocaleString(loc)} {t(lang, "pessoas")}
                  </span>
                </div>
                <div>
                  <p className="text-7xl leading-none font-medium tracking-[-0.05em]"><CountUp value={pct} decimals={1} suffix="%" locale={loc} /></p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.06em] text-stone uppercase">{tp(lang, "perf_retrato")}</p>
                  <div className="mt-3 space-y-2.5">
                    {(["apoio", "estigma", "abertura"] as const).map((k) => (
                      <div key={k} className="grid grid-cols-[84px_1fr_36px] items-center gap-3 text-[13px]">
                        <span className="text-sumi-soft">{t(lang, k)}</span>
                        <div className="h-1.5 rounded-full bg-sumi/10"><div className="h-1.5 rounded-full" style={{ width: `${p.centro[k]}%`, background: LUZ[id].cor }} data-barra /></div>
                        <span className="text-right tabular-nums">{Math.round(p.centro[k])}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-auto rounded-[18px] border border-sumi/[0.06] bg-[#efe7d6]/55 p-5">
                  <p className="text-xs tracking-[0.06em] text-stone uppercase">{tp(lang, "perf_fazer")}</p>
                  <p className="mt-2 text-sm leading-relaxed">{tp(lang, `perf_fazer_${id}` as "perf_fazer_acolhidos")}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-3">
        <KkCard tone="washi" className="relative overflow-hidden p-6 sm:p-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl">{tp(lang, "perf_recortes")}</h2>
          </div>
          <div className="mt-8 grid gap-12 lg:grid-cols-3">
            {([["perf_por_area", d.areas], ["perf_por_tempo", d.tempo_casa], ["perf_por_modelo", d.modelo]] as const).map(([k, g]) => (
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
