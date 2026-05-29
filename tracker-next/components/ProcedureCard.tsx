"use client";

import { Procedure, Status } from "@/lib/types";
import { Circle, Clock, CheckCircle2, Trash2 } from "lucide-react";

interface ProcedureCardProps {
  procedure: Procedure;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const statusConfig: Record<Status, { icon: React.ReactNode; label: string; color: string }> = {
  pending: { icon: <Circle size={14} />, label: "Pending", color: "text-gray-400" },
  in_progress: { icon: <Clock size={14} />, label: "In Progress", color: "text-yellow-500" },
  done: { icon: <CheckCircle2 size={14} />, label: "Done", color: "text-green-500" },
};

const nextStatus: Record<Status, Status> = {
  pending: "in_progress",
  in_progress: "done",
  done: "pending",
};

export default function ProcedureCard({ procedure, onStatusChange, onDelete }: ProcedureCardProps) {
  const config = statusConfig[procedure.status];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{procedure.title}</h4>
          {procedure.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{procedure.description}</p>
          )}
        </div>
        <button
          onClick={() => onDelete(procedure.id)}
          className="text-gray-400 hover:text-red-500 shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <button
        onClick={() => onStatusChange(procedure.id, nextStatus[procedure.status])}
        className={`mt-2 flex items-center gap-1 text-xs ${config.color} hover:opacity-80`}
      >
        {config.icon}
        <span>{config.label}</span>
      </button>
      {procedure.carried_from && (
        <span className="text-[10px] text-blue-400 mt-1 block">\u21a9 Carried over</span>
      )}
    </div>
  );
}
