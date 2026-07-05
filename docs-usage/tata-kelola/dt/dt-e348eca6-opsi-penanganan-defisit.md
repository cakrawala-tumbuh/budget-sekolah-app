---
title: "DT Opsi Penanganan Defisit per Tingkat"
description: "Decision table yang menentukan tuas penanganan defisit yang tersedia dan urutan prioritasnya di tiap tingkat organisasi (Unit, Cabang, Pusat), dengan subsidi Pusat sebagai upaya terakhir."
published: true
date: 2026-07-04T00:00:00.000Z
tags: decision-table, rab, defisit, eskalasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "DT-e348eca6"
category: "decision-table"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-d3d42a08", "SOP-a8608e7a", "SOP-3ded94ef", "SOP-f68b0b7a"]
---

# DT Opsi Penanganan Defisit per Tingkat

Decision Table Opsi Penanganan Defisit per Tingkat ini menentukan tuas apa saja yang boleh dipakai
untuk menutup defisit di tiap tingkat organisasi dan urutan prioritasnya. Tabel ini menjaga agar
penanganan defisit dilakukan berjenjang — tuas termurah dan paling lokal lebih dulu, dengan subsidi
Pusat sebagai upaya terakhir.

## Konteks Penggunaan

Decision Table Opsi Penanganan Defisit per Tingkat dirujuk pada gerbang keputusan defisit di ketiga
sub-SOP: Penyusunan RAB Tingkat Unit (`SOP-d3d42a08` langkah 8), Evaluasi & Konsolidasi Tingkat
Cabang (`SOP-a8608e7a` langkah 2 & 5), dan Evaluasi, Konsolidasi & Subsidi Tingkat Pusat
(`SOP-3ded94ef` langkah 2 & 5). Tabel ini menopang mekanisme eskalasi pada SOP induk
(`SOP-f68b0b7a`).

## Kondisi dan Tindakan

Tabel di bawah memetakan kombinasi **tingkat organisasi** dan **status setelah upaya** terhadap
tindakan yang diambil. Baca per baris: untuk satu tingkat dengan status tertentu, kolom terakhir
adalah tindakan yang berlaku. Tuas yang tersedia bertambah seiring naik tingkat.

| Tingkat | Status | Tindakan / Tuas (urut prioritas) |
|---|---|---|
| Unit | Defisit & masih ada tuas | Kurangi beban unit; tambah/koreksi pendapatan unit; sesuaikan target siswa; tinjau ulang override UP/US |
| Unit | Defisit & tuas habis | Kunci budget unit, lalu eskalasi ke Cabang |
| Unit | Seimbang/surplus | Kunci budget unit, lanjut konsolidasi |
| Cabang | Ada unit defisit & masih ada tuas | Kurangi beban / tambah pendapatan Cabang; redistribusi alokasi kontribusi antar-unit sesuai kemampuan |
| Cabang | Unit defisit & tuas habis | Kunci budget Cabang, lalu eskalasi ke Pusat |
| Cabang | Semua unit seimbang | Kunci budget Cabang, lanjut konsolidasi |
| Pusat | Ada unit defisit & masih ada tuas non-subsidi | Minta/terapkan pengurangan biaya unit; kurangi kontribusi dari unit defisit |
| Pusat | Unit defisit & hanya subsidi tersisa | Berikan subsidi ke unit defisit (upaya terakhir) |
| Pusat | Semua unit tertangani | Kunci & finalisasi RAB Pusat |

!!! warning

    Kombinasi lengkap untuk tiap tingkat (defisit-dengan-tuas, defisit-tanpa-tuas, seimbang) dan tidak
    kontradiktif. Subsidi hanya muncul di baris Pusat saat tuas non-subsidi telah habis.

## Penjelasan Tindakan

Pada Decision Table Opsi Penanganan Defisit per Tingkat, tindakan mengikuti dua prinsip. Pertama,
**lokalitas**: tiap tingkat menyelesaikan defisit dengan tuasnya sendiri sebelum menyerahkan ke atas.
Kedua, **subsidi sebagai jalan terakhir**: subsidi Pusat hanya dipakai setelah pengurangan biaya
unit dan pengurangan kontribusi tidak lagi mencukupi. Redistribusi alokasi kontribusi di Cabang/Pusat
adalah revisi atas alokasi awal yang ditetapkan pada fase paralel penetapan beban.

## Dasar Keputusan

Aturan ini berlandaskan prinsip konsolidasi anggaran berjenjang Yayasan: defisit ditangani sedekat
mungkin dengan sumbernya, kapasitas fiskal induk digunakan bertahap, dan subsidi — sebagai pengeluaran
riil Pusat — diminimalkan dengan menempatkannya pada prioritas paling akhir.

## Dokumen Terkait

- [SOP Siklus Konsolidasi RAB Berjenjang](../sop/sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) — `SOP-f68b0b7a`
- [SOP Penyusunan RAB Tingkat Unit](../sop/sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08`
- [SOP Evaluasi & Konsolidasi RAB Tingkat Cabang](../sop/sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a`
- [SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat](../sop/sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef`
