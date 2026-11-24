import { CARTAO_CLARO, KkCard, KkTitle, vidroClaro } from "@/components/kk/Brand";
import { CountUp, Reveal } from "@/components/kk/Motion";
import { getDadosEmpresa, getPesquisa } from "@/lib/data";
import { LOCALE, t, tq, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";
import { CopyLink } from "./CopyLink";

/** Sem banco de dados (como nesta cópia local), a tela usa a pesquisa pública da demo, que é a mesma da
 *  plataforma no ar, e o número de respostas da Empresa Aurora (sintéticas). */
const DEMO_URL = "https://kokoro-gules.vercel.app/p/-Oubs-eF";

export default async function Pesquisa() {
  const [lang, banco, dados] = await Promise.all([getLang(), getPesquisa(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const p = banco ?? { token: "-Oubs-eF", titulo: "Diagnóstico de cultura 2026", empresa: dados.empresa, areas: [], respostas: dados.total.n, reais: 0 };
  const link = banco ? `/p/${banco.token}` : DEMO_URL;
  const sint = p.respostas - p.reais;
  const linkTexto = banco ? `/p/${banco.token}` : DEMO_URL.replace(/^https?:\/\//, "");
  return (
    <div className="pt-10 sm:pt-14">
      <div className="mx-auto w-fit text-center"><KkTitle line1={t(lang, "pesq_l1")} mark={t(lang, "pesq_mark")} size="md" /></div>
      <div className="mt-14 grid gap-3 md:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <div data-luz style={vidroClaro("rgba(217,196,143,.4)")} className={`flex min-h-[300px] flex-col justify-between p-8 ${CARTAO_CLARO}`}>
            <div>
              <p className="text-[34px] leading-tight font-medium tracking-[-0.035em]">{tv(lang, p.titulo)}</p>
              <p className="mt-2 max-w-[38ch] text-sm text-sumi-soft">{t(lang, "pesq_envie")}</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 rounded-2xl border border-sumi/10 bg-white/75 px-4 py-3 text-[13px] text-sumi-soft">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#b89c5c]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
                <span className="truncate text-[13px] font-medium">{linkTexto}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href={link} target="_blank" rel="noopener" className="rounded-xl bg-sumi px-5 py-3 text-sm font-medium text-washi transition hover:-translate-y-px">{t(lang, "pesq_abrir")}</a>
                <CopyLink path={link} label={t(lang, "pesq_copiar")} done={t(lang, "pesq_copiado")} />
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal k={1}>
          <div data-luz style={vidroClaro("rgba(217,196,143,.4)")} className={`flex min-h-[300px] flex-col justify-between p-8 ${CARTAO_CLARO}`}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-[34px] leading-tight font-medium tracking-[-0.035em]">{t(lang, "respostas").replace(/^./, (c) => c.toUpperCase())}</p>
              <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-sumi/10 bg-white/70 px-3 py-1.5 text-xs text-sumi-soft">
                <i className="h-2 w-2 kk-respira-ponto rounded-full bg-[#d9c48f] shadow-[0_0_10px_#d9c48f]" />
                {lang === "en" ? "Live" : lang === "es" ? "En vivo" : "Ao vivo"}
              </span>
            </div>
            <div>
              <p className="text-8xl leading-none font-medium tracking-[-0.05em] tabular-nums"><CountUp value={p.respostas} locale={loc} /></p>
              <div className="mt-5 flex h-2 gap-[2px] overflow-hidden rounded-full bg-sumi/10" aria-hidden>
                {p.reais > 0 && <div className="bg-[#d9c48f]" style={{ flexBasis: `${(p.reais / Math.max(p.respostas, 1)) * 100}%` }} />}
                <div className="bg-[#c2a668]" style={{ flexBasis: `${(sint / Math.max(p.respostas, 1)) * 100}%` }} />
              </div>
              <p className="mt-3 text-sm text-sumi-soft">{p.reais.toLocaleString(loc)} {t(lang, "pesq_reais")} · {sint.toLocaleString(loc)} {t(lang, "pesq_sinteticas")}</p>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <h2 className="font-serif text-4xl">{t(lang, "pesq_20")}</h2>
          <ol className="mt-8 grid gap-x-12 gap-y-4 text-[15px] md:grid-cols-2">
            {[...CONTEXTO.map((c) => ({ id: c.id, texto: c.texto, tag: t(lang, "contexto"), cor: "#86817a" })),
              ...PERGUNTAS.map((q) => ({ id: q.id, texto: q.texto, tag: t(lang, q.indice), cor: q.indice === "apoio" ? "#3a322b" : q.indice === "estigma" ? "#a9822a" : "#111" }))]
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
