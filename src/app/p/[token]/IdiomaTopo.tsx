"use client";
import { useRouter } from "next/navigation";
import { saveLang } from "@/components/kk/LangPills";
import { LANGS, type Lang } from "@/lib/i18n";

/** PT · EN · ES no canto superior direito, igual à barra da plataforma. */
export function IdiomaTopo({ lang, label }: { lang: Lang; label: string }) {
  const router = useRouter();
  return (
    <div role="group" aria-label={label} className="flex gap-0.5 rounded-xl border border-sumi/12 bg-washi/60 p-1">
      {LANGS.map((x) => (
        <button key={x} type="button" aria-pressed={x === lang} onClick={() => { saveLang(x); router.refresh(); }}
          className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.04em] transition ${x === lang ? "bg-sumi text-washi" : "text-sumi-soft hover:bg-sumi/[0.06]"}`}>
          {x.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
