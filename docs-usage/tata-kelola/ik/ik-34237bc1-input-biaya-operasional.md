---
title: "IK Input Biaya Operasional"
description: "Instruksi kerja bagi pengelola anggaran untuk menambah, mengedit, memindahkan, dan menghapus entri biaya operasional organisasi pada halaman Biaya Operasional aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, biaya, operasional
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-34237bc1"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "DT-b7d9cedd"]
---

# IK Input Biaya Operasional

Instruksi Kerja Input Biaya Operasional ini memandu Pengelola Anggaran memasukkan rincian biaya
operasional organisasi pada halaman Biaya Operasional aplikasi Budget YPII. Entri di halaman ini
menjadi dasar kalkulasi tarif Uang Sekolah (US) dan Uang Pangkal (UP) saat simulasi.

## Tujuan

Menghasilkan daftar entri biaya operasional yang lengkap dan terkategori dengan benar, sehingga
simulasi tarif UP/US organisasi menghitung komponen biaya secara akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Input Biaya Operasional, pelaksana telah login sebagai pengguna
organisasi, kategori biaya yang dibutuhkan telah tersedia (dikelola Admin), dan rincian nominal biaya
telah disiapkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Input Biaya Operasional dijalankan pada aplikasi Budget YPII, halaman
**Biaya Operasional** (`/organizations/{id}/budget-entries`), oleh pelaksana dengan akses ke
organisasi yang bersangkutan.

## Instruksi

### 1. Membuka halaman Biaya Operasional

1. Buka halaman detail organisasi.
1. Klik kartu **Biaya Operasional** di bagian navigasi fitur.

### 2. Menambah entri biaya

1. Klik tombol **+ Tambah Entri**.
1. Pada dialog yang muncul, isi **Kategori Biaya** — pilih dari daftar kategori yang tersedia.
1. Isi **No. Baris** — nomor urut dalam kategori tersebut.
1. Isi **Uraian** — deskripsi singkat rincian biaya.
1. Isi **Dasar / Catatan Perhitungan** — cara perhitungan nominal (opsional, mis. "24 × 12 ×
   Rp 3.500.000").
1. Isi **Yayasan (Rp)** — nominal yang ditanggung yayasan.
1. Isi **BOS/BOP (Rp)** — nominal dari dana BOS/BOP (isi 0 bila tidak ada).
1. Isi **Catatan** — catatan tambahan (opsional).
1. Klik **Simpan**.

### 3. Mengedit entri biaya

1. Klik ikon pensil pada baris entri yang ingin diubah.
1. Ubah data pada dialog yang muncul, termasuk **kategori biaya** bila perlu.
1. Klik **Simpan**.

### 4. Memindahkan banyak entri ke kategori lain (pindah kategori massal)

1. Centang entri-entri yang ingin dipindahkan melalui checkbox di setiap baris.
1. Klik tombol **Pindah Kategori** di bagian atas atau bawah tabel.
1. Pilih **kategori tujuan** dari daftar yang tersedia.
1. Klik **Pindahkan**.

### 5. Menghapus entri biaya

1. Klik ikon tempat sampah pada baris entri yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Input Biaya Operasional selesai, seluruh entri biaya operasional tercatat di
bawah kategori yang tepat, dengan total biaya operasional tampil di bagian bawah halaman sebagai
referensi cepat.

## Troubleshooting

- **Kategori yang dibutuhkan tidak muncul** — kategori biaya dikelola oleh Admin; minta Admin
  menambahkannya lebih dulu.
- **Biaya tidak masuk ke tarif yang diharapkan** — kategori dengan badge **UP** masuk komponen Uang
  Pangkal, selain itu masuk komponen Uang Sekolah; klasifikasi mengikuti flag kategori (lihat
  Decision Table Klasifikasi Komponen Biaya `DT-b7d9cedd`).

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [DT Klasifikasi Komponen Biaya](../dt/dt-b7d9cedd-klasifikasi-komponen-biaya.md) — `DT-b7d9cedd`
