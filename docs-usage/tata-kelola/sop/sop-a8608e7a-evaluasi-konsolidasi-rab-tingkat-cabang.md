---
title: "SOP Evaluasi & Konsolidasi RAB Tingkat Cabang"
description: "Prosedur Cabang mengevaluasi unit-unit defisit setelah semua unit terkunci: menurunkan beban/pendapatan Cabang atau meredistribusi alokasi kontribusi, lalu mengunci RAB Cabang dan mengeskalasi sisa defisit ke Pusat."
published: true
date: 2026-07-04T00:00:00.000Z
tags: sop, rab, anggaran, cabang, konsolidasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "SOP-a8608e7a"
category: "sop"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-f68b0b7a", "SOP-d3d42a08", "SOP-3ded94ef", "DT-e348eca6", "DT-e80fe01d", "IK-6eefc4b5", "IK-7fb3eb50", "IK-560c6a91", "IK-34237bc1", "IK-c67d79bf", "IK-52fc9ca3", "IK-acb4298f"]
---

# SOP Evaluasi & Konsolidasi RAB Tingkat Cabang

Prosedur Evaluasi & Konsolidasi RAB Tingkat Cabang ini merinci bagaimana sebuah Cabang menangani
unit-unit defisit yang telah mengeskalasi RAB-nya. Prosedur ini merupakan sub-proses dari SOP Siklus
Konsolidasi RAB Berjenjang (`SOP-f68b0b7a`) dan dijalankan oleh Pengelola Anggaran Cabang setelah
seluruh unit di bawahnya mengunci budget. Penetapan beban dan alokasi kontribusi awal Cabang telah dilakukan pada fase paralel SOP
induk; prosedur ini berfokus pada evaluasi eskalasi dan konsolidasi.

## Tujuan

Meminimalkan atau menghilangkan defisit unit-unit di bawah Cabang dengan tuas yang tersedia di
tingkat Cabang — penyesuaian beban/pendapatan Cabang dan redistribusi alokasi kontribusi sesuai
kemampuan tiap unit — sebelum mengunci RAB Cabang dan mengeskalasi sisa defisit ke Pusat.

## Ruang Lingkup

Prosedur Evaluasi & Konsolidasi RAB Tingkat Cabang berlaku bagi organisasi bertipe CABANG. Prosedur
dimulai saat seluruh unit di bawah Cabang telah terkunci dan berakhir saat Cabang mengunci budget
serta mengeskalasi sisa defisit ke Pusat. Penetapan beban & alokasi awal Cabang berada di fase
paralel SOP induk (`SOP-f68b0b7a` langkah 4), bukan di prosedur ini.

## Definisi dan Singkatan

- **Redistribusi alokasi kontribusi** — penyusunan ulang porsi kontribusi UP/US yang dialokasikan
  Cabang ke tiap unit, disesuaikan dengan kemampuan masing-masing unit.
- **Unit defisit** — unit yang mengeskalasi RAB terkunci dengan sisa defisit.
- **Kunci budget** — penguncian RAB Cabang, menandai kesiapan konsolidasi Pusat.

## Penanggung Jawab

Dalam prosedur Evaluasi & Konsolidasi RAB Tingkat Cabang, peran yang terlibat adalah **Pengelola
Anggaran Cabang** (mengevaluasi & memutuskan tuas penanganan) dan **Sistem** (menghitung ulang
dampak alokasi pada tarif unit).

## Dokumen/Alat yang Dibutuhkan

Prosedur Evaluasi & Konsolidasi RAB Tingkat Cabang menggunakan aplikasi Budget YPII pada modul
Cabang: summary komparatif antar-unit, alokasi UP/US, investasi keuangan, biaya & pendapatan Cabang,
serta penguncian budget.

## Prosedur

**Pemicu (Start Event)**: Proses dimulai ketika seluruh unit di bawah Cabang telah mengunci RAB dan
mengeskalasi status defisitnya (message: eskalasi dari `SOP-d3d42a08`).

