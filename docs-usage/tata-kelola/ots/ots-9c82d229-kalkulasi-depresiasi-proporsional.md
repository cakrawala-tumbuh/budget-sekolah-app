---
title: "OTS Kalkulasi Depresiasi Proporsional"
description: "Otomasi sistem yang menghitung beban depresiasi tahun berjalan sebuah aset secara proporsional terhadap bulan mulai penggunaan, dipakai pada simulasi UP dan ringkasan anggaran."
published: true
date: 2026-07-04T00:00:00.000Z
tags: otomasi-sistem, rab, depresiasi, aset
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "OTS-9c82d229"
category: "otomasi-sistem"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "IK-86ddab34", "IK-67c5682a", "OTS-6f1cf35a"]
---

# OTS Kalkulasi Depresiasi Proporsional

Otomasi Sistem Kalkulasi Depresiasi Proporsional ini menghitung beban depresiasi tahun berjalan
sebuah aset tetap secara otomatis, disesuaikan dengan berapa bulan aset digunakan pada tahun anggaran.
Otomasi ini memastikan aset yang mulai dipakai di pertengahan tahun hanya membebani depresiasi sebesar
porsi bulan pemakaiannya.

## Ringkasan Otomasi

Otomasi Kalkulasi Depresiasi Proporsional menghitung depresiasi tahun pertama sebuah investasi baru
dengan rumus **depresiasi = (nilai beli ÷ umur ekonomis) × (13 − bulan mulai) ÷ 12**. Untuk aset lama,
sistem menghitung depresiasi tahun berjalan berdasarkan tahun anggaran aktif dan sisa masa manfaat.
Hasilnya menjadi komponen basis tarif Uang Pangkal dan beban akrual pada ringkasan.

## Sistem yang Terlibat

Otomasi Kalkulasi Depresiasi Proporsional dijalankan oleh backend aplikasi Budget YPII pada model
aset (properti `dep_current_year` untuk investasi baru dan `dep_current_year(fiscal_year)` untuk aset
lama) dan dikonsumsi oleh service simulasi (`simulate_depreciation`, `simulate_up`, `simulate_summary`).

## Pemicu (Trigger)

Otomasi Kalkulasi Depresiasi Proporsional dipicu **on-demand** setiap kali data aset diperlukan dalam
perhitungan: saat menampilkan daftar investasi/aset, saat simulasi UP dijalankan, dan saat menyusun
ringkasan anggaran. Tidak ada penjadwalan; nilai depresiasi selalu dihitung ulang dari atribut aset
terkini.

## Alur Otomasi

1. Sistem membaca atribut aset: nilai beli (nilai perolehan), umur ekonomis, dan bulan mulai
   penggunaan untuk investasi baru; atau nilai perolehan, umur ekonomis, dan tahun perolehan untuk
   aset lama.
1. Untuk investasi baru, sistem menghitung depresiasi per tahun = nilai beli ÷ umur ekonomis, lalu
   depresiasi tahun berjalan = depresiasi per tahun × (13 − bulan mulai) ÷ 12.
1. Untuk aset lama, sistem menentukan tahun anggaran aktif dari `BUDGET_YEAR`, lalu menghitung
   depresiasi tahun berjalan dan nilai buku akhir berdasarkan sisa masa manfaat.
1. Sistem menjumlahkan depresiasi seluruh aset dan menyertakannya sebagai komponen basis tarif UP
   (lihat `OTS-6f1cf35a`) serta sebagai beban akrual pada ringkasan.

## Konfigurasi

Otomasi Kalkulasi Depresiasi Proporsional membaca tahun anggaran dari variabel `BUDGET_YEAR`
(default `2025-2026`); angka 13 pada rumus adalah konstanta (jumlah bulan + 1) sehingga aset yang
mulai dipakai bulan ke-1 disusutkan penuh 12/12 dan bulan ke-12 disusutkan 1/12. Tidak ada kredensial
rahasia pada otomasi ini.

## Penanganan Error

Bila umur ekonomis bernilai nol atau kosong, sistem tidak dapat menghitung depresiasi per tahun;
data aset harus memuat umur ekonomis yang valid (> 0). Bila bulan mulai di luar rentang 1–12, hasil
proporsi menjadi tidak wajar — input bulan mulai divalidasi pada Instruksi Kerja Input Investasi Aset
Tetap (`IK-86ddab34`).

## Monitoring dan Log

Keberhasilan Otomasi Kalkulasi Depresiasi Proporsional terlihat pada kolom "Dep Th Ini" di daftar
investasi dan pada tab Depresiasi di halaman simulasi. Ketidaksesuaian nilai ditelusuri dengan
membandingkan nilai beli, umur ekonomis, dan bulan mulai aset terhadap rumus pada bagian Alur Otomasi
dokumen ini.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08`
- [OTS Kalkulasi Otomatis Tarif UP & US](ots-6f1cf35a-kalkulasi-tarif-up-us.md) — `OTS-6f1cf35a`
- [IK Input Investasi Aset Tetap](../ik/ik-86ddab34-input-investasi-aset-tetap.md) — `IK-86ddab34`
- [IK Input Depresiasi Aset Lama](../ik/ik-67c5682a-input-depresiasi-aset-lama.md) — `IK-67c5682a`
