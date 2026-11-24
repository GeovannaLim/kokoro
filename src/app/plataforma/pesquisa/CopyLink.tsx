"use client";
import { useState } from "react";

export function CopyLink({ path, label, done }: { path: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="rounded-xl border border-sumi/15 bg-white/70 px-5 py-3 text-sm font-medium text-sumi transition hover:bg-white"
      onClick={async () => { await navigator.clipboard.writeText(path.startsWith("http") ? path : location.origin + path); setOk(true); setTimeout(() => setOk(false), 2000); }}>
      {ok ? `✓ ${done}` : label}
    </button>
  );
}
