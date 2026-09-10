import { render } from "@testing-library/react";
import { RabSummaryTable } from "@/components/report/RabSummaryTable";
import { formatCurrency } from "@/lib/utils";
import type { ReportRow } from "@/lib/report";

/**
 * Kontrak tabel Laporan RAB Summary (Keputusan Desain issue #5): baris
 * ber-`kas`/`akrual` bukan `null` menampilkan `formatCurrency`, baris `null`
 * (termasuk seluruh baris `kind: "section"`) tetap "—", nilai `0` dirender
 * sebagai angka nol berformat rupiah (bukan "—"), dan pesan kosong (bukan
 * tabel tanpa baris) ketika `rows` kosong.
 */

const SAMPLE_ROWS: ReportRow[] = [
  { label: "Pendapatan", kas: null, akrual: null, kind: "section" },
  { label: "Pendapatan Operasional", kas: 1_000_000, akrual: 950_000, kind: "sub" },
];

describe("RabSummaryTable", () => {
  it("merender baris bernilai sebagai angka berformat rupiah pada kedua kolom", () => {
    const { container } = render(<RabSummaryTable rows={SAMPLE_ROWS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("Pendapatan Operasional");
    expect(text).toContain(formatCurrency(1_000_000));
    expect(text).toContain(formatCurrency(950_000));
  });

  it("merender — pada kolom nilai baris kind section (kas dan akrual null)", () => {
    const { container } = render(<RabSummaryTable rows={SAMPLE_ROWS} />);

    const sectionRow = Array.from(container.querySelectorAll("tr")).find((tr) =>
      tr.textContent?.includes("Pendapatan") && !tr.textContent.includes("Operasional"),
    );
    expect(sectionRow).toBeDefined();
    // Baris section merender satu <td colSpan> — bukan kolom nilai terpisah,
    // sehingga "—" tidak muncul sebagai teks sel pada baris ini.
    expect(sectionRow?.querySelectorAll("td")).toHaveLength(1);
  });

  it("merender campuran baris bernilai dan baris null dengan benar dalam satu tabel", () => {
    const rows: ReportRow[] = [
      { label: "Pendapatan", kas: null, akrual: null, kind: "section" },
      { label: "Pendapatan Operasional", kas: 1_000_000, akrual: 1_000_000, kind: "sub" },
      { label: "Biaya Operasional", kas: null, akrual: null, kind: "section" },
      { label: "Biaya Gaji", kas: 500_000, akrual: 500_000, kind: "sub" },
    ];
    const { container } = render(<RabSummaryTable rows={rows} />);

    const dataRows = Array.from(container.querySelectorAll("tbody tr"));
    expect(dataRows).toHaveLength(4);

    const [, pendapatanOperasional, , biayaGaji] = dataRows;
    expect(pendapatanOperasional.textContent).toContain(formatCurrency(1_000_000));
    expect(biayaGaji.textContent).toContain(formatCurrency(500_000));
  });

  it("merender nilai 0 sebagai angka nol berformat rupiah, bukan —", () => {
    const rows: ReportRow[] = [
      { label: "Pendapatan Operasional", kas: 0, akrual: 0, kind: "sub" },
    ];
    const { container } = render(<RabSummaryTable rows={rows} />);
    const cells = container.querySelectorAll("td");

    expect(cells).toHaveLength(3);
    expect(cells[1].textContent).toBe(formatCurrency(0));
    expect(cells[2].textContent).toBe(formatCurrency(0));
    expect(cells[1].textContent).not.toBe("—");
    expect(cells[2].textContent).not.toBe("—");
  });

  it("merender pesan kosong, bukan tabel tanpa baris, ketika rows kosong", () => {
    const { container } = render(<RabSummaryTable rows={[]} />);

    expect(container.querySelector("table")).toBeNull();
    expect(container.textContent).toContain("Tidak ada data");
  });
});
