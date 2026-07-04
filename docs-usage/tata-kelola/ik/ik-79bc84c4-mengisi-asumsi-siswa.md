---
title: "IK Mengisi Asumsi Siswa"
description: "Instruksi kerja bagi pengelola anggaran unit untuk memasukkan sebaran siswa per kelas, ringkasan siswa & staf, serta override tarif UP/US pada organisasi tipe UNIT di aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, unit, siswa
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-79bc84c4"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "OTS-6f1cf35a"]
---

# IK Mengisi Asumsi Siswa

Instruksi Kerja Mengisi Asumsi Siswa ini memandu Pengelola Anggaran Unit memasukkan jumlah siswa dan
staf pada organisasi tipe UNIT di aplikasi Budget YPII. Data asumsi siswa menjadi dasar perhitungan
otomatis tarif Uang Pangkal (UP) dan Uang Sekolah (US) saat simulasi.

## Tujuan

Menghasilkan data jumlah siswa dan staf yang lengkap dan benar, sehingga kalkulasi otomatis tarif UP
dan US memakai pembagi jumlah siswa yang akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengisi Asumsi Siswa, pelaksana telah login sebagai pengguna
organisasi, bekerja pada organisasi bertipe **UNIT**, label kelas telah dikonfigurasi, dan data jumlah
siswa serta staf telah disiapkan. Fitur ini hanya tersedia untuk organisasi bertipe UNIT (sekolah
individual).

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengisi Asumsi Siswa dijalankan pada aplikasi Budget YPII, halaman **Asumsi Siswa** di
dalam organisasi tipe UNIT, oleh pelaksana dengan akses ke unit yang bersangkutan. Halaman terdiri
dari tiga kartu: Sebaran Siswa per Kelas, Ringkasan Siswa & Staf, dan Override Tarif UP / US.

## Instruksi

### 1. Membuka halaman Asumsi Siswa

1. Buka halaman detail organisasi UNIT.
1. Klik kartu **Asumsi Siswa** di bagian atas halaman.

### 2. Mengisi sebaran siswa per kelas

1. Pada kartu **Sebaran Siswa per Kelas**, masukkan jumlah siswa untuk setiap tingkat kelas.
1. Perhatikan total siswa yang dihitung otomatis di bagian bawah kartu.

Nama tingkat kelas mengikuti konfigurasi pada halaman Label Kelas.
{.is-tip}

### 3. Mengisi ringkasan siswa & staf

1. Isi **Jumlah Siswa Baru** — siswa yang baru masuk di tahun ajaran ini; nilai ini menjadi pembagi
   tarif UP.
1. Isi **Jumlah Siswa Lama** — siswa yang melanjutkan dari tahun sebelumnya.
1. Isi **Jumlah Guru / Karyawan** — jumlah total staf di unit tersebut.

### 4. Mengisi override tarif UP / US (opsional)

1. Kosongkan kedua bidang override agar tarif dihitung otomatis dari komponen biaya.
1. Isi **Override Tarif UP** dengan nominal (Rp) bila ingin memakai tarif UP tetap.
1. Isi **Override Tarif US** dengan nominal (Rp/siswa/bulan) bila ingin memakai tarif US tetap.

Bila override diisi, tarif yang dipakai dalam simulasi adalah nilai override tersebut, tanpa penambahan
komponen depresiasi. Kosongkan kembali bidang override untuk kembali ke kalkulasi otomatis.
{.is-warning}

### 5. Menyimpan data asumsi

1. Setelah seluruh data terisi, klik tombol **Simpan**.
1. Pastikan pesan konfirmasi muncul sebagai tanda data berhasil disimpan.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengisi Asumsi Siswa selesai, jumlah siswa per kelas, ringkasan siswa & staf,
serta setelan override (bila diisi) tersimpan, dan kalkulasi tarif UP/US pada simulasi memakai data
tersebut.

## Troubleshooting

- **Kartu Asumsi Siswa tidak muncul** — fitur ini hanya tersedia pada organisasi bertipe UNIT.
- **Tarif hasil kalkulasi tidak sesuai harapan** — periksa apakah bidang override terisi; mekanisme
  perhitungan tarif otomatis dijelaskan pada Otomasi Sistem Kalkulasi Tarif UP/US `OTS-6f1cf35a`.
- **Data tidak dapat disimpan** — organisasi kemungkinan sudah dikunci; buka kunci budget lebih dulu
  sesuai kewenangan.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [OTS Kalkulasi Tarif UP/US](../ots/ots-6f1cf35a-kalkulasi-tarif-up-us.md) — `OTS-6f1cf35a`
