"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import { useBudgetSummary } from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RabSummaryTable } from "@/components/report/RabSummaryTable";
import { buildRabSummaryRows } from "@/lib/report";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Halaman Laporan RAB Summary — kerangka Laporan RAB berisi baris kelompok saja,
 * berhenti di "Pendapatan Operasional" (potongan pertama, lihat issue #3;
 * kelompok sesudahnya menyusul di item backlog berikutnya). Mengikuti pola
 * `LaporanPage`: `use(params)`, `useOrganization` + `useBudgetSummary`, tautan
 * kembali ke halaman detail organisasi.
 */
export default function LaporanRabSummaryPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: isLoadingOrg } = useOrganization(orgId);
  const { data: summary, isLoading: isLoadingSummary, isError } = useBudgetSummary(orgId);

  const isLoading = isLoadingOrg || isLoadingSummary;

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !summary || !org) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>Gagal memuat data laporan.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const rows = buildRabSummaryRows(summary);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Laporan RAB Summary</h1>
          <p className="text-sm text-muted-foreground">
            {summary.organization_name} · {summary.budget_year}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <RabSummaryTable rows={rows} />
      </div>
    </div>
  );
}
