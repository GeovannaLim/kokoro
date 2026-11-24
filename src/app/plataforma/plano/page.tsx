import { KkCard, KkTitle } from "@/components/kk/Brand";
import { CountUp, Reveal } from "@/components/kk/Motion";
import { getDadosEmpresa } from "@/lib/data";
import { SERIES } from "@/lib/colors";
import { LOCALE, t, tp, tq, ts, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { DONO, montarPlano, prioridades } from "@/lib/plano";
import { Checklist, type AcaoView } from "./Checklist";

const PASSO = { pt: ["Seu próximo passo", "ações em 30 dias", "no plano completo, de 30 a 90 dias"], en: ["Your next step", "actions in 30 days", "in the full plan, from 30 to 90 days"], es: ["Tu próximo paso", "acciones en 30 días", "en el plan completo, de 30 a 90 días"] } as const;

export default async function Plano() {
  const [lang, d] = await Promise.all([getLang(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const fmt = (n: number) => n.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const itens: AcaoView[] = montarPlano(d).map((it) => ({
    id: it.id, prazo: it.prazo, dono: DONO[it.dono][lang], cor: SERIES[it.indice],
    titulo: it.titulo[lang].replace("{area}", tv(lang, it.area ?? "")),
    como: it.como[lang],
    evidencia: it.area
      ? `${tp(lang, "plano_evid_area")}: ${tv(lang, it.area)} · ${t(lang, it.indice)} ${fmt(it.score)}`
      : `${tp(lang, "plano_evid_pergunta")}: “${tq(lang, it.id, it.pergunta)}” · ${fmt(it.score)}/100`,
  }));
  const prio = prioridades(d).slice(0, 2);

  return (
    <div className="pt-10 sm:pt-14">
      <div className="text-center">
        <div className="mx-auto w-fit"><KkTitle line1={ts(lang, "plano_l1")} mark={ts(lang, "plano_mark")} size="md" /></div>
        <p className="mx-auto mt-8 max-w-xl text-sm text-stone">{tp(lang, "plano_intro")}</p>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <KkCard tone="sumi" className="flex h-full min-h-[200px] flex-col justify-between p-8">
            <div className="flex items-start justify-between">
              <p className="text-3xl font-medium tracking-[-0.03em]">{PASSO[lang][0]}</p>
            </div>
            <div>
              <p className="text-7xl leading-none font-medium tracking-[-0.05em]"><CountUp value={itens.filter((i) => i.prazo === 30).length} locale={LOCALE[lang]} /><span className="ml-3 text-2xl font-normal tracking-normal text-sumi-soft">{PASSO[lang][1]}</span></p>
              <p className="mt-3 text-sm text-stone">{itens.length} {tp(lang, "plano_acoes")} {PASSO[lang][2]}</p>
            </div>
          </KkCard>
        </Reveal>
        <Reveal k={1}>
          <KkCard tone="shu" waves className="flex h-full min-h-[200px] flex-col justify-between p-8">
            <p className="text-xs tracking-[0.06em] text-white/75 uppercase">{tp(lang, "plano_areas")}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {prio.map((p) => (
                <div key={p.nome}>
                  <p className="text-4xl font-medium tracking-[-0.035em]">{tv(lang, p.nome)}</p>
                  <p className="mt-1 text-[13px] text-white/80">{t(lang, "estigma")} {fmt(p.g.indices!.estigma)} · {t(lang, "abertura")} {fmt(p.g.indices!.abertura)} · {t(lang, "apoio")} {fmt(p.g.indices!.apoio)}</p>
                </div>
              ))}
            </div>
          </KkCard>
        </Reveal>
      </div>

      <Reveal className="mt-8">
        <Checklist itens={itens} labels={{ dias: tp(lang, "plano_dias"), dono: tp(lang, "plano_dono"), feito: tp(lang, "plano_feito"), marcar: tp(lang, "plano_marcar"), acoes: tp(lang, "plano_acoes"), feitas: tp(lang, "plano_feitas") }} />
      </Reveal>
    </div>
  );
}
