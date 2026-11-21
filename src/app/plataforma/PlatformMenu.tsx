"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { saveLang } from "@/components/kk/LangPills";
import type { Lang } from "@/lib/i18n";

type Item = { href: string; label: string };

/** Menu hambúrguer da plataforma: painel lateral com as telas, o idioma e a empresa. */
export function PlatformMenu({ items, lang, labels, empresa }: { items: Item[]; lang: Lang; labels: { menu: string; fechar: string; idioma: string }; empresa: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  // o painel vai direto para o <body>: o cabeçalho tem efeito de vidro, que prenderia um elemento fixo dentro dele
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => { document.documentElement.lang = lang === "pt" ? "pt-BR" : lang; }, [lang]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  function setLang(l: Lang) {
    saveLang(l);
    router.refresh();
  }

  const atual = items.find((i) => i.href === path)?.label;
  return (
    <>
      <div className="flex items-center gap-2">
        {atual && <span className="hidden rounded-full bg-washi-deep/85 px-4 py-2.5 text-[13px] text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)] sm:inline">{atual}</span>}
        <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="kk-menu"
          className="flex items-center gap-3 rounded-full bg-sumi py-2.5 pr-4 pl-5 text-[13px] text-washi transition hover:-translate-y-px hover:bg-[#2b2b2b]">
          {labels.menu}
          <span aria-hidden className="flex w-4 flex-col gap-[4px]"><i className="h-[1.5px] bg-washi" /><i className="h-[1.5px] bg-washi" /></span>
        </button>
      </div>

      {mounted && createPortal(<>
      <div onClick={() => setOpen(false)} aria-hidden
        className={`fixed inset-0 z-50 bg-washi/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside id="kk-menu" role="dialog" aria-modal="true" aria-label={labels.menu} inert={!open}
        className={`fixed inset-y-3 right-3 z-50 flex w-[min(420px,calc(100vw-24px))] flex-col rounded-[32px] bg-washi-deep p-6 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] sm:p-8 ${open ? "translate-x-0" : "translate-x-[110%]"}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone">{empresa}</span>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="rounded-full bg-sumi px-4 py-2 text-[13px] text-washi hover:bg-[#2b2b2b]">{labels.fechar} ✕</button>
        </div>
        <nav aria-label={labels.menu} className="mt-10 flex flex-1 flex-col gap-1">
          {items.map((it, i) => {
            const on = it.href === path;
            return (
              <Link key={it.href} href={it.href} aria-current={on ? "page" : undefined} onClick={() => setOpen(false)}
                className={`group relative flex items-baseline gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-sumi/[0.05] ${open ? "kk-menu-in" : ""}`}
                style={{ animationDelay: `${0.08 + i * 0.05}s` }}>
                <span className="w-6 text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className={`relative font-serif text-[34px] leading-tight ${on ? "italic" : ""}`}>
                  {it.label}
                  {on && <svg className="absolute right-0 -bottom-1 h-2 w-full overflow-visible" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden><path d="M4 16 C 90 8, 210 6, 396 12" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" /></svg>}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-sumi/10 pt-5">
          <span className="text-xs text-stone">{labels.idioma}</span>
          <div role="group" aria-label={labels.idioma} className="flex gap-1 rounded-full bg-washi/80 p-1 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]">
            {(["pt", "en", "es"] as Lang[]).map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={l === lang}
                className={`rounded-full px-3.5 py-2 text-xs tracking-[0.06em] transition ${l === lang ? "bg-sumi text-washi" : "text-sumi-soft hover:bg-sumi/[0.06]"}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </aside>
      </>, document.body)}
    </>
  );
}
