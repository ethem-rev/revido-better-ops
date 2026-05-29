"use client";

import { useState } from "react";
import { Initiative, Status } from "@/lib/types";
import Modal from "./Modal";

const statuses: Status[] = ["New", "In Progress", "Improved", "Failed"];

interface EditInitiativeFormProps {
  initiative: Initiative;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Initiative>) => void;
}

export default function EditInitiativeForm({ initiative, open, onClose, onSave }: EditInitiativeFormProps) {
  const [title, setTitle] = useState(initiative.title);
  const [owner, setOwner] = useState(initiative.owner);
  const [status, setStatus] = useState<Status>(initiative.status);
  const [description, setDescription] = useState(initiative.description || "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !owner.trim()) return;
    onSave(initiative.id, {
      title: title.trim(),
      owner: owner.trim(),
      status,
      description: description.trim() || null,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Initiative">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Title
          </label>
          <input
            autoFocus
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Owner
          </label>
          <input
            required
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Notes
            <span className="ml-1 normal-case tracking-normal font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/25"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
