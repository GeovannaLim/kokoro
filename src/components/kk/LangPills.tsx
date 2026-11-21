"use client";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, LANGS, type Lang } from "@/lib/i18n";

/** Grava o idioma escolhido (vale para a plataforma e a pesquisa). */
export function saveLang(l: Lang) {
  document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

/** Seletor PT / EN / ES em pílula: grava a escolha num cookie e recarrega os textos. */
export function LangPills({ lang, label }: { lang: Lang; label: string }) {
  const router = useRouter();
  return (
    <div role="group" aria-label={label} className="flex gap-1 rounded-full bg-washi-deep/85 p-1 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]">
      {LANGS.map((l) => (
        <button key={l} type="button" aria-pressed={l === lang}
          onClick={() => { saveLang(l); router.refresh(); }}
          className={`rounded-full px-3.5 py-2 text-xs tracking-[0.06em] transition ${l === lang ? "bg-sumi text-washi" : "text-sumi-soft hover:bg-sumi/[0.06]"}`}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
