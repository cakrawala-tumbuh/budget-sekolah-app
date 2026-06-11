"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Database,
  LayoutDashboard,
  TrendingUp,
  LogOut,
  Users,
  BookOpen,
  Receipt,
  Landmark,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
];

const adminNavItems: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matchActive?: (pathname: string) => boolean;
}[] = [
  {
    label: "Organisasi",
    href: "/organizations",
    icon: Building2,
    matchActive: (pathname) =>
      pathname.startsWith("/organizations") && !pathname.includes("/simulation"),
  },
  {
    label: "Simulasi",
    href: "/simulation",
    icon: TrendingUp,
    matchActive: (pathname) =>
      pathname.startsWith("/simulation") || pathname.includes("/simulation"),
  },
  {
    label: "Pengguna",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Kategori Pendapatan",
    href: "/admin/income-categories",
    icon: BookOpen,
  },
  {
    label: "Kategori Biaya",
    href: "/admin/expense-categories",
    icon: Receipt,
  },
  {
    label: "Kategori Investasi",
    href: "/admin/investment-categories",
    icon: Landmark,
  },
  {
    label: "Database",
    href: "/admin/database",
    icon: Database,
  },
];

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  ORG: "Organisasi",
};

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";

  // Dynamic nav items for ORG users — akses ke organisasinya sendiri beserta
  // seluruh organisasi yang dinaunginya secara berjenjang, dan simulasi org sendiri.
  const orgNavItems: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    matchActive?: (pathname: string) => boolean;
  }[] = !isAdmin && user?.org_id
    ? [
        {
          label: "Organisasi",
          href: "/organizations",
          icon: Building2,
          matchActive: (pathname) =>
            pathname.startsWith("/organizations") && !pathname.includes("/simulation"),
        },
        {
          label: "Simulasi",
          href: `/organizations/${user.org_id}/simulation`,
          icon: TrendingUp,
          matchActive: (pathname) => pathname.includes("/simulation"),
        },
      ]
    : [];

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex flex-1 items-center gap-2" onClick={onClose}>
          <Building2 className="h-6 w-6 text-sidebar-primary" />
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground leading-tight">
              Budget YPII
            </p>
            <p className="text-xs text-muted-foreground">Anggaran 2025–2026</p>
          </div>
        </Link>
        {/* Close button — mobile only */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden -mr-2"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          {orgNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.matchActive
              ? item.matchActive(pathname)
              : pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {isAdmin && (
          <>
            <div className="mt-4 mb-2 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Administrasi
              </p>
            </div>
            <ul className="space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.matchActive
                  ? item.matchActive(pathname)
                  : pathname.startsWith(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>

      {/* User info + logout */}
      <div className="border-t px-4 py-3">
        <div className="mb-2">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {user?.username ?? "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {user ? ROLE_LABELS[user.role] ?? user.role : ""}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </aside>
  );
}

