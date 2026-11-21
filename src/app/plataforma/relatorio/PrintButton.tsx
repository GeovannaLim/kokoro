"use client";
export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-full bg-sumi px-6 py-3 text-sm text-washi transition hover:-translate-y-px hover:bg-[#2b2b2b]">
      {label} ↓
    </button>
  );
}
