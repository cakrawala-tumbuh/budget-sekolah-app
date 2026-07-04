---
title: "SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat"
description: "Prosedur Pusat menangani unit yang masih defisit setelah eskalasi Cabang: mengurangi kontribusi atau meminta pengurangan biaya unit, lalu memberikan subsidi sebagai upaya terakhir, dan memfinalisasi RAB Yayasan."
published: true
date: 2026-07-04T00:00:00.000Z
tags: sop, rab, anggaran, pusat, subsidi, konsolidasi
editor: markdown
dateCreated: 2026-07-04T00:00:00.000Z
doc_id: "SOP-3ded94ef"
category: "sop"
owner: "Bidang Keuangan Pusat"
status: "draft"
version: "1.0"
effective_date: "2026-07-04"
last_reviewed: "2026-07-04"
related_docs: ["SOP-f68b0b7a", "SOP-a8608e7a", "DT-e348eca6", "DT-e80fe01d", "IK-6eefc4b5", "IK-7fb3eb50", "IK-560c6a91", "IK-34237bc1", "IK-f8202a10", "IK-acb4298f"]
---

# SOP Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat

Prosedur Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat ini merinci bagaimana Pusat menangani
unit-unit yang masih defisit setelah dieskalasi oleh Cabang. Prosedur ini merupakan sub-proses
terakhir dari SOP Siklus Konsolidasi RAB Berjenjang (`SOP-f68b0b7a`) dan dijalankan oleh Pengelola
Anggaran Pusat setelah seluruh Cabang mengunci budget. Sebagai tingkat eskalasi terakhir, Pusat menggunakan subsidi sebagai upaya penutup
apabila seluruh tuas lain telah habis.

## Tujuan

Menuntaskan defisit yang tersisa di seluruh Yayasan: mengurangi defisit unit melalui pengurangan
kontribusi atau pengurangan biaya unit, dan — bila tidak ada lagi yang dapat diatur — menutup sisa
defisit dengan subsidi Pusat, sehingga RAB Yayasan dapat difinalisasi tanpa unit yang menggantung
defisit.

## Ruang Lingkup

Prosedur Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat berlaku bagi organisasi bertipe PUSAT.
Prosedur dimulai saat seluruh Cabang telah terkunci dan mengeskalasi status defisitnya, dan berakhir
saat Pusat mengunci RAB-nya sehingga siklus dapat difinalisasi oleh SOP induk. Penetapan beban &
alokasi awal Pusat berada di fase paralel SOP induk (`SOP-f68b0b7a` langkah 5), bukan di prosedur ini.

## Definisi dan Singkatan

- **Subsidi** — dana yang diberikan Pusat kepada unit defisit untuk menutup sisa defisit; merupakan
  **upaya terakhir** setelah tuas lain habis.
- **Pengurangan kontribusi** — penurunan porsi kontribusi UP/US yang dibebankan kepada unit defisit.
- **Unit defisit tersisa** — unit yang masih defisit setelah penanganan tingkat Unit dan Cabang.

## Penanggung Jawab

Dalam prosedur Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat, peran yang terlibat adalah
**Pengelola Anggaran Pusat** (mengevaluasi, memutuskan pengurangan kontribusi, dan menetapkan
subsidi) dan **Sistem** (menghitung ulang dampak pada tarif unit).

## Dokumen/Alat yang Dibutuhkan

Prosedur Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat menggunakan aplikasi Budget YPII pada
modul Pusat: summary komparatif seluruh unit, alokasi UP/US, subsidi ke unit, biaya Pusat, serta
penguncian budget.

## Prosedur

**Pemicu (Start Event)**: Proses dimulai ketika seluruh Cabang telah mengunci RAB dan mengeskalasi
status defisitnya (message: eskalasi dari `SOP-a8608e7a`).

**Pelaku (Lanes)**: Pengelola Anggaran Pusat dan Sistem.

### 1. Menerima eskalasi & mereview unit yang masih defisit

**Tipe Task (BPMN)**: Receive Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Input (Data Object)**: RAB seluruh Cabang terkunci + status defisit unit
**Aktivitas**: Menerima eskalasi dari Cabang dan meninjau summary komparatif untuk mengidentifikasi
unit yang masih defisit beserta besarannya.
**Output (Data Object)**: Daftar unit defisit tersisa
**Serah-terima (Message Flow)**: Menerima dari lane Cabang (`SOP-a8608e7a` langkah 7)
**Rincian/turunan**: `IK-6eefc4b5` (summary komparatif)
**Alur berikutnya (Sequence Flow)**: → langkah 2

### 2. [Keputusan: memilih tuas penanganan defisit tingkat Pusat]

**Tipe Task (BPMN)**: Business Rule Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Tipe Gateway**: Inclusive (OR) — satu atau lebih tuas dapat dipakai, kecuali subsidi
**Aturan**: Berdasarkan Decision Table `DT-e348eca6` untuk tingkat Pusat, pilih tuas: (a) meminta/
menerapkan pengurangan biaya di unit terkait → langkah 3; dan/atau (b) mengurangi kontribusi dari
unit defisit → langkah 4. Subsidi (langkah 6) **hanya** boleh dipakai setelah tuas (a) dan (b) habis.
**Penggabungan (Merge)**: Jalur yang dipilih bertemu kembali di langkah 5.

### 3. Menerapkan pengurangan biaya di unit terkait

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Input (Data Object)**: Beban unit defisit
**Aktivitas**: Berkoordinasi menerapkan pengurangan biaya pada unit yang masih defisit untuk
memperkecil defisit.
**Output (Data Object)**: Beban unit yang disesuaikan
**Rincian/turunan**: `IK-34237bc1` (biaya, dijalankan pada organisasi unit)
**Alur berikutnya (Sequence Flow)**: → langkah 5

