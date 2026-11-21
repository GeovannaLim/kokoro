import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { Reveal } from "@/components/kk/Motion";
import { getDadosEmpresa } from "@/lib/data";
import { SERIES } from "@/lib/colors";
import { LOCALE, t, tp, tq, ts, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { DONO, montarPlano, prioridades } from "@/lib/plano";
import { Checklist, type AcaoView } from "./Checklist";

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
              <p className="font-serif text-3xl">{ts(lang, "plano_l1")} {ts(lang, "plano_mark")}</p>
              <Hanko text="計画" size={58} rotate={-3} />
            </div>
            <p className="font-serif text-7xl leading-none">{itens.length}<span className="ml-3 text-2xl text-white/70">{tp(lang, "plano_acoes")}</span></p>
          </KkCard>
        </Reveal>
        <Reveal k={1}>
          <KkCard tone="shu" waves className="flex h-full min-h-[200px] flex-col justify-between p-8">
            <p className="text-xs tracking-[0.06em] text-white/75 uppercase">{tp(lang, "plano_areas")}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {prio.map((p) => (
                <div key={p.nome}>
                  <p className="font-serif text-4xl">{tv(lang, p.nome)}</p>
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
