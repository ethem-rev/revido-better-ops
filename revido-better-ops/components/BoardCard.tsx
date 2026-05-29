"use client";

import { Initiative } from "@/lib/types";
import { ArrowRight, Undo2 } from "lucide-react";

interface BoardCardProps {
  initiative: Initiative;
  onMove: (id: string) => void;
  actionLabel: string;
  actionIcon: "forward" | "back";
}

export default function BoardCard({ initiative, onMove, actionLabel, actionIcon }: BoardCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-[#101010] p-4 hover:border-slate-300 dark:hover:border-transparent hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-black/20">
      <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{initiative.title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{initiative.owner}</p>
      <button
        onClick={() => onMove(initiative.id)}
        className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        {actionIcon === "forward" ? <ArrowRight size={13} /> : <Undo2 size={13} />}
        {actionLabel}
      </button>
    </div>
  );
}
