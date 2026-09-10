import { render, screen } from "@testing-library/react";
import type { BudgetSummary, DepreciationItem } from "@/lib/types";

/**
 * Halaman ini membaca `params` lewat `React.use()`. Promise biasa membuat
 * `use()` men-suspend (butuh microtask ekstra yang tidak selalu tertangkap
 * `findBy*` di jsdom); menandai promise sebagai "fulfilled" — persis seperti
 * yang dilakukan Next.js App Router pada `params` di runtime — membuatnya
 * terbaca sinkron tanpa Suspense sama sekali.
 */
function resolvedParams<T>(value: T): Promise<T> {
  const p = Promise.resolve(value) as Promise<T> & { status?: string; value?: T };
  p.status = "fulfilled";
  p.value = value;
  return p;
}

// Mock next/link agar tidak perlu App Router context
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("@/hooks/useSimulation", () => ({
  useBudgetSummary: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useBudgetSummary } = jest.requireMock("@/hooks/useSimulation") as {
  useBudgetSummary: jest.Mock;
};

// Import setelah mock dipasang (default export halaman)
import SummaryPage from "@/app/organizations/[id]/summary/page";

function makeSummary(): BudgetSummary {
  return {
    organization_id: 7,
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
        { account_code: "4100.01", description: "Uang Pangkal", total: 1_000_000, auto_total: 1_000_000 },
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
      items: [] as DepreciationItem[],
      total_current_year_dep: 0,
    },
  };
}

/**
 * Keputusan Desain issue #1: jalur cetak tunggal ada di `/laporan`. Tombol
 * "Cetak" di `/summary` TIDAK BOLEH lagi memanggil `window.print()` —
 * ia menavigasi ke `/organizations/<id>/laporan`.
 */
describe("SummaryPage — tombol cetak menavigasi ke /laporan", () => {
  beforeEach(() => {
    useBudgetSummary.mockReturnValue({
      data: makeSummary(),
      isLoading: false,
      isError: false,
    });
  });

  it("tombol Cetak adalah tautan ke /organizations/<id>/laporan, window.print TIDAK terpanggil", async () => {
    const printSpy = jest.spyOn(window, "print").mockImplementation(() => {});

    render(<SummaryPage params={resolvedParams({ id: "7" })} />);

    const link = await screen.findByRole("link", { name: /cetak/i });
    expect(link).toHaveAttribute("href", "/organizations/7/laporan");
    expect(printSpy).not.toHaveBeenCalled();

    printSpy.mockRestore();
  });

  it("tidak ada lagi blok kop cetak ad-hoc (hidden print:block) di /summary", async () => {
    render(<SummaryPage params={resolvedParams({ id: "7" })} />);

    await screen.findByRole("link", { name: /cetak/i });
    // Teks unik blok kop cetak ad-hoc yang dihapus (bukan judul H1 layar
    // "Summary RAB — Ringkasan Keuangan" yang tetap ada).
    expect(
      screen.queryByText(/BUDGET KAS.*AKRUAL/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/YAYASAN PENYELENGGARAAN ILAHI INDONESIA/i),
    ).not.toBeInTheDocument();
  });
});
