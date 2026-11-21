"use client";
import { useState } from "react";

export function CopyLink({ path, label, done }: { path: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="rounded-full px-5 py-3 text-sm text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] transition hover:bg-white/10"
      onClick={async () => { await navigator.clipboard.writeText(location.origin + path); setOk(true); setTimeout(() => setOk(false), 2000); }}>
      {ok ? `✓ ${done}` : label}
    </button>
  );
}
