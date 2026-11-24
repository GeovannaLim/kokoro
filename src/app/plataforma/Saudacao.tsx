"use client";
import { useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";
import { Traco } from "@/components/kk/Pincel";

const S: Record<Lang, [string, string, string, string]> = {
  pt: ["Olá", "Bom dia", "Boa tarde", "Boa noite"],
  en: ["Hello", "Good morning", "Good afternoon", "Good evening"],
  es: ["Hola", "Buenos días", "Buenas tardes", "Buenas noches"],
};
const nada = () => () => {};

/** Data e saudação pelo relógio de quem está vendo. No servidor sai só "Olá" (sem data), para não divergir. */
export function Saudacao({ lang, locale }: { lang: Lang; locale: string }) {
  const agora = useSyncExternalStore(nada, () => {
    const d = new Date(), h = d.getHours();
    return `${d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}|${S[lang][h < 5 ? 3 : h < 12 ? 1 : h < 18 ? 2 : 3]}`;
  }, () => null);
  const [dia, oi] = agora ? agora.split("|") : [" ", S[lang][0]];
  return (
    <>
      <span className="db-kicker">{dia}</span>
      <h2 className="relative w-fit">{oi}.<Traco className="absolute -bottom-2 left-0 h-[10px] w-[92%] text-[#d9c48f]" delay={1.2} /></h2>
    </>
  );
}
