---
title: "IK Mengunci / Membuka Penguncian Budget"
description: "Instruksi kerja bagi penanggung jawab unit dan pengelola anggaran cabang/pusat untuk mengunci dan membuka penguncian budget organisasi sesuai hierarki kewenangan pada aplikasi Budget YPII."
published: true
date: 2026-07-04T00:00:00.000Z
tags: instruksi-kerja, rab, penguncian
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "IK-acb4298f"
category: "instruksi-kerja"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "SOP-a8608e7a", "SOP-3ded94ef"]
---

# IK Mengunci / Membuka Penguncian Budget

Instruksi Kerja Mengunci / Membuka Penguncian Budget ini memandu Penanggung Jawab Unit — serta
Pengelola Anggaran Cabang/Pusat pada tingkat masing-masing — membekukan dan membuka kembali data
anggaran sebuah organisasi pada aplikasi Budget YPII. Setelah dikunci, tidak ada perubahan input yang
dapat dilakukan, dan nama pengunci beserta waktu penguncian ditampilkan sebagai informasi audit.

## Tujuan

Menghasilkan status penguncian budget yang benar sesuai hierarki organisasi, sehingga anggaran yang
sudah final terlindungi dari perubahan tak sengaja dan tetap dapat dibuka kembali oleh pihak yang
berwenang bila revisi diperlukan.

## Prasyarat

Sebelum menjalankan Instruksi Kerja Mengunci / Membuka Penguncian Budget, pelaksana telah login sebagai
pengguna yang berwenang, seluruh data anggaran organisasi yang akan dikunci sudah lengkap dan
diverifikasi, dan pelaksana memahami bahwa penguncian merupakan tindakan keputusan yang mengikuti
hierarki kewenangan. Penguncian tidak menampilkan dialog konfirmasi.

## Peralatan / Akses yang Dibutuhkan

Instruksi Kerja Mengunci / Membuka Penguncian Budget dijalankan pada aplikasi Budget YPII, halaman
detail organisasi (`/organizations/{id}`), oleh pelaksana dengan kewenangan penguncian sesuai hierarki.
Hak penguncian mengikuti hierarki organisasi:

| Pengguna | Yang Dapat Dikunci |
|---|---|
| **Admin** | Semua organisasi (UNIT, CABANG, PUSAT) |
| **PUSAT** | Dirinya sendiri, semua CABANG, dan semua UNIT |
| **CABANG** | Dirinya sendiri dan semua UNIT yang berada di bawahnya |
| **UNIT** | Hanya dirinya sendiri |

## Instruksi

### 1. Mengunci budget

1. Buka halaman detail organisasi yang ingin dikunci.
1. Klik tombol **Kunci Budget** (ikon gembok tertutup, berwarna kuning-oranye) di bagian kanan atas
   halaman.
1. Pastikan halaman menampilkan banner merah dan status **Terkunci** beserta nama pengguna yang
   mengunci.

!!! warning

    Tidak ada dialog konfirmasi; tombol langsung mengunci budget. Pastikan semua data sudah lengkap dan
    benar sebelum mengunci.

### 2. Membuka penguncian budget

1. Buka halaman detail organisasi yang sudah terkunci.
1. Klik tombol **Buka Kunci** (ikon gembok terbuka, berwarna merah) di bagian kanan atas halaman.
1. Pastikan budget kembali terbuka dan dapat diedit.

!!! info

    Pengguna yang berwenang mengunci sebuah organisasi juga berwenang membukanya kembali, mengikuti
    hierarki kewenangan yang sama.

### 3. Memverifikasi tanda status terkunci

1. Pada halaman daftar organisasi, periksa **badge "Terkunci"** merah dengan ikon gembok di sudut kanan
   atas kartu.
1. Pada halaman detail, periksa **banner merah**, **badge "Terkunci"** dengan nama pengunci dan tanggal
   penguncian, serta hilangnya tombol Edit dan tombol edit saldo kas.

!!! danger

    Saat terkunci, seluruh input data anggaran diblokir: asumsi siswa, label kelas, entri biaya operasional
    dan non-operasional, investasi aset tetap, depresiasi aset lama, entri pendapatan, override direct
    income, subsidi ke unit, saldo kas, serta informasi dasar organisasi.

### 4. Menyesuaikan alokasi UP & US pada organisasi terkunci (khusus CABANG/PUSAT)

1. Meski budget unit sudah dikunci, buka pengelolaan alokasi UP/US di Cabang atau Pusat sesuai
   kewenangan.
1. Ubah persentase kontribusi UP/US, sinkronkan alokasi biaya UP/US ke unit-unit di bawahnya, atau atur
   alokasi biaya dari induk ke unit sesuai kebutuhan.

!!! tip

    Pengelolaan alokasi biaya UP/US oleh CABANG atau PUSAT tetap dapat dilakukan meski budget unit sudah
    dikunci, sehingga penyesuaian struktural komposisi biaya unit tetap dimungkinkan.

## Hasil yang Diharapkan

Setelah Instruksi Kerja Mengunci / Membuka Penguncian Budget selesai, status penguncian organisasi
tercatat dengan benar beserta nama pengunci dan waktu penguncian; organisasi yang dikunci terlindungi
dari perubahan input, sementara alokasi UP/US oleh Cabang/Pusat tetap dapat disesuaikan.

## Troubleshooting

- **Tombol Kunci/Buka Kunci tidak muncul** — pelaksana tidak memiliki kewenangan atas organisasi
  tersebut; periksa tabel hierarki kewenangan pada bagian Peralatan / Akses.
- **Perlu mengubah data pada organisasi terkunci** — buka kunci lebih dulu bila berwenang, atau minta
  pihak yang berwenang membukanya.
- **Alokasi UP/US perlu diubah pada unit terkunci** — gunakan pengelolaan alokasi di Cabang/Pusat yang
  tetap diizinkan meski unit terkunci, mengikuti SOP evaluasi/konsolidasi tingkat Cabang dan Pusat.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (SOP induk)
- [SOP Evaluasi & Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi & Konsolidasi Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
