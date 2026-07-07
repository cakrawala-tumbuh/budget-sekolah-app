import {
  groupIncome,
  buildExpenseGroup,
  buildExpenseGroupsDetailed,
  buildExpenseBreakdown,
  buildExpenseAccountsDetailed,
  buildExpenseBreakdownPerAccount,
  buildReportRows,
  sumDepreciationBySource,
  buildInvestmentDepreciationBreakdown,
  sumItems,
  sumExpenseItems,
  matchGroupCode,
  isContributionItem,
  contributionScope,
  OP_EXPENSE_GROUPS,
} from "@/lib/report";
import type { BudgetSummary, DepreciationItem, ExpenseItem, IncomeItem } from "@/lib/types";

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

describe("isContributionItem / contributionScope", () => {
  it("mengenali item alokasi via prefix ALLOC: dan scope via deskripsi", () => {
    const cabang: ExpenseItem = {
      account_code: "ALLOC:5110.01",
      description: "[Alokasi Cabang] Gaji",
      total_yayasan: 100,
      total_bos: 0,
      total: 100,
    };
    const pusat: ExpenseItem = {
      account_code: "ALLOC:5110.01",
      description: "[Alokasi Pusat] Gaji",
      total_yayasan: 50,
      total_bos: 0,
      total: 50,
    };
    const own: ExpenseItem = {
      account_code: "5110.01",
      description: "Gaji",
      total_yayasan: 900,
      total_bos: 0,
      total: 900,
    };
    expect(isContributionItem(cabang)).toBe(true);
    expect(isContributionItem(own)).toBe(false);
    expect(contributionScope(cabang)).toBe("cabang");
    expect(contributionScope(pusat)).toBe("pusat");
  });
});

describe("buildExpenseGroupsDetailed", () => {
  it("memisahkan beban asli unit dari kontribusi Cabang/Pusat dan tetap rekonsiliasi", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:5110.01", description: "[Alokasi Cabang] Gaji", total_yayasan: 100, total_bos: 0, total: 100 },
      { account_code: "ALLOC:5110.02", description: "[Alokasi Pusat] Honor", total_yayasan: 50, total_bos: 0, total: 50 },
    ];

    const details = buildExpenseGroupsDetailed(items, [{ code: "5110", label: "Biaya Gaji" }]);

    const gaji = details.find((d) => d.code === "5110")!;
    expect(gaji.ownTotal).toBe(900);
    expect(gaji.contribCabang).toBe(100);
    expect(gaji.contribPusat).toBe(50);

    // Rekonsiliasi: jumlah semua baris = jumlah semua item.
    const grand = details.reduce(
      (a, d) => a + d.ownTotal + d.contribCabang + d.contribPusat,
      0,
    );
    expect(grand).toBe(1050);
  });

  it("mengecualikan alokasi depresiasi & investasi keuangan induk (ditampilkan lewat buildInvestmentDepreciationBreakdown, bukan bucket Lainnya)", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:DEP-INV-CBG", description: "[Alokasi Cabang] Depresiasi investasi baru", total_yayasan: 10, total_bos: 0, total: 10 },
      { account_code: "ALLOC:DEP-OLD-PST", description: "[Alokasi Pusat] Depresiasi aset lama", total_yayasan: 20, total_bos: 0, total: 20 },
      { account_code: "ALLOC:FIN-INV-CBG", description: "[Alokasi Cabang] Investasi Keuangan", total_yayasan: 30, total_bos: 0, total: 30 },
    ];

    const details = buildExpenseGroupsDetailed(items, [{ code: "5110", label: "Biaya Gaji" }]);

    // Tidak ada bucket "LAIN" — item alokasi depresiasi/investasi induk dikecualikan sepenuhnya.
    expect(details.find((d) => d.code === "LAIN")).toBeUndefined();

    const grand = details.reduce(
      (a, d) => a + d.ownTotal + d.contribCabang + d.contribPusat,
      0,
    );
    expect(grand).toBe(900);
  });

  it("tetap menampung item alokasi yang benar-benar tak memetakan ke grup manapun sebagai jaring pengaman", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:9999.01", description: "[Alokasi Cabang] Kode tak dikenal", total_yayasan: 15, total_bos: 0, total: 15 },
    ];

    const details = buildExpenseGroupsDetailed(items, [{ code: "5110", label: "Biaya Gaji" }]);

    const other = details.find((d) => d.code === "LAIN")!;
    expect(other.contribCabang).toBe(15);
  });
});

