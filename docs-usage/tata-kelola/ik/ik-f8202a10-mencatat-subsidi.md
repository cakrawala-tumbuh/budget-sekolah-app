---
title: "IK Mencatat Subsidi ke Unit"
description: "Instruksi kerja bagi Pengelola Anggaran Pusat untuk mencatat, mengedit, dan menghapus subsidi ke unit yang tercatat sebagai beban di sisi pemberi dan pendapatan di sisi penerima pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, cabang-pusat, subsidi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-f8202a10"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-3ded94ef", "DT-e348eca6"]
---

# IK Mencatat Subsidi ke Unit

Instruksi Kerja Mencatat Subsidi ke Unit ini memandu Pengelola Anggaran Pusat mencatat subsidi yang
diberikan kepada unit tertentu pada halaman Subsidi ke Unit aplikasi Budget YPII. Setiap subsidi
tercatat ganda, yaitu sebagai beban di sisi pemberi dan pendapatan di sisi penerima.

## Tujuan

Menghasilkan catatan subsidi antar-organisasi yang benar dan seimbang, sehingga simulasi serta summary
pemberi mencatatnya sebagai beban dan simulasi serta summary unit penerima mencatatnya sebagai
pendapatan.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mencatat Subsidi ke Unit, pelaksana telah login sebagai pengguna
organisasi pemberi subsidi, kategori biaya di sisi pemberi dan kategori pendapatan di sisi penerima
telah tersedia, dan keputusan pemberian subsidi telah ditetapkan sebagai upaya terakhir setelah opsi
penanganan defisit lain dipertimbangkan.

!!! warning

    **Subsidi adalah upaya terakhir:** Pemberian subsidi ditempuh hanya setelah opsi penanganan defisit
    lain dinilai tidak memadai, sesuai Decision Table Opsi Penanganan Defisit `DT-e348eca6`.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mencatat Subsidi ke Unit dijalankan pada aplikasi Budget YPII, halaman **Subsidi ke
Unit** (`/organizations/{id}/subsidi`), oleh Pengelola Anggaran Pusat dengan akses ke organisasi
pemberi subsidi. Fitur ini hanya tersedia untuk organisasi bertipe CABANG dan PUSAT.

## Instruksi

### 1. Membuka halaman Subsidi ke Unit

Langkah membuka halaman Subsidi ke Unit dimulai dari halaman detail organisasi.

1. Buka halaman detail organisasi CABANG atau PUSAT.
1. Klik kartu **Subsidi ke Unit** di bagian navigasi fitur.

### 2. Memahami tabel subsidi

Tabel subsidi menampilkan daftar subsidi yang telah dicatat. Kolom-kolom yang ditampilkan pada tabel
Subsidi ke Unit diuraikan berikut ini.

| Kolom | Keterangan |
|---|---|
| **Unit Penerima** | Nama organisasi yang menerima subsidi |
| **Kategori Biaya** | Kategori biaya di sisi pemberi (beban) |
| **Kategori Pendapatan** | Kategori pendapatan di sisi penerima |
| **Nominal** | Nilai subsidi (Rp) |
| **Uraian** | Deskripsi subsidi |

### 3. Menambah subsidi

Penambahan subsidi mencatat satu pemberian subsidi baru ke sebuah unit.

1. Klik tombol **+ Tambah Subsidi**.
1. Pilih **Unit Penerima** — organisasi yang akan menerima subsidi.
1. Pilih **Kategori Biaya (Pemberi)** — kategori biaya di sisi pemberi subsidi.
1. Pilih **Kategori Pendapatan (Penerima)** — kategori pendapatan yang diakui di sisi penerima.
1. Isi **Nominal (Rp)** — nilai subsidi.
1. Isi **Uraian** — keterangan singkat mengenai subsidi ini.
1. Klik **Simpan**.

### 4. Mengedit subsidi

Pengeditan subsidi dilakukan pada entri yang sudah tercatat.

1. Klik ikon pensil pada baris subsidi yang ingin diubah.
1. Ubah data pada dialog yang muncul.
1. Klik **Simpan**.

### 5. Menghapus subsidi

Penghapusan subsidi mengeluarkan entri dari catatan pemberi maupun penerima.

1. Klik ikon tempat sampah pada baris subsidi yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mencatat Subsidi ke Unit selesai, setiap subsidi tercatat ganda: pada sisi
pemberi muncul sebagai beban (biaya) di simulasi dan summary, dan pada sisi unit penerima muncul
sebagai pendapatan di simulasi dan summary.

## Troubleshooting

- **Subsidi tidak muncul di unit penerima** — pastikan Unit Penerima dan Kategori Pendapatan
  (Penerima) telah dipilih dengan benar saat menyimpan; subsidi baru diakui sebagai pendapatan
  penerima setelah entri tersimpan.
- **Subsidi dipertimbangkan namun defisit masih dapat diatasi cara lain** — tinjau kembali opsi
  penanganan defisit sebelum mencatat subsidi, sesuai Decision Table Opsi Penanganan Defisit
  `DT-e348eca6`.

## Dokumen Terkait

- [SOP Evaluasi dan Konsolidasi Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
- [DT Opsi Penanganan Defisit](../dt/dt-e348eca6-opsi-penanganan-defisit.md) — `DT-e348eca6`
