import { render } from "@testing-library/react";
import { RabSummaryTable } from "@/components/report/RabSummaryTable";
import type { ReportRow } from "@/lib/report";

/**
 * Kontrak tabel kerangka Laporan RAB Summary (Keputusan Desain issue #3): hanya
 * baris kelompok, kolom nilai selalu "—" pada iterasi ini, dan pesan kosong
 * (bukan tabel tanpa baris) ketika `rows` kosong.
 */

const SAMPLE_ROWS: ReportRow[] = [
  { label: "Pendapatan", kas: null, akrual: null, kind: "section" },
  { label: "Pendapatan Operasional", kas: 1_000_000, akrual: 1_000_000, kind: "sub" },
];

describe("RabSummaryTable", () => {
  it("merender kedua label dan menampilkan — pada kolom nilai", () => {
    const { container } = render(<RabSummaryTable rows={SAMPLE_ROWS} />);
    const text = container.textContent ?? "";

    expect(text).toContain("Pendapatan Operasional");
    expect(text).toContain("Pendapatan");

    const dashCells = container.querySelectorAll("td:not([colspan])");
    expect(dashCells.length).toBeGreaterThan(0);
    dashCells.forEach((cell) => {
      if (cell.textContent !== "Pendapatan Operasional") {
        expect(cell.textContent).toBe("—");
      }
    });
  });

  it("merender pesan kosong, bukan tabel tanpa baris, ketika rows kosong", () => {
    const { container } = render(<RabSummaryTable rows={[]} />);

    expect(container.querySelector("table")).toBeNull();
    expect(container.textContent).toContain("Tidak ada data");
  });
});