describe("buildExpenseAccountsDetailed", () => {
  it("membuat satu baris per akun asli, TIDAK digabung ke akun induk", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500, total_bos: 0, total: 500 },
      { account_code: "5110.02", description: "Gaji Staf", total_yayasan: 300, total_bos: 0, total: 300 },
    ];

    const details = buildExpenseAccountsDetailed(items);

    expect(details).toHaveLength(2);
    expect(details.find((d) => d.code === "5110.01")?.label).toBe("Gaji Guru");
    expect(details.find((d) => d.code === "5110.02")?.label).toBe("Gaji Staf");
  });

  it("menggabungkan beban unit & alokasi Cabang/Pusat yang berada di akun yang sama", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:5110.01", description: "[Alokasi Cabang] Gaji", total_yayasan: 100, total_bos: 0, total: 100 },
      { account_code: "ALLOC:5110.01", description: "[Alokasi Pusat] Gaji", total_yayasan: 50, total_bos: 0, total: 50 },
    ];

    const details = buildExpenseAccountsDetailed(items);

    expect(details).toHaveLength(1);
    expect(details[0].ownTotal).toBe(900);
    expect(details[0].contribCabang).toBe(100);
    expect(details[0].contribPusat).toBe(50);
  });

  it("memakai label dari deskripsi alokasi (prefix dilepas) bila akun tak punya beban unit", () => {
    const items: ExpenseItem[] = [
      { account_code: "ALLOC:5130.01", description: "[Alokasi Cabang] Biaya Pengembangan Guru", total_yayasan: 40, total_bos: 0, total: 40 },
    ];

    const details = buildExpenseAccountsDetailed(items);

    expect(details[0].label).toBe("Biaya Pengembangan Guru");
    expect(details[0].contribCabang).toBe(40);
  });

  it("mengecualikan alokasi depresiasi & investasi keuangan induk", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:DEP-INV-CBG", description: "[Alokasi Cabang] Depresiasi investasi baru", total_yayasan: 10, total_bos: 0, total: 10 },
    ];

    const details = buildExpenseAccountsDetailed(items);

    expect(details).toHaveLength(1);
    expect(details[0].code).toBe("5110.01");
  });
});

