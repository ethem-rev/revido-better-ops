"use client";

import { Initiative } from "@/lib/types";
import BoardCard from "./BoardCard";

interface ProgressBoardProps {
  initiatives: Initiative[];
  onStatusChange: (id: string, status: "In Progress" | "Improved") => void;
}

export default function ProgressBoard({ initiatives, onStatusChange }: ProgressBoardProps) {
  const expected = initiatives.filter((i) => i.status === "In Progress");
  const done = initiatives.filter((i) => i.status === "Improved");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Expected
          </h3>
          <span className="rounded-md bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
            {expected.length}
          </span>
        </div>
        <div className="space-y-2.5">
          {expected.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-transparent py-8 text-center">
              <p className="text-xs text-slate-400">No items in progress</p>
            </div>
          ) : (
            expected.map((i) => (
              <BoardCard
                key={i.id}
                initiative={i}
                onMove={(id) => onStatusChange(id, "Improved")}
                actionLabel="Move to Done"
                actionIcon="forward"
              />
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Done
          </h3>
          <span className="rounded-md bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            {done.length}
          </span>
        </div>
        <div className="space-y-2.5">
          {done.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-transparent py-8 text-center">
              <p className="text-xs text-slate-400">No completed items</p>
            </div>
          ) : (
            done.map((i) => (
              <BoardCard
                key={i.id}
                initiative={i}
                onMove={(id) => onStatusChange(id, "In Progress")}
                actionLabel="Move back"
                actionIcon="back"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
