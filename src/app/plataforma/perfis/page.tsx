import { KkCard, KkTitle } from "@/components/kk/Brand";
import { t, ts } from "@/lib/i18n";
import { getLang } from "@/lib/lang";

export default async function Page() {
  const lang = await getLang();
  return (
    <div className="pt-10 text-center sm:pt-14">
      <div className="mx-auto w-fit"><KkTitle line1={ts(lang, "perfis_l1")} mark={ts(lang, "perfis_mark")} size="md" /></div>
      <KkCard tone="washi" className="mx-auto mt-14 max-w-xl p-10">
        <p className="text-sumi-soft">{ts(lang, "perfis_desc")}</p>
        <p className="mt-3 text-sm text-stone">{t(lang, "em_construcao")}</p>
      </KkCard>
    </div>
  );
}
