import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kokoro — saúde mental organizacional",
  description:
    "Pesquisa anônima, três índices de cultura e um assistente com IA para o RH cuidar da saúde mental da equipe e cumprir a NR-1.",
};

// Identidade 2: duas famílias. Italiana (próxima da logo a pincel) só nos títulos grandes; Manrope em todo o resto.
const FONTS =
  "https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@300;400;500;600;700&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        {/* modo escuro salvo: aplicado antes de desenhar a plataforma, para não piscar */}
        <Script id="kk-tema" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `try{if(location.pathname.indexOf("/plataforma")===0&&localStorage.getItem("kokoro:tema")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}` }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
