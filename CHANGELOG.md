# Changelog

Semua perubahan penting pada proyek ini didokumentasikan di berkas ini.

Format mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan proyek ini menganut [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

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
