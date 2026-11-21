import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kokoro — saúde mental organizacional",
  description:
    "Pesquisa anônima, três índices de cultura e um assistente com IA para o RH cuidar da saúde mental da equipe e cumprir a NR-1.",
};

// Só 3 famílias no Kokoro inteiro: Cormorant Garamond (títulos), Jost (texto) e Shippori Mincho (kanji e carimbos).
const FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Jost:wght@300;400;500&family=Shippori+Mincho:wght@500;800&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
