"use client";

import { Status } from "@/lib/types";

const statusStyles: Record<Status, string> = {
  New: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  "In Progress": "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  Improved: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  Failed: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
};

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
