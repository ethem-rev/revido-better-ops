"use client";

import { Category, Procedure, Status } from "@/lib/types";
import ProcedureCard from "./ProcedureCard";
import AddProcedureForm from "./AddProcedureForm";
import { TrendingUp, PlusCircle, MinusCircle } from "lucide-react";

interface CategoryColumnProps {
  category: Category;
  procedures: Procedure[];
  onAdd: (category: Category, title: string, description: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const categoryMeta: Record<Category, { label: string; icon: React.ReactNode; color: string }> = {
  improve: { label: "Improve", icon: <TrendingUp size={16} />, color: "text-purple-500" },
  add: { label: "Add", icon: <PlusCircle size={16} />, color: "text-green-500" },
  remove: { label: "Remove", icon: <MinusCircle size={16} />, color: "text-red-500" },
};

export default function CategoryColumn({
  category,
  procedures,
  onAdd,
  onStatusChange,
  onDelete,
}: CategoryColumnProps) {
  const meta = categoryMeta[category];

  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`flex items-center gap-2 mb-3 ${meta.color}`}>
        {meta.icon}
        <h3 className="font-semibold">{meta.label}</h3>
        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2">
          {procedures.length}
        </span>
      </div>
      <div className="space-y-2">
        {procedures.map((p) => (
          <ProcedureCard key={p.id} procedure={p} onStatusChange={onStatusChange} onDelete={onDelete} />
        ))}
        <AddProcedureForm category={category} onAdd={(title, desc) => onAdd(category, title, desc)} />
      </div>
    </div>
  );
}
