import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#assistente", label: "Assistente" },
  { href: "#sobre", label: "Sobre" },
  { href: "#planos", label: "Planos" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <Link href="/" aria-label="Kokoro, início" className="rounded-full bg-washi/80 py-1 pr-3 backdrop-blur">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <nav
            aria-label="Principal"
            className="hair hidden items-center gap-1 rounded-full bg-washi-deep/80 p-1 backdrop-blur md:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[13px] tracking-[0.06em] text-sumi transition-colors hover:bg-washi"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <ButtonLink href="#contato" className="px-5 py-3">
            Agendar demo
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
