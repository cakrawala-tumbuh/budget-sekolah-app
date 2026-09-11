import { render } from "@testing-library/react";
import { ReportCover } from "@/components/report/ReportCover";
import { ReportKpiCards } from "@/components/report/ReportKpiCards";
import { ReportSummaryTable } from "@/components/report/ReportSummaryTable";
import { ReportExpenseBreakdown } from "@/components/report/ReportExpenseBreakdown";
import { ReportInvestmentDepreciationBreakdown } from "@/components/report/ReportInvestmentDepreciationBreakdown";
import { ReportConsolidation } from "@/components/report/ReportConsolidation";
import type {
  BudgetSummary,
  ComparativeSummary,
  DepreciationItem,
  ExpenseItem,
} from "@/lib/types";

/**
 * Kontrak kelas semantik cetak (Keputusan Desain issue #1): aturan `@media
 * print` di `globals.css` menyasar kelas-kelas ini, bukan varian `print:`
 * yang tersebar di komponen. Test ini memastikan tiap komponen `report/*`
 * memuat kelas kontraknya, dan `report-keep` (break-inside: avoid) TIDAK
 * terpasang di section bertabel panjang — supaya tabel itu boleh terpecah
 * antar halaman cetak dengan `thead` berulang.
 */

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
        { account_code: "4100.01", description: "Uang Pangkal", total: 600_000, auto_total: 600_000, is_operational: true },
        { account_code: "4500.01", description: "Sumbangan", total: 400_000, auto_total: 400_000, is_operational: false },
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
      items: [
        {
          asset_code: "INV-01",
          asset_name: "Laptop",
          acquisition_cost: 150_000,
          useful_life: 5,
          dep_per_year: 30_000,
          current_year_dep: 30_000,
          book_value: 120_000,
          source: "new",
        } satisfies DepreciationItem,
      ],
      total_current_year_dep: 30_000,
    },
    ...overrides,
  };
}

const expenseItems: ExpenseItem[] = [
  { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500_000, total_bos: 0, total: 500_000 },
];

describe("ReportCover — kelas semantik report-cover", () => {
  it("memuat kelas report-cover", () => {
    const { container } = render(
      <ReportCover orgName="SD Contoh" city="Bandung" orgType="UNIT" budgetYear="2025-2026" />,
    );
    expect(container.querySelector(".report-cover")).not.toBeNull();
  });
});

describe("ReportKpiCards — kelas semantik report-kpi & report-kpi-item", () => {
  it("container memuat report-kpi, tiap kartu memuat report-kpi-item", () => {
    const { container } = render(<ReportKpiCards summary={makeSummary()} />);
    expect(container.querySelector(".report-kpi")).not.toBeNull();
    const items = container.querySelectorAll(".report-kpi-item");
    expect(items.length).toBe(4);
  });
});

describe("ReportSummaryTable — kelas semantik & report-keep dicabut", () => {
  it("memuat report-section/report-table-wrap/report-table, TANPA report-keep", () => {
    const { container } = render(<ReportSummaryTable summary={makeSummary()} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("report-section")).toBe(true);
    expect(root.classList.contains("report-keep")).toBe(false);
    expect(container.querySelector(".report-table-wrap")).not.toBeNull();
    expect(container.querySelector("table.report-table")).not.toBeNull();
  });
});

describe("ReportExpenseBreakdown — kelas semantik & report-keep dicabut", () => {
  it("memuat report-section/report-section-title/report-table-wrap/report-table, TANPA report-keep", () => {
    const { container } = render(
      <ReportExpenseBreakdown
        items={expenseItems}
        title="Rincian Beban Operasional"
        totalLabel="TOTAL BEBAN OPERASIONAL"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("report-section")).toBe(true);
    expect(root.classList.contains("report-keep")).toBe(false);
    expect(container.querySelector(".report-section-title")).not.toBeNull();
    expect(container.querySelector(".report-table-wrap")).not.toBeNull();
    expect(container.querySelector("table.report-table")).not.toBeNull();
  });
});

describe("ReportInvestmentDepreciationBreakdown — kelas semantik & report-keep dicabut", () => {
  it("memuat report-section/report-section-title/report-table-wrap/report-table, TANPA report-keep", () => {
    const { container } = render(
      <ReportInvestmentDepreciationBreakdown summary={makeSummary()} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("report-section")).toBe(true);
    expect(root.classList.contains("report-keep")).toBe(false);
    expect(container.querySelector(".report-section-title")).not.toBeNull();
    expect(container.querySelector(".report-table-wrap")).not.toBeNull();
    expect(container.querySelector("table.report-table")).not.toBeNull();
  });
});

describe("ReportConsolidation — kelas semantik", () => {
  it("memuat report-section/report-section-title/report-table-wrap/report-table", () => {
    const summary = makeSummary();
    const data: ComparativeSummary = {
      organization: {
        parent_id: null,
        summary_with_allocation: summary,
        summary_without_allocation: summary,
      },
      units: [],
    };
    const { container } = render(<ReportConsolidation data={data} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.classList.contains("report-section")).toBe(true);
    expect(root.classList.contains("print-break-before")).toBe(true);
    expect(container.querySelector(".report-section-title")).not.toBeNull();
    expect(container.querySelector(".report-table-wrap")).not.toBeNull();
    expect(container.querySelector("table.report-table")).not.toBeNull();
  });
});
