---
title: "IK Input Entri Pendapatan"
description: "Instruksi kerja bagi pengelola anggaran untuk mencatat pendapatan bernilai manual pada halaman Entri Pendapatan aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, pendapatan
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-c67d79bf"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08"]
---

# IK Input Entri Pendapatan

Instruksi Kerja Input Entri Pendapatan ini memandu Pengelola Anggaran mencatat pendapatan yang nilainya
dimasukkan secara manual pada halaman Entri Pendapatan aplikasi Budget YPII, seperti pendapatan jasa giro
atau pendapatan lain-lain. Entri di halaman ini muncul di tab Pendapatan pada simulasi, berdampingan
dengan pendapatan dari UP dan US.

## Tujuan

Menghasilkan daftar entri pendapatan manual yang lengkap dan terkategori dengan benar, sehingga simulasi
pendapatan organisasi menghitung komponen pendapatan non-otomatis secara akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Input Entri Pendapatan, pelaksana telah login sebagai pengguna
organisasi, kategori pendapatan bertipe Manual yang dibutuhkan telah tersedia (dikelola Admin), dan
rincian nominal pendapatan telah disiapkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Input Entri Pendapatan dijalankan pada aplikasi Budget YPII, halaman
**Entri Pendapatan**, oleh pelaksana dengan akses ke organisasi yang bersangkutan.

## Instruksi

### 1. Membuka halaman Entri Pendapatan

1. Buka halaman detail organisasi.
1. Klik kartu **Entri Pendapatan** di bagian navigasi fitur.

### 2. Menambah entri pendapatan

1. Klik tombol **+ Tambah Entri**.
1. Pilih **Kategori Pendapatan** dari daftar yang tersedia — hanya kategori bertipe **Manual** yang dapat dipilih.
1. Isi **No. Baris** — nomor urut dalam kategori.
1. Isi **Uraian** — deskripsi rincian pendapatan.
1. Isi **Dasar / Catatan Perhitungan** — cara menghitung nominal (opsional).
1. Isi **Nominal (Rp)** — nilai pendapatan.
1. Isi **Catatan** — catatan tambahan (opsional).
1. Klik **Simpan**.

### 3. Mengedit dan menghapus entri

1. Klik ikon pensil pada baris entri untuk mengedit, atau ikon tempat sampah untuk menghapus.
1. Konfirmasi pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Input Entri Pendapatan selesai, seluruh entri pendapatan manual tercatat di bawah
kategori yang tepat dan muncul di tab Pendapatan pada simulasi, berdampingan dengan pendapatan dari UP dan US.

!!! info

    Beberapa kategori pendapatan nilainya **tidak diinput di halaman ini** — nilainya dihitung otomatis
    dari entri biaya yang di-mapping sebagai *Direct Income*, dan kategori jenis ini tidak muncul di daftar
    pilihan form. Bila nilai otomatis tersebut perlu disesuaikan, gunakan halaman Override Direct Income.

## Troubleshooting

- **Kategori pendapatan yang dibutuhkan tidak muncul** — hanya kategori bertipe Manual yang dapat
  dipilih; kategori pendapatan dikelola oleh Admin, minta Admin menambahkannya lebih dulu.
- **Nilai pendapatan tidak dapat diubah di halaman ini** — kategori bertipe Direct Income dihitung
  otomatis dari entri biaya; sesuaikan melalui halaman Override Direct Income.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
