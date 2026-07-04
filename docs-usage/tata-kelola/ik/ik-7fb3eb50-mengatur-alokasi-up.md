---
title: "IK Mengatur Alokasi UP"
description: "Instruksi kerja bagi Pengelola Anggaran Cabang/Pusat untuk menambah, mengedit, dan menghapus alokasi komponen biaya UP ke unit-unit yang dinaungi, termasuk mekanisme proporsi otomatis dan override berbasis jumlah siswa baru pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, cabang-pusat, alokasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-7fb3eb50"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-a8608e7a", "SOP-3ded94ef", "DT-e80fe01d"]
---

# IK Mengatur Alokasi UP

Instruksi Kerja Mengatur Alokasi UP ini memandu Pengelola Anggaran Cabang/Pusat mendistribusikan
komponen biaya Uang Pangkal (UP) dari organisasi CABANG atau PUSAT ke unit-unit yang dinaungi pada
halaman Alokasi UP aplikasi Budget YPII. Komponen yang dialokasikan akan menaikkan tarif Uang Pangkal
di sisi unit penerima.

## Tujuan

Menghasilkan distribusi komponen biaya UP dari Cabang/Pusat ke setiap unit penerima dengan proporsi
yang benar, sehingga simulasi tarif Uang Pangkal unit memperhitungkan alokasi biaya secara akurat dan
total distribusi selalu genap 100%.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengatur Alokasi UP, pelaksana telah login sebagai pengguna
organisasi bertipe CABANG atau PUSAT, komponen biaya yang akan dialokasikan telah tercatat di
organisasi tersebut, dan jumlah siswa baru tiap unit telah tersedia sebagai dasar proporsi otomatis.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengatur Alokasi UP dijalankan pada aplikasi Budget YPII, halaman **Alokasi UP**
(`/organizations/{id}/alokasi-up`), oleh Pengelola Anggaran Cabang/Pusat dengan akses ke organisasi
CABANG atau PUSAT yang bersangkutan. Fitur ini hanya tersedia untuk organisasi bertipe CABANG dan
PUSAT.

## Instruksi

### 1. Membuka halaman Alokasi UP

Langkah membuka halaman Alokasi UP dimulai dari halaman detail organisasi.

1. Buka halaman detail organisasi CABANG atau PUSAT.
1. Klik kartu **Alokasi UP** di bagian navigasi fitur.

### 2. Memahami tabel alokasi

Tabel alokasi menampilkan satu baris per unit penerima. Kolom-kolom yang ditampilkan pada tabel
Alokasi UP diuraikan berikut ini.

| Kolom | Keterangan |
|---|---|
| **Unit** | Nama dan kode organisasi unit penerima |
| **Komponen Biaya** | Daftar komponen biaya dari Cabang/Pusat yang dialokasikan |
| **Nominal** | Nilai nominal yang dialokasikan ke unit tersebut |
| **Proporsi Otomatis** | Proporsi yang dihitung otomatis dari sisa porsi setelah dikurangi total semua override, berdasarkan jumlah siswa baru unit |
| **Override (%)** | Persentase distribusi yang diatur manual, menggantikan proporsi otomatis bila diisi |
| **Persentase Final** | Persentase yang benar-benar digunakan — menampilkan Override bila diisi, atau Proporsi Otomatis bila tidak |

Di bagian bawah tabel **Proporsi per Unit** terdapat baris **Total** yang menjumlahkan seluruh kolom
Persentase Final. Total ini selalu 100% karena sistem membaginya dengan dua aturan: unit yang memiliki
Override memakai nilai override secara langsung, sedangkan unit tanpa Override mendapat bagian dari
sisa (100% dikurangi total semua override) yang dibagi proporsional berdasarkan jumlah siswa baru unit
dibanding unit lain yang juga tanpa override.

> **Contoh perhitungan Alokasi UP:** Tiga unit dengan siswa baru — A (override 40%), B (100 siswa,
> tanpa override), C (300 siswa, tanpa override). Sisa = 100% − 40% = 60%, total siswa auto = 400. B
> mendapat 60% × 100/400 = 15%, C mendapat 60% × 300/400 = 45%. Total: 40% + 15% + 45% = 100%.
{.is-info}

### 3. Menambah alokasi UP

Penambahan alokasi UP menentukan komponen biaya Cabang/Pusat yang masuk ke perhitungan tarif Uang
Pangkal unit.

1. Klik tombol **+ Tambah Alokasi**.
1. Pilih **unit penerima** dari daftar unit yang dinaungi.
1. Pilih **kategori biaya** yang dialokasikan.
1. Isi **Nominal (Rp)** yang dialokasikan ke unit tersebut.
1. Isi **Override (%)** bila ingin menentukan proporsi distribusi unit ini secara manual (opsional);
   unit lain yang tidak diisi override akan mendapat bagian dari sisa porsi secara otomatis.
1. Klik **Simpan**.

### 4. Mengedit alokasi UP

Pengeditan alokasi UP dilakukan pada entri yang sudah tercatat.

1. Klik entri alokasi yang ingin diubah pada tabel.
1. Ubah data pada dialog yang muncul, termasuk nominal atau nilai override bila perlu.
1. Klik **Simpan**.

### 5. Menghapus alokasi UP

Penghapusan alokasi UP mengeluarkan komponen biaya dari distribusi ke unit.

1. Klik ikon tempat sampah pada baris alokasi yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengatur Alokasi UP selesai, komponen biaya yang dialokasikan muncul di
halaman simulasi Uang Pangkal setiap unit penerima sebagai "Alokasi biaya dari Cabang" atau "Alokasi
biaya dari Pusat", dengan total Persentase Final di seluruh unit tetap 100%.

## Troubleshooting

- **Total Persentase Final tidak sesuai harapan** — periksa unit yang mengisi Override; sisa porsi
  (100% dikurangi total override) dibagi proporsional ke unit tanpa override berdasarkan jumlah siswa
  baru.
- **Alokasi tidak muncul di simulasi unit** — pastikan alokasi telah tersimpan; komponen yang
  dialokasikan baru tampil di simulasi UP unit penerima setelah entri disimpan.
- **Tarif kontribusi antar-jenjang tidak sesuai** — nilai default kontribusi UP/US ke Pusat dan
  Cabang mengikuti Decision Table Tarif Kontribusi Default `DT-e80fe01d`.

## Dokumen Terkait

- [SOP Evaluasi dan Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi dan Konsolidasi Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
- [DT Tarif Kontribusi Default](../dt/dt-e80fe01d-tarif-kontribusi-default.md) — `DT-e80fe01d`
