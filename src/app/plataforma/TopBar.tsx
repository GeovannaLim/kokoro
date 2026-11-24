"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { saveLang } from "@/components/kk/LangPills";
import { LANGS, type Lang } from "@/lib/i18n";

type Item = { href: string; label: string; grupo: string };
type L = { buscar: string; placeholder: string; vazio: string; claro: string; escuro: string; idioma: string; ir: string };

const TEMA = "kokoro:tema";
const temaAtual = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
const ouvirTema = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

/** Lado direito da barra do topo (como na Costura): modo claro/escuro, busca "⌘K" e idiomas. */
export function TopBar({ items, lang, l }: { items: Item[]; lang: Lang; l: L }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const tema = useSyncExternalStore(ouvirTema, temaAtual, () => "light");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const trocaTema = () => {
    const novo = tema === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    try { localStorage.setItem(TEMA, novo); } catch {}
  };

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
    return t ? items.filter((i) => `${i.label} ${i.grupo}`.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").includes(t)) : items;
  }, [q, items]);

  const abrir = () => { setQ(""); setSel(0); setOpen(true); };
  const fechar = () => setOpen(false);
  const ir = (i: Item) => { fechar(); router.push(i.href); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setQ(""); setSel(0); setOpen((o) => !o); }
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, []);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);

  const grupos = [...new Set(lista.map((i) => i.grupo))];
  let idx = -1;

  return (
    <div className="ml-auto flex items-center gap-2">
      <button type="button" onClick={trocaTema} aria-label={tema === "dark" ? l.claro : l.escuro} title={tema === "dark" ? l.claro : l.escuro}
        className="grid h-10 w-10 place-items-center rounded-xl text-sumi transition hover:bg-sumi/[0.06]">
        {tema === "dark"
          ? <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          : <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>}
      </button>

      <button type="button" onClick={abrir} aria-haspopup="dialog" aria-label={l.buscar}
        className="flex h-10 items-center gap-2 rounded-xl border border-sumi/12 bg-washi/60 px-3 text-[14px] text-sumi-soft transition hover:border-sumi/25 sm:w-[210px]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
        <span className="hidden flex-1 text-left sm:inline">{l.buscar}</span>
        <kbd className="hidden rounded-md border border-sumi/12 px-1.5 py-0.5 font-sans text-[11px] text-stone sm:inline">⌘K</kbd>
      </button>

      <div role="group" aria-label={l.idioma} className="hidden gap-0.5 rounded-xl border border-sumi/12 bg-washi/60 p-1 sm:flex">
        {LANGS.map((x) => (
          <button key={x} type="button" aria-pressed={x === lang} onClick={() => { saveLang(x); router.refresh(); }}
            className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.04em] transition ${x === lang ? "bg-sumi text-washi" : "text-sumi-soft hover:bg-sumi/[0.06]"}`}>
            {x.toUpperCase()}
          </button>
        ))}
      </div>
      {/* no celular, um botão só que alterna o idioma */}
      <button type="button" className="h-10 rounded-xl border border-sumi/12 bg-washi/60 px-3 text-[11px] font-semibold tracking-[0.04em] text-sumi sm:hidden" aria-label={l.idioma}
        onClick={() => { const n = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]; saveLang(n); router.refresh(); }}>
        {lang.toUpperCase()}
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-sumi/25 px-4 pt-[12vh] backdrop-blur-sm" onClick={fechar}>
          <div role="dialog" aria-modal="true" aria-label={l.buscar} onClick={(e) => e.stopPropagation()}
            className="kk-palette w-full max-w-[560px] overflow-hidden rounded-[22px] border border-white/80 bg-washi shadow-[0_40px_80px_-30px_rgba(41,37,33,.5)]">
            <div className="flex items-center gap-3 border-b border-sumi/10 px-5">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-stone" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
              <input ref={input} value={q} placeholder={l.placeholder} aria-label={l.placeholder}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") fechar();
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(lista.length - 1, s + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                  if (e.key === "Enter" && lista[sel]) ir(lista[sel]);
                }}
                className="h-14 flex-1 bg-transparent text-[16px] text-sumi outline-none placeholder:text-stone" />
              <kbd className="rounded-md border border-sumi/12 px-1.5 py-0.5 text-[11px] text-stone">esc</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {lista.length === 0 && <p className="px-3 py-6 text-center text-sm text-stone">{l.vazio}</p>}
              {grupos.map((g) => (
                <div key={g} className="py-1">
                  <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-[0.08em] text-stone uppercase">{g}</p>
                  {lista.filter((i) => i.grupo === g).map((i) => {
                    idx += 1;
                    const me = idx;
                    return (
                      <button key={i.href + i.label} type="button" onMouseEnter={() => setSel(me)} onClick={() => ir(i)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] transition ${me === sel ? "bg-sumi/[0.07] text-sumi" : "text-sumi-soft"}`}>
                        {i.label}<span className={`text-xs text-stone ${me === sel ? "opacity-100" : "opacity-0"}`}>{l.ir} ↵</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>, document.body)}
    </div>
  );
}
