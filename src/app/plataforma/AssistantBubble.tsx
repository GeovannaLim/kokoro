"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type L = { abrir: string; sub: string; oi: string; breve: string; qs: string[]; placeholder: string; fechar: string };

/** Bolinha flutuante com o rosto do Kokoro: abre o pop-up do assistente em qualquer tela da plataforma. */
export function AssistantBubble({ l }: { l: L }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section role="dialog" aria-modal="false" aria-label={l.abrir} inert={!open}
        className={`fixed right-4 bottom-28 z-50 flex w-[min(380px,calc(100vw-32px))] origin-bottom-right flex-col overflow-hidden rounded-[28px] bg-washi-deep shadow-[0_30px_80px_-30px_rgba(17,17,17,.45),inset_0_0_0_1px_rgba(17,17,17,0.09)] transition duration-300 ease-[cubic-bezier(.2,.7,.2,1)] sm:right-8 ${open ? "scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}>
        <header className="flex items-center gap-3 bg-sumi px-5 py-4 text-washi">
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-washi"><Image src="/brand/kokoro-face.png" alt="" fill sizes="44px" className="scale-125 object-cover object-top" /></span>
          <div className="flex-1">
            <p className="font-serif text-2xl leading-none">Kokoro</p>
            <p className="mt-1 text-xs text-washi/60">{l.sub}</p>
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={l.fechar} className="grid h-9 w-9 place-items-center rounded-full text-washi/80 hover:bg-washi/10">✕</button>
        </header>
        <div className="space-y-3 p-5">
          <p className="max-w-[90%] rounded-[20px] rounded-tl-md bg-[#fbf4e9] px-4 py-3 text-[14px] leading-relaxed text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.06)]">{l.oi}</p>
          <div className="flex flex-col items-end gap-2 pt-1">
            {l.qs.map((q) => (
              <span key={q} className="rounded-full px-4 py-2 text-[13px] text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.18)]">{q}</span>
            ))}
          </div>
          <p className="pt-2 text-center text-xs text-stone">{l.breve}</p>
        </div>
        <div className="border-t border-sumi/10 p-3">
          <div className="flex items-center gap-2 rounded-full bg-washi px-4 py-2.5 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]">
            <span className="flex-1 text-[13px] text-stone">{l.placeholder}</span>
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-sumi/20 text-washi">↑</span>
          </div>
        </div>
      </section>

      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={l.abrir}
        className="group fixed right-4 bottom-6 z-50 sm:right-8">
        <span className="pointer-events-none absolute top-1/2 right-[calc(100%+12px)] -translate-y-1/2 rounded-full bg-sumi px-4 py-2 text-[13px] whitespace-nowrap text-washi opacity-0 transition group-hover:opacity-100">{l.abrir}</span>
        {!open && <span aria-hidden className="kk-ping absolute inset-0 rounded-full ring-2 ring-ai/40" />}
        <span className="kk-bob relative block h-[68px] w-[68px] overflow-hidden rounded-full bg-washi shadow-[0_14px_30px_-12px_rgba(17,17,17,.45),inset_0_0_0_1px_rgba(17,17,17,0.12)] transition group-hover:-translate-y-0.5">
          <Image src="/brand/kokoro-face.png" alt="" fill sizes="68px" className="scale-125 object-cover object-top" />
        </span>
      </button>
    </>
  );
}
