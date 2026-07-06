// Helper murni untuk menyusun data Laporan RAB (dipakai oleh halaman summary,
// halaman laporan ber-tema, dan export Excel) — satu sumber kebenaran untuk
// pengelompokan & urutan baris laporan.
import type { BudgetSummary, DepreciationItem, ExpenseItem, IncomeItem } from "@/lib/types";

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

// ── Beban asli unit vs beban kontribusi (alokasi Cabang/Pusat) ─────────────────
//
// Backend menandai beban yang dialokasikan dari induk dengan account_code
// berawalan "ALLOC:" dan deskripsi "[Alokasi Cabang]"/"[Alokasi Pusat]".
// Beban lain adalah beban asli unit.

const ALLOC_PREFIX = "ALLOC:";

export type ContributionScope = "cabang" | "pusat";

export function isContributionItem(item: ExpenseItem): boolean {
  return item.account_code?.startsWith(ALLOC_PREFIX) ?? false;
}

export function contributionScope(item: ExpenseItem): ContributionScope {
  return item.description?.includes("[Alokasi Pusat]") ? "pusat" : "cabang";
}

/** Kode grup dasar tanpa awalan ALLOC: agar item alokasi cocok ke grup 5xxx-nya. */
function baseGroupCode(item: ExpenseItem): string {
  return isContributionItem(item)
    ? item.account_code.slice(ALLOC_PREFIX.length)
    : item.account_code;
}

export interface ExpenseGroupDetail {
  code: string;
  label: string;
  /** Beban asli unit pada grup ini. */
  ownTotal: number;
  /** Beban kontribusi (alokasi) dari Cabang pada grup ini. */
  contribCabang: number;
  /** Beban kontribusi (alokasi) dari Pusat pada grup ini. */
  contribPusat: number;
}

/**
 * Mengelompokkan item biaya per grup 5xxx sambil MEMISAHKAN beban asli unit dari
 * beban kontribusi (alokasi Cabang/Pusat). Item alokasi yang tak memetakan ke grup
 * mana pun (mis. depresiasi & investasi induk) ditampung di bucket "Lainnya" agar
 * total tetap terekonsiliasi (jumlah semua baris = total operasional/non-operasional).
 */
export function buildExpenseGroupsDetailed(
  items: ExpenseItem[],
  groups: { code: string; label: string }[],
): ExpenseGroupDetail[] {
  const details: ExpenseGroupDetail[] = groups.map((g) => ({
    code: g.code,
    label: g.label,
    ownTotal: 0,
    contribCabang: 0,
    contribPusat: 0,
  }));
  const other: ExpenseGroupDetail = {
    code: "LAIN",
    label: "Lainnya (termasuk alokasi depresiasi & investasi induk)",
    ownTotal: 0,
    contribCabang: 0,
    contribPusat: 0,
  };

  for (const item of items) {
    const base = baseGroupCode(item);
    const target = details.find((g) => matchGroupCode(base, g.code)) ?? other;
    if (isContributionItem(item)) {
      if (contributionScope(item) === "pusat") target.contribPusat += item.total;
      else target.contribCabang += item.total;
    } else {
      target.ownTotal += item.total;
    }
  }

  if (other.ownTotal !== 0 || other.contribCabang !== 0 || other.contribPusat !== 0) {
    details.push(other);
  }
  return details;
}

/** Total satu grup = beban unit + alokasi Cabang + alokasi Pusat. */
export function groupTotal(g: ExpenseGroupDetail): number {
  return g.ownTotal + g.contribCabang + g.contribPusat;
}

export interface ExpenseBreakdownRow {
  label: string;
  /** Biaya asli unit. */
  unit: number;
  /** Alokasi dari Cabang. */
  cabang: number;
  /** Alokasi dari Pusat. */
  pusat: number;
  /** Total = unit + cabang + pusat. */
  total: number;
}

export interface ExpenseBreakdown {
  rows: ExpenseBreakdownRow[];
  totalUnit: number;
  totalCabang: number;
  totalPusat: number;
  total: number;
}