describe("buildExpenseBreakdownPerAccount", () => {
  it("menghasilkan baris per akun (rekonsiliasi total)", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500, total_bos: 0, total: 500 },
      { account_code: "5120.01", description: "Tenaga Ahli", total_yayasan: 100, total_bos: 0, total: 100 },
    ];

    const breakdown = buildExpenseBreakdownPerAccount(items);

    expect(breakdown.rows.map((r) => r.label)).toEqual(["Gaji Guru", "Tenaga Ahli"]);
    expect(breakdown.total).toBe(600);
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
    expect(rows.find((r) => r.label === "TOTAL INVESTASI ASET TETAP")?.kas).toBe(80_000);
    expect(rows.find((r) => r.label === "TOTAL INVESTASI KEUANGAN")?.kas).toBe(20_000);
    expect(rows.find((r) => r.label === "SURPLUS (Budget KAS)")?.kas).toBe(200_000);
    expect(rows.find((r) => r.label === "SALDO KAS AKHIR (Budget Kas)")?.kas).toBe(250_000);
  });

  it("Investasi Aset Tetap dan Investasi Keuangan ditampilkan sebagai section terpisah, tidak digabung", () => {
    const rows = buildReportRows(makeSummary());
    expect(rows.some((r) => r.label === "Investasi Aset Tetap" && r.kind === "section")).toBe(true);
    expect(rows.some((r) => r.label === "Investasi Keuangan" && r.kind === "section")).toBe(true);
    expect(rows.some((r) => r.label === "TOTAL INVESTASI")).toBe(false);
  });

  it("tidak menampilkan section Depresiasi Aset Baru/Lama ketika tidak ada depresiasi", () => {
    const rows = buildReportRows(makeSummary());
    expect(rows.some((r) => r.label === "Depresiasi Aset Baru")).toBe(false);
    expect(rows.some((r) => r.label === "Depresiasi Aset Lama")).toBe(false);
  });

  it("menampilkan Depresiasi Aset Baru dan Depresiasi Aset Lama sebagai section terpisah", () => {
    const depItems: DepreciationItem[] = [
      {
        asset_code: "INV-01",
        asset_name: "Laptop",
        acquisition_cost: 150_000,
        useful_life: 5,
        dep_per_year: 30_000,
        current_year_dep: 30_000,
        book_value: 120_000,
        source: "new",
      },
      {
        asset_code: "OLD-01",
        asset_name: "Meja",
        acquisition_cost: 100_000,
        useful_life: 5,
        dep_per_year: 20_000,
        current_year_dep: 20_000,
        book_value: 60_000,
        source: "existing",
      },
    ];
    const rows = buildReportRows(
      makeSummary({ depreciation: { items: depItems, total_current_year_dep: 50_000 } }),
    );
    expect(rows.some((r) => r.label === "Depresiasi Aset Baru" && r.kind === "section")).toBe(true);
    expect(rows.some((r) => r.label === "Depresiasi Aset Lama" && r.kind === "section")).toBe(true);
    expect(rows.find((r) => r.label === "TOTAL DEPRESIASI ASET BARU")?.akrual).toBe(30_000);
    expect(rows.find((r) => r.label === "TOTAL DEPRESIASI ASET LAMA")?.akrual).toBe(20_000);
  });

  it("label surplus mencerminkan DEFISIT ketika cash_surplus_deficit negatif", () => {
    const rows = buildReportRows(makeSummary({ cash_surplus_deficit: -50_000 }));
    expect(rows.some((r) => r.label === "DEFISIT (Budget KAS)")).toBe(true);
  });

  it("menggabungkan alokasi depresiasi & investasi keuangan induk ke section masing-masing, bukan baris Lainnya", () => {
    const summary = makeSummary({
      total_physical_investments: 80_000,
      total_financial_investments: 20_000,
      expenses: {
        operational: [
          { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500_000, total_bos: 0, total: 500_000 },
          { account_code: "ALLOC:DEP-INV-CBG", description: "[Alokasi Cabang] Depresiasi investasi baru", total_yayasan: 5_000, total_bos: 0, total: 5_000 },
          { account_code: "ALLOC:DEP-INV-PST", description: "[Alokasi Pusat] Depresiasi investasi baru", total_yayasan: 3_000, total_bos: 0, total: 3_000 },
          { account_code: "ALLOC:DEP-OLD-CBG", description: "[Alokasi Cabang] Depresiasi aset lama", total_yayasan: 2_000, total_bos: 0, total: 2_000 },
          { account_code: "ALLOC:FIN-INV-PST", description: "[Alokasi Pusat] Investasi Keuangan", total_yayasan: 6_000, total_bos: 0, total: 6_000 },
        ],
        non_operational: [],
        total_operational: 516_000,
        total_non_operational: 0,
        total: 516_000,
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
          },
        ],
        total_current_year_dep: 30_000,
      },
    });

    const rows = buildReportRows(summary);

    // Tidak ada lagi baris "Lainnya" di Biaya Operasional.
    expect(rows.some((r) => r.label.startsWith("Lainnya"))).toBe(false);

    // TOTAL BIAYA OPERASIONAL = 516_000 dikurangi 16_000 alokasi yang dipindah (5_000+3_000+2_000+6_000).
    expect(rows.find((r) => r.label === "TOTAL BIAYA OPERASIONAL")?.kas).toBe(500_000);

    // Investasi Keuangan = unit (20_000) + alokasi Pusat (6_000).
    const investasiKeuangan = rows.find((r) => r.label === "TOTAL INVESTASI KEUANGAN")!;
    expect(investasiKeuangan.kas).toBe(26_000);
    expect(investasiKeuangan.akrual).toBe(6_000);

    // Depresiasi Aset Baru = unit (30_000 akrual) + alokasi Cabang/Pusat (5_000+3_000=8_000).
    const depresiasiBaru = rows.find((r) => r.label === "TOTAL DEPRESIASI ASET BARU")!;
    expect(depresiasiBaru.kas).toBe(8_000);
    expect(depresiasiBaru.akrual).toBe(38_000);

    // Depresiasi Aset Lama = unit (0, tak ada aset lama) + alokasi Cabang (2_000).
    const depresiasiLama = rows.find((r) => r.label === "TOTAL DEPRESIASI ASET LAMA")!;
    expect(depresiasiLama.kas).toBe(2_000);
    expect(depresiasiLama.akrual).toBe(2_000);
  });

  it("baris PER AKUN biaya (bukan akun induk) menampilkan TOTAL (beban unit + alokasi Cabang & Pusat)", () => {
    const summary = makeSummary({
      expenses: {
        operational: [
          { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
          { account_code: "ALLOC:5110.01", description: "[Alokasi Cabang] Gaji", total_yayasan: 100, total_bos: 0, total: 100 },
          { account_code: "ALLOC:5110.01", description: "[Alokasi Pusat] Gaji", total_yayasan: 50, total_bos: 0, total: 50 },
        ],
        non_operational: [],
        total_operational: 1050,
        total_non_operational: 0,
        total: 1050,
      },
    });

    const rows = buildReportRows(summary);
    // Baris akun "Gaji" (per akun 5110.01) menampilkan total 900+100+50 = 1050,
    // sebagai baris "line" (bukan subtotal akun induk "Biaya Gaji").
    expect(rows.some((r) => r.label === "Biaya Gaji")).toBe(false);
    const gaji = rows.find((r) => r.kind === "line" && r.label === "Gaji");
    expect(gaji?.kas).toBe(1050);
  });

  it("menampilkan baris terpisah per akun, bukan digabung ke akun induk yang sama", () => {
    const summary = makeSummary({
      expenses: {
        operational: [
          { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500, total_bos: 0, total: 500 },
          { account_code: "5110.02", description: "Gaji Staf", total_yayasan: 300, total_bos: 0, total: 300 },
        ],
        non_operational: [],
        total_operational: 800,
        total_non_operational: 0,
        total: 800,
      },
    });

    const rows = buildReportRows(summary);
    expect(rows.some((r) => r.kind === "line" && r.label === "Gaji Guru" && r.kas === 500)).toBe(true);
    expect(rows.some((r) => r.kind === "line" && r.label === "Gaji Staf" && r.kas === 300)).toBe(true);
  });
});

