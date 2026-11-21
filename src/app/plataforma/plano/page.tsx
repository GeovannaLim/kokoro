import { KkCard, KkTitle } from "@/components/kk/Brand";

export default function Page() {
  return (
    <div className="pt-10 text-center sm:pt-14">
      <div className="mx-auto w-fit"><KkTitle line1="Plano" mark="de ação." size="md" /></div>
      <KkCard tone="washi" className="mx-auto mt-14 max-w-xl p-10">
        <p className="text-sumi-soft">Prioridades e ações sugeridas a partir do diagnóstico.</p>
        <p className="mt-3 text-sm text-stone">Em construção.</p>
      </KkCard>
    </div>
  );
}
