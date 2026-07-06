"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, PrinterIcon } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import { useBudgetSummary } from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";
import type { ExpenseItem, IncomeItem, DepreciationItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

// ── helper ────────────────────────────────────────────────────────────────────

function sumItems(items: IncomeItem[]): number {
  return items.reduce((a, b) => a + b.total, 0);
}

function sumExpenseItems(items: ExpenseItem[]): number {
  return items.reduce((a, b) => a + b.total, 0);
}

// Group income items into 4100-4499 (operasional) and 4500+ (non-operasional)
function groupIncome(items: IncomeItem[]) {
  const operasional = items.filter((i) => {
    const prefix = parseInt(i.account_code.split(".")[0], 10);
    return prefix >= 4100 && prefix < 4500;
  });
  const nonOperasional = items.filter((i) => {
    const prefix = parseInt(i.account_code.split(".")[0], 10);
    return prefix >= 4500;
  });
  return { operasional, nonOperasional };
}

// Map operational expense account codes to their group (5110 → 5110, etc.)
const OP_EXPENSE_GROUPS = [
  { code: "5110", label: "Biaya Gaji" },
  { code: "5120", label: "Tenaga Ahli" },
  { code: "5130", label: "Biaya Pengembangan Guru / Karyawan" },
  { code: "5140", label: "Biaya Ulangan Umum / UAS / UN" },
  { code: "5150", label: "Biaya Pendaftaran PSB" },
  { code: "5160", label: "Biaya Operasional Sekolah" },
  { code: "5170", label: "Biaya Kegiatan Siswa" },
  { code: "5180", label: "Biaya Khusus" },
  { code: "5190", label: "Biaya Administrasi dan Umum" },
  { code: "5200", label: "Biaya Utilities" },
  { code: "5210", label: "Biaya Transportasi" },
  { code: "5220", label: "Biaya Asuransi" },
  { code: "5230", label: "Biaya Sewa" },
  { code: "5240", label: "Pajak" },
  { code: "5250", label: "Biaya Pemeliharaan Aktiva Tetap" },
];

const NON_OP_EXPENSE_GROUPS = [
  { code: "5510", label: "Biaya Kantin" },
  { code: "5520", label: "Biaya Riso / Koperasi" },
  { code: "5530", label: "Biaya Non Operasional Lain" },
  { code: "5580", label: "Biaya Solidaritas" },
  { code: "5590", label: "Pengeluaran Kontribusi" },
];

function matchGroupCode(code: string | undefined, groupCode: string): boolean {
  if (!code) return false;
  return code.startsWith(groupCode);
}

interface SummaryRowProps {
  label: string;
  kas: number | null;
  akrual: number | null;
  isHeader?: boolean;
  isTotal?: boolean;
  isSubHeader?: boolean;
  isSurplus?: boolean;
  indent?: boolean;
}

function SummaryRow({
  label,
  kas,
  akrual,
  isHeader,
  isTotal,
  isSubHeader,
  isSurplus,
  indent,
}: SummaryRowProps) {
  const selisih = kas !== null && akrual !== null ? kas - akrual : null;

  return (
    <tr
      className={cn(
        "border-b",
        isHeader && "bg-blue-800 text-white font-semibold",
        isSubHeader && "bg-blue-50 font-medium",
        isTotal && "bg-blue-100 font-semibold",
        isSurplus &&
          (kas !== null && kas >= 0
            ? "bg-green-50 font-bold text-green-800"
            : "bg-red-50 font-bold text-red-800"),
      )}
    >
      <td
        className={cn(
          "px-3 py-1.5 text-sm",
          indent && "pl-8",
          isHeader && "text-white",
        )}
      >
        {label}
      </td>
      <td className="px-3 py-1.5 text-right tabular-nums text-sm w-44">
        {kas !== null ? formatCurrency(kas) : ""}
      </td>
      <td className="px-3 py-1.5 text-right tabular-nums text-sm w-44">
        {akrual !== null ? formatCurrency(akrual) : ""}
      </td>
      <td
        className={cn(
          "px-3 py-1.5 text-right tabular-nums text-sm w-36",
          selisih !== null && selisih > 0 && "text-orange-600",
        )}
      >
        {selisih !== null ? formatCurrency(selisih) : ""}
      </td>
    </tr>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <tr className="bg-blue-800 text-white">
      <td colSpan={4} className="px-3 py-2 font-semibold text-sm uppercase tracking-wide">
        {label}
      </td>
    </tr>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function SummaryPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: summary, isLoading, isError } = useBudgetSummary(orgId);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="p-4 md:p-8">
        <Alert variant="destructive">
          <AlertDescription>Gagal memuat data summary.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const { operasional: incomeOp, nonOperasional: incomeNonOp } = groupIncome(
    summary.income.items,
  );
  const totalIncomeOp = sumItems(incomeOp);
  const totalIncomeNonOp = sumItems(incomeNonOp);
  const totalIncome = summary.income.total;

  // Build expense group totals
  function buildExpenseGroup(
    items: ExpenseItem[],
    groups: { code: string; label: string }[],
  ) {
    return groups.map((g) => {
      const matched = items.filter((item) =>
        matchGroupCode(item.account_code, g.code),
      );
      const total = sumExpenseItems(matched);
      return { ...g, total, matched };
    });
  }

  const opGroups = buildExpenseGroup(
    summary.expenses.operational,
    OP_EXPENSE_GROUPS,
  );
  const nonOpGroups = buildExpenseGroup(
    summary.expenses.non_operational,
    NON_OP_EXPENSE_GROUPS,
  );

  const totalOp = summary.expenses.total_operational;
  const totalNonOp = summary.expenses.total_non_operational;
  const totalDep = summary.depreciation.total_current_year_dep;
  const totalPhysicalInvestments = summary.total_physical_investments;
  const totalFinancialInvestments = summary.total_financial_investments;
  const totalInvestments = summary.total_investments;

  // Accrual: replaces investment cash cost with depreciation only
  const acrualIncome = totalIncome;
  const acrualExpenses = totalOp + totalNonOp + totalDep;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center no-print">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Summary RAB — Ringkasan Keuangan</h1>
          <p className="text-sm text-muted-foreground">
            {summary.organization_name} · {summary.budget_year}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="no-print"
        >
          <PrinterIcon className="h-4 w-4 mr-2" />
          Cetak
        </Button>
      </div>

      {/* Print Header */}
      <div className="text-center mb-4 hidden print:block">
        <p className="font-bold text-base">SUMMARY RAB — RINGKASAN KEUANGAN (BUDGET KAS &amp; AKRUAL)</p>
        <p className="text-sm">YAYASAN PENYELENGGARAAN ILAHI INDONESIA (YPII) | Tahun Anggaran {summary.budget_year}</p>
        <p className="text-sm">
          {org?.name} · {org?.city}
        </p>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-3 py-2 text-left font-semibold">Uraian</th>
              <th className="px-3 py-2 text-right w-44 font-semibold">Budget KAS</th>
              <th className="px-3 py-2 text-right w-44 font-semibold">Budget AKRUAL</th>
              <th className="px-3 py-2 text-right w-36 font-semibold">Selisih Kas−Akrual</th>
            </tr>
          </thead>
          <tbody>
            {/* PENDAPATAN */}
            <SectionHeader label="Pendapatan" />
            <SummaryRow
              label="Pendapatan Operasional"
              kas={totalIncomeOp}
              akrual={totalIncomeOp}
              indent
            />
            {incomeOp.map((item) => (
              <tr key={item.account_code} className="border-b bg-white">
                <td className="px-3 py-1 text-xs text-muted-foreground pl-12">{item.description}</td>
                <td className="px-3 py-1 text-right tabular-nums text-xs">{formatCurrency(item.total)}</td>
                <td className="px-3 py-1 text-right tabular-nums text-xs">{formatCurrency(item.total)}</td>
                <td className="px-3 py-1 text-right text-xs">—</td>
              </tr>
            ))}
            <SummaryRow
              label="Pendapatan Non Operasional"
              kas={totalIncomeNonOp}
              akrual={totalIncomeNonOp}
              indent
            />
            {incomeNonOp.map((item) => (
              <tr key={item.account_code} className="border-b bg-white">
                <td className="px-3 py-1 text-xs text-muted-foreground pl-12">{item.description}</td>
                <td className="px-3 py-1 text-right tabular-nums text-xs">{formatCurrency(item.total)}</td>
                <td className="px-3 py-1 text-right tabular-nums text-xs">{formatCurrency(item.total)}</td>
                <td className="px-3 py-1 text-right text-xs">—</td>
              </tr>
            ))}
            <SummaryRow
              label="TOTAL PENDAPATAN"
              kas={totalIncome}
              akrual={acrualIncome}
              isTotal
            />

            {/* BIAYA OPERASIONAL */}
            <SectionHeader label="Biaya Operasional" />
            {opGroups.map((g) => (
              <SummaryRow
                key={g.code}
                label={g.label}
                kas={g.total}
                akrual={g.total}
                indent
              />
            ))}
            <SummaryRow
              label="TOTAL BIAYA OPERASIONAL"
              kas={totalOp}
              akrual={totalOp}
              isTotal
            />

            {/* BIAYA NON OPERASIONAL */}
            <SectionHeader label="Biaya Non Operasional" />
            {nonOpGroups.map((g) => (
              <SummaryRow
                key={g.code}
                label={g.label}
                kas={g.total}
                akrual={g.total}
                indent
              />
            ))}
            <SummaryRow
              label="TOTAL BIAYA NON OPERASIONAL"
              kas={totalNonOp}
              akrual={totalNonOp}
              isTotal
            />

            {/* INVESTASI */}
            <SectionHeader label="Investasi" />
            <SummaryRow
              label="Investasi Aset Tetap"
              kas={totalPhysicalInvestments}
              akrual={totalDep}
              indent
            />
            <SummaryRow
              label="Investasi Keuangan"
              kas={totalFinancialInvestments}
              akrual={0}
              indent
            />
            <SummaryRow
              label="TOTAL INVESTASI"
              kas={totalInvestments}
              akrual={totalDep}
              isTotal
            />

            {/* DEPRESIASI ASET LAMA (only shows in accrual) */}
            {totalDep > 0 && (
              <>
                <SectionHeader label="Depresiasi" />
                <SummaryRow
                  label="Total Penyusutan Aset (Baru + Lama)"
                  kas={0}
                  akrual={totalDep}
                  indent
                />
              </>
            )}

            {/* SURPLUS / DEFISIT */}
            <tr className="border-t-2 border-slate-400">
              <td colSpan={4} />
            </tr>
            <SummaryRow
              label={
                summary.cash_surplus_deficit >= 0
                  ? "SURPLUS (Budget KAS)"
                  : "DEFISIT (Budget KAS)"
              }
              kas={summary.cash_surplus_deficit}
              akrual={null}
              isSurplus
            />
            <SummaryRow
              label={
                summary.accrual_surplus_deficit >= 0
                  ? "SURPLUS (Budget AKRUAL)"
                  : "DEFISIT (Budget AKRUAL)"
              }
              kas={null}
              akrual={summary.accrual_surplus_deficit}
              isSurplus
            />

            {/* SALDO KAS & SETARA KAS */}
            <SectionHeader label="Saldo Kas & Setara Kas" />
            <SummaryRow
              label="Saldo Kas Awal"
              kas={summary.opening_cash_balance}
              akrual={null}
              indent
            />
            <SummaryRow
              label={
                summary.cash_surplus_deficit >= 0
                  ? "Surplus Kas Tahun Ini"
                  : "Defisit Kas Tahun Ini"
              }
              kas={summary.cash_surplus_deficit}
              akrual={null}
              indent
            />
            <SummaryRow
              label="SALDO KAS AKHIR (Budget Kas)"
              kas={summary.ending_cash_balance}
              akrual={null}
              isSurplus
            />
          </tbody>
        </table>
      </div>

      {/* Catatan */}
      <div className="mt-6 text-xs text-muted-foreground space-y-1 border-t pt-4">
        <p className="font-semibold">Catatan:</p>
        <p>1. Budget KAS = Pendapatan − Biaya Operasional − Biaya Non Operasional − Investasi Aset Tetap − Investasi Keuangan</p>
        <p>2. Budget AKRUAL = Pendapatan − Biaya Operasional − Biaya Non Operasional − Depresiasi (penyusutan tahun ini)</p>
        <p>3. Investasi Aset Tetap didepresiasi (kolom Akrual = penyusutan). Investasi Keuangan tidak didepresiasi (Akrual = 0).</p>
        <p>4. Saldo Kas Akhir (Budget Kas) = Saldo Kas Awal + Surplus/Defisit Kas Tahun Ini</p>
      </div>
    </div>
  );
}
