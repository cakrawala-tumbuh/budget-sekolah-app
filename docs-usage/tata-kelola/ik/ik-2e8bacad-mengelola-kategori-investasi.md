---
title: "IK Mengelola Kategori Investasi"
description: "Instruksi kerja bagi Admin untuk menambah kategori investasi (aset tetap) beserta umur ekonomis default pada Panel Admin aplikasi Budget YPII. Umur ekonomis default menjadi acuan kalkulasi depresiasi investasi baru."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, admin, investasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-2e8bacad"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-955c5e4b", "OTS-9c82d229"]
---

# IK Mengelola Kategori Investasi

Instruksi Kerja Mengelola Kategori Investasi ini memandu Admin menambah kategori aset tetap beserta
umur ekonomis default pada halaman Kategori Investasi di Panel Admin aplikasi Budget YPII. Umur
ekonomis default per kategori menjadi acuan sistem saat menghitung depresiasi investasi baru pada
simulasi anggaran.

## Tujuan

Instruksi Kerja Mengelola Kategori Investasi bertujuan menjaga daftar kategori aset tetap tetap
lengkap dengan umur ekonomis default yang tepat, sehingga entri investasi dapat dikelompokkan benar
dan kalkulasi depresiasi proporsional menghasilkan nilai yang akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengelola Kategori Investasi, pelaksana telah login sebagai
pengguna dengan peran Admin, dan kode kategori, label, serta umur ekonomis default per kategori telah
disepakati bersama Bidang Keuangan Pusat.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengelola Kategori Investasi dijalankan pada aplikasi Budget YPII, halaman
**Kategori Investasi** di Panel Admin (`/admin/investment-categories`), oleh pelaksana dengan peran
Admin.

## Instruksi

### 1. Membuka halaman Kategori Investasi

1. Klik bagian **Administrasi** di sidebar (menu ini hanya tampil bagi Admin).
1. Klik submenu **Kategori Investasi**.

Halaman Kategori Investasi menampilkan kategori aset tetap beserta umur ekonomis default per kategori.

### 2. Menambah kategori investasi

1. Klik tombol **+ Tambah Kategori**.
1. Isi **Kode** — kode kategori investasi.
1. Isi **Label** — nama kategori aset tetap.
1. Isi **Umur Ekonomis Default (tahun)** — perkiraan masa manfaat aset dalam tahun, dipakai sebagai
   nilai awal saat menginput investasi pada kategori ini.
1. Klik **Simpan**.

### 3. Mengedit kategori investasi

1. Klik ikon pensil pada baris kategori yang ingin diubah.
1. Ubah kode, label, atau umur ekonomis default pada form yang muncul.
1. Klik **Simpan**.

### 4. Menghapus kategori investasi

1. Klik ikon tempat sampah pada baris kategori yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

!!! danger

    Menghapus kategori investasi yang sudah memiliki entri aset akan menyebabkan entri tersebut
    kehilangan referensi. Sebaiknya jangan hapus kategori yang sudah digunakan.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengelola Kategori Investasi selesai, daftar kategori aset tetap tersedia
lengkap dengan umur ekonomis default yang tepat, sehingga pengelola anggaran dapat menginput investasi
dan sistem menghitung depresiasi dengan basis umur ekonomis yang benar.

## Troubleshooting

- **Umur ekonomis default berbeda dari yang tampil saat input investasi** — nilai default hanya menjadi
  nilai awal; pengelola anggaran dapat menyesuaikan umur ekonomis per entri aset saat menginput.
- **Nilai depresiasi tidak sesuai harapan** — depresiasi dihitung proporsional terhadap umur ekonomis
  dan bulan mulai perolehan; rujuk Otomasi Sistem Kalkulasi Depresiasi Proporsional `OTS-9c82d229`.

## Dokumen Terkait

- [SOP Persiapan Tahun Anggaran Baru](../sop/sop-955c5e4b-persiapan-tahun-anggaran-baru.md) — `SOP-955c5e4b` (SOP induk)
- [OTS Kalkulasi Depresiasi Proporsional](../ots/ots-9c82d229-kalkulasi-depresiasi-proporsional.md) — `OTS-9c82d229`
