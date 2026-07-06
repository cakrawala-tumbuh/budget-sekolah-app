// Helper murni untuk menyusun data Laporan RAB (dipakai oleh halaman summary,
// halaman laporan ber-tema, dan export Excel) — satu sumber kebenaran untuk
// pengelompokan & urutan baris laporan.
import type { BudgetSummary, ExpenseItem, IncomeItem } from "@/lib/types";

export function sumItems(items: IncomeItem[]): number {
  return items.reduce((a, b) => a + b.total, 0);
}

export function sumExpenseItems(items: ExpenseItem[]): number {
  return items.reduce((a, b) => a + b.total, 0);
}

// Group income items into 4100-4499 (operasional) and 4500+ (non-operasional)
export function groupIncome(items: IncomeItem[]) {
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
export const OP_EXPENSE_GROUPS = [
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

export const NON_OP_EXPENSE_GROUPS = [
  { code: "5510", label: "Biaya Kantin" },
  { code: "5520", label: "Biaya Riso / Koperasi" },
  { code: "5530", label: "Biaya Non Operasional Lain" },
  { code: "5580", label: "Biaya Solidaritas" },
  { code: "5590", label: "Pengeluaran Kontribusi" },
];

export function matchGroupCode(code: string | undefined, groupCode: string): boolean {
  if (!code) return false;
  return code.startsWith(groupCode);
}

export function buildExpenseGroup(
  items: ExpenseItem[],
  groups: { code: string; label: string }[],
) {
  return groups.map((g) => {
    const matched = items.filter((item) => matchGroupCode(item.account_code, g.code));
    const total = sumExpenseItems(matched);
    return { ...g, total, matched };
  });
}

// ── Baris laporan terpadu (dipakai layar, cetak, dan Excel) ────────────────────

export interface ReportRow {
  label: string;
  kas: number | null;
  akrual: number | null;
  kind: "section" | "sub" | "line" | "total" | "surplus";
}

/**
 * Membangun seluruh baris Laporan RAB dari BudgetSummary, dengan urutan:
 * Pendapatan (operasional + non-operasional + detail item) → Biaya Operasional →
 * Biaya Non Operasional → Investasi → Depresiasi (bila ada) → Surplus/Defisit →
 * Saldo Kas & Setara Kas.
 */
export function buildReportRows(summary: BudgetSummary): ReportRow[] {
  const { operasional: incomeOp, nonOperasional: incomeNonOp } = groupIncome(
    summary.income.items,
  );
  const totalIncomeOp = sumItems(incomeOp);
  const totalIncomeNonOp = sumItems(incomeNonOp);
  const totalIncome = summary.income.total;

  const opGroups = buildExpenseGroup(summary.expenses.operational, OP_EXPENSE_GROUPS);
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

  const rows: ReportRow[] = [];

  rows.push({ label: "Pendapatan", kas: null, akrual: null, kind: "section" });
  rows.push({
    label: "Pendapatan Operasional",
    kas: totalIncomeOp,
    akrual: totalIncomeOp,
    kind: "sub",
  });
  for (const item of incomeOp) {
    rows.push({ label: item.description, kas: item.total, akrual: item.total, kind: "line" });
  }
  rows.push({
    label: "Pendapatan Non Operasional",
    kas: totalIncomeNonOp,
    akrual: totalIncomeNonOp,
    kind: "sub",
  });
  for (const item of incomeNonOp) {
    rows.push({ label: item.description, kas: item.total, akrual: item.total, kind: "line" });
  }
  rows.push({
    label: "TOTAL PENDAPATAN",
    kas: totalIncome,
    akrual: acrualIncome,
    kind: "total",
  });

  rows.push({ label: "Biaya Operasional", kas: null, akrual: null, kind: "section" });
  for (const g of opGroups) {
    rows.push({ label: g.label, kas: g.total, akrual: g.total, kind: "sub" });
  }
  rows.push({
    label: "TOTAL BIAYA OPERASIONAL",
    kas: totalOp,
    akrual: totalOp,
    kind: "total",
  });

  rows.push({ label: "Biaya Non Operasional", kas: null, akrual: null, kind: "section" });
  for (const g of nonOpGroups) {
    rows.push({ label: g.label, kas: g.total, akrual: g.total, kind: "sub" });
  }
  rows.push({
    label: "TOTAL BIAYA NON OPERASIONAL",
    kas: totalNonOp,
    akrual: totalNonOp,
    kind: "total",
  });

  rows.push({ label: "Investasi", kas: null, akrual: null, kind: "section" });
  rows.push({
    label: "Investasi Aset Tetap",
    kas: totalPhysicalInvestments,
    akrual: totalDep,
    kind: "sub",
  });
  rows.push({
    label: "Investasi Keuangan",
    kas: totalFinancialInvestments,
    akrual: 0,
    kind: "sub",
  });
  rows.push({
    label: "TOTAL INVESTASI",
    kas: totalInvestments,
    akrual: totalDep,
    kind: "total",
  });

  if (totalDep > 0) {
    rows.push({ label: "Depresiasi", kas: null, akrual: null, kind: "section" });
    rows.push({
      label: "Total Penyusutan Aset (Baru + Lama)",
      kas: 0,
      akrual: totalDep,
      kind: "sub",
    });
  }

  rows.push({
    label: summary.cash_surplus_deficit >= 0 ? "SURPLUS (Budget KAS)" : "DEFISIT (Budget KAS)",
    kas: summary.cash_surplus_deficit,
    akrual: null,
    kind: "surplus",
  });
  rows.push({
    label:
      summary.accrual_surplus_deficit >= 0
        ? "SURPLUS (Budget AKRUAL)"
        : "DEFISIT (Budget AKRUAL)",
    kas: null,
    akrual: summary.accrual_surplus_deficit,
    kind: "surplus",
  });

  rows.push({ label: "Saldo Kas & Setara Kas", kas: null, akrual: null, kind: "section" });
  rows.push({
    label: "Saldo Kas Awal",
    kas: summary.opening_cash_balance,
    akrual: null,
    kind: "sub",
  });
  rows.push({
    label:
      summary.cash_surplus_deficit >= 0 ? "Surplus Kas Tahun Ini" : "Defisit Kas Tahun Ini",
    kas: summary.cash_surplus_deficit,
    akrual: null,
    kind: "sub",
  });
  rows.push({
    label: "SALDO KAS AKHIR (Budget Kas)",
    kas: summary.ending_cash_balance,
    akrual: null,
    kind: "surplus",
  });

  return rows;
}
