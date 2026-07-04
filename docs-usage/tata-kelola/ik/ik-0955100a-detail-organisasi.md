---
title: "IK Melihat & Mengedit Detail Organisasi"
description: "Instruksi kerja bagi pengelola anggaran untuk membuka daftar organisasi, melihat detail, mengedit data dasar, serta memperbarui saldo kas & setara kas organisasi pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, organisasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-0955100a"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08"]
---

# IK Melihat & Mengedit Detail Organisasi

Instruksi Kerja Melihat & Mengedit Detail Organisasi ini memandu Pengelola Anggaran membuka daftar
organisasi, mencari organisasi, membuka halaman detail, mengedit data dasar organisasi, serta
memperbarui saldo kas & setara kas pada aplikasi Budget YPII. Halaman Organisasi adalah titik masuk
utama menuju seluruh fitur input anggaran, simulasi, dan summary.

## Tujuan

Menghasilkan data dasar organisasi yang akurat dan mutakhir, sehingga navigasi ke fitur anggaran,
simulasi tarif, dan perhitungan anggaran kas pada halaman Summary berjalan dengan referensi yang benar.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Melihat & Mengedit Detail Organisasi, pelaksana telah login
sebagai pengguna aplikasi, memiliki akses ke organisasi yang bersangkutan, dan menyiapkan data yang
akan diperbarui (nama, kota, atau nilai saldo kas awal). Pengeditan nama dan kota organisasi hanya
dapat dilakukan oleh pengguna dengan peran Admin, sedangkan pembaruan saldo kas dilakukan oleh
pengguna organisasi.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Melihat & Mengedit Detail Organisasi dijalankan pada aplikasi Budget YPII, halaman
**Organisasi** dan halaman detail organisasi (`/organizations/{id}`), oleh pelaksana dengan akses ke
organisasi yang bersangkutan.

## Instruksi

### 1. Membuka halaman Organisasi

1. Login ke aplikasi; setelah login pelaksana langsung diarahkan ke halaman **Organisasi**.
1. Bila berada di halaman lain, klik menu **Organisasi** di sidebar untuk kembali.

### 2. Mencari dan membuka detail organisasi

1. Amati kartu-kartu organisasi yang menampilkan nama, kode, tipe (UNIT, CABANG, atau PUSAT), kota,
   jumlah unit di bawahnya, serta badge **Terkunci** bila budget sudah dikunci.
1. Gunakan kolom pencarian di bagian atas untuk menyaring organisasi berdasarkan nama, kode, atau kota.
1. Klik kartu organisasi untuk masuk ke halaman detail dan mengakses navigasi fitur, tombol
   **Summary**, serta tombol **Lihat Simulasi**.

### 3. Mengedit data dasar organisasi

1. Buka halaman detail organisasi.
1. Klik tombol **Edit** di pojok kanan atas.
1. Ubah nama dan/atau kota organisasi sesuai kebutuhan.
1. Klik **Simpan Perubahan**.

Kode organisasi tidak dapat diubah setelah dibuat. Bila kode perlu dikoreksi, hubungi Admin.
{.is-info}

### 4. Memperbarui saldo kas & setara kas

1. Buka halaman detail organisasi.
1. Pada kartu **Informasi Organisasi**, klik ikon pensil di sebelah nilai **Saldo Kas & Setara Kas**.
1. Masukkan nilai saldo kas awal yang baru.
1. Klik **Simpan Perubahan**.

Saldo kas digunakan sebagai dasar perhitungan anggaran kas pada halaman Summary.
{.is-info}

## Hasil yang Diharapkan

Setelah Instruksi Kerja Melihat & Mengedit Detail Organisasi selesai, data dasar organisasi dan nilai
saldo kas awal tersimpan dengan benar, dan pelaksana dapat menavigasi ke seluruh fitur anggaran,
simulasi, serta summary organisasi tersebut.

## Troubleshooting

- **Tombol Edit tidak muncul** — pengeditan nama dan kota hanya tersedia bagi pengguna dengan peran
  Admin; hubungi Admin bila perubahan diperlukan.
- **Tombol Edit dan edit saldo kas tersembunyi** — organisasi kemungkinan sudah dikunci; buka kunci
  budget lebih dulu sesuai kewenangan sebelum mengedit.
- **Kode organisasi perlu dikoreksi** — kode tidak dapat diubah setelah dibuat; hubungi Admin.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
