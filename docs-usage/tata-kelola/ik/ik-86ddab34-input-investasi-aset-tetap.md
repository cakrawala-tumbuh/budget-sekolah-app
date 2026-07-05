---
title: "IK Input Investasi Aset Tetap"
description: "Instruksi kerja bagi pengelola anggaran untuk mencatat rencana pembelian aset tetap baru beserta perhitungan depresiasi otomatis pada halaman Investasi aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, investasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-86ddab34"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "OTS-9c82d229"]
---

# IK Input Investasi Aset Tetap

Instruksi Kerja Input Investasi Aset Tetap ini memandu Pengelola Anggaran mencatat rencana pembelian
aset tetap baru pada tahun anggaran berjalan di halaman Investasi aplikasi Budget YPII. Aplikasi
menghitung depresiasi tahun berjalan secara otomatis berdasarkan harga perolehan, umur ekonomis, dan
bulan mulai penggunaan, dan depresiasi aset baru ini masuk sebagai komponen Uang Pangkal (UP) dalam
simulasi.

## Tujuan

Menghasilkan daftar aset tetap baru yang terencana lengkap dengan kalkulasi depresiasi tahun berjalan
yang akurat, sehingga komponen UP dalam simulasi tarif menghitung beban penyusutan aset baru dengan benar.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Input Investasi Aset Tetap, pelaksana telah login sebagai pengguna
organisasi, kategori aset yang dibutuhkan telah tersedia (dikelola Admin), serta data harga perolehan,
umur ekonomis, dan bulan mulai pakai tiap aset telah disiapkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Input Investasi Aset Tetap dijalankan pada aplikasi Budget YPII, halaman
**Investasi**, oleh pelaksana dengan akses ke organisasi yang bersangkutan.

## Instruksi

### 1. Membuka halaman Investasi

1. Buka halaman detail organisasi.
1. Klik kartu **Investasi** di bagian navigasi fitur.

### 2. Menambah aset tetap

1. Klik tombol **+ Tambah Aset**.
1. Pilih **Kategori Aset** dari daftar kategori yang tersedia (mis. Peralatan Kantor, Kendaraan).
1. Isi **Kode Aset** — kode unik aset (opsional, contoh: KT-001).
1. Isi **Nama Aset** — nama deskriptif aset.
1. Isi **Harga Perolehan (Rp)** — harga beli aset.
1. Isi **Dana BoS (Rp)** — porsi dari dana BOS/BOP (isi 0 bila tidak ada).
1. Isi **Umur Ekonomis (tahun)** — jumlah tahun penyusutan; nilai default diambil dari kategori aset.
1. Isi **Bulan Mulai Pakai** — bulan aset mulai digunakan; mempengaruhi besarnya depresiasi tahun berjalan.
1. Klik **Simpan**.

### 3. Mengedit dan menghapus aset

1. Klik ikon pensil pada baris aset untuk mengedit, atau ikon tempat sampah untuk menghapus.
1. Konfirmasi pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Input Investasi Aset Tetap selesai, seluruh aset baru tercatat beserta kolom
kalkulasi Dep/Tahun, Dep Th Ini (proporsional sejak bulan mulai), dan Nilai Akhir. Depresiasi aset baru
ikut menaikkan tarif Uang Pangkal dalam simulasi.

!!! tip

    Depresiasi tahun berjalan dihitung otomatis sebagai `(Harga Beli / Umur Ekonomis) × (13 - Bulan Mulai) / 12`.
    Contoh: aset seharga Rp 12.000.000 dengan umur 4 tahun mulai Juli (bulan 7) → Dep. tahun ini =
    (12.000.000 / 4) × (13 - 7) / 12 = **Rp 1.500.000**. Rincian mekanisme kalkulasi lihat Otomasi Sistem
    Kalkulasi Depresiasi Proporsional (`OTS-9c82d229`).

## Troubleshooting

- **Kategori aset yang dibutuhkan tidak muncul** — kategori aset dikelola oleh Admin; minta Admin
  menambahkannya lebih dulu.
- **Nilai Dep Th Ini terlihat tidak sesuai** — periksa isian umur ekonomis dan bulan mulai pakai;
  depresiasi dihitung proporsional dari bulan mulai sesuai `OTS-9c82d229`.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [OTS Kalkulasi Depresiasi Proporsional](../ots/ots-9c82d229-kalkulasi-depresiasi-proporsional.md) — `OTS-9c82d229`
