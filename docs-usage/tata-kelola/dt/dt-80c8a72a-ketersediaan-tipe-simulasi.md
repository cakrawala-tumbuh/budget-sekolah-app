---
title: "DT Ketersediaan Tipe Simulasi per Tipe Organisasi"
description: "Decision table yang menentukan tipe simulasi RAB mana yang tersedia untuk suatu organisasi berdasarkan tipe organisasinya (UNIT, CABANG, atau PUSAT)."
published: true
date: 2026-07-04T00:00:00.000Z
tags: decision-table, rab, simulasi, organisasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "DT-80c8a72a"
category: "decision-table"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "SOP-a8608e7a", "SOP-3ded94ef", "IK-e54fa33c"]
---

# DT Ketersediaan Tipe Simulasi per Tipe Organisasi

Decision Table Ketersediaan Tipe Simulasi per Tipe Organisasi ini menentukan tipe simulasi RAB mana
yang boleh dijalankan untuk suatu organisasi, bergantung pada tipe organisasinya. Tabel dipakai agar
pengguna dan pemroses tidak menjalankan simulasi yang tidak relevan (mis. tarif Uang Pangkal untuk
organisasi Pusat).

## Konteks Penggunaan

Decision Table Ketersediaan Tipe Simulasi digunakan pada langkah menjalankan simulasi di SOP
Penyusunan RAB Tingkat Unit (`SOP-d3d42a08`) serta pada evaluasi tingkat Cabang (`SOP-a8608e7a`) dan
Pusat (`SOP-3ded94ef`), dan dirinci teknisnya oleh Instruksi Kerja Menjalankan & Membaca Simulasi
(`IK-e54fa33c`). Tabel menjadi acuan validasi endpoint simulasi backend.

## Kondisi dan Tindakan

Tabel di bawah memetakan kombinasi **tipe simulasi** dan **tipe organisasi** terhadap ketersediaannya.
Baca per baris: untuk satu tipe simulasi, kolom UNIT/CABANG/PUSAT menyatakan apakah simulasi itu
tersedia (Ya) atau tidak (Tidak) bagi organisasi bertipe tersebut.

| Tipe Simulasi | UNIT | CABANG | PUSAT |
|---|---|---|---|
| `up` — Tarif Uang Pangkal | Ya | Tidak | Tidak |
| `us` — Tarif Uang Sekolah | Ya | Tidak | Tidak |
| `income` — Proyeksi Pendapatan | Ya | Ya | Ya |
| `expenses` — Proyeksi Biaya | Ya | Ya | Ya |
| `allocation` — Alokasi Kontribusi | Tidak | Ya | Ya |
| `depreciation` — Depresiasi | Ya | Ya | Ya |
| `summary` — Ringkasan Anggaran | Ya | Ya | Ya |
{.dense}

> Kombinasi lengkap: setiap pasangan (tipe simulasi × tipe organisasi) memiliki tepat satu nilai
> ketersediaan, tidak ada yang kontradiktif.
{.is-warning}

## Penjelasan Tindakan

Pada Decision Table Ketersediaan Tipe Simulasi, nilai **Ya** berarti simulasi dapat dijalankan dan
menghasilkan angka; **Tidak** berarti simulasi tidak berlaku untuk tipe organisasi tersebut dan tidak
boleh dipanggil. Simulasi `up` dan `us` hanya untuk UNIT karena tarif Uang Pangkal dan Uang Sekolah
dihitung terhadap jumlah siswa unit. Simulasi `allocation` hanya untuk CABANG/PUSAT karena hanya
organisasi induk yang mengalokasikan kontribusi ke unit-unit di bawahnya.

## Dasar Keputusan

Aturan ini berlandaskan model domain RAB Yayasan: hanya UNIT yang memungut Uang Pangkal/Uang Sekolah
dari siswa, sedangkan hanya CABANG/PUSAT yang berperan mengalokasikan beban dan menerima kontribusi.
Proyeksi pendapatan, biaya, depresiasi, dan ringkasan berlaku untuk semua tingkat karena setiap
organisasi memiliki beban dan pendapatannya sendiri.

## Dokumen Terkait

- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08`
- [SOP Evaluasi & Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
- [IK Menjalankan & Membaca Simulasi](../ik/ik-e54fa33c-menjalankan-membaca-simulasi.md) — `IK-e54fa33c`
