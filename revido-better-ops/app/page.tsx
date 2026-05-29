"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Initiative } from "@/lib/types";
import { CycleType, Period, getPeriodForDate } from "@/lib/cycles";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import ProgressBoard from "@/components/ProgressBoard";
import InitiativesTable from "@/components/InitiativesTable";
import AddInitiativeForm from "@/components/AddInitiativeForm";
import RolloverButton from "@/components/RolloverButton";

export default function Home() {
  const { user, loading: authLoading, ownerName, isAdmin, signOut } = useAuth();
  const router = useRouter();

  const [cycleType] = useState<CycleType>("3-week");
  const [currentPeriod, setCurrentPeriod] = useState<Period>(() =>
    getPeriodForDate(new Date(), "3-week")
  );
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  const fetchInitiatives = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/procedures?start=${currentPeriod.start}&end=${currentPeriod.end}`
      );
      const data = await res.json();
      if (Array.isArray(data)) setInitiatives(data);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod.start, currentPeriod.end]);

  useEffect(() => {
    if (user) fetchInitiatives();
  }, [fetchInitiatives, user]);

  const addInitiative = async (title: string, description: string) => {
    const res = await fetch("/api/procedures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: description || null,
        owner: ownerName,
        status: "New",
        month_assigned: currentPeriod.start,
      }),
    });
    const item = await res.json();
    if (item.id) setInitiatives((prev) => [...prev, item]);
  };

  const updateInitiative = async (id: string, updates: Partial<Initiative>) => {
    setInitiatives((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
    await fetch("/api/procedures", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
  };

  const handleBoardMove = (id: string, status: "In Progress" | "Improved") => {
    updateInitiative(id, { status });
  };

  const handleRolloverComplete = (count: number) => {
    if (count > 0) fetchInitiatives();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0c0c0c]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0c0c] text-slate-900 dark:text-slate-100">
      <Header
        period={currentPeriod}
        cycleType={cycleType}
        onPeriodChange={setCurrentPeriod}
        onCycleTypeChange={() => {}}
        ownerName={ownerName}
        isAdmin={isAdmin}
        onSignOut={handleSignOut}
      />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">{currentPeriod.label}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {initiatives.length} initiative{initiatives.length !== 1 ? "s" : ""} this period
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <RolloverButton targetStart={currentPeriod.start} onComplete={handleRolloverComplete} />
            <AddInitiativeForm onAdd={addInitiative} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
              <p className="text-sm text-slate-400">Loading initiatives...</p>
            </div>
          </div>
        ) : (
          <>
            <section>
              <div className="flex items-center gap-2.5 mb-5">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress Board</h3>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <ProgressBoard initiatives={initiatives} onStatusChange={handleBoardMove} />
            </section>

            <section>
              <div className="flex items-center gap-2.5 mb-5">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Leftovers &amp; New Ideas</h3>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <InitiativesTable initiatives={initiatives} onUpdate={updateInitiative} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
