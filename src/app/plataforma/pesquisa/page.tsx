import { KkCard, KkTitle } from "@/components/kk/Brand";

export default function Page() {
  return (
    <div className="pt-10 text-center sm:pt-14">
      <div className="mx-auto w-fit"><KkTitle line1="Pesquisa" mark="anônima." size="md" /></div>
      <KkCard tone="washi" className="mx-auto mt-14 max-w-xl p-10">
        <p className="text-sumi-soft">A pesquisa de 20 perguntas, pelo celular, sem identificar ninguém.</p>
        <p className="mt-3 text-sm text-stone">Em construção.</p>
      </KkCard>
    </div>
  );
}
