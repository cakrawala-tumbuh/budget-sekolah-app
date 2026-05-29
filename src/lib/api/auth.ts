import { apiFetch } from "./client";
import type { AuthUser, LoginCredentials, TokenResponse } from "@/lib/types";

export const TOKEN_KEY = "budget_ypii_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function loginApi(credentials: LoginCredentials): Promise<TokenResponse> {
  // Backend expects application/x-www-form-urlencoded (OAuth2 form)
  const body = new URLSearchParams({
    username: credentials.username,
    password: credentials.password,
  });

  const res = await fetch(`/api/proxy/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      message = data?.detail ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json() as Promise<TokenResponse>;
}

export async function getMeApi(): Promise<AuthUser> {
  const token = getStoredToken();
  return apiFetch<AuthUser>("/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
