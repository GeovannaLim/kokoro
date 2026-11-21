import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { LogoBrush } from "@/components/kk/Brand";
import { getDadosEmpresa } from "@/lib/data";
import { t, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { AssistantBubble } from "./AssistantBubble";
import { PlatformMenu } from "./PlatformMenu";

export const metadata = { title: "Plataforma | Kokoro" };

async function Header() {
  const [lang, data] = await Promise.all([getLang(), getDadosEmpresa()]);
  const items = [
    { href: "/plataforma", label: t(lang, "nav_dashboard") },
    { href: "/plataforma/pesquisa", label: t(lang, "nav_pesquisa") },
    { href: "/plataforma/perfis", label: t(lang, "nav_perfis") },
    { href: "/plataforma/plano", label: t(lang, "nav_plano") },
    { href: "/plataforma/relatorio", label: t(lang, "nav_relatorio") },
  ];
  const empresa = `${tv(lang, data.empresa)} · ${data.sintetico ? t(lang, "sintetico") : t(lang, "misto")}`;
  return <PlatformMenu items={items} lang={lang} empresa={empresa} labels={{ menu: t(lang, "menu"), fechar: t(lang, "fechar"), idioma: t(lang, "idioma") }} />;
}

async function Assistente() {
  const lang = await getLang();
  return <AssistantBubble lang={lang} l={{ abrir: t(lang, "ass_abrir"), sub: t(lang, "ass_sub"), oi: t(lang, "ass_oi"), breve: t(lang, "ass_breve"),
    qs: [t(lang, "ass_q1"), t(lang, "ass_q2"), t(lang, "ass_q3")], placeholder: t(lang, "ass_placeholder"), fechar: t(lang, "fechar"), erro: t(lang, "ass_erro"), enviar: t(lang, "ass_enviar"), falar: t(lang, "ass_falar"), ouvindo: t(lang, "ass_ouvindo"), falando: t(lang, "ass_falando"), parar: t(lang, "ass_parar"), som: t(lang, "ass_som") }} />;
}

async function Footer() {
  const lang = await getLang();
  return <>{t(lang, "rodape")}</>;
}

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 bg-washi/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <Link href="/" aria-label="Kokoro"><LogoBrush className="h-6 w-auto sm:h-7" /></Link>
          <Suspense fallback={<span className="h-10 w-28 rounded-full bg-sumi/90" />}><Header /></Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pb-24 sm:px-8">
        <Suspense fallback={<div className="h-[60vh]" />}>{children}</Suspense>
      </main>
      <footer className="mx-auto w-full max-w-[1320px] px-4 pb-8 text-xs text-stone sm:px-8">
        <Suspense fallback={null}><Footer /></Suspense>
      </footer>
      <Suspense fallback={null}><Assistente /></Suspense>
    </div>
  );
}
