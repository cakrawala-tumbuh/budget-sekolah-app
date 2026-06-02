"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  Receipt,
  PackageMinus,
  Landmark,
  Archive,
  BookOpen,
  GraduationCap,
  School,
  BarChart3,
  ClipboardList,
  Users,
  ListOrdered,
  HandCoins,
  Pencil,
  Wallet,
} from "lucide-react";
import { useOrganization, useUpdateOrganization } from "@/hooks/useOrganizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ORG_TYPE_LABEL, formatCurrency } from "@/lib/utils";
import { OrganizationCard } from "@/components/organizations/OrganizationCard";
import { OrganizationForm } from "@/components/organizations/OrganizationForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrganizationDetailPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);
  const { data: org, isLoading, isError } = useOrganization(orgId);
  const updateMutation = useUpdateOrganization(orgId);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError || !org) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Organisasi tidak ditemukan atau gagal memuat data.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center sm:gap-4">
        <Button asChild variant="ghost" size="icon" className="shrink-0">
          <Link href="/organizations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold truncate">{org.name}</h1>
            <Badge variant="outline">{ORG_TYPE_LABEL[org.org_type]}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Kode: <span className="font-mono">{org.code}</span>
            {org.city && ` · ${org.city}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Organisasi</DialogTitle>
              </DialogHeader>
              <OrganizationForm
                isEdit
                submitLabel="Simpan Perubahan"
                isLoading={updateMutation.isPending}
                defaultValues={{
                  code: org.code,
                  name: org.name,
                  org_type: org.org_type,
                  city: org.city ?? undefined,
                  cash_balance: org.cash_balance,
                }}
                onSubmit={(values) =>
                  updateMutation.mutate(
                    {
                      name: values.name,
                      city: values.city,
                      cash_balance: values.cash_balance,
                    },
                    { onSuccess: () => setEditOpen(false) },
                  )
                }
              />
            </DialogContent>
          </Dialog>
          <Button asChild variant="outline" size="sm">
            <Link href={`/organizations/${org.id}/summary`}>
              <ClipboardList className="h-4 w-4" />
              Summary
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/organizations/${org.id}/simulation`}>
              <TrendingUp className="h-4 w-4" />
              Lihat Simulasi
            </Link>
          </Button>
        </div>
      </div>

      {/* Asumsi Siswa & Konfigurasi Kelas — hanya untuk UNIT */}
      {org.org_type === "UNIT" && (
        <div className="mb-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
          <Link href={`/organizations/${org.id}/asumsi`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-sky-200">
              <CardContent className="flex items-center gap-4 py-4">
                <Users className="h-7 w-7 text-sky-600 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Asumsi Siswa</p>
                  <p className="text-xs text-muted-foreground">
                    Sebaran siswa per kelas, jumlah siswa baru/lama, dan override tarif UP/US
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/organizations/${org.id}/grade-config`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-indigo-200">
              <CardContent className="flex items-center gap-4 py-4">
                <ListOrdered className="h-7 w-7 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Label Kelas</p>
                  <p className="text-xs text-muted-foreground">
                    Jumlah tingkat dan nama label per kelas (mis. Kelas 7–9 untuk SMP)
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      {/* Entry Navigation Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
        {[
          {
            label: "Biaya Operasional",
            href: `/organizations/${org.id}/budget-entries`,
            icon: Receipt,
            color: "text-blue-600",
          },
          {
            label: "Biaya Non-Operasional",
            href: `/organizations/${org.id}/non-op-entries`,
            icon: PackageMinus,
            color: "text-orange-600",
          },
          {
            label: "Investasi",
            href: `/organizations/${org.id}/investments`,
            icon: Landmark,
            color: "text-green-600",
          },
          {
            label: "Depresiasi Aset Lama",
            href: `/organizations/${org.id}/depreciation`,
            icon: Archive,
            color: "text-purple-600",
          },
          {
            label: "Entri Pendapatan",
            href: `/organizations/${org.id}/income-entries`,
            icon: BookOpen,
            color: "text-emerald-600",
          },
        ].map(({ label, href, icon: Icon, color }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                <Icon className={`h-6 w-6 ${color}`} />
                <span className="text-xs font-medium leading-tight">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Alokasi UP/US & Subsidi — hanya untuk CABANG dan PUSAT */}
      {org.org_type !== "UNIT" && (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 mb-6">
          <Link href={`/organizations/${org.id}/alokasi-up`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-blue-200">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                <GraduationCap className="h-6 w-6 text-blue-700" />
                <span className="text-xs font-medium leading-tight">Alokasi UP</span>
                <span className="text-xs text-muted-foreground">Komponen Uang Pangkal</span>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/organizations/${org.id}/alokasi-us`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-orange-200">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                <School className="h-6 w-6 text-orange-700" />
                <span className="text-xs font-medium leading-tight">Alokasi US</span>
                <span className="text-xs text-muted-foreground">Komponen Uang Sekolah</span>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/organizations/${org.id}/subsidi`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-emerald-200">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                <HandCoins className="h-6 w-6 text-emerald-700" />
                <span className="text-xs font-medium leading-tight">Subsidi ke Unit</span>
                <span className="text-xs text-muted-foreground">Beban pemberi → pendapatan penerima</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informasi Organisasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span>{org.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kode</span>
              <span className="font-mono">{org.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipe</span>
              <span>{ORG_TYPE_LABEL[org.org_type]}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Wallet className="h-3.5 w-3.5" />
                Saldo Kas &amp; Setara Kas
              </span>
              <span className="font-medium tabular-nums">
                {formatCurrency(org.cash_balance)}
              </span>
            </div>
            {org.city && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kota</span>
                <span>{org.city}</span>
              </div>
            )}
            {org.parent_id && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parent ID</span>
                <Link
                  href={`/organizations/${org.parent_id}`}
                  className="text-primary hover:underline"
                >
                  {org.parent_id}
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {org.children && org.children.length > 0 && (
          <div>
            <h2 className="text-base font-semibold mb-3">
              Unit di bawah organisasi ini ({org.children.length})
            </h2>
            <div className="space-y-2">
              {org.children.map((child) => (
                <OrganizationCard key={child.id} org={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
