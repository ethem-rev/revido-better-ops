"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

interface RolloverButtonProps {
  targetStart: string;
  onComplete: (count: number) => void;
}

export default function RolloverButton({ targetStart, onComplete }: RolloverButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleRollover = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rollover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_start: targetStart }),
      });
      const result = await res.json();
      onComplete(result.rolled ?? 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRollover}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-[#101010] px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-transparent disabled:opacity-50"
    >
      <RotateCcw size={14} className={loading ? "animate-spin" : ""} />
      Roll Over
    </button>
  );
}