**Pelaku (Lanes)**: Pengelola Anggaran Cabang dan Sistem.

### 1. Menerima eskalasi & mengevaluasi unit-unit defisit

**Tipe Task (BPMN)**: Receive Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Input (Data Object)**: RAB seluruh unit terkunci + status defisit
**Aktivitas**: Menerima eskalasi dari unit-unit dan meninjau summary komparatif untuk
mengidentifikasi unit mana yang defisit dan seberapa besar.
**Output (Data Object)**: Daftar unit defisit & besaran defisit
**Serah-terima (Message Flow)**: Menerima dari lane Unit (`SOP-d3d42a08` langkah 10)
**Rincian/turunan**: `IK-6eefc4b5` (summary komparatif)
**Alur berikutnya (Sequence Flow)**: → langkah 2

### 2. [Keputusan: memilih tuas penanganan defisit tingkat Cabang]

**Tipe Task (BPMN)**: Business Rule Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Tipe Gateway**: Inclusive (OR) — satu atau lebih tuas dapat dipakai
**Aturan**: Berdasarkan Decision Table `DT-e348eca6` untuk tingkat Cabang, pilih satu atau lebih
tuas: (a) menurunkan beban atau menambah pendapatan Cabang → langkah 3; dan/atau (b) meredistribusi
alokasi kontribusi ke unit sesuai kemampuan → langkah 4.
**Penggabungan (Merge)**: Jalur yang dipilih bertemu kembali di langkah 5.

### 3. Menurunkan beban atau menambah pendapatan Cabang

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Input (Data Object)**: Beban & pendapatan Cabang
**Aktivitas**: Mengurangi beban Cabang atau menambah pendapatan Cabang untuk memperkecil beban yang
dialokasikan ke unit.
**Output (Data Object)**: Beban/pendapatan Cabang yang disesuaikan
**Rincian/turunan**: `IK-34237bc1` (biaya), `IK-c67d79bf` (pendapatan)
**Alur berikutnya (Sequence Flow)**: → langkah 5

### 4. Meredistribusi alokasi kontribusi ke unit sesuai kemampuan

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Input (Data Object)**: Alokasi kontribusi awal + kemampuan tiap unit
**Aktivitas**: Menyusun ulang distribusi alokasi kontribusi UP/US antar-unit — menurunkan porsi unit
yang defisit dan menaikkan porsi unit yang lebih mampu.
**Output (Data Object)**: Alokasi kontribusi Cabang yang direvisi
**Rincian/turunan**: `IK-7fb3eb50` (alokasi UP), `IK-560c6a91` (alokasi US); tarif acuan →
`DT-e80fe01d`
**Alur berikutnya (Sequence Flow)**: → langkah 5

### 5. [Keputusan: masih ada unit defisit dan masih dapat diatur?]

**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Tipe Gateway**: Exclusive (XOR)
**Aturan**: Jika masih ada unit defisit **dan** masih ada tuas Cabang yang dapat digunakan → kembali
ke langkah 1 (evaluasi ulang). Jika seluruh unit seimbang **atau** tuas Cabang telah habis → lanjut
langkah 6.
**Penggabungan (Merge)**: Jalur evaluasi ulang bertemu alur utama di langkah 1; jalur "lanjut" menuju
langkah 6.

### 6. Mengunci budget Cabang

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Input (Data Object)**: RAB Cabang final versi Cabang
**Aktivitas**: Mengunci budget Cabang agar tidak dapat diubah, menandai kesiapan untuk konsolidasi
Pusat.
**Output (Data Object)**: RAB Cabang terkunci (+ status defisit bila ada)
**Rincian/turunan**: `IK-acb4298f`
**Alur berikutnya (Sequence Flow)**: → langkah 7

### 7. Mengeskalasi sisa defisit ke Pusat

