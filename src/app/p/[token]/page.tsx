import { Suspense } from "react";
import Link from "next/link";
import { LogoBrush } from "@/components/kk/Brand";
import { getDadosEmpresa, getPesquisa } from "@/lib/data";
import { t, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { IdiomaTopo } from "./IdiomaTopo";
import { SurveyForm } from "./SurveyForm";
import { PincelDefs } from "@/components/kk/Pincel";

export const metadata = { title: "Pesquisa anônima | Kokoro" };

/** Token da pesquisa pública da demo: sem banco (como nesta cópia local), abre em modo demonstração. */
const TOKEN_DEMO = "-Oubs-eF";

async function Conteudo({ params }: { params: Promise<{ token: string }> }) {
  const [{ token }, lang] = await Promise.all([params, getLang()]);
  const p = await getPesquisa(token);
  if (p) return <SurveyForm token={p.token} empresa={tv(lang, p.empresa)} areas={p.areas} lang={lang} />;
  if (token === TOKEN_DEMO) {
    const d = await getDadosEmpresa();
    return <SurveyForm token={token} empresa={tv(lang, d.empresa)} areas={Object.keys(d.areas)} lang={lang} demo />;
  }
  return <p className="pt-24 text-center text-sumi-soft">{t(lang, "form_indisponivel")}</p>;
}

async function Idioma() {
  const lang = await getLang();
  return <IdiomaTopo lang={lang} label={t(lang, "idioma")} />;
}

/** Pesquisa pública (identidade 2, estética Costura Inovadora): barra branca translúcida, marfim liso, Manrope. */
export default function Page({ params }: { params: Promise<{ token: string }> }) {
  return (
    <div className="flex min-h-full flex-col">
      <PincelDefs />
      <header className="sticky top-0 z-40 border-b border-sumi/10 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-4 sm:px-8">
          <Link href="/" aria-label="Kokoro"><LogoBrush className="kk-logo-ink h-5 w-auto sm:h-6" /></Link>
          <Suspense fallback={null}><Idioma /></Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pt-10 pb-20 sm:px-8 sm:pt-16">
        <Suspense fallback={<p className="text-stone">…</p>}><Conteudo params={params} /></Suspense>
      </main>
    </div>
  );
}
