---
title: "OTS Kalkulasi Otomatis Tarif UP & US"
description: "Otomasi sistem yang menghitung tarif Uang Pangkal dan Uang Sekolah unit secara otomatis dari komponen biaya, depresiasi, dan alokasi induk saat simulasi dijalankan."
published: true
date: 2026-07-04T00:00:00.000Z
tags: otomasi-sistem, rab, simulasi, tarif
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "OTS-6f1cf35a"
category: "otomasi-sistem"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "IK-e54fa33c", "DT-b7d9cedd", "DT-e80fe01d", "OTS-9c82d229"]
---

# OTS Kalkulasi Otomatis Tarif UP & US

Otomasi Sistem Kalkulasi Otomatis Tarif UP & US ini menghitung tarif Uang Pangkal (UP) dan Uang
Sekolah (US) sebuah unit tanpa input manual: sistem mengumpulkan komponen biaya, menambahkan
depresiasi dan alokasi dari induk, lalu membaginya terhadap jumlah siswa. Otomasi ini memberi unit
tarif acuan yang konsisten dan dapat ditelusuri.

## Ringkasan Otomasi

Otomasi Kalkulasi Tarif UP & US mengklasifikasikan tiap kategori biaya ke bucket UP atau US,
menjumlahkan basis biaya tiap bucket beserta depresiasi dan alokasi induk, kemudian menghitung tarif
otomatis: **tarif UP = total biaya UP (termasuk depresiasi & alokasi) ÷ jumlah siswa baru**, dan
**tarif US = total biaya US ÷ (total siswa × 12 bulan)**. Bila unit menetapkan override, tarif final
memakai nilai override; bila tidak, tarif final sama dengan tarif otomatis.

## Sistem yang Terlibat

Otomasi Kalkulasi Tarif UP & US dijalankan oleh backend aplikasi Budget YPII pada service simulasi
(`app/services/simulation.py`, fungsi `simulate_up` dan `simulate_us`), membaca data dari database
(entri biaya, asumsi siswa, investasi, alokasi induk) dan menyajikan hasil ke frontend melalui
endpoint simulasi.

## Pemicu (Trigger)

Otomasi Kalkulasi Tarif UP & US dipicu **on-demand** oleh permintaan simulasi: saat pengguna membuka
halaman simulasi unit atau memanggil endpoint `/organizations/{id}/simulation/up` dan
`/organizations/{id}/simulation/us`. Tidak ada penjadwalan; kalkulasi berjalan setiap kali simulasi
diminta sehingga selalu mencerminkan data terkini.

## Alur Otomasi

1. Sistem mengambil seluruh entri biaya, asumsi siswa, dan investasi unit dari database.
1. Sistem mengklasifikasikan tiap kategori biaya ke bucket UP atau US mengikuti Decision Table
   `DT-b7d9cedd` (berdasarkan flag `is_up_component`, `is_direct_income`, `is_operational`).
1. Sistem menjumlahkan komponen UP unit, lalu menambahkan depresiasi tahun berjalan (investasi baru +
   aset lama, dihitung oleh `OTS-9c82d229`), alokasi investasi keuangan, serta komponen UP yang
   dialokasikan dari Cabang/Pusat.
1. Sistem menjumlahkan komponen US unit dan menambahkan komponen US yang dialokasikan dari
   Cabang/Pusat.
1. Sistem menghitung tarif otomatis: UP = total biaya UP-dengan-depresiasi ÷ jumlah siswa baru; US =
   total biaya US ÷ (total siswa × 12).
1. Sistem memeriksa keberadaan override tarif pada asumsi unit; bila ada, tarif final = override,
   selain itu tarif final = tarif otomatis.
1. Sistem mengembalikan komponen rinci, tarif otomatis, tarif final, dan proyeksi pendapatan ke
   pemanggil.

## Konfigurasi

Otomasi Kalkulasi Tarif UP & US menggunakan parameter dari data organisasi dan konfigurasi instance:
jumlah bulan US tetap 12; tahun anggaran dibaca dari variabel `BUDGET_YEAR`; tarif kontribusi induk
mengikuti `DT-e80fe01d`. Pembagi jumlah siswa minimal 1 untuk mencegah pembagian nol. Tidak ada
kredensial rahasia pada otomasi ini.

## Penanganan Error

Bila jumlah siswa baru atau total siswa bernilai nol atau kosong, sistem memakai nilai 1 sebagai
pembagi agar tidak terjadi pembagian nol (tarif menjadi sama dengan total biaya). Bila asumsi siswa
belum diisi, komponen tetap dihitung namun tarif menjadi tidak representatif — pengguna diarahkan
mengisi asumsi siswa lebih dulu (lihat `SOP-d3d42a08` langkah 4).

## Monitoring dan Log

Keberhasilan Otomasi Kalkulasi Tarif UP & US terlihat langsung dari hasil simulasi di halaman unit
(komponen dan tarif tampil). Kesalahan kalkulasi tercermin sebagai anomali angka (mis. tarif sangat
besar akibat jumlah siswa 1) dan ditelusuri melalui rincian komponen pada tab Uang Pangkal/Uang
Sekolah serta log aplikasi backend.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08`
- [DT Klasifikasi Komponen Biaya](../dt/dt-b7d9cedd-klasifikasi-komponen-biaya.md) — `DT-b7d9cedd`
- [DT Tarif Kontribusi Default](../dt/dt-e80fe01d-tarif-kontribusi-default.md) — `DT-e80fe01d`
- [OTS Kalkulasi Depresiasi Proporsional](ots-9c82d229-kalkulasi-depresiasi-proporsional.md) — `OTS-9c82d229`
- [IK Menjalankan & Membaca Simulasi](../ik/ik-e54fa33c-menjalankan-membaca-simulasi.md) — `IK-e54fa33c`
