"use client";

import Link from "next/link";
import { LogOut, Users } from "lucide-react";
import { CycleType, Period } from "@/lib/cycles";
import PeriodSelector from "./PeriodSelector";

interface HeaderProps {
  period: Period;
  cycleType: CycleType;
  onPeriodChange: (period: Period) => void;
  onCycleTypeChange: (cycle: CycleType) => void;
  ownerName: string;
  isAdmin: boolean;
  onSignOut: () => void;
}

export default function Header({
  period,
  cycleType,
  onPeriodChange,
  onCycleTypeChange,
  ownerName,
  isAdmin,
  onSignOut,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-[#0a0a0a]/90 border-b border-slate-200/60 dark:border-transparent px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
            <span className="text-sm font-bold text-white">R</span>
          </div>
          <span className="text-base font-semibold tracking-tight">Better Ops</span>
        </div>

        <PeriodSelector
          period={period}
          cycleType={cycleType}
          onPeriodChange={onPeriodChange}
          onCycleTypeChange={onCycleTypeChange}
        />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 pl-3 pr-1 py-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{ownerName}</span>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/60"
              >
                <Users size={12} />
                Admin
              </Link>
            )}
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
