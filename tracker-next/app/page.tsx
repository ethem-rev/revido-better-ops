"use client";

import { useCallback, useEffect, useState } from "react";
import { Procedure, Category, Status } from "@/lib/types";
import MonthSelector from "@/components/MonthSelector";
import CategoryColumn from "@/components/CategoryColumn";
import CarryOverButton from "@/components/CarryOverButton";

function getMonthString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}-01`;
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(false);
  const [carryLoading, setCarryLoading] = useState(false);

  const monthStr = getMonthString(currentMonth);

  const fetchProcedures = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/procedures?month=${monthStr}`);
      const data = await res.json();
      if (Array.isArray(data)) setProcedures(data);
    } finally {
      setLoading(false);
    }
  }, [monthStr]);

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

  const addProcedure = async (category: Category, title: string, description: string) => {
    const res = await fetch("/api/procedures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description: description || null, category, month: monthStr }),
    });
    const item = await res.json();
    if (item.id) setProcedures((prev) => [...prev, item]);
  };

  const updateStatus = async (id: string, status: Status) => {
    setProcedures((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await fetch("/api/procedures", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  };

  const deleteProcedure = async (id: string) => {
    setProcedures((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/procedures?id=${id}`, { method: "DELETE" });
  };

  const carryOver = async () => {
    const incomplete = procedures.filter((p) => p.status !== "done");
    if (incomplete.length === 0) return;

    setCarryLoading(true);
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthStr = getMonthString(nextMonth);

    try {
      await Promise.all(
        incomplete.map((p) =>
          fetch("/api/procedures", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: p.title,
              description: p.description,
              category: p.category,
              month: nextMonthStr,
              carried_from: p.id,
            }),
          })
        )
      );
      setCurrentMonth(nextMonth);
    } finally {
      setCarryLoading(false);
    }
  };

  const categories: Category[] = ["improve", "add", "remove"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">Monthly Improvement Tracker</h1>
          <MonthSelector currentMonth={currentMonth} onChange={setCurrentMonth} />
        </header>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {categories.map((cat) => (
                <CategoryColumn
                  key={cat}
                  category={cat}
                  procedures={procedures.filter((p) => p.category === cat)}
                  onAdd={addProcedure}
                  onStatusChange={updateStatus}
                  onDelete={deleteProcedure}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <CarryOverButton onCarryOver={carryOver} loading={carryLoading} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
