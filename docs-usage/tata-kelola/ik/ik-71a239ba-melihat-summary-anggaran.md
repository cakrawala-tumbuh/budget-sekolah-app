---
title: "IK Melihat Summary Anggaran"
description: "Instruksi kerja bagi pengelola anggaran untuk membuka, membaca, dan mencetak ringkasan anggaran organisasi dalam format laporan pada halaman Summary aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, summary
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-71a239ba"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08"]
---

# IK Melihat Summary Anggaran

Instruksi Kerja Melihat Summary Anggaran ini memandu Pengelola Anggaran membuka, membaca, dan mencetak
ringkasan anggaran organisasi pada halaman Summary Anggaran aplikasi Budget YPII. Halaman ini menyajikan
pendapatan, biaya operasional, biaya non-operasional, dan depresiasi dalam format laporan terstruktur
yang siap dicetak atau diekspor.

## Tujuan

Menghasilkan laporan ringkasan anggaran organisasi yang terbaca dan dapat dicetak, sehingga posisi
pendapatan dan biaya dalam basis Kas dan Akrual dapat ditinjau dan didistribusikan.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Melihat Summary Anggaran, pelaksana telah login sebagai pengguna
organisasi, data anggaran telah dimasukkan, dan pelaksana memiliki akses ke organisasi yang
bersangkutan. Nilai saldo kas awal sebaiknya telah diperbarui karena dipakai sebagai dasar perhitungan
anggaran kas.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Melihat Summary Anggaran dijalankan pada aplikasi Budget YPII, halaman **Summary
Anggaran** (`/organizations/{id}/summary`), oleh pelaksana dengan akses ke organisasi yang
bersangkutan.

## Instruksi

### 1. Membuka halaman Summary Anggaran

1. Buka halaman detail organisasi.
1. Klik tombol **Summary** di bagian atas halaman.

### 2. Membaca tabel ringkasan anggaran

1. Amati tabel Summary dengan dua kolom nilai: **Kas** (nilai yang mempengaruhi arus kas nyata) dan
   **Akrual** (nilai akrual termasuk beban non-kas seperti depresiasi).
1. Telaah baris yang dikelompokkan per kelompok akun: Pendapatan Operasional, Pendapatan
   Non-Operasional, Biaya Operasional (per kode akun), Biaya Non-Operasional, dan Depresiasi.

### 3. Mencetak atau menyimpan Summary sebagai PDF

1. Klik tombol **Cetak** (ikon printer) di pojok kanan atas untuk membuka dialog cetak browser.
1. Untuk menyimpan sebagai PDF, pilih **Save as PDF** (atau **Simpan sebagai PDF**) sebagai printer
   pada dialog cetak.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Melihat Summary Anggaran selesai, pelaksana memperoleh ringkasan anggaran
organisasi dalam basis Kas dan Akrual yang telah ditinjau, serta salinan cetak atau PDF bila
diperlukan.

## Troubleshooting

- **Angka summary tampak tidak lengkap** — pastikan seluruh data anggaran (biaya, pendapatan,
  investasi, depresiasi) telah dimasukkan sebelum membaca summary.
- **Anggaran kas tampak tidak sesuai** — periksa nilai saldo kas & setara kas pada halaman detail
  organisasi, karena nilai tersebut menjadi dasar perhitungan anggaran kas.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
