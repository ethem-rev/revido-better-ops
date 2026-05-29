"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Initiative } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import EditInitiativeForm from "./EditInitiativeForm";

interface InitiativesTableProps {
  initiatives: Initiative[];
  onUpdate: (id: string, updates: Partial<Initiative>) => void;
}

export default function InitiativesTable({ initiatives, onUpdate }: InitiativesTableProps) {
  const [editing, setEditing] = useState<Initiative | null>(null);
  const filtered = initiatives.filter((i) => i.status === "New" || i.status === "Failed");

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 dark:border-transparent py-8 text-center">
        <p className="text-xs text-slate-400">No new or failed items</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-[#101010]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-transparent">
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Title
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Owner
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Notes
              </th>
              <th className="px-5 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((initiative, idx) => (
              <tr
                key={initiative.id}
                className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  idx < filtered.length - 1 ? "border-b border-slate-100 dark:border-transparent/50" : ""
                }`}
              >
                <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-slate-100">
                  {initiative.title}
                </td>
                <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                  {initiative.owner}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={initiative.status} />
                </td>
                <td className="px-5 py-3.5 text-slate-400 max-w-xs truncate">
                  {initiative.description || "—"}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => setEditing(initiative)}
                    className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditInitiativeForm
          key={editing.id}
          initiative={editing}
          open={true}
          onClose={() => setEditing(null)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}