describe("buildExpenseBreakdown", () => {
  it("memisahkan empat nilai per grup: unit, cabang, pusat, total (rekonsiliasi)", () => {
    const items: ExpenseItem[] = [
      { account_code: "5110.01", description: "Gaji", total_yayasan: 900, total_bos: 0, total: 900 },
      { account_code: "ALLOC:5110.01", description: "[Alokasi Cabang] Gaji", total_yayasan: 100, total_bos: 0, total: 100 },
      { account_code: "ALLOC:5110.02", description: "[Alokasi Pusat] Gaji", total_yayasan: 50, total_bos: 0, total: 50 },
    ];

    const breakdown = buildExpenseBreakdown(items, [{ code: "5110", label: "Biaya Gaji" }]);

    expect(breakdown.rows).toHaveLength(1);
    const gaji = breakdown.rows[0];
    expect(gaji.unit).toBe(900);
    expect(gaji.cabang).toBe(100);
    expect(gaji.pusat).toBe(50);
    expect(gaji.total).toBe(1050);

    expect(breakdown.totalUnit).toBe(900);
    expect(breakdown.totalCabang).toBe(100);
    expect(breakdown.totalPusat).toBe(50);
    expect(breakdown.total).toBe(1050);
  });

  it("mengembalikan rows kosong bila tidak ada beban", () => {
    const breakdown = buildExpenseBreakdown([], OP_EXPENSE_GROUPS);
    expect(breakdown.rows).toHaveLength(0);
    expect(breakdown.total).toBe(0);
  });
});

