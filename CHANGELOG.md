# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di berkas ini.

Format mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan proyek ini menganut [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

## [1.34.0] - 2026-06-17

### Ditambahkan
- **Halaman Investasi Keuangan** (`/organizations/[id]/financial-investments`):
  CABANG dan PUSAT dapat mendata instrumen investasi keuangan (saham, reksa dana,
  obligasi, deposito, dll.) beserta nominal dan catatan. Halaman lengkap dengan
  CRUD — tambah, edit, hapus.
- Kartu navigasi "Investasi Keuangan" ditambahkan ke halaman detail organisasi
  CABANG/PUSAT, di samping Alokasi UP, Alokasi US, dan Subsidi.
- API client `financialInvestmentsApi` dan hooks `useFinancialInvestments`,
  `useCreateFinancialInvestment`, `useUpdateFinancialInvestment`,
  `useDeleteFinancialInvestment`.
- Tabel simulasi UP (`UPSimulationTable`) kini menampilkan baris
  "Investasi Keuangan Cabang (alokasi)" dan "Investasi Keuangan Pusat (alokasi)"
  bila ada alokasi dari induk.
- Tipe baru `InstrumentType`, `FinancialInvestment`, `FinancialInvestmentCreate`,
  `FinancialInvestmentUpdate` ditambahkan ke `src/lib/types/index.ts`.
- Field `cabang_financial_investment_allocated` dan
  `pusat_financial_investment_allocated` ditambahkan ke interface `UPSimulation`.

## [1.33.1] - 2026-06-11

### Diperbaiki
- Selektor e2e pada spec ringkasan diubah dari `text=Komponen Uang Pangkal` menjadi
  `text=Simulasi Uang Pangkal` agar cocok dengan judul CardTitle yang sebenarnya.

### Build
- Tambah `Dockerfile.e2e` untuk menjalankan Playwright dalam container.
- Tambah `docker-compose.e2e.yml` yang menghidupkan backend + app + seed secara
  terintegrasi pada port non-standard (backend `:18000`, app `:3099`).
- Tambah `e2e/seed.sh`: skrip seed idempotent yang membuat tiga organisasi
  (PUSAT, CABANG, UNIT), asumsi siswa, alokasi kontribusi, dan alokasi biaya UP
  yang dibutuhkan test e2e.
- Tambah target Makefile `e2e-up`, `e2e`, dan `e2e-down` untuk mengelola siklus
  hidup environment e2e dari terminal.

## [1.33.0] - 2026-06-11

### Ditambahkan
- **Manajemen Database** (halaman `/admin/database`): Admin dapat mengunduh backup
  database SQLite aktif dan memulihkan database dari file backup — tersedia di sidebar
  bagian Administrasi.
- Helper API `apiFetchRaw` (download binary) dan `apiFetchForm` (upload multipart)
  di `src/lib/api/client.ts` untuk mendukung operasi backup/restore.
- Hooks `useBackupDatabase` dan `useRestoreDatabase` di `src/hooks/useAdmin.ts`.
- Panduan penggunaan: halaman baru **Manajemen Database** di `docs-usage/panduan-fitur/database.md`,
  beserta pembaruan halaman Panel Admin, overview fitur, dan FAQ.

## [1.32.0] - 2026-06-11

### Ditambahkan
- Fungsi `logoutApi()` di `src/lib/api/auth.ts` yang memanggil endpoint
  `POST /auth/logout` pada backend saat user keluar.
- Logout kini memanggil backend terlebih dahulu sebelum menghapus token lokal
  sehingga sesi diinvalidasi di sisi server; bila request gagal (token sudah
  tidak valid), logout lokal tetap berjalan normal.

## [1.31.0] - 2026-06-11

### Ditambahkan
- **Kartu organisasi**: badge "Terkunci" (merah, ikon gembok) kini muncul langsung
  di tile organisasi bila budget sudah dikunci — status kunci dapat diketahui tanpa
  harus membuka halaman detail.
- **Dokumentasi**: panduan fitur Organisasi dan Penguncian Budget diperbarui untuk
  mencerminkan badge status kunci di kartu organisasi.

## [1.29.2] - 2026-06-11

### Diperbaiki
- Halaman **Alokasi UP**: kolom Persentase Final dan baris Total kini menampilkan
  nilai yang dihitung dengan algoritma baru — unit tanpa override mendapat sisa
  (100% − total semua override) dibagi proporsional berdasarkan siswa baru, bukan
  dibagi total semua siswa baru. Total seluruh kolom Persentase Final selalu 100%.
- Halaman **Alokasi US**: perbaikan serupa untuk kolom Persentase Final berbasis
  total siswa.
- Dialog **Atur Proporsi UP/US**: nilai "Proporsi Otomatis" yang ditampilkan kini
  menghitung proporsi hipotetikal — berapa proporsi unit ini jika override-nya
  dihapus — berdasarkan algoritma sisa yang sama.

## [1.29.1] - 2026-06-11

### Diubah
- Panduan fitur **Alokasi UP & US**: perbarui penjelasan kolom Proporsi Otomatis
  dan mekanisme distribusi untuk mencerminkan algoritma baru — unit tanpa override
  mendapat sisa porsi (100% − total semua override) secara proporsional berdasarkan
  jumlah siswa. Ditambahkan contoh angka konkret dan jaminan total selalu 100%.

## [1.29.0] - 2026-06-11

### Ditambahkan
- Baris **Total** di bagian bawah tabel **Proporsi per Unit (Siswa Baru UP)**
  pada halaman Alokasi UP: menjumlahkan seluruh kolom Persentase Final dari
  semua unit, sehingga operator dapat memverifikasi distribusi proporsional.
- Baris **Total** di bagian bawah tabel **Proporsi per Unit (Total Siswa US)**
  pada halaman Alokasi US: serupa dengan UP, memudahkan validasi bahwa total
  distribusi mendekati 100%.

### Diubah
- Panduan fitur **Alokasi UP & US**: tambah penjelasan baris Total di tabel
  Proporsi per Unit beserta panduan validasi distribusi proporsional.

## [1.28.1] - 2026-06-11

### Diubah
- Panduan fitur **Biaya Operasional**: hapus catatan lama "Kategori Tidak Dapat
  Diubah Saat Edit" (sudah diperbaiki), tambah instruksi bahwa kategori kini bisa
  diubah langsung saat edit entri.
- Panduan fitur **Biaya Operasional**: tambah section **Pindah Kategori Massal**
  yang menjelaskan cara memindahkan banyak entri sekaligus ke kategori lain.
- Panduan fitur **Alokasi UP & US**: tambah kolom **Proporsi Otomatis**,
  **Override (%)**, dan **Persentase Final** di tabel tampilan, beserta penjelasan
  masing-masing kolom dan opsi override persentase saat mengatur alokasi.

## [1.28.0] - 2026-06-11

### Ditambahkan
- Tabel **Proporsi per Unit (Total Siswa US)** di halaman Alokasi US kini
  menampilkan tiga kolom persentase: **Proporsi Otomatis** (dihitung dari
  `total_siswa / total_seluruh_siswa` semua unit), **Override (%)** (nilai
  manual bila diset, ditampilkan sebagai badge), dan **Persentase Final**
  (nilai yang benar-benar digunakan simulasi — override bila aktif, atau
  otomatis; disorot biru bila override aktif).
- Dialog "Atur Proporsi US" kini menampilkan Proporsi Otomatis di panel
  data asumsi sehingga pengguna dapat melihat nilai baseline sebelum
  mengisi override.

## [1.27.0] - 2026-06-11

### Ditambahkan
- Tabel **Proporsi per Unit (Siswa Baru UP)** di halaman Alokasi UP kini
  menampilkan tiga kolom persentase: **Proporsi Otomatis** (dihitung dari
  `siswa_baru / total_siswa_baru` seluruh unit), **Override (%)** (nilai
  manual bila diset, ditampilkan sebagai badge), dan **Persentase Final**
  (nilai yang benar-benar digunakan simulasi — override bila aktif, atau
  otomatis; disorot biru bila override aktif).
- Dialog "Atur Proporsi UP" kini menampilkan Proporsi Otomatis di panel
  data asumsi sehingga pengguna dapat melihat nilai baseline sebelum
  mengisi override.

## [1.26.0] - 2026-06-10

### Ditambahkan
- Mekanisme pergantian kategori biaya secara masal di halaman Biaya Operasional
  dan Biaya Non-Operasional. Pengguna dapat memilih satu atau lebih entri via
  checkbox (per-baris maupun se-kategori sekaligus dengan state indeterminate),
  lalu menggunakan action bar yang muncul di bagian atas untuk memindahkan
  semua entri terpilih ke kategori tujuan lewat dialog konfirmasi.
- Workflow GitHub Actions `release.yml` untuk membuat GitHub Release otomatis
  setiap kali tag `v*.*.*` di-push.

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
