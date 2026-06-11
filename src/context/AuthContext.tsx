"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { AuthUser } from "@/lib/types";
import {
  loginApi,
  getMeApi,
  logoutApi,
  getStoredToken,
  setStoredToken,
  clearStoredToken,
} from "@/lib/api/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(() => !!getStoredToken());

  // Validate stored token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;
    getMeApi()
      .then((me) => setUser(me))
      .catch(() => clearStoredToken())
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const tokenRes = await loginApi({ username, password });
    setStoredToken(tokenRes.access_token);
    const me = await getMeApi();
    setUser(me);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    clearStoredToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
