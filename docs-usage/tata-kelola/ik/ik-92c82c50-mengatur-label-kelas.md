---
title: "IK Mengatur Label Kelas"
description: "Instruksi kerja bagi pengelola anggaran unit untuk mengonfigurasi jumlah tingkat kelas dan nama label setiap tingkat pada organisasi tipe UNIT di aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, unit, kelas
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-92c82c50"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08"]
---

# IK Mengatur Label Kelas

Instruksi Kerja Mengatur Label Kelas ini memandu Pengelola Anggaran Unit mengonfigurasi jumlah tingkat
kelas dan nama label setiap tingkat pada organisasi tipe UNIT di aplikasi Budget YPII. Konfigurasi ini
menentukan nama tingkat kelas yang muncul di halaman Asumsi Siswa.

## Tujuan

Menghasilkan konfigurasi tingkat kelas yang sesuai dengan struktur satuan pendidikan, sehingga
pengisian sebaran siswa per kelas pada halaman Asumsi Siswa memakai label yang benar dan konsisten.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengatur Label Kelas, pelaksana telah login sebagai pengguna
organisasi, bekerja pada organisasi bertipe **UNIT**, dan mengetahui struktur tingkat kelas yang
berlaku di unit tersebut. Fitur ini hanya tersedia untuk organisasi bertipe UNIT.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengatur Label Kelas dijalankan pada aplikasi Budget YPII, halaman **Label Kelas** di
dalam organisasi tipe UNIT, oleh pelaksana dengan akses ke unit yang bersangkutan.

## Instruksi

### 1. Membuka halaman Label Kelas

1. Buka halaman detail organisasi UNIT.
1. Klik kartu **Label Kelas** di bagian atas halaman.

### 2. Mengonfigurasi jumlah dan nama label kelas

1. Pilih **Jumlah Tingkat** dari dropdown, misalnya 3 untuk SMP atau 6 untuk SD.
1. Isi nama label untuk setiap tingkat, misalnya "Kelas 7", "Kelas 8", "Kelas 9".
1. Klik **Simpan**.

Contoh konfigurasi tingkat kelas per jenjang:

!!! tip

    - SD: 6 tingkat → Kelas 1, Kelas 2, Kelas 3, Kelas 4, Kelas 5, Kelas 6
    - SMP: 3 tingkat → Kelas 7, Kelas 8, Kelas 9
    - SMA: 3 tingkat → Kelas 10, Kelas 11, Kelas 12

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengatur Label Kelas selesai, jumlah tingkat dan nama label kelas tersimpan,
dan label tersebut tampil sebagai baris input pada halaman Asumsi Siswa.

## Troubleshooting

- **Kartu Label Kelas tidak muncul** — fitur ini hanya tersedia pada organisasi bertipe UNIT;
  pastikan pelaksana bekerja pada organisasi UNIT, bukan CABANG atau PUSAT.
- **Perubahan label tidak dapat disimpan** — organisasi kemungkinan sudah dikunci; buka kunci budget
  lebih dulu sesuai kewenangan sebelum mengubah konfigurasi.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
