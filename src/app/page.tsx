"use client";

import Link from "next/link";
import { Building2, TrendingUp, ArrowRight, Users, BarChart3, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const adminFeatures = [
  {
    icon: Building2,
    title: "Manajemen Organisasi",
    description:
      "Kelola struktur organisasi YPII — Pusat, Cabang, dan Unit satuan pendidikan.",
    href: "/organizations",
    cta: "Lihat Organisasi",
  },
  {
    icon: TrendingUp,
    title: "Simulasi Anggaran",
    description:
      "Simulasi RAB: Uang Pangkal, Uang Sekolah, pendapatan, biaya, dan alokasi kontribusi.",
    href: "/organizations",
    cta: "Mulai Simulasi",
  },
  {
    icon: Users,
    title: "Manajemen Pengguna",
    description:
      "Kelola akun pengguna dan hak akses untuk setiap organisasi YPII.",
    href: "/users",
    cta: "Kelola Pengguna",
  },
  {
    icon: BarChart3,
    title: "Laporan & Rekap",
    description:
      "Lihat ringkasan anggaran konsolidasi dari semua cabang dan unit.",
    href: "/organizations",
    cta: "Lihat Laporan",
  },
];

const orgFeatures = [
  {
    icon: TrendingUp,
    title: "Simulasi Anggaran",
    description:
      "Jalankan simulasi RAB untuk organisasi Anda — UP, US, pendapatan, biaya, dan kontribusi.",
    href: "/organizations",
    cta: "Mulai Simulasi",
  },
  {
    icon: BookOpen,
    title: "Data Anggaran",
    description:
      "Input dan kelola data anggaran: asumsi siswa, biaya operasional, dan investasi.",
    href: "/organizations",
    cta: "Kelola Data",
  },
];

const GREETING: Record<string, string> = {
  ADMIN: "Selamat datang, Administrator!",
  ORG: "Selamat datang!",
};

const SUBTITLE: Record<string, string> = {
  ADMIN: "Anda memiliki akses penuh ke seluruh data dan konfigurasi sistem.",
  ORG: "Anda dapat mengelola data anggaran dan menjalankan simulasi untuk organisasi Anda.",
};

export default function HomePage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const features = isAdmin ? adminFeatures : orgFeatures;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {user ? GREETING[user.role] ?? "Dashboard" : "Dashboard"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {user ? SUBTITLE[user.role] ?? "Sistem Simulasi Anggaran YPII 2025–2026." : ""}
        </p>
      </div>

      {/* Role badge */}
      {user && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Masuk sebagai <strong className="text-foreground">{user.username}</strong>
          <span className="text-muted-foreground/60">·</span>
          <span className="capitalize">{isAdmin ? "Administrator" : "Organisasi"}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {f.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href={f.href}>
                    {f.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

