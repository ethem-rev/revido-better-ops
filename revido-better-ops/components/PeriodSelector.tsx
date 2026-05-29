"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CycleType, Period, getNextPeriod, getPrevPeriod } from "@/lib/cycles";

interface PeriodSelectorProps {
  period: Period;
  cycleType: CycleType;
  onPeriodChange: (period: Period) => void;
  onCycleTypeChange: (cycle: CycleType) => void;
}

export default function PeriodSelector({
  period,
  cycleType,
  onPeriodChange,
}: PeriodSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPeriodChange(getPrevPeriod(period, cycleType))}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-semibold min-w-[200px] text-center text-slate-700 dark:text-slate-200">
        {period.label}
      </span>
      <button
        onClick={() => onPeriodChange(getNextPeriod(period, cycleType))}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
