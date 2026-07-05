---
title: "IK Melihat Summary Komparatif Antar-Unit"
description: "Instruksi kerja bagi Pengelola Anggaran Cabang/Pusat untuk membuka dan membaca layar Summary Komparatif yang membandingkan organisasi induk dengan seluruh unit di bawahnya, termasuk varian dengan dan tanpa alokasi ke induk, pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, cabang-pusat, summary
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-6eefc4b5"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-a8608e7a", "SOP-3ded94ef"]
---

# IK Melihat Summary Komparatif Antar-Unit

Instruksi Kerja Melihat Summary Komparatif Antar-Unit ini memandu Pengelola Anggaran Cabang/Pusat
membuka dan membaca layar Summary Komparatif aplikasi Budget YPII, yang menyandingkan ringkasan
anggaran organisasi CABANG atau PUSAT dengan seluruh unit yang dinaungi. Layar ini membantu
membandingkan posisi anggaran antar-organisasi dalam satu tampilan.

## Tujuan

Menyajikan perbandingan ringkasan anggaran organisasi induk dengan setiap unit di bawahnya secara
berdampingan, sehingga selisih posisi kas dan akrual antar-unit — termasuk pengaruh alokasi ke induk —
dapat dievaluasi dengan cepat.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Melihat Summary Komparatif Antar-Unit, pelaksana telah login
sebagai pengguna organisasi bertipe CABANG atau PUSAT, dan data anggaran organisasi induk maupun
unit-unit di bawahnya telah terisi agar perbandingan bermakna.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Melihat Summary Komparatif Antar-Unit dijalankan pada aplikasi Budget YPII, layar
**Summary Komparatif** (`/organizations/{id}/summary-komparatif`), oleh Pengelola Anggaran
Cabang/Pusat dengan akses ke organisasi CABANG atau PUSAT yang bersangkutan.

## Instruksi

### 1. Membuka layar Summary Komparatif

Langkah membuka layar Summary Komparatif dimulai dari halaman detail organisasi.

1. Buka halaman detail organisasi CABANG atau PUSAT.
1. Klik menu atau tombol **Summary Komparatif** di bagian navigasi organisasi.

### 2. Memahami tampilan komparatif

Layar Summary Komparatif menyandingkan organisasi induk dengan seluruh unit di bawahnya dalam kolom
berdampingan. Struktur baris dan kolom pada layar Summary Komparatif diuraikan berikut ini.

Setiap baris mengelompokkan pos anggaran yang sama seperti pada Summary Anggaran, yaitu Pendapatan
Operasional, Pendapatan Non-Operasional, Biaya Operasional, Biaya Non-Operasional, dan Depresiasi,
dengan nilai Kas dan Akrual. Setiap organisasi (induk dan tiap unit) ditampilkan dengan dua varian
nilai.

| Varian | Keterangan |
|---|---|
| **Dengan alokasi ke induk** | Nilai unit sudah termasuk komponen biaya yang dialokasikan ke Cabang/Pusat |
| **Tanpa alokasi ke induk** | Nilai unit tanpa memperhitungkan alokasi ke induk, memperlihatkan posisi mandiri unit |

!!! info

    **Membaca dua varian:** Varian "dengan alokasi ke induk" mencerminkan beban unit setelah menanggung
    kontribusi ke Cabang/Pusat, sedangkan varian "tanpa alokasi ke induk" memperlihatkan posisi unit
    seolah berdiri sendiri. Bandingkan keduanya untuk menilai dampak alokasi terhadap tiap unit.

### 3. Membandingkan antar-unit

Perbandingan antar-unit dilakukan dengan membaca kolom setiap organisasi secara berdampingan.

1. Baca kolom organisasi induk sebagai acuan rekapitulasi.
1. Bandingkan baris yang sama antar-unit untuk menemukan selisih pendapatan, biaya, atau depresiasi.
1. Perhatikan kedua varian tiap unit untuk menilai pengaruh alokasi ke induk pada posisi kas dan
   akrual unit tersebut.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Melihat Summary Komparatif Antar-Unit selesai, pelaksana memperoleh gambaran
perbandingan posisi anggaran organisasi induk dan seluruh unit di bawahnya, lengkap dengan varian
dengan dan tanpa alokasi ke induk, sebagai dasar evaluasi konsolidasi.

## Troubleshooting

- **Kolom unit kosong atau nilai nol** — pastikan data anggaran unit yang bersangkutan telah terisi;
  layar komparatif hanya menampilkan angka dari data yang telah tercatat.
- **Selisih dua varian tampak besar pada satu unit** — selisih mencerminkan besarnya alokasi biaya
  unit tersebut ke induk; tinjau halaman Alokasi UP dan Alokasi US untuk memahami komposisinya.

## Dokumen Terkait

- [SOP Evaluasi dan Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi dan Konsolidasi Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
