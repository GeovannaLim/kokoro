import { Suspense } from "react";
import Link from "next/link";
import { LogoBrush } from "@/components/kk/Brand";
import { LangPills } from "@/components/kk/LangPills";
import { getPesquisa } from "@/lib/data";
import { t, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { SurveyForm } from "./SurveyForm";

export const metadata = { title: "Pesquisa anônima | Kokoro" };

async function Conteudo({ params }: { params: Promise<{ token: string }> }) {
  const [{ token }, lang] = await Promise.all([params, getLang()]);
  const p = await getPesquisa(token);
  if (!p) return <p className="text-center text-sumi-soft">{t(lang, "form_indisponivel")}</p>;
  return <SurveyForm token={p.token} empresa={tv(lang, p.empresa)} areas={p.areas} lang={lang} />;
}

async function Idioma() {
  const lang = await getLang();
  return <LangPills lang={lang} label={t(lang, "idioma")} />;
}

export default function Page({ params }: { params: Promise<{ token: string }> }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" aria-label="Kokoro"><LogoBrush className="h-6 w-auto" /></Link>
        <Suspense fallback={null}><Idioma /></Suspense>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pt-8 pb-20 sm:pt-16">
        <Suspense fallback={<p className="text-stone">…</p>}><Conteudo params={params} /></Suspense>
      </main>
    </div>
  );
}
