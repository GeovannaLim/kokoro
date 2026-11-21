import Link from "next/link";
import type { ReactNode } from "react";
import { LogoBrush } from "@/components/kk/Brand";
import { getDadosEmpresa } from "@/lib/data";
import { PlatformNav } from "./PlatformNav";

export const metadata = { title: "Plataforma | Kokoro" };

export default async function PlatformLayout({ children }: { children: ReactNode }) {
  const data = await getDadosEmpresa();
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 bg-washi/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <Link href="/" aria-label="Kokoro, início"><LogoBrush className="h-6 w-auto sm:h-7" /></Link>
          <PlatformNav />
          <span className="rounded-full bg-washi-deep/85 px-4 py-2 text-[12px] text-sumi-soft shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)]">
            {data.empresa} · <span className="text-stone">{data.sintetico ? "dados sintéticos" : "dados reais + sintéticos"}</span>
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pb-24 sm:px-8">{children}</main>
      <footer className="mx-auto w-full max-w-[1320px] px-4 pb-8 text-xs text-stone sm:px-8">
        Recortes com menos de {data.min_grupo} pessoas não são exibidos · Em sofrimento agora? Ligue 188 (CVV), 24 horas, gratuito.
      </footer>
    </div>
  );
}
