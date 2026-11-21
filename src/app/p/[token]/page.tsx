import { Suspense } from "react";
import Link from "next/link";
import { LogoBrush } from "@/components/kk/Brand";
import { getPesquisa } from "@/lib/data";
import { SurveyForm } from "./SurveyForm";

export const metadata = { title: "Pesquisa anônima | Kokoro" };

async function Conteudo({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const p = await getPesquisa(token);
  if (!p) return <p className="text-center text-sumi-soft">Esta pesquisa não está disponível.</p>;
  return <SurveyForm token={p.token} empresa={p.empresa} areas={p.areas} />;
}

export default function Page({ params }: { params: Promise<{ token: string }> }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto w-full max-w-[1320px] px-4 py-5 sm:px-8"><Link href="/" aria-label="Kokoro"><LogoBrush className="h-6 w-auto" /></Link></header>
      <main className="flex flex-1 items-start justify-center px-4 pt-8 pb-20 sm:pt-16">
        <Suspense fallback={<p className="text-stone">Carregando…</p>}><Conteudo params={params} /></Suspense>
      </main>
    </div>
  );
}
