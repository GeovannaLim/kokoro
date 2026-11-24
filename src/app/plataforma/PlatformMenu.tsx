"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/i18n";
import { Traco } from "@/components/kk/Pincel";

type Item = { href: string; label: string };

/** Menu da plataforma igual à gaveta da Costura Inovadora: abre pela esquerda, por baixo da barra do topo,
 *  itens em Manrope 17px peso 500, item atual com fundo suave, link de rodapé para o site. */
export function PlatformMenu({ items, lang, labels, empresa }: { items: Item[]; lang: Lang; labels: { menu: string; fechar: string; idioma: string }; empresa: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  // a gaveta vai direto para o <body>: o cabeçalho tem efeito de vidro, que prenderia um elemento fixo dentro dele
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => { document.documentElement.lang = lang === "pt" ? "pt-BR" : lang; }, [lang]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const site: Record<Lang, string> = { pt: "Conhecer o Kokoro →", en: "About Kokoro →", es: "Conocer Kokoro →" };
  return (
    <>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="kk-menu" aria-label={open ? labels.fechar : labels.menu}
        className="relative grid h-11 w-11 place-items-center rounded-xl transition hover:bg-sumi/[0.06]">
        <span aria-hidden className="relative block h-[12px] w-[18px]">
          <i className={`absolute left-0 h-[1.6px] w-full rounded bg-sumi transition-all duration-500 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
          <i className={`absolute left-0 top-[5px] h-[1.6px] rounded bg-sumi transition-all duration-300 ${open ? "w-0 opacity-0" : "w-full"}`} />
          <i className={`absolute left-0 h-[1.6px] rounded bg-sumi transition-all duration-500 ${open ? "top-[5px] w-full -rotate-45" : "top-[10px] w-3"}`} />
        </span>
      </button>

      {mounted && createPortal(<>
        <div onClick={() => setOpen(false)} aria-hidden
          className={`kk-menu-veu fixed inset-0 z-30 bg-sumi/[0.18] backdrop-blur-[6px] transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
        <aside id="kk-menu" aria-label={labels.menu} inert={!open}
          className={`kk-menu fixed inset-y-0 left-0 z-[35] flex w-[min(320px,86vw)] flex-col px-[18px] pt-[96px] pb-[22px] transition-[transform,visibility] duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${open ? "visible translate-x-0" : "invisible -translate-x-[104%]"}`}>
          <nav aria-label={labels.menu} className="flex flex-col gap-1">
            {items.map((it, i) => {
              const on = it.href === path;
              return (
                <Link key={it.href} href={it.href} aria-current={on ? "page" : undefined} onClick={() => setOpen(false)}
                  className={`kk-menu__item rounded-xl px-4 py-[13px] text-[17px] font-medium tracking-[-0.01em] transition-[opacity,transform,background,color] duration-500 ${on ? "bg-sumi/[0.07] text-sumi" : "text-sumi-soft hover:bg-sumi/[0.05] hover:text-sumi"} ${open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
                  style={{ transitionDelay: open ? `${0.1 + i * 0.04}s` : "0s" }}>
                  <span className="relative">{it.label}{on && <Traco className="absolute -bottom-1.5 left-0 h-[7px] w-full text-sumi/80" delay={0.35} />}</span>
                </Link>
              );
            })}
          </nav>
          <Link href="/" onClick={() => setOpen(false)}
            className={`mt-auto border-t border-sumi/10 px-4 pt-[14px] text-[14px] whitespace-nowrap text-stone transition-[opacity,transform,color] duration-500 hover:text-sumi ${open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
            style={{ transitionDelay: open ? "0.32s" : "0s" }}>
            {site[lang]}
          </Link>
          <p className="px-4 pt-2 text-[12px] text-stone">{empresa}</p>
        </aside>
      </>, document.body)}
    </>
  );
}
