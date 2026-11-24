import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { LogoBrush } from "@/components/kk/Brand";
import { getDadosEmpresa } from "@/lib/data";
import { t, tv } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { AssistantBubble } from "./AssistantBubble";
import { PlatformMenu } from "./PlatformMenu";
import { TopBar } from "./TopBar";
import { Luz } from "./Luz";
import { Enso, PincelDefs } from "@/components/kk/Pincel";
import type { Grupo } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";

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

const TB: Record<Lang, { telas: string; acoes: string; areas: string; buscar: string; placeholder: string; vazio: string; claro: string; escuro: string; ir: string; link: string; pdf: string; plano: string }> = {
  pt: { telas: "Telas", acoes: "Ações", areas: "Áreas", buscar: "Buscar ou ir para", placeholder: "Buscar telas, áreas ou ações…", vazio: "Nada encontrado.", claro: "Modo claro", escuro: "Modo escuro", ir: "Abrir", link: "Copiar o link da pesquisa", pdf: "Gerar o relatório em PDF", plano: "Marcar ações do plano" },
  en: { telas: "Screens", acoes: "Actions", areas: "Areas", buscar: "Search or jump to", placeholder: "Search screens, areas or actions…", vazio: "Nothing found.", claro: "Light mode", escuro: "Dark mode", ir: "Open", link: "Copy the survey link", pdf: "Generate the PDF report", plano: "Check off plan actions" },
  es: { telas: "Pantallas", acoes: "Acciones", areas: "Áreas", buscar: "Buscar o ir a", placeholder: "Buscar pantallas, áreas o acciones…", vazio: "No se encontró nada.", claro: "Modo claro", escuro: "Modo oscuro", ir: "Abrir", link: "Copiar el enlace de la encuesta", pdf: "Generar el informe en PDF", plano: "Marcar acciones del plan" },
};

async function Direita() {
  const [lang, data] = await Promise.all([getLang(), getDadosEmpresa()]);
  const x = TB[lang];
  const telas = ([["/plataforma", "nav_dashboard"], ["/plataforma/pesquisa", "nav_pesquisa"], ["/plataforma/perfis", "nav_perfis"], ["/plataforma/plano", "nav_plano"], ["/plataforma/relatorio", "nav_relatorio"]] as const)
    .map(([href, k]) => ({ href, label: t(lang, k), grupo: x.telas }));
  const acoes = [{ href: "/plataforma/pesquisa", label: x.link }, { href: "/plataforma/relatorio", label: x.pdf }, { href: "/plataforma/plano", label: x.plano }].map((a) => ({ ...a, grupo: x.acoes }));
  const areas = Object.entries(data.areas as Record<string, Grupo>).filter(([, g]) => !g.oculto).map(([nome]) => ({ href: "/plataforma#areas", label: tv(lang, nome), grupo: x.areas }));
  return <TopBar items={[...telas, ...acoes, ...areas]} lang={lang} l={{ buscar: x.buscar, placeholder: x.placeholder, vazio: x.vazio, claro: x.claro, escuro: x.escuro, idioma: t(lang, "idioma"), ir: x.ir }} />;
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
      {/* fundo: luzes difusas que flutuam devagar, com um véu esfumado por cima */}
      <div aria-hidden className="kk-ambient"><i /><i /><i /><i /><i /></div>
      <PincelDefs />
      <header className="sticky top-0 z-40 border-b border-sumi/10 kk-topbar bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-3 px-3 sm:px-6">
          <Suspense fallback={<span className="h-11 w-11" />}><Header /></Suspense>
          <Link href="/" aria-label="Kokoro"><LogoBrush className="kk-logo-ink h-5 w-auto sm:h-6" /></Link>
          <Suspense fallback={null}><Direita /></Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pb-24 sm:px-8">
        <Suspense fallback={<div className="grid h-[60vh] place-items-center"><div className="kk-respira relative grid h-20 w-20 place-items-center text-sumi/50"><Enso className="absolute inset-0 h-full w-full" delay={0} /><span className="kk-kokoro-kanji text-[30px]">心</span></div></div>}>{children}</Suspense>
      </main>
      <footer className="mx-auto w-full max-w-[1320px] px-4 pb-8 text-xs text-stone sm:px-8">
        <Suspense fallback={null}><Footer /></Suspense>
      </footer>
      <Suspense fallback={null}><Assistente /></Suspense>
      <Luz />
    </div>
  );
}
