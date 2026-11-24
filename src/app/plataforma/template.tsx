import type { ReactNode } from "react";

/** Remonta a cada troca de tela: a página entra como um corte de cinema (sobe, ganha foco e nitidez). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="kk-cena">{children}</div>;
}
