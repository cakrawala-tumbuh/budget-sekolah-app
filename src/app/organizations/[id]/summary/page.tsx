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
import { cn } from "@/lib/utils";
import {
  groupIncome,
  buildExpenseGroupsDetailed,
  buildExpenseBreakdown,
  buildInvestmentDepreciationBreakdown,
  sumDepreciationBySource,
  groupTotal,
  sumItems,
  OP_EXPENSE_GROUPS,
  NON_OP_EXPENSE_GROUPS,
  type ExpenseGroupDetail,
  type ExpenseBreakdown,
  type SingleItemBreakdown,
} from "@/lib/report";

interface Props {
  params: Promise<{ id: string }>;
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

/**
 * Baris satu grup biaya: menampilkan TOTAL grup (beban unit + alokasi Cabang &
 * Pusat). Uraian per komponen disajikan di tabel "Rincian Beban" terpisah. Grup
 * tanpa aktivitas tidak dirender.
 */
function ExpenseGroupRows({ group }: { group: ExpenseGroupDetail }) {
  const total = groupTotal(group);
  if (total === 0) return null;
  return <SummaryRow label={group.label} kas={total} akrual={total} indent />;
}

/** Tabel rincian Unit vs Alokasi Cabang/Pusat, dipakai untuk biaya operasional & non-operasional. */
function ExpenseBreakdownTable({
  title,
  totalLabel,
  breakdown,
}: {
  title: string;
  totalLabel: string;
  breakdown: ExpenseBreakdown;
}) {
  if (breakdown.rows.length === 0) return null;
  const hasAllocation = breakdown.totalCabang !== 0 || breakdown.totalPusat !== 0;

  return (
    <div className="mt-8">
      <h2 className="text-base font-bold">{title}</h2>
      <p className="mb-2 text-xs text-muted-foreground">
        {hasAllocation
          ? "Biaya Unit = beban asli satuan pendidikan. Alokasi Cabang/Pusat = kontribusi yang dibebankan dari induk."
          : "Unit ini tidak menerima alokasi biaya dari Cabang/Pusat — seluruh beban adalah beban unit."}
      </p>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-3 py-2 text-left font-semibold">Kelompok Biaya</th>
              <th className="px-3 py-2 text-right font-semibold">Biaya Unit</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Cabang</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Pusat</th>
              <th className="px-3 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.rows.map((r) => (
              <tr key={r.label} className="border-b bg-white">
                <td className="px-3 py-1.5 text-sm">{r.label}</td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm">
                  {formatCurrency(r.unit)}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm text-amber-700">
                  {r.cabang !== 0 ? formatCurrency(r.cabang) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm text-violet-700">
                  {r.pusat !== 0 ? formatCurrency(r.pusat) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm font-medium">
                  {formatCurrency(r.total)}
                </td>
              </tr>
            ))}
            <tr className="bg-blue-100 font-semibold">
              <td className="px-3 py-2 text-sm">{totalLabel}</td>
              <td className="px-3 py-2 text-right tabular-nums text-sm">
                {formatCurrency(breakdown.totalUnit)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-sm text-amber-700">
                {formatCurrency(breakdown.totalCabang)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-sm text-violet-700">
                {formatCurrency(breakdown.totalPusat)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-sm">
                {formatCurrency(breakdown.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Tabel rincian Unit vs Alokasi Cabang/Pusat untuk investasi & depresiasi (agregat, tanpa rincian per aset). */
function InvestmentDepreciationBreakdownTable({ rows }: { rows: SingleItemBreakdown[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-base font-bold">
        Rincian Investasi &amp; Depresiasi — Unit vs Alokasi Induk
      </h2>
      <p className="mb-2 text-xs text-muted-foreground">
        Investasi Aset Tetap adalah pembelian aset milik unit sendiri (tidak menerima
        alokasi induk). Investasi Keuangan dan Depresiasi dapat berasal dari unit sendiri
        maupun alokasi kontribusi Cabang/Pusat.
      </p>
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-3 py-2 text-left font-semibold">Uraian</th>
              <th className="px-3 py-2 text-right font-semibold">Unit</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Cabang</th>
              <th className="px-3 py-2 text-right font-semibold">Alokasi Pusat</th>
              <th className="px-3 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b bg-white">
                <td className="px-3 py-1.5 text-sm">{r.label}</td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm">
                  {formatCurrency(r.unit)}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm text-amber-700">
                  {r.cabang !== 0 ? formatCurrency(r.cabang) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm text-violet-700">
                  {r.pusat !== 0 ? formatCurrency(r.pusat) : "—"}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums text-sm font-medium">
                  {formatCurrency(r.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

  const opGroups = buildExpenseGroupsDetailed(
    summary.expenses.operational,
    OP_EXPENSE_GROUPS,
  );
  const nonOpGroups = buildExpenseGroupsDetailed(
    summary.expenses.non_operational,
    NON_OP_EXPENSE_GROUPS,
  );
  const opBreakdown = buildExpenseBreakdown(
    summary.expenses.operational,
    OP_EXPENSE_GROUPS,
  );
  const nonOpBreakdown = buildExpenseBreakdown(
    summary.expenses.non_operational,
    NON_OP_EXPENSE_GROUPS,
  );
  const invDepRows = buildInvestmentDepreciationBreakdown(summary).filter(
    (r) => r.unit !== 0 || r.cabang !== 0 || r.pusat !== 0,
  );

  const totalOp = summary.expenses.total_operational;
  const totalNonOp = summary.expenses.total_non_operational;
  const totalDep = summary.depreciation.total_current_year_dep;
  const totalPhysicalInvestments = summary.total_physical_investments;
  const totalFinancialInvestments = summary.total_financial_investments;
  const newAssetDep = sumDepreciationBySource(summary.depreciation.items, "new");
  const oldAssetDep = sumDepreciationBySource(summary.depreciation.items, "existing");

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
              <ExpenseGroupRows key={g.code} group={g} />
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
              <ExpenseGroupRows key={g.code} group={g} />
            ))}
            <SummaryRow
              label="TOTAL BIAYA NON OPERASIONAL"
              kas={totalNonOp}
              akrual={totalNonOp}
              isTotal
            />

            {/* INVESTASI ASET TETAP, INVESTASI KEUANGAN, DEPRESIASI BARU/LAMA —
                masing-masing section terpisah, tidak digabung. Rincian Unit vs
                Alokasi Cabang/Pusat tersedia di tabel di bawah tabel utama. */}
            <SectionHeader label="Investasi Aset Tetap" />
            <SummaryRow
              label="TOTAL INVESTASI ASET TETAP"
              kas={totalPhysicalInvestments}
              akrual={newAssetDep}
              isTotal
            />

            <SectionHeader label="Investasi Keuangan" />
            <SummaryRow
              label="TOTAL INVESTASI KEUANGAN"
              kas={totalFinancialInvestments}
              akrual={0}
              isTotal
            />

            {newAssetDep > 0 && (
              <>
                <SectionHeader label="Depresiasi Aset Baru" />
                <SummaryRow
                  label="TOTAL DEPRESIASI ASET BARU"
                  kas={0}
                  akrual={newAssetDep}
                  isTotal
                />
              </>
            )}

            {oldAssetDep > 0 && (
              <>
                <SectionHeader label="Depresiasi Aset Lama" />
                <SummaryRow
                  label="TOTAL DEPRESIASI ASET LAMA"
                  kas={0}
                  akrual={oldAssetDep}
                  isTotal
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

      {/* Rincian Beban Operasional — Unit vs Alokasi Induk */}
      <ExpenseBreakdownTable
        title="Rincian Beban Operasional — Unit vs Alokasi Induk"
        totalLabel="TOTAL BEBAN OPERASIONAL"
        breakdown={opBreakdown}
      />

      {/* Rincian Beban Non Operasional — Unit vs Alokasi Induk */}
      <ExpenseBreakdownTable
        title="Rincian Beban Non Operasional — Unit vs Alokasi Induk"
        totalLabel="TOTAL BEBAN NON OPERASIONAL"
        breakdown={nonOpBreakdown}
      />

      {/* Rincian Investasi & Depresiasi — Unit vs Alokasi Induk */}
      <InvestmentDepreciationBreakdownTable rows={invDepRows} />

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
