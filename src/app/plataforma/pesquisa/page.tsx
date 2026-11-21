import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { CountUp, Reveal } from "@/components/kk/Motion";
import { getPesquisa } from "@/lib/data";
import { LOCALE, t, tq, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";
import { CopyLink } from "./CopyLink";

export default async function Pesquisa() {
  const [lang, p] = await Promise.all([getLang(), getPesquisa()]);
  const loc = LOCALE[lang];
  const sint = p ? p.respostas - p.reais : 0;
  return (
    <div className="pt-10 sm:pt-14">
      <div className="mx-auto w-fit text-center"><KkTitle line1={t(lang, "pesq_l1")} mark={t(lang, "pesq_mark")} size="md" /></div>
      <div className="mt-14 grid gap-3 md:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <KkCard tone="ai" className="flex min-h-[300px] flex-col justify-between p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-4xl">{tv(lang, p?.titulo ?? "Diagnóstico de cultura 2026")}</p>
                <p className="mt-2 max-w-[38ch] text-sm text-white/75">{t(lang, "pesq_envie")}</p>
              </div>
              <Hanko text="匿名" size={64} rotate={3} />
            </div>
            {p ? (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a href={`/p/${p.token}`} target="_blank" rel="noopener" className="rounded-full bg-washi px-6 py-3 text-sm text-sumi transition hover:-translate-y-px hover:bg-white">{t(lang, "pesq_abrir")}</a>
                <CopyLink path={`/p/${p.token}`} label={t(lang, "pesq_copiar")} done={t(lang, "pesq_copiado")} />
              </div>
            ) : <p className="mt-8 text-sm text-white/75">{t(lang, "pesq_sem_banco")}</p>}
          </KkCard>
        </Reveal>
        <Reveal k={1}>
          <KkCard tone="sumi" className="flex min-h-[300px] flex-col justify-between p-8">
            <p className="font-serif text-4xl">{t(lang, "respostas").replace(/^./, (c) => c.toUpperCase())}</p>
            <div>
              <p className="font-serif text-8xl leading-none"><CountUp value={p?.respostas ?? 0} locale={loc} /></p>
              {p && (
                <>
                  <div className="mt-5 flex h-2 gap-[2px] overflow-hidden rounded-full" aria-hidden>
                    <div className="bg-white" style={{ flexBasis: `${(p.reais / Math.max(p.respostas, 1)) * 100}%` }} />
                    <div className="bg-white/30" style={{ flexBasis: `${(sint / Math.max(p.respostas, 1)) * 100}%` }} />
                  </div>
                  <p className="mt-3 text-sm text-white/70">{p.reais.toLocaleString(loc)} {t(lang, "pesq_reais")} · {sint.toLocaleString(loc)} {t(lang, "pesq_sinteticas")}</p>
                </>
              )}
            </div>
          </KkCard>
        </Reveal>
      </div>
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <h2 className="font-serif text-4xl">{t(lang, "pesq_20")}</h2>
          <ol className="mt-8 grid gap-x-12 gap-y-4 text-[15px] md:grid-cols-2">
            {[...CONTEXTO.map((c) => ({ id: c.id, texto: c.texto, tag: t(lang, "contexto"), cor: "#86817a" })),
              ...PERGUNTAS.map((q) => ({ id: q.id, texto: q.texto, tag: t(lang, q.indice), cor: q.indice === "apoio" ? "#22336b" : q.indice === "estigma" ? "#b5382c" : "#111" }))]
              .map((q, i) => (
                <li key={q.id} className="flex gap-4 border-t border-sumi/10 pt-4">
                  <span className="w-6 font-serif text-xl leading-none text-stone tabular-nums">{i + 1}</span>
                  <span className="flex-1">
                    <span className="text-sumi">{tq(lang, q.id, q.texto)}</span>
                    <span className="mt-1.5 flex items-center gap-2 text-xs text-stone"><i className="h-2 w-2 rounded-full" style={{ background: q.cor }} />{q.tag}</span>
                  </span>
                </li>
              ))}
          </ol>
        </KkCard>
      </Reveal>
    </div>
  );
}
