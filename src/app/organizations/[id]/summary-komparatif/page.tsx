"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import { useComparativeSummary } from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, ORG_TYPE_COLOR, ORG_TYPE_LABEL } from "@/lib/utils";
import type { BudgetSummary, ComparativeSummary, OrgSummaryRow } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

type SummaryMode = "auto" | "final";
type AllocationView = "with" | "without";

/** Aksen garis kiri per tipe organisasi — konsisten dengan kartu di halaman simulasi. */
const ORG_TYPE_BORDER: Record<string, string> = {
  UNIT: "border-l-blue-500",
  CABANG: "border-l-amber-500",
  PUSAT: "border-l-green-500",
};

/**
 * Sel angka dengan warna semantik yang konsisten dengan halaman simulasi:
 * pendapatan hijau, beban merah, surplus/defisit hijau bila ≥0 dan merah bila <0.
 */
function MoneyCell({
  value,
  tone,
}: {
  value: number;
  tone: "revenue" | "expenses" | "signed";
}) {
  if (tone === "signed") {
    const positive = value >= 0;
    return (
      <TableCell
        className={cn(
          "text-right tabular-nums font-semibold",
          positive ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50",
        )}
      >
        {formatCurrency(value)}
      </TableCell>
    );
  }
  return (
    <TableCell
      className={cn(
        "text-right tabular-nums",
        tone === "revenue" ? "text-green-700" : "text-red-600",
      )}
    >
      {formatCurrency(value)}
    </TableCell>
  );
}

function pickValue(
  summary: BudgetSummary,
  field: "revenue" | "expenses" | "cashSD" | "accrualSD",
  mode: SummaryMode,
): number {
  switch (field) {
    case "revenue":
      return mode === "auto" ? summary.total_cash_revenue_auto : summary.total_cash_revenue;
    case "expenses":
      // Beban tidak punya varian otomatis/override terpisah — nilainya sama di kedua mode.
      return summary.total_cash_expenses;
    case "cashSD":
      return mode === "auto" ? summary.cash_surplus_deficit_auto : summary.cash_surplus_deficit;
    case "accrualSD":
      return mode === "auto"
        ? summary.accrual_surplus_deficit_auto
        : summary.accrual_surplus_deficit;
  }
}

function ComparativeRow({
  row,
  mode,
  allocation,
  isParent = false,
}: {
  row: OrgSummaryRow;
  mode: SummaryMode;
  allocation: AllocationView;
  /** Baris organisasi induk (CABANG/PUSAT) — ditonjolkan sebagai baris rekap. */
  isParent?: boolean;
}) {
  const summary =
    allocation === "with" ? row.summary_with_allocation : row.summary_without_allocation;
  return (
    <TableRow className={cn(isParent && "bg-muted/60 font-semibold")}>
      <TableCell
        className={cn(
          "border-l-4",
          ORG_TYPE_BORDER[summary.org_type] ?? "border-l-transparent",
        )}
      >
        <div className="font-medium">{summary.organization_name}</div>
        <Badge
          variant="outline"
          className={cn("mt-1 border-transparent text-xs", ORG_TYPE_COLOR[summary.org_type])}
        >
          {ORG_TYPE_LABEL[summary.org_type] ?? summary.org_type}
        </Badge>
      </TableCell>
      <MoneyCell value={pickValue(summary, "revenue", mode)} tone="revenue" />
      <MoneyCell value={pickValue(summary, "expenses", mode)} tone="expenses" />
      <MoneyCell value={pickValue(summary, "cashSD", mode)} tone="signed" />
      <MoneyCell value={pickValue(summary, "accrualSD", mode)} tone="signed" />
    </TableRow>
  );
}

function ComparativeTable({
  data,
  mode,
  allocation,
}: {
  data: ComparativeSummary;
  mode: SummaryMode;
  allocation: AllocationView;
}) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-800 hover:bg-blue-800">
            <TableHead className="text-white">Organisasi</TableHead>
            <TableHead className="text-right text-white">Pendapatan</TableHead>
            <TableHead className="text-right text-white">Beban</TableHead>
            <TableHead className="text-right text-white">Surplus/Defisit Kas</TableHead>
            <TableHead className="text-right text-white">Surplus/Defisit Akrual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ComparativeRow row={data.organization} mode={mode} allocation={allocation} isParent />
          {data.units.map((unit) => (
            <ComparativeRow
              key={
                allocation === "with"
                  ? unit.summary_with_allocation.organization_id
                  : unit.summary_without_allocation.organization_id
              }
              row={unit}
              mode={mode}
              allocation={allocation}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function SummaryKomparatifPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);
  const [mode, setMode] = useState<SummaryMode>("final");

  const { data: org, isLoading: isLoadingOrg } = useOrganization(orgId);
  const { data, isLoading, isError } = useComparativeSummary(orgId);

  if (isLoadingOrg) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>Organisasi tidak ditemukan.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (org.org_type === "UNIT") {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Halaman ini hanya tersedia untuk organisasi CABANG atau PUSAT.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold">Summary Komparatif</h1>
          <p className="text-sm text-muted-foreground">
            {org.name}
            {data ? ` dibandingkan dengan ${data.units.length} unit di bawahnya` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Mode:</span>
          <Button
            size="sm"
            variant={mode === "auto" ? "default" : "outline"}
            onClick={() => setMode("auto")}
          >
            Otomatis
          </Button>
          <Button
            size="sm"
            variant={mode === "final" ? "default" : "outline"}
            onClick={() => setMode("final")}
          >
            Override UP/US
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertDescription>Gagal memuat data summary komparatif.</AlertDescription>
        </Alert>
      )}

      {data && (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
              Pendapatan / Surplus
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              Beban / Defisit
            </span>
            <span className="ml-auto italic">Baris berlatar abu-abu = organisasi induk (rekap)</span>
          </div>
          <Tabs defaultValue="with">
          <TabsList>
            <TabsTrigger value="with">Dengan Alokasi ke Induk</TabsTrigger>
            <TabsTrigger value="without">Tanpa Alokasi ke Induk</TabsTrigger>
          </TabsList>
          <TabsContent value="with">
            <ComparativeTable data={data} mode={mode} allocation="with" />
          </TabsContent>
          <TabsContent value="without">
            <ComparativeTable data={data} mode={mode} allocation="without" />
          </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
