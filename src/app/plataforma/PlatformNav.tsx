"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/plataforma", label: "Dashboard" },
  { href: "/plataforma/pesquisa", label: "Pesquisa" },
  { href: "/plataforma/assistente", label: "Assistente" },
  { href: "/plataforma/perfis", label: "Perfis" },
  { href: "/plataforma/plano", label: "Plano de ação" },
  { href: "/plataforma/relatorio", label: "Relatório NR-1" },
];

export function PlatformNav() {
  const path = usePathname();
  return (
    <nav aria-label="Plataforma" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-washi-deep/85 p-1 shadow-[inset_0_0_0_1px_rgba(17,17,17,0.09)] backdrop-blur [scrollbar-width:none]">
      {LINKS.map((l) => {
        const on = path === l.href;
        return (
          <Link key={l.href} href={l.href} aria-current={on ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-[13px] tracking-[0.04em] whitespace-nowrap transition-colors ${on ? "bg-sumi text-washi" : "text-sumi hover:bg-sumi/[0.06]"}`}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
