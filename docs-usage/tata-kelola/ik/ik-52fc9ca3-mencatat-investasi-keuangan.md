---
title: "IK Mencatat Investasi Keuangan"
description: "Instruksi kerja bagi Pengelola Anggaran Cabang/Pusat untuk mencatat, mengedit, dan menghapus instrumen investasi keuangan yang dialokasikan proporsional ke unit sebagai komponen simulasi Uang Pangkal pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, cabang-pusat, investasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-52fc9ca3"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-f68b0b7a", "SOP-a8608e7a"]
---

# IK Mencatat Investasi Keuangan

Instruksi Kerja Mencatat Investasi Keuangan ini memandu Pengelola Anggaran Cabang/Pusat mencatat
instrumen investasi keuangan (saham, reksa dana, obligasi, deposito, dan lainnya) beserta nominalnya
pada halaman Investasi Keuangan aplikasi Budget YPII. Nominal yang tercatat dialokasikan secara
proporsional ke unit-unit anak sebagai komponen biaya dalam simulasi Uang Pangkal.

## Tujuan

Menghasilkan daftar instrumen investasi keuangan Cabang/Pusat yang lengkap dan bernilai benar,
sehingga alokasi proporsionalnya ke setiap unit turut memperhitungkan komponen investasi dalam
simulasi tarif Uang Pangkal secara akurat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mencatat Investasi Keuangan, pelaksana telah login sebagai
pengguna organisasi bertipe CABANG atau PUSAT, dan rincian instrumen investasi beserta nominalnya
telah disiapkan.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mencatat Investasi Keuangan dijalankan pada aplikasi Budget YPII, halaman **Investasi
Keuangan** (`/organizations/{id}/investasi-keuangan`), oleh Pengelola Anggaran Cabang/Pusat dengan
akses ke organisasi CABANG atau PUSAT yang bersangkutan. Fitur ini hanya tersedia untuk organisasi
bertipe CABANG dan PUSAT; unit tidak memiliki akses ke halaman ini.

## Instruksi

### 1. Membuka halaman Investasi Keuangan

Langkah membuka halaman Investasi Keuangan dimulai dari halaman detail organisasi.

1. Buka halaman detail organisasi CABANG atau PUSAT.
1. Klik kartu **Investasi Keuangan** di bagian navigasi fitur.

### 2. Memahami tabel investasi

Tabel investasi menampilkan semua instrumen yang telah dicatat. Kolom-kolom yang ditampilkan pada
tabel Investasi Keuangan diuraikan berikut ini.

| Kolom | Keterangan |
|---|---|
| **Jenis** | Tipe instrumen (Saham, Reksa Dana, Obligasi, Deposito, Lainnya) |
| **Nama Instrumen** | Nama produk investasi |
| **Nominal** | Nilai investasi dalam rupiah |
| **Catatan** | Keterangan tambahan (opsional) |

Di bawah tabel ditampilkan **Total Investasi Keuangan** — jumlah seluruh nominal yang tercatat.

### 3. Menambah investasi keuangan

Penambahan investasi keuangan mencatat satu instrumen baru beserta nominalnya.

1. Klik tombol **+ Tambah Investasi**.
1. Pilih **Jenis Instrumen** — Saham, Reksa Dana, Obligasi, Deposito, atau Lainnya.
1. Isi **Nama Instrumen** — nama produk atau instrumen (mis. "BRI Danareksa Equity Fund").
1. Isi **Nominal Investasi (Rp)** — nilai investasi dalam rupiah.
1. Isi **Catatan** — keterangan tambahan (opsional).
1. Klik **Simpan**.

### 4. Mengedit investasi keuangan

Pengeditan investasi keuangan dilakukan pada instrumen yang sudah tercatat.

1. Klik ikon pensil pada baris instrumen yang ingin diubah.
1. Ubah data pada dialog yang muncul.
1. Klik **Simpan**.

### 5. Menghapus investasi keuangan

Penghapusan investasi keuangan mengeluarkan instrumen dari daftar dan dari alokasi ke unit.

1. Klik ikon tempat sampah pada baris instrumen yang ingin dihapus.
1. Konfirmasi penghapusan pada dialog yang muncul.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mencatat Investasi Keuangan selesai, total nominal investasi keuangan
Cabang/Pusat dialokasikan proporsional ke unit berdasarkan persentase siswa dan muncul di simulasi
Uang Pangkal tiap unit pada baris **Investasi Keuangan Cabang (alokasi)** atau **Investasi Keuangan
Pusat (alokasi)** di bawah heading Alokasi Biaya Cabang atau Alokasi Biaya Pusat, sehingga ikut
menaikkan tarif UP unit.

## Troubleshooting

- **Alokasi tidak terlihat di simulasi unit** — buka halaman Simulasi Anggaran unit anak dan lihat
  tab Uang Pangkal; bagian Alokasi Biaya Cabang atau Alokasi Biaya Pusat menampilkan nilai terbaru
  setelah investasi disimpan.
- **Nilai alokasi antar-unit tidak merata** — alokasi dibagi proporsional berdasarkan persentase
  siswa tiap unit, sehingga unit dengan siswa lebih banyak menerima porsi lebih besar.

## Dokumen Terkait

- [SOP Siklus Konsolidasi RAB Berjenjang](../sop/sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) — `SOP-f68b0b7a`
- [SOP Evaluasi dan Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