describe("sumDepreciationBySource", () => {
  it("menjumlahkan current_year_dep per source (new/existing)", () => {
    const items: DepreciationItem[] = [
      {
        asset_code: "INV-01",
        asset_name: "Laptop",
        acquisition_cost: 150_000,
        useful_life: 5,
        dep_per_year: 30_000,
        current_year_dep: 30_000,
        book_value: 120_000,
        source: "new",
      },
      {
        asset_code: "INV-02",
        asset_name: "Proyektor",
        acquisition_cost: 50_000,
        useful_life: 5,
        dep_per_year: 10_000,
        current_year_dep: 10_000,
        book_value: 40_000,
        source: "new",
      },
      {
        asset_code: "OLD-01",
        asset_name: "Meja",
        acquisition_cost: 100_000,
        useful_life: 5,
        dep_per_year: 20_000,
        current_year_dep: 20_000,
        book_value: 60_000,
        source: "existing",
      },
    ];

    expect(sumDepreciationBySource(items, "new")).toBe(40_000);
    expect(sumDepreciationBySource(items, "existing")).toBe(20_000);
  });
});

describe("buildInvestmentDepreciationBreakdown", () => {
  it("mengembalikan 4 baris terpisah (investasi aset tetap, investasi keuangan, depresiasi baru, depresiasi lama)", () => {
    const summary = makeSummary({
      total_physical_investments: 80_000,
      total_financial_investments: 20_000,
      expenses: {
        operational: [
          { account_code: "5110.01", description: "Gaji Guru", total_yayasan: 500_000, total_bos: 0, total: 500_000 },
          { account_code: "ALLOC:DEP-INV-CBG", description: "[Alokasi Cabang] Depresiasi investasi baru", total_yayasan: 5_000, total_bos: 0, total: 5_000 },
          { account_code: "ALLOC:DEP-INV-PST", description: "[Alokasi Pusat] Depresiasi investasi baru", total_yayasan: 3_000, total_bos: 0, total: 3_000 },
          { account_code: "ALLOC:DEP-OLD-CBG", description: "[Alokasi Cabang] Depresiasi aset lama", total_yayasan: 2_000, total_bos: 0, total: 2_000 },
          { account_code: "ALLOC:DEP-OLD-PST", description: "[Alokasi Pusat] Depresiasi aset lama", total_yayasan: 1_000, total_bos: 0, total: 1_000 },
          { account_code: "ALLOC:FIN-INV-CBG", description: "[Alokasi Cabang] Investasi Keuangan", total_yayasan: 4_000, total_bos: 0, total: 4_000 },
          { account_code: "ALLOC:FIN-INV-PST", description: "[Alokasi Pusat] Investasi Keuangan", total_yayasan: 6_000, total_bos: 0, total: 6_000 },
        ],
        non_operational: [],
        total_operational: 521_000,
        total_non_operational: 0,
        total: 521_000,
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
          },
          {
            asset_code: "OLD-01",
            asset_name: "Meja",
            acquisition_cost: 100_000,
            useful_life: 5,
            dep_per_year: 20_000,
            current_year_dep: 20_000,
            book_value: 60_000,
            source: "existing",
          },
        ],
        total_current_year_dep: 50_000,
      },
    });

    const rows = buildInvestmentDepreciationBreakdown(summary);
    expect(rows.map((r) => r.label)).toEqual([
      "Investasi Aset Tetap",
      "Investasi Keuangan",
      "Depresiasi Aset Baru",
      "Depresiasi Aset Lama",
    ]);

    const physical = rows.find((r) => r.label === "Investasi Aset Tetap")!;
    expect(physical.unit).toBe(80_000);
    expect(physical.cabang).toBe(0);
    expect(physical.pusat).toBe(0);
    expect(physical.total).toBe(80_000);

    const financial = rows.find((r) => r.label === "Investasi Keuangan")!;
    expect(financial.unit).toBe(20_000);
    expect(financial.cabang).toBe(4_000);
    expect(financial.pusat).toBe(6_000);
    expect(financial.total).toBe(30_000);

    const newDep = rows.find((r) => r.label === "Depresiasi Aset Baru")!;
    expect(newDep.unit).toBe(30_000);
    expect(newDep.cabang).toBe(5_000);
    expect(newDep.pusat).toBe(3_000);
    expect(newDep.total).toBe(38_000);

    const oldDep = rows.find((r) => r.label === "Depresiasi Aset Lama")!;
    expect(oldDep.unit).toBe(20_000);
    expect(oldDep.cabang).toBe(2_000);
    expect(oldDep.pusat).toBe(1_000);
    expect(oldDep.total).toBe(23_000);
  });
});