/**
 * Rincian beban per grup dengan empat nilai eksplisit: biaya unit, alokasi Cabang,
 * alokasi Pusat, dan total. Hanya grup dengan aktivitas yang disertakan; baris
 * subtotal (`total*`) terekonsiliasi dengan total operasional/non-operasional.
 */
export function buildExpenseBreakdown(
  items: ExpenseItem[],
  groups: { code: string; label: string }[],
): ExpenseBreakdown {
  const details = buildExpenseGroupsDetailed(items, groups);
  const rows: ExpenseBreakdownRow[] = details
    .filter((g) => g.ownTotal !== 0 || g.contribCabang !== 0 || g.contribPusat !== 0)
    .map((g) => ({
      label: g.label,
      unit: g.ownTotal,
      cabang: g.contribCabang,
      pusat: g.contribPusat,
      total: groupTotal(g),
    }));
  return {
    rows,
    totalUnit: rows.reduce((a, r) => a + r.unit, 0),
    totalCabang: rows.reduce((a, r) => a + r.cabang, 0),
    totalPusat: rows.reduce((a, r) => a + r.pusat, 0),
    total: rows.reduce((a, r) => a + r.total, 0),
  };
}

// ── Rincian investasi & depresiasi (Unit vs Alokasi Cabang/Pusat) ──────────────
//
// Depresiasi induk (investasi baru & aset lama) dan investasi keuangan induk yang
// dialokasikan ke unit tersimpan sebagai ExpenseItem beracount_code "ALLOC:DEP-INV-*"/
// "ALLOC:DEP-OLD-*"/"ALLOC:FIN-INV-*" di dalam expenses.operational (lihat
// simulate_expenses di backend). Fungsi ini mengekstraknya untuk ditampilkan
// sebagai rincian Unit vs Alokasi Cabang/Pusat, tanpa merinci per item/aset.

function allocAmount(items: ExpenseItem[], code: string): number {
  return items
    .filter((item) => item.account_code === code)
    .reduce((a, item) => a + item.total, 0);
}

export function sumDepreciationBySource(
  items: DepreciationItem[],
  source: "new" | "existing",
): number {
  return items
    .filter((item) => item.source === source)
    .reduce((a, item) => a + item.current_year_dep, 0);
}

export interface SingleItemBreakdown {
  label: string;
  unit: number;
  cabang: number;
  pusat: number;
  total: number;
}

function singleItemBreakdown(
  label: string,
  unit: number,
  cabang: number,
  pusat: number,
): SingleItemBreakdown {
  return { label, unit, cabang, pusat, total: unit + cabang + pusat };
}

/**
 * Rincian Unit vs Alokasi Cabang/Pusat untuk investasi aset tetap, investasi
 * keuangan, depresiasi aset baru, dan depresiasi aset lama — masing-masing
 * sebagai baris terpisah (agregat, tanpa rincian per item/aset).
 */
export function buildInvestmentDepreciationBreakdown(
  summary: BudgetSummary,
): SingleItemBreakdown[] {
  const op = summary.expenses.operational;
  return [
    singleItemBreakdown("Investasi Aset Tetap", summary.total_physical_investments, 0, 0),
    singleItemBreakdown(
      "Investasi Keuangan",
      summary.total_financial_investments,
      allocAmount(op, "ALLOC:FIN-INV-CBG"),
      allocAmount(op, "ALLOC:FIN-INV-PST"),
    ),
    singleItemBreakdown(
      "Depresiasi Aset Baru",
      sumDepreciationBySource(summary.depreciation.items, "new"),
      allocAmount(op, "ALLOC:DEP-INV-CBG"),
      allocAmount(op, "ALLOC:DEP-INV-PST"),
    ),
    singleItemBreakdown(
      "Depresiasi Aset Lama",
      sumDepreciationBySource(summary.depreciation.items, "existing"),
      allocAmount(op, "ALLOC:DEP-OLD-CBG"),
      allocAmount(op, "ALLOC:DEP-OLD-PST"),
    ),
  ];
}

