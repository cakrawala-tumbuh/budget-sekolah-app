---
title: "DT Klasifikasi Komponen Biaya: UP, US, Direct Income, atau Non-Operasional"
description: "Decision table yang menentukan ke bucket simulasi mana sebuah kategori biaya masuk (komponen Uang Pangkal, komponen Uang Sekolah, direct income, atau beban non-operasional) berdasarkan flag kategorinya."
published: true
date: 2026-07-04T00:00:00.000Z
tags: decision-table, rab, biaya, klasifikasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "DT-b7d9cedd"
category: "decision-table"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "IK-e54fa33c", "IK-5a258878", "OTS-6f1cf35a"]
---

# DT Klasifikasi Komponen Biaya: UP, US, Direct Income, atau Non-Operasional

Decision Table Klasifikasi Komponen Biaya ini menentukan ke bucket simulasi mana sebuah kategori
biaya diperhitungkan — komponen Uang Pangkal (UP), komponen Uang Sekolah (US), direct income, atau
beban non-operasional. Klasifikasi ini menentukan bagaimana sebuah entri biaya memengaruhi tarif UP,
tarif US, atau pendapatan langsung saat simulasi.

## Konteks Penggunaan

Decision Table Klasifikasi Komponen Biaya dipakai oleh sistem saat kalkulasi tarif pada SOP
Penyusunan RAB Tingkat Unit (`SOP-d3d42a08`), dieksekusi otomatis melalui Otomasi Sistem Kalkulasi
Tarif UP & US (`OTS-6f1cf35a`), dan menjadi acuan Instruksi Kerja Menjalankan & Membaca Simulasi
(`IK-e54fa33c`). Flag kategori yang menjadi input tabel ini diatur melalui Instruksi Kerja Mengelola
Kategori Biaya (`IK-5a258878`).

## Kondisi dan Tindakan

Tabel di bawah memetakan kombinasi tiga flag kategori biaya — `is_up_component`, `is_direct_income`,
dan `is_operational` — terhadap bucket klasifikasinya. Baca per baris dengan **urutan prioritas dari
atas ke bawah**: aturan pertama yang cocok menentukan bucket, sehingga kombinasi selalu menghasilkan
tepat satu hasil.

| `is_up_component` | `is_direct_income` | `is_operational` | Bucket Klasifikasi |
|---|---|---|---|
| Ya | — | — | Komponen UP |
| Tidak | Ya | — | Direct Income |
| Tidak | Tidak | Ya | Komponen US |
| Tidak | Tidak | Tidak | Beban Non-Operasional |
{.dense}

> Tanda "—" berarti nilai flag tidak memengaruhi hasil pada baris tersebut (sudah ditentukan flag di
> kolom sebelumnya). Konfigurasikan flag kategori agar satu kategori memetakan ke satu bucket; urutan
> prioritas di atas menjamin tabel tidak kontradiktif.
{.is-warning}

## Penjelasan Tindakan

Pada Decision Table Klasifikasi Komponen Biaya, tiap bucket diperlakukan berbeda saat simulasi:

- **Komponen UP** — dijumlahkan sebagai basis tarif Uang Pangkal. Selain kategori ber-flag
  `is_up_component`, basis UP juga ditambah seluruh depresiasi tahun berjalan (investasi baru + aset
  lama), alokasi investasi keuangan, dan komponen UP yang dialokasikan dari induk — komponen tambahan
  ini bukan berasal dari flag kategori, melainkan dari perhitungan sistem (lihat `OTS-6f1cf35a`).
- **Direct Income** — biaya yang sekaligus menjadi pendapatan langsung; nilainya dipetakan ke
  kategori pendapatan tujuan (`maps_to_income_category`) dan dapat di-override.
- **Komponen US** — dijumlahkan sebagai basis tarif Uang Sekolah (biaya operasional yang bukan
  komponen UP dan bukan direct income).
- **Beban Non-Operasional** — dicatat sebagai beban, tetapi tidak masuk basis tarif UP maupun US.

## Dasar Keputusan

Klasifikasi ini berlandaskan model kategori biaya aplikasi Budget YPII, di mana setiap kategori biaya
memiliki flag `is_operational`, `is_up_component`, dan `is_direct_income` yang tersimpan di database
(bukan kode akun literal). Konvensi historis menempatkan kode akun `5130.xx` sebagai komponen UP,
tetapi keputusan klasifikasi kini sepenuhnya mengikuti flag kategori, bukan pola kode.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08`
- Otomasi Sistem Kalkulasi Tarif UP & US — `OTS-6f1cf35a` (di folder `../ots/`)
- [IK Menjalankan & Membaca Simulasi](../ik/ik-e54fa33c-menjalankan-membaca-simulasi.md) — `IK-e54fa33c`
- [IK Mengelola Kategori Biaya](../ik/ik-5a258878-mengelola-kategori-biaya.md) — `IK-5a258878`
