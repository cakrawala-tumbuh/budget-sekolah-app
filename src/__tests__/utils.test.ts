import { cn, formatCurrency, formatNumber, ORG_TYPE_LABEL } from "@/lib/utils";

describe("cn()", () => {
  it("menggabungkan class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("mengabaikan nilai falsy", () => {
    expect(cn("a", undefined, false, "b")).toBe("a b");
  });

  it("menyelesaikan konflik Tailwind", () => {
    // tailwind-merge: kelas yang lebih spesifik menimpa sebelumnya
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("formatCurrency()", () => {
  it("memformat angka sebagai Rupiah Indonesia", () => {
    const result = formatCurrency(1_000_000);
    expect(result).toContain("1.000.000");
    expect(result).toMatch(/Rp/);
  });

  it("memformat angka nol", () => {
    const result = formatCurrency(0);
    expect(result).toContain("0");
  });

  it("memformat angka besar", () => {
    const result = formatCurrency(100_000_000);
    expect(result).toContain("100.000.000");
  });
});

describe("formatNumber()", () => {
  it("memformat angka dengan pemisah ribuan", () => {
    expect(formatNumber(1000)).toBe("1.000");
    expect(formatNumber(1_000_000)).toBe("1.000.000");
  });

  it("memformat angka kecil tanpa pemisah", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("ORG_TYPE_LABEL", () => {
  it("mengembalikan label yang benar untuk setiap tipe", () => {
    expect(ORG_TYPE_LABEL["UNIT"]).toBe("Unit");
    expect(ORG_TYPE_LABEL["CABANG"]).toBe("Cabang");
    expect(ORG_TYPE_LABEL["PUSAT"]).toBe("Pusat");
  });
});
