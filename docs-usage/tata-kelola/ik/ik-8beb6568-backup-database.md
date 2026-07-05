---
title: "IK Mengunduh Backup Database"
description: "Instruksi kerja bagi Admin untuk mengunduh salinan database aplikasi Budget YPII sebagai file .db melalui halaman Manajemen Database. File backup berisi seluruh data aplikasi dan bersifat rahasia."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, admin, database
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-8beb6568"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-56112c9a"]
---

# IK Mengunduh Backup Database

Instruksi Kerja Mengunduh Backup Database ini memandu Admin mengunduh salinan database aplikasi
Budget YPII sebagai file `.db` melalui halaman Manajemen Database. File backup berisi seluruh data
aplikasi dan menjadi titik pemulihan bila terjadi kesalahan data.

## Tujuan

Instruksi Kerja Mengunduh Backup Database bertujuan menghasilkan salinan database terkini yang aman
tersimpan, sehingga data aplikasi dapat dipulihkan bila terjadi kesalahan atau sebelum melakukan
perubahan data besar.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengunduh Backup Database, pelaksana telah login sebagai pengguna
dengan peran Admin, dan telah menyiapkan lokasi penyimpanan yang aman untuk menampung file backup.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengunduh Backup Database dijalankan pada aplikasi Budget YPII, halaman
**Database** di Panel Admin (`/admin/database`), oleh pelaksana dengan peran Admin.

## Instruksi

### 1. Membuka halaman Manajemen Database

1. Klik bagian **Administrasi** di sidebar (menu ini hanya tampil bagi Admin).
1. Klik submenu **Database**.

Halaman Manajemen Database menampilkan dua kartu, yaitu **Backup Database** dan **Restore Database**.

### 2. Mengunduh backup

1. Pada kartu **Backup Database**, klik tombol **Unduh Backup**.
1. Tunggu browser mengunduh file dengan nama seperti `backup_budget_20250611_103000.db`.
1. Simpan file tersebut di tempat yang aman.

!!! warning

    File backup berisi seluruh data termasuk kata sandi terenkripsi. Jangan bagikan file backup kepada
    pihak yang tidak berwenang.

Biasakan mengunduh backup secara rutin, terutama sebelum melakukan perubahan data yang besar seperti
reset database atau restore dari backup lama.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengunduh Backup Database selesai, tersedia satu file `.db` yang memuat seluruh
data aplikasi terkini dan tersimpan di lokasi aman sebagai titik pemulihan.

## Troubleshooting

- **File backup tidak terunduh** — periksa pengaturan unduhan browser dan pastikan tidak ada pemblokir
  pop-up yang menghalangi; ulangi klik **Unduh Backup**.
- **Tidak yakin file mana yang terbaru** — nama file backup memuat tanggal dan waktu pembuatan
  (format `backup_budget_YYYYMMDD_HHMMSS.db`); gunakan stempel waktu untuk mengenali versi terbaru.

## Dokumen Terkait

- [SOP Pemeliharaan & Pemulihan Database](../sop/sop-56112c9a-pemeliharaan-pemulihan-database.md) — `SOP-56112c9a` (SOP induk)
