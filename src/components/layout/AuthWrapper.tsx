"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AppShell } from "./AppShell";
import { Loader2 } from "lucide-react";

const PUBLIC_PATHS = ["/login"];
const ADMIN_ONLY_PATHS = ["/admin"];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isAdminOnly = ADMIN_ONLY_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }
    if (user && isPublic) {
      router.replace("/");
      return;
    }
    if (user && isAdminOnly && user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, loading, isPublic, isAdminOnly, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Login page — no shell
  if (isPublic) {
    return <>{children}</>;
  }

  // Protected page — require auth
  if (!user) return null;

  // Admin-only page — non-admin users are redirected by useEffect, render nothing while redirecting
  if (isAdminOnly && user.role !== "ADMIN") return null;

  return <AppShell>{children}</AppShell>;
}