// ── Baris laporan terpadu (dipakai layar, cetak, dan Excel) ────────────────────

export interface ReportRow {
  label: string;
  kas: number | null;
  akrual: number | null;
  kind: "section" | "sub" | "line" | "total" | "surplus";
}

/**
 * Menambahkan satu baris per grup biaya berisi TOTAL grup (beban unit + alokasi
 * Cabang + alokasi Pusat). Rincian per komponen disajikan terpisah lewat
 * buildExpenseBreakdown. Total seluruh baris ini = total operasional/non-operasional.
 */
function pushExpenseGroupRows(rows: ReportRow[], details: ExpenseGroupDetail[]): void {
  for (const g of details) {
    const total = groupTotal(g);
    if (total === 0) continue;
    rows.push({ label: g.label, kas: total, akrual: total, kind: "sub" });
  }
}

/**
 * Membangun seluruh baris Laporan RAB dari BudgetSummary, dengan urutan:
 * Pendapatan (operasional + non-operasional + detail item) → Biaya Operasional →
 * Biaya Non Operasional → Investasi Aset Tetap → Investasi Keuangan →
 * Depresiasi Aset Baru (bila ada) → Depresiasi Aset Lama (bila ada) →
 * Surplus/Defisit → Saldo Kas & Setara Kas.
 */
export function buildReportRows(summary: BudgetSummary): ReportRow[] {
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

  const totalOp = summary.expenses.total_operational;
  const totalNonOp = summary.expenses.total_non_operational;
  const totalPhysicalInvestments = summary.total_physical_investments;
  const totalFinancialInvestments = summary.total_financial_investments;
  const newAssetDep = sumDepreciationBySource(summary.depreciation.items, "new");
  const oldAssetDep = sumDepreciationBySource(summary.depreciation.items, "existing");

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
  pushExpenseGroupRows(rows, opGroups);
  rows.push({
    label: "TOTAL BIAYA OPERASIONAL",
    kas: totalOp,
    akrual: totalOp,
    kind: "total",
  });

  rows.push({ label: "Biaya Non Operasional", kas: null, akrual: null, kind: "section" });
  pushExpenseGroupRows(rows, nonOpGroups);
  rows.push({
    label: "TOTAL BIAYA NON OPERASIONAL",
    kas: totalNonOp,
    akrual: totalNonOp,
    kind: "total",
  });

  // Investasi Aset Tetap, Investasi Keuangan, Depresiasi Aset Baru, dan Depresiasi
  // Aset Lama ditampilkan sebagai section terpisah (tidak digabung menjadi satu
  // baris "Investasi"/"Depresiasi") — rincian Unit vs Alokasi Cabang/Pusat untuk
  // masing-masing tersedia lewat buildInvestmentDepreciationBreakdown.
  rows.push({ label: "Investasi Aset Tetap", kas: null, akrual: null, kind: "section" });
  rows.push({
    label: "TOTAL INVESTASI ASET TETAP",
    kas: totalPhysicalInvestments,
    akrual: newAssetDep,
    kind: "total",
  });

  rows.push({ label: "Investasi Keuangan", kas: null, akrual: null, kind: "section" });
  rows.push({
    label: "TOTAL INVESTASI KEUANGAN",
    kas: totalFinancialInvestments,
    akrual: 0,
    kind: "total",
  });

  if (newAssetDep > 0) {
    rows.push({ label: "Depresiasi Aset Baru", kas: null, akrual: null, kind: "section" });
    rows.push({
      label: "TOTAL DEPRESIASI ASET BARU",
      kas: 0,
      akrual: newAssetDep,
      kind: "total",
    });
  }

  if (oldAssetDep > 0) {
    rows.push({ label: "Depresiasi Aset Lama", kas: null, akrual: null, kind: "section" });
    rows.push({
      label: "TOTAL DEPRESIASI ASET LAMA",
      kas: 0,
      akrual: oldAssetDep,
      kind: "total",
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
