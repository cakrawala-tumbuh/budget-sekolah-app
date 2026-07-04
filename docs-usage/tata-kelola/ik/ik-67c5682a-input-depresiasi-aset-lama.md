---
title: "IK Input Depresiasi Aset Lama"
description: "Instruksi kerja bagi pengelola anggaran untuk mencatat beban depresiasi aset tetap lama secara manual pada halaman Depresiasi Aset Lama aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, depresiasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-67c5682a"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "OTS-9c82d229"]
---

# IK Input Depresiasi Aset Lama

Instruksi Kerja Input Depresiasi Aset Lama ini memandu Pengelola Anggaran mencatat beban depresiasi aset
tetap yang sudah dimiliki sebelum tahun anggaran berjalan pada halaman Depresiasi Aset Lama aplikasi
Budget YPII. Berbeda dengan halaman Investasi yang menangani aset baru dengan depresiasi otomatis, di
halaman ini nilai depresiasi aset lama diisi secara manual.

## Tujuan

Menghasilkan daftar aset lama beserta beban depresiasi tahun berjalan yang tercatat manual, sehingga
komponen depresiasi aset lama tampil terpisah dalam simulasi dan dapat dialokasikan sesuai konfigurasi.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Input Depresiasi Aset Lama, pelaksana telah login sebagai pengguna
organisasi, kategori aset yang dibutuhkan telah tersedia (dikelola Admin), serta nilai buku awal dan
beban depresiasi tahun berjalan tiap aset telah dihitung dan disiapkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Input Depresiasi Aset Lama dijalankan pada aplikasi Budget YPII, halaman
**Depresiasi Aset Lama**, oleh pelaksana dengan akses ke organisasi yang bersangkutan.

## Instruksi

### 1. Membuka halaman Depresiasi Aset Lama

1. Buka halaman detail organisasi.
1. Klik kartu **Depresiasi Aset Lama** di bagian navigasi fitur.

### 2. Menambah aset lama

1. Klik tombol **+ Tambah Aset Lama**.
1. Pilih **Kategori Aset** dari daftar kategori yang tersedia.
1. Isi **Kode Aset** — kode unik aset (opsional).
1. Isi **Nama Aset** — nama deskriptif aset.
1. Isi **Nilai Buku Awal (Rp)** — nilai buku aset di awal tahun anggaran ini.
1. Isi **Depresiasi Tahun Ini (Rp)** — beban depresiasi yang dialokasikan untuk tahun ini.
1. Klik **Simpan**.

### 3. Mengedit dan menghapus aset

1. Klik ikon pensil pada baris aset untuk mengedit, atau ikon tempat sampah untuk menghapus.
1. Konfirmasi pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Input Depresiasi Aset Lama selesai, seluruh aset lama tercatat beserta Nilai Buku
Awal, Dep Th Ini, dan Nilai Buku Akhir. Nilai depresiasi aset lama muncul sebagai komponen terpisah di
tab Depresiasi pada simulasi dan dapat dialokasikan ke komponen UP sesuai konfigurasi alokasi Cabang/Pusat.

> Halaman Investasi menangani aset yang baru dibeli tahun ini dengan depresiasi dihitung otomatis (lihat
> `OTS-9c82d229`). Halaman Depresiasi Aset Lama menangani aset lama, dan nilai depresiasinya diisi secara
> manual.
{.is-info}

## Troubleshooting

- **Kategori aset yang dibutuhkan tidak muncul** — kategori aset dikelola oleh Admin; minta Admin
  menambahkannya lebih dulu.
- **Aset baru salah dimasukkan di sini** — aset yang baru dibeli tahun berjalan dicatat pada halaman
  Investasi agar depresiasinya dihitung otomatis; halaman ini khusus aset lama.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [OTS Kalkulasi Depresiasi Proporsional](../ots/ots-9c82d229-kalkulasi-depresiasi-proporsional.md) — `OTS-9c82d229`