**Tipe Task (BPMN)**: Send Task
**Pelaku (Lane)**: Pengelola Anggaran Cabang
**Input (Data Object)**: RAB Cabang terkunci + status defisit
**Aktivitas**: Menyerahkan RAB Cabang yang terkunci beserta unit-unit yang masih defisit kepada
Pusat untuk dievaluasi.
**Output (Data Object)**: Notifikasi eskalasi ke Pusat
**Serah-terima (Message Flow)**: Cabang mengirimkan RAB terkunci & status defisit ke lane Pusat
(masuk ke `SOP-3ded94ef`)
**Alur berikutnya (Sequence Flow)**: → Akhir Proses

**Akhir Proses (End Event)**: "RAB Cabang terkunci & seluruh unit seimbang" atau "RAB Cabang terkunci
& dieskalasi ke Pusat" (dengan sisa unit defisit).

> Pemilihan tuas penanganan defisit di langkah 2 dan gerbang loop di langkah 5 mengikuti Decision
> Table `DT-e348eca6`. Redistribusi alokasi (langkah 4) memakai tarif kontribusi acuan `DT-e80fe01d`.
{.is-info}

```mermaid
flowchart TD
  start([Mulai: semua unit terkunci & eskalasi]) --> a1[Menerima eskalasi & evaluasi unit defisit]
  a1 --> g1{Pilih tuas penanganan (DT)}
  g1 --> a3[Menurunkan beban / menambah pendapatan Cabang]
  g1 --> a4[Meredistribusi alokasi kontribusi ke unit]
  a3 --> g2{Masih ada unit defisit & bisa diatur?}
  a4 --> g2
  g2 -- Ya --> a1
  g2 -- Tidak --> a6[Mengunci budget Cabang]
  a6 --> a7[/Mengeskalasi sisa defisit ke Pusat/]
  a7 --> done([Selesai: RAB Cabang terkunci])
```

## Titik Kontrol dan Verifikasi

Pada prosedur Evaluasi & Konsolidasi RAB Tingkat Cabang, titik kontrol adalah langkah 5: Cabang
tidak boleh mengunci budget selama masih ada unit defisit yang sebenarnya masih dapat ditangani
dengan tuas Cabang. Verifikasi dilakukan melalui summary komparatif (langkah 1) yang menunjukkan
posisi seluruh unit setelah tiap penyesuaian.

## Pengecualian dan Eskalasi

Bila setelah seluruh tuas Cabang habis masih terdapat unit defisit, Cabang tetap mengunci budget
(langkah 6) dan mengeskalasi sisa defisit ke Pusat (langkah 7) — Cabang tidak menahan proses.
Redistribusi alokasi pada langkah 4 adalah **revisi** atas alokasi awal yang ditetapkan Cabang di
fase paralel SOP induk (`SOP-f68b0b7a` langkah 4).

## Dokumen Terkait

- [SOP Siklus Konsolidasi RAB Berjenjang](sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) — `SOP-f68b0b7a` (induk)
- [SOP Penyusunan RAB Tingkat Unit](sop-d3d42a08-penyusunan-rab-tingkat-unit.md) — `SOP-d3d42a08` (tingkat eskalasi sebelumnya)
- [SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat](sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) — `SOP-3ded94ef` (tingkat eskalasi berikutnya)
- [DT Opsi Penanganan Defisit per Tingkat](../dt/dt-e348eca6-opsi-penanganan-defisit.md) — `DT-e348eca6`
- [DT Tarif Kontribusi Default](../dt/dt-e80fe01d-tarif-kontribusi-default.md) — `DT-e80fe01d`
- Instruksi Kerja terkait: `IK-6eefc4b5`, `IK-7fb3eb50`, `IK-560c6a91`, `IK-34237bc1`,
  `IK-c67d79bf`, `IK-52fc9ca3`, `IK-acb4298f`
