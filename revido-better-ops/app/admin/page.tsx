"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, ArrowLeft } from "lucide-react";

interface UserRow {
  id: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    if (!isAdmin) { router.push("/"); return; }
  }, [authLoading, user, isAdmin, router]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (Array.isArray(data)) setUsers(data);
  };

  useEffect(() => {
    if (!authLoading && user && isAdmin) fetchUsers();
  }, [authLoading, user, isAdmin]);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signup", username: username.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setUsername("");
      setPassword("");
      fetchUsers();
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (id === user?.id) return;
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  if (authLoading || !user || !isAdmin) {
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
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-[#0a0a0a]/90 border-b border-slate-200/60 dark:border-transparent px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-semibold">User Management</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Create New User</h2>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-[#101010] p-5">
            <form onSubmit={createUser} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Username
                </label>
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="username"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="min 6 characters"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 shadow-md shadow-indigo-500/25"
              >
                {loading ? "..." : "Create"}
              </button>
            </form>
            {error && (
              <div className="mt-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-transparent px-4 py-2.5">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">All Users</h2>
            <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {users.length}
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-transparent bg-white dark:bg-[#101010]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-transparent">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Username
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Role
                  </th>
                  <th className="px-5 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                      idx < users.length - 1 ? "border-b border-slate-100 dark:border-transparent/50" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium">{u.username}</td>
                    <td className="px-5 py-3.5">
                      {u.is_admin ? (
                        <span className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {u.id !== user.id && (
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
