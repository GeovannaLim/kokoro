import { KkCard, KkTitle } from "@/components/kk/Brand";

export default function Page() {
  return (
    <div className="pt-10 text-center sm:pt-14">
      <div className="mx-auto w-fit"><KkTitle line1="Perfis" mark="de equipe." size="md" /></div>
      <KkCard tone="washi" className="mx-auto mt-14 max-w-xl p-10">
        <p className="text-sumi-soft">Como as pessoas se agrupam em apoio, estigma e abertura.</p>
        <p className="mt-3 text-sm text-stone">Em construção.</p>
      </KkCard>
    </div>
  );
}
