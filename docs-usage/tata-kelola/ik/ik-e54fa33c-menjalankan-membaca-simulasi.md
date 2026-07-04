---
title: "IK Menjalankan & Membaca Simulasi Anggaran"
description: "Instruksi kerja bagi pengelola anggaran untuk membuka halaman simulasi, membaca ringkasan anggaran, dan menelaah tiap tab simulasi UP, US, pendapatan, biaya, kontribusi, dan depresiasi pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, simulasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-e54fa33c"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "DT-b7d9cedd", "DT-80c8a72a", "OTS-6f1cf35a"]
---

# IK Menjalankan & Membaca Simulasi Anggaran

Instruksi Kerja Menjalankan & Membaca Simulasi Anggaran ini memandu Pengelola Anggaran membuka halaman
Simulasi Anggaran dan menelaah hasil kalkulasi otomatis tarif UP dan US beserta proyeksi pendapatan,
biaya, kontribusi, dan depresiasi pada aplikasi Budget YPII. Simulasi dihitung dari seluruh data yang
telah dimasukkan pada fitur-fitur anggaran organisasi.

## Tujuan

Menghasilkan pemahaman yang benar atas tarif UP/US, proyeksi pendapatan-biaya, dan posisi surplus/defisit
organisasi, sehingga hasil simulasi dapat diverifikasi sebelum anggaran difinalkan.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Menjalankan & Membaca Simulasi Anggaran, pelaksana telah login
sebagai pengguna organisasi, data anggaran (asumsi siswa, biaya, investasi, pendapatan, alokasi)
telah dimasukkan, dan pelaksana memiliki akses ke organisasi yang bersangkutan. Tab simulasi yang
tersedia berbeda menurut tipe organisasi.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Menjalankan & Membaca Simulasi Anggaran dijalankan pada aplikasi Budget YPII, halaman
**Simulasi Anggaran** (`/organizations/{id}/simulation`), oleh pelaksana dengan akses ke organisasi
yang bersangkutan.

## Instruksi

### 1. Membuka halaman Simulasi Anggaran

1. Buka halaman detail organisasi.
1. Klik tombol **Lihat Simulasi** di pojok kanan atas.

### 2. Membaca kartu ringkasan anggaran

1. Amati kartu ringkasan di bagian atas halaman.
1. Baca **Total Pendapatan**, **Total Biaya**, **Total Depresiasi**, dan **Surplus / Defisit** sebagai
   gambaran posisi anggaran organisasi.

### 3. Menelaah tab Uang Pangkal dan Uang Sekolah (khusus UNIT)

1. Buka tab **Uang Pangkal** untuk membaca jumlah siswa baru sebagai pembagi, tarif UP otomatis, tarif
   UP override (bila diisi), dan tabel komponen biaya UP beserta kolom Tarif / Siswa Baru.
1. Buka tab **Uang Sekolah** untuk membaca total siswa sebagai pembagi, tarif US otomatis, tarif US
   override (bila diisi), dan tabel komponen biaya US beserta kolom Tarif / Siswa / Bln.
1. Bila terdapat alokasi dari induk, perhatikan seksi **Alokasi Biaya Cabang** (latar kuning) dan
   **Alokasi Biaya Pusat** (latar biru muda) beserta total dan tarif per siswa pada baris heading.

Bila tarif UP/US override ditampilkan (warna biru), unit memakai tarif tetap, bukan hasil kalkulasi,
dan tarif tersebut tidak ditambahkan komponen depresiasi. Ketersediaan tab menurut tipe organisasi
dijelaskan pada Decision Table Ketersediaan Tipe Simulasi `DT-80c8a72a`; mekanisme perhitungan tarif
pada Otomasi Sistem Kalkulasi Tarif UP/US `OTS-6f1cf35a`.
{.is-tip}

### 4. Menelaah tab pendapatan, BoS, dan direct income

1. Buka tab **Pendapatan** untuk membandingkan proyeksi versi Otomatis dan versi Override Unit.
1. Buka tab **Detail BoS** (khusus UNIT) untuk membaca rincian dana BoS per komponen biaya operasional
   dan komponen investasi, hingga Total Pendapatan BoS.
1. Buka tab **Direct Income** (khusus UNIT) untuk membaca biaya yang dicatat sebagai pendapatan,
   dikelompokkan per kategori pendapatan, dengan kolom Otomatis dan Final.

### 5. Menelaah tab biaya, kontribusi, dan depresiasi

1. Buka tab **Biaya** untuk melihat seluruh entri biaya operasional dan non-operasional beserta
   totalnya.
1. Buka tab **Kontribusi** (khusus CABANG & PUSAT) untuk membaca ringkasan kontribusi UP dan US dari
   unit-unit yang dinaungi.
1. Buka tab **Depresiasi** untuk membaca ringkasan beban depresiasi dari investasi baru maupun aset
   lama beserta keterangan sumbernya.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Menjalankan & Membaca Simulasi Anggaran selesai, pelaksana memperoleh tarif
UP/US, proyeksi pendapatan-biaya, kontribusi, dan depresiasi yang telah ditelaah per tab, serta dapat
memutuskan apakah data anggaran perlu diperbaiki atau sudah siap difinalkan.

## Troubleshooting

- **Tab yang diharapkan tidak muncul** — ketersediaan tab bergantung pada tipe organisasi; lihat
  Decision Table Ketersediaan Tipe Simulasi `DT-80c8a72a`.
- **Komponen biaya masuk ke tarif yang tidak diharapkan** — klasifikasi komponen ke UP atau US
  mengikuti flag kategori; lihat Decision Table Klasifikasi Komponen Biaya `DT-b7d9cedd`.
- **Tarif otomatis tidak sesuai perkiraan** — periksa data asumsi siswa dan override; mekanisme
  perhitungan dijelaskan pada Otomasi Sistem Kalkulasi Tarif UP/US `OTS-6f1cf35a`.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [DT Klasifikasi Komponen Biaya](../dt/dt-b7d9cedd-klasifikasi-komponen-biaya.md) — `DT-b7d9cedd`
- [DT Ketersediaan Tipe Simulasi](../dt/dt-80c8a72a-ketersediaan-tipe-simulasi.md) — `DT-80c8a72a`
- [OTS Kalkulasi Tarif UP/US](../ots/ots-6f1cf35a-kalkulasi-tarif-up-us.md) — `OTS-6f1cf35a`
