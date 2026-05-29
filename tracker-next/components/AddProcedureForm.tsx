"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import { Plus, X } from "lucide-react";

interface AddProcedureFormProps {
  category: Category;
  onAdd: (title: string, description: string) => void;
}

export default function AddProcedureForm({ category, onAdd }: AddProcedureFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
      >
        <Plus size={14} /> Add item
      </button>
    );
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500 uppercase">{category}</span>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>
      <input
        autoFocus
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-transparent"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-transparent resize-none"
        rows={2}
      />
      <button
        onClick={submit}
        className="w-full text-sm bg-blue-600 text-white rounded py-1 hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  );
}
