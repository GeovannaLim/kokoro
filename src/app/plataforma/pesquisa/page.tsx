import { Hanko, KkCard, KkTitle } from "@/components/kk/Brand";
import { CountUp, Reveal } from "@/components/kk/Motion";
import { getPesquisa } from "@/lib/data";
import { CONTEXTO, PERGUNTAS } from "@/lib/questions";

export default async function Pesquisa() {
  const p = await getPesquisa();
  const nomes = { apoio: "Apoio", estigma: "Estigma", abertura: "Abertura" } as const;
  return (
    <div className="pt-10 sm:pt-14">
      <div className="mx-auto w-fit text-center"><KkTitle line1="Pesquisa" mark="anônima." size="md" /></div>
      <div className="mt-14 grid gap-3 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <KkCard tone="ai" className="relative flex min-h-[280px] flex-col justify-between p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-3xl">{p?.titulo ?? "Diagnóstico de cultura"}</p>
                <p className="mt-2 text-sm text-white/75">Envie o link para a equipe. Leva cerca de 5 minutos, pelo celular.</p>
              </div>
              <Hanko text="匿名" size={64} rotate={3} />
            </div>
            {p ? (
              <a href={`/p/${p.token}`} target="_blank" className="mt-8 w-fit rounded-full bg-washi px-6 py-3 text-sm text-sumi transition hover:bg-white">Abrir a pesquisa ↗</a>
            ) : (
              <p className="mt-8 text-sm text-white/75">O link aparece aqui assim que o banco estiver conectado.</p>
            )}
          </KkCard>
        </Reveal>
        <Reveal k={1}>
          <KkCard tone="sumi" className="flex min-h-[280px] flex-col justify-between p-8">
            <p className="font-serif text-3xl">Respostas</p>
            <div>
              <p className="font-serif text-7xl leading-none"><CountUp value={p?.respostas ?? 0} /></p>
              <p className="mt-3 text-sm text-white/70">{p ? `${p.reais} reais · ${p.respostas - p.reais} sintéticas (demo)` : "Mostrando os dados sintéticos da demo."}</p>
            </div>
          </KkCard>
        </Reveal>
      </div>
      <Reveal className="mt-3">
        <KkCard tone="washi" className="p-6 sm:p-10">
          <h2 className="font-serif text-4xl">As 20 perguntas</h2>
          <ol className="mt-6 grid gap-x-10 gap-y-3 text-sm text-sumi-soft md:grid-cols-2">
            {CONTEXTO.map((c, i) => <li key={c.id} className="flex gap-3"><span className="w-6 text-stone tabular-nums">{i + 1}</span><span>{c.texto} <span className="text-stone">· contexto</span></span></li>)}
            {PERGUNTAS.map((q, i) => <li key={q.id} className="flex gap-3"><span className="w-6 text-stone tabular-nums">{i + 5}</span><span>{q.texto} <span className="text-stone">· {nomes[q.indice]}</span></span></li>)}
          </ol>
        </KkCard>
      </Reveal>
    </div>
  );
}
