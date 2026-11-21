import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "inverse";

const styles: Record<Variant, string> = {
  primary: "bg-sumi text-washi hover:bg-[#2b2b2b] focus-visible:outline-sumi",
  secondary: "text-sumi shadow-[inset_0_0_0_1px_rgba(17,17,17,0.22)] hover:bg-washi-deep focus-visible:outline-sumi",
  inverse: "bg-washi text-sumi hover:bg-white focus-visible:outline-washi",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
