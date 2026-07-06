"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Table2 } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import { useBudgetSummary, useComparativeSummary } from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportKpiCards } from "@/components/report/ReportKpiCards";
import { ReportSummaryTable } from "@/components/report/ReportSummaryTable";
import { ReportExpenseBreakdown } from "@/components/report/ReportExpenseBreakdown";
import { ReportInvestmentDepreciationBreakdown } from "@/components/report/ReportInvestmentDepreciationBreakdown";
import { ReportConsolidation } from "@/components/report/ReportConsolidation";
import { ReportSignatures } from "@/components/report/ReportSignatures";
import {
  buildReportRows,
  buildExpenseBreakdown,
  buildInvestmentDepreciationBreakdown,
  OP_EXPENSE_GROUPS,
  NON_OP_EXPENSE_GROUPS,
} from "@/lib/report";
import { downloadXls, type ExcelSection } from "@/lib/export/excel";
import type { BudgetSummary, ComparativeSummary, ExpenseItem } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

function buildSummarySection(summary: BudgetSummary): ExcelSection {
  const rows = buildReportRows(summary);
  return {
    title: `Ringkasan RAB — ${summary.organization_name} (${summary.budget_year})`,
    header: ["Uraian", "Budget KAS", "Budget AKRUAL"],
    rows: rows
      .filter((r) => r.kind !== "section")
      .map((r) => [r.label, r.kas ?? "", r.akrual ?? ""]),
  };
}

function buildExpenseBreakdownSection(
  items: ExpenseItem[],
  groups: { code: string; label: string }[],
  title: string,
  totalLabel: string,
): ExcelSection {
  const breakdown = buildExpenseBreakdown(items, groups);
  return {
    title,
    header: ["Kelompok Biaya", "Biaya Unit", "Alokasi Cabang", "Alokasi Pusat", "Total"],
    rows: [
      ...breakdown.rows.map((r) => [r.label, r.unit, r.cabang, r.pusat, r.total]),
      [totalLabel, breakdown.totalUnit, breakdown.totalCabang, breakdown.totalPusat, breakdown.total],
    ],
  };
}

function buildInvestmentDepreciationSection(summary: BudgetSummary): ExcelSection {
  const rows = buildInvestmentDepreciationBreakdown(summary);
  return {
    title: "Rincian Investasi & Depresiasi — Unit vs Alokasi Induk",
    header: ["Uraian", "Unit", "Alokasi Cabang", "Alokasi Pusat", "Total"],
    rows: rows.map((r) => [r.label, r.unit, r.cabang, r.pusat, r.total]),
  };
}

function buildConsolidationSection(data: ComparativeSummary): ExcelSection {
  const orgRows = [data.organization, ...data.units].map((row) => {
    const s = row.summary_with_allocation;
    return [
      s.organization_name,
      s.total_cash_revenue,
      s.total_cash_expenses,
      s.cash_surplus_deficit,
      s.accrual_surplus_deficit,
    ];
  });
  return {
    title: "Konsolidasi Seluruh Unit",
    header: ["Organisasi", "Pendapatan", "Beban", "Surplus/Defisit Kas", "Surplus/Defisit Akrual"],
    rows: orgRows,
  };
}

export default function LaporanPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org, isLoading: isLoadingOrg } = useOrganization(orgId);
  const { data: summary, isLoading: isLoadingSummary, isError } = useBudgetSummary(orgId);
  const isParentOrg = !!org && org.org_type !== "UNIT";
  const { data: comparative } = useComparativeSummary(isParentOrg ? orgId : 0);

  const isLoading = isLoadingOrg || isLoadingSummary;

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
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

  function handleExcel() {
    if (!org || !summary) return;
    const sections: ExcelSection[] = [
      buildSummarySection(summary),
      buildExpenseBreakdownSection(
        summary.expenses.operational,
        OP_EXPENSE_GROUPS,
        "Rincian Beban Operasional — Unit vs Alokasi Induk",
        "TOTAL BEBAN OPERASIONAL",
      ),
      buildExpenseBreakdownSection(
        summary.expenses.non_operational,
        NON_OP_EXPENSE_GROUPS,
        "Rincian Beban Non Operasional — Unit vs Alokasi Induk",
        "TOTAL BEBAN NON OPERASIONAL",
      ),
      buildInvestmentDepreciationSection(summary),
    ];
    if (isParentOrg && comparative) {
      sections.push(buildConsolidationSection(comparative));
    }
    downloadXls(`RAB_${org.code}_${summary.budget_year}`, "RAB", sections);
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Toolbar aksi — tidak ikut tercetak */}
      <div className="no-print mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Laporan RAB</h1>
          <p className="text-sm text-muted-foreground">
            {summary.organization_name} · {summary.budget_year}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExcel}>
          <Table2 className="h-4 w-4 mr-2" />
          Unduh Excel
        </Button>
        <Button variant="default" size="sm" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" />
          Unduh PDF
        </Button>
      </div>

      {/* Halaman laporan ber-tema — ikut tercetak */}
      <div className="print-root report-root overflow-hidden rounded-lg border shadow-sm">
        <ReportCover
          orgName={org.name}
          city={org.city}
          orgType={org.org_type}
          budgetYear={summary.budget_year}
        />
        <ReportKpiCards summary={summary} />
        <ReportSummaryTable summary={summary} />
        <ReportExpenseBreakdown
          items={summary.expenses.operational}
          groups={OP_EXPENSE_GROUPS}
          title="Rincian Beban Operasional — Unit vs Alokasi Induk"
          totalLabel="TOTAL BEBAN OPERASIONAL"
        />
        <ReportExpenseBreakdown
          items={summary.expenses.non_operational}
          groups={NON_OP_EXPENSE_GROUPS}
          title="Rincian Beban Non Operasional — Unit vs Alokasi Induk"
          totalLabel="TOTAL BEBAN NON OPERASIONAL"
        />
        <ReportInvestmentDepreciationBreakdown summary={summary} />
        {isParentOrg && comparative && <ReportConsolidation data={comparative} />}
        <ReportSignatures />

        {/* Catatan */}
        <div className="report-keep px-8 pb-8 pt-2 text-xs text-[#475569] space-y-1 border-t" style={{ borderColor: "#e2e8f0" }}>
          <p className="font-semibold text-[#0f172a]">Catatan:</p>
          <p>1. Budget KAS = Pendapatan − Biaya Operasional − Biaya Non Operasional − Investasi Aset Tetap − Investasi Keuangan</p>
          <p>2. Budget AKRUAL = Pendapatan − Biaya Operasional − Biaya Non Operasional − Depresiasi (penyusutan tahun ini)</p>
          <p>3. Investasi Aset Tetap didepresiasi (kolom Akrual = penyusutan). Investasi Keuangan tidak didepresiasi (Akrual = 0).</p>
          <p>4. Saldo Kas Akhir (Budget Kas) = Saldo Kas Awal + Surplus/Defisit Kas Tahun Ini</p>
        </div>
      </div>
    </div>
  );
}
