---
title: "IK Mengelola Kategori Biaya"
description: "Instruksi kerja bagi Admin untuk menambah, mengedit, dan menghapus kategori biaya operasional maupun non-operasional pada Panel Admin aplikasi Budget YPII. Kategori biaya menjadi acuan pengelompokan entri biaya dan klasifikasi komponen tarif UP/US."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, admin, kategori
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-5a258878"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-955c5e4b", "DT-b7d9cedd"]
---

# IK Mengelola Kategori Biaya

Instruksi Kerja Mengelola Kategori Biaya ini memandu Admin menambah, mengedit, dan menghapus kategori
biaya operasional maupun non-operasional pada halaman Kategori Biaya di Panel Admin aplikasi
Budget YPII. Kategori biaya yang dikelola di sini menjadi acuan pengelompokan entri biaya dan penentu
klasifikasi komponen tarif Uang Pangkal (UP) dan Uang Sekolah (US).

## Tujuan

Instruksi Kerja Mengelola Kategori Biaya bertujuan menjaga daftar kategori biaya tetap lengkap,
konsisten, dan terklasifikasi dengan benar, sehingga entri biaya operasional dapat dikelompokkan tepat
dan simulasi tarif UP/US menghitung komponen biaya secara akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengelola Kategori Biaya, pelaksana telah login sebagai pengguna
dengan peran Admin, dan kode akun serta klasifikasi kategori (operasional, komponen UP, direct income)
telah disepakati bersama Bidang Keuangan Pusat.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengelola Kategori Biaya dijalankan pada aplikasi Budget YPII, halaman
**Kategori Biaya** di Panel Admin (`/admin/expense-categories`), oleh pelaksana dengan peran Admin.

## Instruksi

### 1. Membuka halaman Kategori Biaya

1. Klik bagian **Administrasi** di sidebar (menu ini hanya tampil bagi Admin).
1. Klik submenu **Kategori Biaya**.

Halaman Kategori Biaya menampilkan daftar kategori dalam bentuk tabel. Setiap baris memuat kolom
berikut.

| Kolom | Keterangan |
|---|---|
| **Kode Akun** | Kode akun biaya (misal: `5130.01`) |
| **Label** | Nama kategori |
| **Operasional** | Apakah kategori ini bersifat operasional |
| **Komp. UP** | Apakah masuk komponen perhitungan tarif UP |
| **Direct Inc.** | Apakah biaya ini otomatis menjadi pendapatan |
| **Mapping Pendapatan** | Kode akun pendapatan tujuan (jika Direct Income aktif) |
| **Peran Kontribusi** | Peran dalam alokasi kontribusi antar organisasi |

### 2. Menambah kategori biaya

1. Klik tombol **+ Tambah**.
1. Isi **Kode Akun** — kode akun biaya (misal: `5130.01`).
1. Isi **Label** — nama kategori (misal: Pengembangan Guru).
1. Isi **Peran Kontribusi** — isi bila kategori ini berperan dalam kontribusi antar organisasi (misal:
   `up_to_pusat`); kosongkan bila tidak relevan.
1. Centang **Flag** yang sesuai: **Operasional** untuk biaya operasional rutin, **Komponen UP** bila
   masuk komponen perhitungan tarif Uang Pangkal, dan **Direct Income** bila biaya ini secara langsung
   menghasilkan pendapatan.
1. Isi **Mapping ke Kategori Pendapatan** — field ini muncul hanya bila **Direct Income** dicentang;
   pilih satu kategori pendapatan tujuan. Nilai realisasi biaya ini akan otomatis dihitung sebagai
   pendapatan pada kategori yang dipilih saat simulasi dijalankan.
1. Isi **Urutan** — angka urutan tampil di halaman input biaya.
1. Klik **Simpan**.

> Bila sebuah kategori biaya ditandai **Direct Income** dan di-mapping ke kategori pendapatan tertentu,
> sistem akan otomatis menjumlahkan nilai entri biaya tersebut sebagai pendapatan tanpa perlu input
> manual di halaman Entri Pendapatan. Satu kategori biaya hanya bisa di-mapping ke **satu** kategori
> pendapatan. {.is-info}

### 3. Mengedit kategori biaya

1. Klik ikon pensil pada baris kategori yang ingin diubah.
1. Ubah data pada form yang muncul, termasuk flag klasifikasi bila perlu.
1. Klik **Simpan**.

### 4. Menghapus kategori biaya

1. Klik ikon tempat sampah pada baris kategori yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

> Menghapus kategori biaya yang sudah memiliki entri akan menyebabkan entri tersebut kehilangan
> referensi. Sebaiknya jangan hapus kategori yang sudah digunakan. {.is-danger}

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengelola Kategori Biaya selesai, daftar kategori biaya mencerminkan struktur
akun yang berlaku, dengan flag klasifikasi (operasional, komponen UP, direct income) yang tepat
sehingga tersedia bagi pengelola anggaran saat menginput biaya operasional.

## Troubleshooting

- **Field Mapping ke Kategori Pendapatan tidak muncul** — field ini hanya tampil setelah flag
  **Direct Income** dicentang; centang flag tersebut lebih dulu.
- **Ragu apakah kategori masuk komponen UP atau US** — kategori dengan flag Komponen UP masuk tarif
  Uang Pangkal, selain itu masuk komponen Uang Sekolah; rujuk Decision Table Klasifikasi Komponen
  Biaya `DT-b7d9cedd`.

## Dokumen Terkait

- [SOP Persiapan Tahun Anggaran Baru](../sop/sop-955c5e4b-persiapan-tahun-anggaran-baru.md) — `SOP-955c5e4b` (SOP induk)
- [DT Klasifikasi Komponen Biaya](../dt/dt-b7d9cedd-klasifikasi-komponen-biaya.md) — `DT-b7d9cedd`
