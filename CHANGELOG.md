# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di berkas ini.

Format mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan proyek ini menganut [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

## [1.23.0] - 2026-06-08

### Diubah
- Tab **Direct Income** pada Simulasi Anggaran: data kini dikelompokkan per
  kategori pendapatan. Setiap grup menampilkan kode & nama kategori pendapatan
  sebagai header baris beserta subtotal, diikuti baris detail biaya penyusunnya
  (kode biaya, uraian, nominal). Kolom Kode Pendapatan dan Kategori Pendapatan
  dihapus dari kolom individual karena kini jadi header grup.
- Dokumentasi penggunaan `docs-usage/panduan-fitur/simulasi.md` diperbarui:
  deskripsi Tab Direct Income disesuaikan dengan tampilan baru yang terkelompok.

## [1.22.0] - 2026-06-08

### Ditambahkan
- Tab **Direct Income** pada halaman Simulasi Anggaran (khusus UNIT): menampilkan
  rincian biaya yang ber-flag Direct Income beserta kategori pendapatan tujuannya
  dan nominal dana Yayasan yang dicatat sebagai pendapatan.
- Komponen `DirectIncomeTable` di `src/components/simulation/`.
- Hook `useDirectIncomeSimulation` dan key `directIncome` di `simulationKeys`.
- Tipe `DirectIncomeItem` dan `DirectIncomeSimulation` di `src/lib/types/index.ts`.

### Diubah
- Kalkulasi Direct Income hanya mengakumulasi nilai Yayasan — dana BoS tidak
  ikut dihitung karena sudah diperhitungkan di Tab Detail BoS (Pendapatan BoS).
- Dokumentasi penggunaan `docs-usage/panduan-fitur/simulasi.md` diperbarui:
  kolom tabel Direct Income disesuaikan (5 kolom, tanpa Yayasan/BoS terpisah)
  dan ditambah admonition penjelasan alasan hanya Yayasan yang dihitung.

## [1.21.0] - 2026-06-08

### Ditambahkan
- Dropdown **Mapping ke Kategori Pendapatan** pada form Kategori Biaya (Admin):
  muncul otomatis saat flag **Direct Income** dicentang, memungkinkan Admin
  menentukan ke kategori pendapatan mana nilai biaya ini akan dihitung otomatis.
- Kolom **Mapping Pendapatan** pada tabel Kategori Biaya untuk menampilkan kode
  akun pendapatan tujuan sekilas tanpa membuka form edit.

### Diubah
- Dokumentasi penggunaan `docs-usage/panduan-fitur/admin.md` diperbarui:
  tabel kolom Kategori Biaya, penjelasan semua flag (termasuk Direct Income),
  dan admonition cara kerja pendapatan otomatis dari biaya.
- Dokumentasi penggunaan `docs-usage/panduan-fitur/pendapatan.md` ditambah
  catatan bahwa sebagian pendapatan dihitung otomatis via mapping Direct Income.

## [1.20.0] - 2026-06-08

### Ditambahkan
- Tab **Detail BoS** pada halaman Simulasi Anggaran (khusus UNIT): menampilkan
  rincian sumber dana BoS dikelompokkan per kategori biaya operasional dan per
  kategori investasi, dengan subtotal per seksi dan total keseluruhan.
- Komponen `BosIncomeTable` di `src/components/simulation/`.
- Hook `useBosIncomeSimulation` dan key `bosIncome` di `simulationKeys`.
- Tipe `BosIncomeLineItem` dan `BosIncomeSimulation` di `src/lib/types/index.ts`.

### Diubah
- Dokumentasi penggunaan `docs-usage/panduan-fitur/simulasi.md` diperbarui
  dengan deskripsi Tab Detail BoS dan keterangan hubungannya dengan Tab Pendapatan.

## [1.19.0] - 2026-06-08

### Ditambahkan
- Dokumentasi penggunaan lengkap di `docs-usage/` dengan Material for MkDocs:
  panduan fitur per halaman (organisasi, asumsi siswa, label kelas, biaya
  operasional/non-operasional, investasi, depresiasi aset lama, pendapatan,
  alokasi UP/US, subsidi, simulasi, summary, admin), dua tutorial skenario,
  dan FAQ.
- File konfigurasi `mkdocs-usage.yml` dan `requirements-docs.txt` untuk build
  dokumentasi penggunaan.

### Diubah
- Workflow `docs.yml` kini mem-build `mkdocs-usage.yml` (menggantikan `mkdocs.yml`)
  dan memantau perubahan di `docs-usage/`, `mkdocs-usage.yml`, dan
  `requirements-docs.txt`; pip cache diaktifkan via `requirements-docs.txt`.

## [1.18.0] - 2026-06-08

### Ditambahkan
- Kolom **Dana BoS** pada form dan tabel investasi aset tetap. Jika diisi,
  nilai BoS ditampilkan dengan warna biru sebagai penanda visual, dan total
  Dana BoS muncul di footer tabel. Mengikuti fitur backend v1.18.0.

[Unreleased]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/compare/v1.19.0...HEAD
[1.19.0]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/releases/tag/v1.19.0
[1.18.0]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/releases/tag/v1.18.0
