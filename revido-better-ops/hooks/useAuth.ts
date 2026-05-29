"use client";

import { useEffect, useState } from "react";

interface AppUser {
  id: string;
  username: string;
  is_admin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, ownerName: user?.username ?? "", isAdmin: user?.is_admin ?? false, signOut };
}
