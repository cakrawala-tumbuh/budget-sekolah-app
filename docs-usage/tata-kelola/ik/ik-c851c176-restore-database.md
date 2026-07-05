---
title: "IK Memulihkan (Restore) Database"
description: "Instruksi kerja bagi Admin untuk memulihkan database aplikasi Budget YPII dari file backup .db melalui halaman Manajemen Database. Restore menggantikan seluruh data aktif secara permanen dan tidak dapat dibatalkan."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, admin, database
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-c851c176"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-56112c9a"]
---

# IK Memulihkan (Restore) Database

Instruksi Kerja Memulihkan (Restore) Database ini memandu Admin memulihkan database aplikasi
Budget YPII dari file backup `.db` melalui halaman Manajemen Database. Restore menggantikan seluruh
database aktif dengan isi file backup yang diunggah.

## Tujuan

Instruksi Kerja Memulihkan (Restore) Database bertujuan mengembalikan data aplikasi ke kondisi sesuai
file backup tertentu secara terkontrol, sehingga aplikasi dapat kembali beroperasi dengan data yang
dikehendaki.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Memulihkan (Restore) Database, pelaksana telah login sebagai
pengguna dengan peran Admin, telah menyiapkan file backup `.db` yang benar, dan telah mengunduh backup
data terkini sebagai cadangan bila hasil restore perlu dibatalkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Memulihkan (Restore) Database dijalankan pada aplikasi Budget YPII, halaman
**Database** di Panel Admin (`/admin/database`), oleh pelaksana dengan peran Admin, menggunakan file
database SQLite (`.db`) hasil fitur **Unduh Backup** aplikasi ini.

## Instruksi

### 1. Membuka halaman Manajemen Database

1. Klik bagian **Administrasi** di sidebar (menu ini hanya tampil bagi Admin).
1. Klik submenu **Database**.

Halaman Manajemen Database menampilkan dua kartu, yaitu **Backup Database** dan **Restore Database**.

### 2. Memulihkan database dari file backup

1. Pada kartu **Restore Database**, klik **Choose File** (atau area pilih file di browser Anda).
1. Pilih file backup `.db` yang telah Anda simpan sebelumnya.
1. Periksa nama dan ukuran file yang ditampilkan di bawah input.
1. Klik tombol **Restore Database**.
1. Baca pesan pada dialog konfirmasi dengan seksama, lalu klik **OK** untuk melanjutkan.
1. Tunggu hingga muncul pesan **"Database berhasil dipulihkan dari file backup"**.

!!! danger

    Setelah restore selesai, semua data yang ada sebelumnya akan hilang permanen dan digantikan oleh isi
    file backup. Operasi ini tidak dapat dibatalkan. Pastikan Anda telah mengunduh backup data terkini
    sebelum melakukan restore.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Memulihkan (Restore) Database selesai, seluruh data aplikasi telah tergantikan
oleh isi file backup dan muncul pesan konfirmasi keberhasilan pemulihan.

## Troubleshooting

- **File ditolak atau restore gagal** — hanya file database SQLite (`.db`) hasil fitur **Unduh Backup**
  aplikasi ini yang dapat digunakan; file dari aplikasi lain mungkin tidak kompatibel.
- **Ingin membatalkan hasil restore** — restore tidak dapat dibatalkan; lakukan restore ulang
  menggunakan file backup data terkini yang telah diunduh sebelumnya.

## Dokumen Terkait

- [SOP Pemeliharaan & Pemulihan Database](../sop/sop-56112c9a-pemeliharaan-pemulihan-database.md) — `SOP-56112c9a` (SOP induk)
