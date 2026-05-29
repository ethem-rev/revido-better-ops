"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  currentMonth: Date;
  onChange: (date: Date) => void;
}

export default function MonthSelector({ currentMonth, onChange }: MonthSelectorProps) {
  const prev = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    onChange(d);
  };

  const next = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    onChange(d);
  };

  const label = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="flex items-center gap-4">
      <button onClick={prev} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <ChevronLeft size={20} />
      </button>
      <span className="text-lg font-semibold min-w-[180px] text-center">{label}</span>
      <button onClick={next} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
