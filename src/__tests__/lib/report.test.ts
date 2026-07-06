import {
  groupIncome,
  buildExpenseGroup,
  buildReportRows,
  sumItems,
  sumExpenseItems,
  matchGroupCode,
} from "@/lib/report";
import type { BudgetSummary, ExpenseItem, IncomeItem } from "@/lib/types";

describe("groupIncome", () => {
  it("memisahkan item 4100-4499 sebagai operasional dan >=4500 sebagai non-operasional", () => {
    const items: IncomeItem[] = [
      { account_code: "4100.01", description: "UP", total: 1000, auto_total: 1000 },
      { account_code: "4499.01", description: "Batas atas operasional", total: 200, auto_total: 200 },
      { account_code: "4500.01", description: "Non Op", total: 300, auto_total: 300 },
      { account_code: "4600.01", description: "Non Op lain", total: 400, auto_total: 400 },
    ];

    const { operasional, nonOperasional } = groupIncome(items);

    expect(operasional.map((i) => i.account_code)).toEqual(["4100.01", "4499.01"]);
    expect(nonOperasional.map((i) => i.account_code)).toEqual(["4500.01", "4600.01"]);
  });
});

describe("matchGroupCode", () => {
  it("mencocokkan berdasarkan prefix kode", () => {
    expect(matchGroupCode("5110.01", "5110")).toBe(true);
    expect(matchGroupCode("5120.01", "5110")).toBe(false);
    expect(matchGroupCode(undefined, "5110")).toBe(false);
  });
});

describe("buildExpenseGroup", () => {
  it("mengelompokkan item biaya berdasarkan kode grup dan menjumlahkan total", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500, total_bos: 0, total: 500 },
      { account_code: "5110.02", description: "Gaji Staf", total_yayasan: 300, total_bos: 0, total: 300 },
      { account_code: "5120.01", description: "Tenaga Ahli", total_yayasan: 100, total_bos: 0, total: 100 },
    ];

    const groups = buildExpenseGroup(items, [
      { code: "5110", label: "Biaya Gaji" },
      { code: "5120", label: "Tenaga Ahli" },
    ]);

    expect(groups[0].total).toBe(800);
    expect(groups[0].matched).toHaveLength(2);
    expect(groups[1].total).toBe(100);
  });
});

describe("sumItems / sumExpenseItems", () => {
  it("menjumlahkan field total dari daftar item", () => {
    const incomeItems: IncomeItem[] = [
      { account_code: "4100.01", description: "A", total: 100, auto_total: 100 },
      { account_code: "4100.02", description: "B", total: 200, auto_total: 200 },
    ];
    expect(sumItems(incomeItems)).toBe(300);

    const expenseItems: ExpenseItem[] = [
      { account_code: "5110.01", description: "A", total_yayasan: 50, total_bos: 0, total: 50 },
      { account_code: "5110.02", description: "B", total_yayasan: 70, total_bos: 0, total: 70 },
    ];
    expect(sumExpenseItems(expenseItems)).toBe(120);
  });
});

function makeSummary(overrides: Partial<BudgetSummary> = {}): BudgetSummary {
  return {
    organization_id: 1,
    organization_name: "SD Contoh",
    org_type: "UNIT",
    budget_year: "2025-2026",
    total_cash_revenue: 1_000_000,
    total_cash_revenue_auto: 1_000_000,
    total_cash_expenses: 700_000,
    total_investments: 100_000,
    total_physical_investments: 80_000,
    total_financial_investments: 20_000,
    cash_surplus_deficit: 200_000,
    cash_surplus_deficit_auto: 200_000,
    opening_cash_balance: 50_000,
    ending_cash_balance: 250_000,
    ending_cash_balance_auto: 250_000,
    total_accrual_revenue: 1_000_000,
    total_accrual_revenue_auto: 1_000_000,
    total_accrual_expenses: 750_000,
    accrual_surplus_deficit: 250_000,
    accrual_surplus_deficit_auto: 250_000,
    income: {
      items: [
        { account_code: "4100.01", description: "Uang Pangkal", total: 600_000, auto_total: 600_000 },
        { account_code: "4500.01", description: "Sumbangan", total: 400_000, auto_total: 400_000 },
      ],
      total: 1_000_000,
      total_auto: 1_000_000,
    },
    expenses: {
      operational: [
        { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500_000, total_bos: 0, total: 500_000 },
      ],
      non_operational: [
        { account_code: "5510.01", description: "Kantin", total_yayasan: 200_000, total_bos: 0, total: 200_000 },
      ],
      total_operational: 500_000,
      total_non_operational: 200_000,
      total: 700_000,
    },
    depreciation: {
      items: [],
      total_current_year_dep: 0,
    },
    ...overrides,
  };
}

describe("buildReportRows", () => {
  it("menyusun baris dengan urutan pendapatan → biaya operasional → non-operasional → investasi → surplus → saldo kas", () => {
    const rows = buildReportRows(makeSummary());
    const kinds = rows.map((r) => r.kind);

    expect(kinds[0]).toBe("section"); // Pendapatan
    expect(rows.find((r) => r.label === "TOTAL PENDAPATAN")?.kas).toBe(1_000_000);
    expect(rows.find((r) => r.label === "TOTAL BIAYA OPERASIONAL")?.kas).toBe(500_000);
    expect(rows.find((r) => r.label === "TOTAL BIAYA NON OPERASIONAL")?.kas).toBe(200_000);
    expect(rows.find((r) => r.label === "TOTAL INVESTASI")?.kas).toBe(100_000);
    expect(rows.find((r) => r.label === "SURPLUS (Budget KAS)")?.kas).toBe(200_000);
    expect(rows.find((r) => r.label === "SALDO KAS AKHIR (Budget Kas)")?.kas).toBe(250_000);
  });

  it("tidak menampilkan baris Depresiasi ketika total_current_year_dep = 0", () => {
    const rows = buildReportRows(makeSummary());
    expect(rows.some((r) => r.label === "Depresiasi")).toBe(false);
  });

  it("menampilkan baris Depresiasi ketika total_current_year_dep > 0", () => {
    const rows = buildReportRows(
      makeSummary({ depreciation: { items: [], total_current_year_dep: 50_000 } }),
    );
    expect(rows.some((r) => r.label === "Depresiasi")).toBe(true);
    expect(
      rows.find((r) => r.label === "Total Penyusutan Aset (Baru + Lama)")?.akrual,
    ).toBe(50_000);
  });

  it("label surplus mencerminkan DEFISIT ketika cash_surplus_deficit negatif", () => {
    const rows = buildReportRows(makeSummary({ cash_surplus_deficit: -50_000 }));
    expect(rows.some((r) => r.label === "DEFISIT (Budget KAS)")).toBe(true);
  });
});
