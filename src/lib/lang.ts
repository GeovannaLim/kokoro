import { cookies, headers } from "next/headers";
import { LANG_COOKIE, LANGS, type Lang } from "./i18n";

/** Idioma da plataforma: escolha guardada no cookie; senão, o idioma do navegador; senão, português.
 *  Lê dados da requisição, então quem chama precisa estar dentro de <Suspense>. */
export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value as Lang | undefined;
  if (c && LANGS.includes(c)) return c;
  const accept = (await headers()).get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase() as Lang;
    if (LANGS.includes(code)) return code;
  }
  return "pt";
}
