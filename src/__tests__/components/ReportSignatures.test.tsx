import { render } from "@testing-library/react";
import { ReportSignatures } from "@/components/report/ReportSignatures";

/**
 * Kontrak jalur persetujuan Laporan RAB (Keputusan Desain issue #2): empat
 * blok tanda tangan berurutan — Disusun Oleh, Ditinjau Oleh, Disetujui Oleh,
 * Disahkan Oleh — masing-masing dengan jabatan yang tepat, kontainer tetap
 * memakai `report-keep` (utuh satu halaman saat cetak) dan grid empat kolom
 * pada breakpoint lebar.
 */

describe("ReportSignatures — empat blok tanda tangan berurutan", () => {
  it("menampilkan keempat peran dan jabatan sesuai urutan", () => {
    const { container } = render(<ReportSignatures />);
    const text = container.textContent ?? "";

    const roleIndexes = [
      text.indexOf("Disusun Oleh"),
      text.indexOf("Ditinjau Oleh"),
      text.indexOf("Disetujui Oleh"),
      text.indexOf("Disahkan Oleh"),
    ];
    expect(roleIndexes.every((index) => index !== -1)).toBe(true);
    expect(roleIndexes).toEqual([...roleIndexes].sort((a, b) => a - b));

    expect(text).toContain("Kepala Sekolah");
    expect(text).toContain("Penanggung Jawab Cabang");
    expect(text).toContain("Ketua Yayasan");
    expect(text).toContain("Pembina");
  });

  it("kontainer terluar memuat kelas report-keep dan grid empat kolom (sm:grid-cols-4)", () => {
    const { container } = render(<ReportSignatures />);
    const root = container.firstElementChild as HTMLElement;

    expect(root.classList.contains("report-keep")).toBe(true);
    expect(root.classList.contains("sm:grid-cols-4")).toBe(true);
  });

  it("tidak lagi menampilkan peran/jabatan lama", () => {
    const { container } = render(<ReportSignatures />);
    const text = container.textContent ?? "";

    expect(text).not.toContain("Diperiksa oleh");
    expect(text).not.toContain("Kepala Unit / Bendahara");
    expect(text).not.toContain("Kepala Cabang");
    expect(text).not.toContain("Pengurus / Pembina Yayasan");
  });
});
