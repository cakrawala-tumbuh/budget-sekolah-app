import { render, screen } from "@testing-library/react";
import type { BudgetSummary, DepreciationItem, Organization } from "@/lib/types";

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

jest.mock("@/hooks/useOrganizations", () => ({
  useOrganization: jest.fn(),
}));
jest.mock("@/hooks/useSimulation", () => ({
  useBudgetSummary: jest.fn(),
  useComparativeSummary: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useOrganization } = jest.requireMock("@/hooks/useOrganizations") as {
  useOrganization: jest.Mock;
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useBudgetSummary, useComparativeSummary } = jest.requireMock(
  "@/hooks/useSimulation",
) as {
  useBudgetSummary: jest.Mock;
  useComparativeSummary: jest.Mock;
};

// Import setelah mock dipasang (default export halaman)
import LaporanPage from "@/app/organizations/[id]/laporan/page";

const mockOrg: Organization = {
  id: 7,
  code: "SD-CONTOH",
  name: "SD Contoh",
  org_type: "UNIT",
  city: "Bandung",
  cash_balance: 0,
  parent_id: null,
  is_locked: false,
  locked_at: null,
  locked_by_username: null,
  created_at: "2025-01-01T00:00:00",
  updated_at: "2025-01-01T00:00:00",
};

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
        { account_code: "4100.01", description: "Uang Pangkal", total: 1_000_000, auto_total: 1_000_000, is_operational: true },
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
 * Keputusan Desain issue #1: `report-running-head` (kop berulang) WAJIB ada
 * di `/laporan`, dan `report-keep` (break-inside: avoid) WAJIB dicabut dari
 * section bertabel panjang (Ringkasan RAB, rincian beban, rincian investasi
 * & depresiasi) supaya tabel itu boleh terpecah antar halaman cetak.
 */
describe("LaporanPage — kop berulang & report-keep pada section bertabel", () => {
  beforeEach(() => {
    useOrganization.mockReturnValue({ data: mockOrg, isLoading: false });
    useBudgetSummary.mockReturnValue({
      data: makeSummary(),
      isLoading: false,
      isError: false,
    });
    useComparativeSummary.mockReturnValue({ data: undefined, isLoading: false });
  });

  it("menampilkan report-running-head berisi nama organisasi & tahun anggaran", async () => {
    const { container } = render(<LaporanPage params={resolvedParams({ id: "7" })} />);

    const runningHead = await screen.findByText(/SD Contoh · RAB 2025-2026/);
    expect(runningHead).toHaveClass("report-running-head");
    expect(container.querySelectorAll(".report-running-head")).toHaveLength(1);
  });

  it("report-keep TIDAK terpasang pada Ringkasan RAB / rincian beban / rincian investasi", async () => {
    const { container } = render(<LaporanPage params={resolvedParams({ id: "7" })} />);
    await screen.findByText(/SD Contoh · RAB 2025-2026/);

    // Setiap section bertabel panjang punya report-section, dan TIDAK satu
    // pun elemen report-section yang juga memuat report-keep.
    const longSections = container.querySelectorAll(".report-section");
    expect(longSections.length).toBeGreaterThan(0);
    longSections.forEach((el) => {
      expect(el.classList.contains("report-keep")).toBe(false);
    });
  });

  it("report-keep TETAP terpasang pada blok pendek (Cover, KPI, Signatures, Catatan)", async () => {
    const { container } = render(<LaporanPage params={resolvedParams({ id: "7" })} />);
    await screen.findByText(/SD Contoh · RAB 2025-2026/);

    expect(container.querySelector(".report-cover.report-keep")).not.toBeNull();
    expect(container.querySelectorAll(".report-kpi-item.report-keep")).toHaveLength(4);
    expect(container.querySelector(".report-keep")).not.toBeNull();
  });
});
