import { connection } from "next/server";
import { Hanko, KkTitle, LogoBrush } from "@/components/kk/Brand";
import type { Grupo, Idx } from "@/lib/analytics";
import { getDadosEmpresa } from "@/lib/data";
import { LOCALE, t, tp, ts, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { DONO, FATOR, RISCO_COR, RISCO_TXT, montarPlano, risco, type Indice, type Risco } from "@/lib/plano";
import { PrintButton } from "./PrintButton";

const INDICES: Indice[] = ["apoio", "estigma", "abertura"];

function Chip({ r, lang }: { r: Risco; lang: "pt" | "en" | "es" }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-white" style={{ background: RISCO_COR[r] }}><i className="h-1.5 w-1.5 rounded-full bg-white/80" />{RISCO_TXT[r][lang]}</span>;
}

export default async function Relatorio() {
  await connection(); // a data de emissão é a do momento do pedido
  const [lang, d] = await Promise.all([getLang(), getDadosEmpresa()]);
  const loc = LOCALE[lang];
  const fmt = (n: number) => n.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const total = d.total as Grupo, idx = total.indices as Idx;
  const areas = Object.entries(d.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto && g.indices);
  const plano = montarPlano(d);
  const hoje = new Date().toLocaleDateString(loc, { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="pt-10 sm:pt-14">
      <div className="no-print text-center">
        <div className="mx-auto w-fit"><KkTitle line1={ts(lang, "relatorio_l1")} mark={ts(lang, "relatorio_mark")} size="md" /></div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <PrintButton label={tp(lang, "rel_gerar")} />
          <p className="text-xs text-stone">{tp(lang, "rel_dica")}</p>
        </div>
      </div>

      <article className="kk-doc mx-auto mt-12 max-w-[880px] rounded-[28px] bg-[#fffdf8] p-8 text-sumi shadow-[0_30px_80px_-40px_rgba(17,17,17,.35),inset_0_0_0_1px_rgba(17,17,17,.06)] sm:p-14">
        <header className="flex items-start justify-between gap-6 border-b border-sumi/10 pb-8">
          <div>
            <LogoBrush className="h-6 w-auto" />
            <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">{tp(lang, "rel_titulo")}</h1>
            <p className="mt-2 text-sm text-sumi-soft">{tp(lang, "rel_sub")}</p>
          </div>
          <Hanko text="報告" size={64} rotate={-6} tone="red" />
        </header>
        <dl className="grid gap-4 border-b border-sumi/10 py-6 text-sm sm:grid-cols-3">
          <div><dt className="text-xs text-stone">{tp(lang, "rel_empresa")}</dt><dd className="mt-1">{tv(lang, d.empresa)}</dd></div>
          <div><dt className="text-xs text-stone">{tp(lang, "rel_periodo")}</dt><dd className="mt-1">{d.periodo}</dd></div>
          <div><dt className="text-xs text-stone">{tp(lang, "rel_emissao")}</dt><dd className="mt-1">{hoje}</dd></div>
        </dl>

        <section className="py-8">
          <h2 className="font-serif text-2xl">{tp(lang, "rel_s1")}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-sumi-soft">{tp(lang, "rel_metodo").replace("{n}", total.n.toLocaleString(loc))}</p>
          {d.sintetico && <p className="mt-3 text-sm text-shu">{tp(lang, "rel_sintetico")}</p>}
        </section>

        <section className="border-t border-sumi/10 py-8">
          <h2 className="font-serif text-2xl">{tp(lang, "rel_s2")}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {INDICES.map((k) => (
              <div key={k} className="rounded-[18px] bg-washi p-5">
                <p className="text-sm text-sumi-soft">{t(lang, k)}</p>
                <p className="mt-1 font-serif text-5xl leading-none">{fmt(idx[k])}</p>
                <div className="mt-3"><Chip r={risco(k, idx[k])} lang={lang} /></div>
                <p className="mt-3 text-xs text-stone">{t(lang, "ref_osmi")} {fmt(d.referencia_osmi.indices[k])}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-sumi/10 py-8">
          <h2 className="font-serif text-2xl">{tp(lang, "rel_s3")}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-xs text-stone"><th className="py-2 pr-4 font-normal">{t(lang, "area")}</th><th className="py-2 pr-4 font-normal">{t(lang, "pessoas")}</th>{INDICES.map((k) => <th key={k} className="py-2 pr-4 font-normal">{t(lang, k)}</th>)}</tr></thead>
              <tbody>
                {areas.map(([nome, g]) => (
                  <tr key={nome} className="border-t border-sumi/10">
                    <td className="py-3 pr-4">{tv(lang, nome)}</td>
                    <td className="py-3 pr-4 tabular-nums text-sumi-soft">{g.n}</td>
                    {INDICES.map((k) => <td key={k} className="py-3 pr-4"><span className="mr-2 tabular-nums">{fmt(g.indices![k])}</span><Chip r={risco(k, g.indices![k])} lang={lang} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-stone">{tp(lang, "rel_faixas")}</p>
        </section>

        <section className="border-t border-sumi/10 py-8">
          <h2 className="font-serif text-2xl">{tp(lang, "rel_s4")}</h2>
          <ul className="mt-5 space-y-4">
            {INDICES.map((k) => {
              const altas = areas.filter(([, g]) => risco(k, g.indices![k]) === "alto").map(([n]) => tv(lang, n));
              return (
                <li key={k} className="flex flex-wrap items-baseline justify-between gap-3 rounded-[18px] bg-washi p-5">
                  <div>
                    <p className="font-serif text-xl">{FATOR[k][lang]}</p>
                    <p className="mt-1 text-sm text-sumi-soft">{tp(lang, "rel_areas_afetadas")}: {altas.length ? altas.join(", ") : tp(lang, "rel_nenhuma")}</p>
                  </div>
                  <Chip r={risco(k, idx[k])} lang={lang} />
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-t border-sumi/10 py-8">
          <h2 className="font-serif text-2xl">{tp(lang, "rel_s5")}</h2>
          <table className="mt-5 w-full text-left text-sm">
            <thead><tr className="text-xs text-stone"><th className="py-2 pr-4 font-normal">{tp(lang, "rel_prazo")}</th><th className="py-2 pr-4 font-normal">{tp(lang, "rel_acao")}</th><th className="py-2 font-normal">{tp(lang, "plano_dono")}</th></tr></thead>
            <tbody>
              {plano.map((it) => (
                <tr key={it.id} className="border-t border-sumi/10 align-top">
                  <td className="py-3 pr-4 whitespace-nowrap tabular-nums">{it.prazo} {tp(lang, "plano_dias")}</td>
                  <td className="py-3 pr-4">{it.titulo[lang].replace("{area}", tv(lang, it.area ?? ""))}<span className="block text-xs text-stone">{it.como[lang]}</span></td>
                  <td className="py-3 whitespace-nowrap">{DONO[it.dono][lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="border-t border-sumi/10 pt-8">
          <p className="text-xs leading-relaxed text-sumi-soft">{tp(lang, "rel_aviso")}</p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {(["rel_ass_tecnico", "rel_ass_rh"] as const).map((k) => (
              <div key={k}><div className="border-t border-sumi/40" /><p className="mt-2 text-xs text-stone">{tp(lang, k)}</p></div>
            ))}
          </div>
          <p className="mt-10 text-[11px] text-stone">{t(lang, "rodape").split(" · ")[1]}</p>
        </footer>
      </article>
    </div>
  );
}
