---
title: "IK Mengelola Kategori Pendapatan"
description: "Instruksi kerja bagi Admin untuk menambah, mengedit, dan menghapus kategori pendapatan pada Panel Admin aplikasi Budget YPII. Kategori pendapatan menjadi acuan pengelompokan entri pendapatan dan metode kalkulasinya saat simulasi dijalankan."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, admin, kategori
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-875b31a7"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-955c5e4b"]
---

# IK Mengelola Kategori Pendapatan

Instruksi Kerja Mengelola Kategori Pendapatan ini memandu Admin menambah, mengedit, dan menghapus
kategori pendapatan pada halaman Kategori Pendapatan di Panel Admin aplikasi Budget YPII. Kategori
pendapatan yang dikelola di sini menjadi acuan pengelompokan entri pendapatan serta menentukan metode
kalkulasi nilainya saat simulasi dijalankan.

## Tujuan

Instruksi Kerja Mengelola Kategori Pendapatan bertujuan menjaga daftar kategori pendapatan tetap
lengkap dan konsisten dengan metode kalkulasi yang tepat, sehingga entri pendapatan terkelompok benar
dan proyeksi pendapatan pada simulasi anggaran akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengelola Kategori Pendapatan, pelaksana telah login sebagai
pengguna dengan peran Admin, dan kode akun pendapatan beserta metode kalkulasi yang berlaku telah
disepakati bersama Bidang Keuangan Pusat.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengelola Kategori Pendapatan dijalankan pada aplikasi Budget YPII, halaman
**Kategori Pendapatan** di Panel Admin (`/admin/income-categories`), oleh pelaksana dengan peran Admin.

## Instruksi

### 1. Membuka halaman Kategori Pendapatan

1. Klik bagian **Administrasi** di sidebar (menu ini hanya tampil bagi Admin).
1. Klik submenu **Kategori Pendapatan**.

Halaman Kategori Pendapatan menampilkan daftar kategori dalam bentuk tabel. Setiap baris memuat kolom
berikut.

| Kolom | Keterangan |
|---|---|
| **Kode Akun** | Kode akun pendapatan |
| **Label** | Nama kategori pendapatan |
| **Metode Kalkulasi** | Cara sistem menghitung nilai pendapatan kategori ini |
| **Urutan** | Angka urutan tampil di halaman input pendapatan |

### 2. Menambah kategori pendapatan

1. Klik tombol **+ Tambah**.
1. Isi **Kode Akun** — kode akun pendapatan tujuan.
1. Isi **Label** — nama kategori pendapatan.
1. Pilih **Metode Kalkulasi** — cara sistem menghitung nilai pendapatan kategori ini, misalnya
   `SUM_FROM_BOS` (jumlah dari kolom BOS pada entri biaya), `GRADE_BASED` (dihitung berdasar alokasi
   per tingkat/kelas), atau `MANUAL` (nilai diisi manual pada halaman Entri Pendapatan).
1. Isi **Urutan** — angka urutan tampil di halaman input pendapatan.
1. Klik **Simpan**.

!!! info

    Daftar metode kalkulasi yang tersedia dan perilakunya bergantung pada konfigurasi instance
    aplikasi. Verifikasi opsi yang muncul pada layar dan artinya bersama Bidang Keuangan Pusat sebelum
    menyimpan kategori baru.

### 3. Mengedit kategori pendapatan

1. Klik ikon pensil pada baris kategori yang ingin diubah.
1. Ubah data pada form yang muncul, termasuk metode kalkulasi bila perlu.
1. Klik **Simpan**.

### 4. Menghapus kategori pendapatan

1. Klik ikon tempat sampah pada baris kategori yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

!!! danger

    Menghapus kategori pendapatan yang sudah memiliki entri atau menjadi tujuan mapping direct income
    akan menyebabkan referensi terkait hilang. Sebaiknya jangan hapus kategori yang sudah digunakan.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengelola Kategori Pendapatan selesai, daftar kategori pendapatan mencerminkan
struktur akun yang berlaku beserta metode kalkulasi yang tepat, sehingga tersedia bagi pengelola
anggaran saat menginput pendapatan dan menghasilkan proyeksi yang akurat pada simulasi.

## Troubleshooting

- **Opsi metode kalkulasi tidak sesuai harapan** — pilihan metode bergantung pada konfigurasi
  instance; konfirmasikan opsi yang tersedia dan artinya kepada Bidang Keuangan Pusat.
- **Kategori tujuan direct income tidak dapat dihapus atau menimbulkan galat** — kategori yang menjadi
  tujuan mapping direct income dari kategori biaya masih dirujuk; lepaskan mapping tersebut lebih dulu
  di halaman Kategori Biaya.

## Dokumen Terkait

- [SOP Persiapan Tahun Anggaran Baru](../sop/sop-955c5e4b-persiapan-tahun-anggaran-baru.md) — `SOP-955c5e4b` (SOP induk)