### 4. Mengurangi kontribusi dari unit defisit

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Input (Data Object)**: Alokasi kontribusi ke unit defisit
**Aktivitas**: Menurunkan porsi kontribusi UP/US yang dibebankan kepada unit defisit sehingga beban
teralokasinya berkurang.
**Output (Data Object)**: Alokasi kontribusi Pusat yang direvisi
**Rincian/turunan**: `IK-7fb3eb50` (alokasi UP), `IK-560c6a91` (alokasi US); tarif acuan →
`DT-e80fe01d`
**Alur berikutnya (Sequence Flow)**: → langkah 5

### 5. [Keputusan: masih defisit dan masih ada tuas selain subsidi?]

**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Tipe Gateway**: Exclusive (XOR)
**Aturan**: Jika masih ada unit defisit **dan** masih ada tuas non-subsidi yang dapat digunakan →
kembali ke langkah 1 (evaluasi ulang). Jika seluruh unit seimbang → langkah 7. Jika masih defisit
**tetapi** tuas non-subsidi telah habis → langkah 6 (subsidi).
**Penggabungan (Merge)**: Jalur evaluasi ulang bertemu di langkah 1; jalur subsidi dan jalur seimbang
bertemu di langkah 7.

### 6. Memberikan subsidi ke unit defisit (upaya terakhir)

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Input (Data Object)**: Daftar unit yang masih defisit setelah semua tuas lain habis
**Aktivitas**: Menetapkan dan mencatat subsidi Pusat kepada tiap unit defisit tersisa sebesar
kekurangannya.
**Output (Data Object)**: Subsidi Pusat tercatat; unit defisit tertutup
**Rincian/turunan**: `IK-f8202a10` (subsidi ke unit)
**Alur berikutnya (Sequence Flow)**: → langkah 7

### 7. Mengunci & memfinalisasi RAB Pusat

**Tipe Task (BPMN)**: User Task
**Pelaku (Lane)**: Pengelola Anggaran Pusat
**Input (Data Object)**: RAB Pusat final + seluruh unit tertangani
**Aktivitas**: Mengunci budget Pusat dan menyerahkan konsolidasi akhir ke SOP induk untuk
finalisasi siklus.
**Output (Data Object)**: RAB Pusat terkunci
**Serah-terima (Message Flow)**: Menyerahkan status final ke SOP induk (`SOP-f68b0b7a` langkah 13)
**Rincian/turunan**: `IK-acb4298f`
**Alur berikutnya (Sequence Flow)**: → Akhir Proses

**Akhir Proses (End Event)**: "RAB Pusat terkunci & seluruh unit tertangani" (seimbang atau
disubsidi).

> Pemilihan tuas di langkah 2 dan gerbang di langkah 5 mengikuti Decision Table `DT-e348eca6`, yang
> menempatkan **subsidi sebagai tindakan prioritas terakhir**. Pengurangan kontribusi (langkah 4)
> memakai tarif acuan `DT-e80fe01d`.
{.is-info}

```mermaid
flowchart TD
  start([Mulai: semua Cabang terkunci & eskalasi]) --> a1[Menerima eskalasi & review unit defisit]
  a1 --> g1{Pilih tuas non-subsidi (DT)}
  g1 --> a3[Menerapkan pengurangan biaya unit]
  g1 --> a4[Mengurangi kontribusi dari unit defisit]
  a3 --> g2{Masih defisit & ada tuas non-subsidi?}
  a4 --> g2
  g2 -- Ya --> a1
  g2 -- Tidak, masih defisit --> a6[Memberikan subsidi (upaya terakhir)]
  g2 -- Tidak, seimbang --> a7[Mengunci & memfinalisasi RAB Pusat]
  a6 --> a7
  a7 --> done([Selesai: RAB Pusat terkunci & unit tertangani])
```

## Titik Kontrol dan Verifikasi

Pada prosedur Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat, titik kontrol adalah langkah 5:
subsidi (langkah 6) tidak boleh diberikan selama masih ada tuas non-subsidi yang layak. Verifikasi
akhir memastikan tidak ada unit defisit yang tersisa tanpa subsidi sebelum penguncian pada langkah 7.

## Pengecualian dan Eskalasi

Prosedur ini adalah tingkat eskalasi terakhir — tidak ada eskalasi lebih lanjut. Bila kapasitas
subsidi Pusat sendiri tidak mencukupi seluruh defisit, keputusan penyesuaian menyeluruh (mis.
merevisi kebijakan tarif atau target siswa) dikembalikan ke pimpinan Yayasan di luar lingkup siklus
aplikasi, dan siklus dapat dibuka kembali melalui `IK-acb4298f` atas persetujuan pimpinan.

## Dokumen Terkait

- [SOP Siklus Konsolidasi RAB Berjenjang](sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) — `SOP-f68b0b7a` (induk)
- [SOP Evaluasi & Konsolidasi RAB Tingkat Cabang](sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) — `SOP-a8608e7a` (tingkat eskalasi sebelumnya)
- [DT Opsi Penanganan Defisit per Tingkat](../dt/dt-e348eca6-opsi-penanganan-defisit.md) — `DT-e348eca6`
- [DT Tarif Kontribusi Default](../dt/dt-e80fe01d-tarif-kontribusi-default.md) — `DT-e80fe01d`
- Instruksi Kerja terkait: `IK-6eefc4b5`, `IK-7fb3eb50`, `IK-560c6a91`, `IK-34237bc1`,
  `IK-f8202a10`, `IK-acb4298f`
