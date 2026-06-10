# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di berkas ini.

Format mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan proyek ini menganut [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

## [1.25.1] - 2026-06-10

### Diperbaiki
- Kategori biaya kini dapat diubah saat mengedit entri di halaman Biaya
  Operasional maupun Biaya Non-Operasional. Sebelumnya dropdown kategori
  muncul di form edit namun nilai yang dipilih tidak dikirim ke backend
  (`expense_category_id` tidak ada di `BudgetEntryUpdate`).

## [1.25.0] - 2026-06-08

### Ditambahkan
- Halaman **Override Direct Income** (`/organizations/[id]/direct-income-override`):
  tabel input khusus untuk menetapkan dan menghapus override nilai Direct Income
  per kategori biaya, lengkap dengan kolom Otomatis dan Override serta edit inline.
- Kartu navigasi **Override Direct Income** (amber) di halaman detail organisasi,
  hanya tampil untuk tipe UNIT.
- Dokumentasi penggunaan `panduan-fitur/override-direct-income.md`.
- Entri nav `Override Direct Income` di `mkdocs-usage.yml`.

### Diubah
- `DirectIncomeTable` dikembalikan menjadi komponen display-only — prop `orgId` dan
  semua logika edit/mutasi dipindahkan ke halaman Override Direct Income.
  Tabel tetap menampilkan kolom Otomatis dan Final serta badge Override untuk keperluan
  baca simulasi.
- Dokumentasi `panduan-fitur/simulasi.md`: panduan cara mengatur override dipindah ke
  halaman Override Direct Income; tab Direct Income di simulasi kini diuraikan sebagai
  tampilan hasil saja.
- Dokumentasi `panduan-fitur/pendapatan.md`: tautan Override Direct Income diperbarui
  ke halaman panduan baru.

## [1.24.0] - 2026-06-08

### Ditambahkan
- Tipe `DirectIncomeOverride` dan `DirectIncomeOverrideUpsert` di `src/lib/types/index.ts`.
- API wrapper `src/lib/api/direct-income-overrides.ts`: fungsi `list`, `upsert`, `remove`.
- Hook `useDirectIncomeOverrides`, `useUpsertDirectIncomeOverride`, dan
  `useDeleteDirectIncomeOverride` di `src/hooks/useDirectIncomeOverrides.ts`.
  Upsert/delete otomatis invalidasi query `directIncome`, `income`, dan `summary`.

### Diubah
- `DirectIncomeItem` di `src/lib/types/index.ts`: tambah field `expense_category_id`,
  `auto_total`, dan `is_overridden`.
- `DirectIncomeSimulation` di `src/lib/types/index.ts`: tambah field `total_auto`.
- `DirectIncomeTable`: prop baru `orgId`; tabel kini memiliki kolom **Otomatis** dan
  **Final** terpisah; baris override ditandai badge **Override** berwarna amber;
  kolom aksi mendukung edit inline (klik pensil → input → Enter/centang) dan reset
  ke nilai otomatis (ikon putar ulang).
- `income-entries/page.tsx`: daftar pilihan kategori di form tambah/edit entri
  hanya menampilkan kategori bertipe `MANUAL` — kategori `FROM_EXPENSE`,
  `GRADE_BASED`, `SIMULATED_UP`, `SIMULATED_US`, dan `SUM_FROM_BOS` tidak lagi
  dapat dipilih.
- Dokumentasi penggunaan `docs-usage/panduan-fitur/pendapatan.md`: mencantumkan
  bahwa hanya kategori Manual yang muncul di form, dan mengarahkan ke fitur Override
  untuk Direct Income.
- Dokumentasi penggunaan `docs-usage/panduan-fitur/simulasi.md`: deskripsi Tab Direct
  Income diperbarui sesuai kolom baru; ditambah seksi "Mengatur Override Direct Income"
  dengan panduan menetapkan dan menghapus override.

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

[Unreleased]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/compare/v1.25.1...HEAD
[1.25.1]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/compare/v1.25.0...v1.25.1
[1.19.0]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/releases/tag/v1.19.0
[1.18.0]: https://github.com/cakrawala-tumbuh/budget-sekolah-app/releases/tag/v1.18.0
