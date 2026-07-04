---
title: "IK Override Tarif UP/US & Direct Income"
description: "Instruksi kerja bagi penanggung jawab unit untuk menetapkan dan menghapus nilai override direct income pada kategori biaya yang dicatat sebagai pendapatan di organisasi tipe UNIT aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, unit, tarif
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-5f6198f9"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "OTS-6f1cf35a"]
---

# IK Override Tarif UP/US & Direct Income

Instruksi Kerja Override Tarif UP/US & Direct Income ini memandu Penanggung Jawab Unit menetapkan nilai
pendapatan yang dipungut dari siswa bila berbeda dari nominal anggaran biaya, pada halaman Override
Direct Income di organisasi tipe UNIT aplikasi Budget YPII. Nilai otomatis dihitung dari dana Yayasan
pada entri biaya terkait, dan override menggantikannya dalam simulasi pendapatan.

## Tujuan

Menghasilkan nilai pendapatan direct income yang mencerminkan pungutan aktual kepada siswa, sehingga
simulasi pendapatan dan ringkasan anggaran memakai nilai yang benar tanpa mengubah data anggaran biaya.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Override Tarif UP/US & Direct Income, pelaksana telah login sebagai
pengguna organisasi, bekerja pada organisasi bertipe **UNIT**, kategori biaya yang relevan telah
dikonfigurasi sebagai Direct Income oleh Admin, dan nilai pengganti yang akan ditetapkan telah
diputuskan. Penetapan override merupakan keputusan penetapan tarif yang menjadi kewenangan penanggung
jawab unit.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Override Tarif UP/US & Direct Income dijalankan pada aplikasi Budget YPII, halaman
**Override Direct Income** di dalam organisasi tipe UNIT, oleh pelaksana dengan akses ke unit yang
bersangkutan. Halaman menampilkan satu baris per kategori biaya yang dikonfigurasi sebagai Direct
Income, dengan kolom Kode Biaya, Uraian Biaya, Otomatis (Rp), dan Override (Rp).

## Instruksi

### 1. Membuka halaman Override Direct Income

1. Buka halaman detail organisasi tipe UNIT.
1. Klik kartu **Override Direct Income** di grid navigasi fitur.

### 2. Menetapkan nilai override

1. Klik ikon **pensil** di ujung kanan baris kategori biaya yang ingin disesuaikan.
1. Ketik nilai baru pada kotak input yang muncul di kolom **Override**.
1. Tekan **Enter** atau klik ikon **centang** untuk menyimpan.
1. Perhatikan badge **Override** berwarna amber muncul pada baris tersebut.

Simulasi pendapatan dan ringkasan anggaran otomatis memakai nilai override tersebut.
{.is-info}

### 3. Menghapus override (kembali ke nilai otomatis)

1. Pada baris yang memiliki badge **Override**, klik ikon **putar ulang** (↺).
1. Konfirmasi penghapusan.
1. Perhatikan kolom Override kembali menampilkan tanda **—**.

Override tidak mengubah data anggaran biaya di halaman Biaya Operasional; override hanya mempengaruhi
nilai pendapatan yang diakui dalam simulasi.
{.is-warning}

## Hasil yang Diharapkan

Setelah Instruksi Kerja Override Tarif UP/US & Direct Income selesai, nilai override yang ditetapkan
tersimpan dan tampil di kolom Final pada tab Direct Income halaman Simulasi Anggaran; baris yang di-reset
kembali memakai nilai otomatis.

## Troubleshooting

- **Baris kategori tidak muncul** — hanya kategori biaya yang dikonfigurasi sebagai Direct Income oleh
  Admin yang tampil; minta Admin memetakan kategori biaya ke kategori pendapatan lebih dulu.
- **Nilai override tidak muncul di simulasi** — periksa tab **Direct Income** pada halaman Simulasi
  Anggaran; kolom Otomatis tetap menampilkan nilai anggaran biaya, sedangkan kolom Final menampilkan
  nilai setelah override. Mekanisme perhitungan tarif dijelaskan pada Otomasi Sistem Kalkulasi Tarif
  UP/US `OTS-6f1cf35a`.
- **Perubahan tidak dapat disimpan** — organisasi kemungkinan sudah dikunci; buka kunci budget lebih
  dulu sesuai kewenangan.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [OTS Kalkulasi Tarif UP/US](../ots/ots-6f1cf35a-kalkulasi-tarif-up-us.md) — `OTS-6f1cf35a`
