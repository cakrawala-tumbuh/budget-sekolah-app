import fs from "fs";
import path from "path";

/**
 * Kontrak CSS cetak (Keputusan Desain issue #1). `jsdom` tidak memaginasi
 * halaman, jadi test ini TIDAK memverifikasi hasil visual — hanya bahwa blok
 * `@media print` di `globals.css` memuat aturan wajib (kertas, paginasi
 * tabel) dan TIDAK lagi memuat hack isolasi cetak lama (`visibility: hidden`
 * pada `body *`, `position: absolute` pada `.print-root`).
 */

const css = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf-8",
);

describe("globals.css — blok @media print", () => {
  it("mendefinisikan kertas A4 portrait", () => {
    expect(css).toMatch(/size:\s*A4\s+portrait/);
  });

  it("memaksa thead berulang tiap halaman (table-header-group)", () => {
    expect(css).toMatch(/display:\s*table-header-group/);
  });

  it("mencegah baris tabel terbelah dua halaman (tr { break-inside: avoid })", () => {
    expect(css).toMatch(/\.report-table\s+tr\s*\{[^}]*break-inside:\s*avoid/);
  });

  it(".report-table-wrap tidak lagi overflow-x-auto saat cetak (overflow: visible)", () => {
    expect(css).toMatch(/\.report-table-wrap\s*\{[^}]*overflow:\s*visible/);
  });

  it("NEGATIF: tidak lagi memuat hack visibility: hidden pada body *", () => {
    expect(css).not.toMatch(/body\s*\*\s*\{[^}]*visibility:\s*hidden/);
  });

  it("NEGATIF: .print-root tidak lagi position: absolute", () => {
    expect(css).not.toMatch(/\.print-root\s*\{[^}]*position:\s*absolute/);
  });

  it(".print-root berada di alur dokumen normal (position: static)", () => {
    expect(css).toMatch(/\.print-root\s*\{[^}]*position:\s*static/);
  });
});
