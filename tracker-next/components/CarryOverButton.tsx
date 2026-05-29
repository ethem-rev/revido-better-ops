"use client";

import { RotateCcw } from "lucide-react";

interface CarryOverButtonProps {
  onCarryOver: () => void;
  loading: boolean;
}

export default function CarryOverButton({ onCarryOver, loading }: CarryOverButtonProps) {
  return (
    <button
      onClick={onCarryOver}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      <RotateCcw size={14} className={loading ? "animate-spin" : ""} />
      Carry incomplete to next month
    </button>
  );
}
