---
title: "DT Tarif Kontribusi Default UP & US ke Cabang/Pusat"
description: "Decision table tarif kontribusi default yang dipungut dari Uang Pangkal dan Uang Sekolah unit ke organisasi Cabang dan Pusat, sebagai nilai awal sebelum distribusi proporsional/override."
published: true
date: 2026-07-04T00:00:00.000Z
tags: decision-table, rab, kontribusi, alokasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "DT-e80fe01d"
category: "decision-table"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-a8608e7a", "SOP-3ded94ef", "SOP-f68b0b7a", "IK-7fb3eb50", "IK-560c6a91"]
---

# DT Tarif Kontribusi Default UP & US ke Cabang/Pusat

Decision Table Tarif Kontribusi Default ini menetapkan persentase kontribusi awal yang dipungut dari
Uang Pangkal (UP) dan Uang Sekolah (US) unit untuk disetor ke organisasi Cabang dan Pusat. Nilai ini
menjadi titik awal alokasi kontribusi sebelum disesuaikan dengan distribusi proporsional atau override
per unit.

## Konteks Penggunaan

Decision Table Tarif Kontribusi Default dipakai pada saat Cabang/Pusat menetapkan alokasi kontribusi
awal di fase paralel SOP Siklus Konsolidasi RAB Berjenjang (`SOP-f68b0b7a`), dan saat meredistribusi
alokasi pada evaluasi Cabang (`SOP-a8608e7a`) dan Pusat (`SOP-3ded94ef`). Penerapan teknis per unit
dirinci oleh Instruksi Kerja Mengatur Alokasi UP (`IK-7fb3eb50`) dan Mengatur Alokasi US
(`IK-560c6a91`).

## Kondisi dan Tindakan

Tabel di bawah memetakan kombinasi **sumber tarif** (UP atau US) dan **organisasi penerima** (Cabang
atau Pusat) terhadap persentase kontribusi default. Baca per baris: untuk satu sumber tarif dan satu
penerima, kolom terakhir adalah persentase default yang dipungut.

| Sumber Tarif | Penerima | Tarif Kontribusi Default |
|---|---|---|
| Uang Pangkal (UP) | Pusat | 4% |
| Uang Pangkal (UP) | Cabang | 12% |
| Uang Sekolah (US) | Pusat | 5% |
| Uang Sekolah (US) | Cabang | 10% |

!!! warning

    Nilai default ini dapat diubah melalui konfigurasi contribution rates. Kombinasi lengkap: setiap
    pasangan (sumber × penerima) memiliki tepat satu tarif.

## Penjelasan Tindakan

Pada Decision Table Tarif Kontribusi Default, persentase menyatakan porsi tarif yang mengalir dari
unit ke organisasi induk sebagai kontribusi. Tarif default ini adalah nilai awal; besar kontribusi
aktual tiap unit dihitung sistem secara proporsional berdasarkan jumlah siswa (siswa baru untuk UP,
total siswa untuk US) di antara unit-unit non-override, dan dapat digantikan oleh nilai override per
unit pada ContributionAllocation.

## Dasar Keputusan

Tarif default UP→Pusat 4%, UP→Cabang 12%, US→Pusat 5%, dan US→Cabang 10% mengikuti kebijakan
kontribusi Yayasan sebagaimana didokumentasikan pada konfigurasi instance aplikasi. Mekanisme
distribusi proporsional dan override menjamin jumlah seluruh porsi unit di tiap induk selalu tepat
100% dari basis kontribusi.

## Dokumen Terkait

- [SOP Siklus Konsolidasi RAB Berjenjang](../sop/sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) — `SOP-f68b0b7a`
- [SOP Evaluasi & Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
- [IK Mengatur Alokasi UP](../ik/ik-7fb3eb50-mengatur-alokasi-up.md) — `IK-7fb3eb50`
- [IK Mengatur Alokasi US](../ik/ik-560c6a91-mengatur-alokasi-us.md) — `IK-560c6a91`
