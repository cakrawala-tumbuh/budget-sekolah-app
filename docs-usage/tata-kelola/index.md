# Dokumen Tata Kelola & Operasional RAB

Bagian ini memuat dokumen tata kelola & operasional penyusunan Rencana Anggaran Belanja (RAB) yayasan
pendidikan, disusun mengikuti taksonomi SOP / IK / DT / OTS. Rencana lengkap pemetaan fitur ke tiap
jenis dokumen ada di [Rencana Dokumen Tata Kelola](../rencana-dokumen-tata-kelola.md).

## Jenis Dokumen

Tabel di bawah merangkum jenis dokumen tata kelola yang tersedia beserta perannya dan tautan ke
daftar masing-masing.

| Jenis | Peran | Daftar |
|---|---|---|
| **SOP** — Standard Operating Procedure | Alur proses lintas-peran, selaras BPMN | [Daftar SOP](sop/index.md) |
| **DT** — Decision Table | Aturan kondisi → tindakan yang dirujuk SOP/IK | [Daftar DT](dt/index.md) |
| **OTS** — Otomasi Sistem | Alur yang dijalankan sistem otomatis | [Daftar OTS](ots/index.md) |
| **IK** — Instruksi Kerja | Langkah satu tugas di satu layar | [Daftar IK](ik/index.md) |

## Peran (Aktor) — Netral

Seluruh dokumen memakai peran netral berbasis tingkat hierarki, tidak terikat nama sekolah/yayasan
atau jabatan spesifik:

| Peran | Tingkat | Fungsi |
|---|---|---|
| Pengelola Anggaran Unit | Unit | Menyusun & menginput RAB unit |
| Penanggung Jawab Unit | Unit | Memverifikasi postur & memutuskan penguncian |
| Pengelola Anggaran Cabang | Cabang | Evaluasi & konsolidasi unit di bawahnya |
| Pengelola Anggaran Pusat | Pusat | Evaluasi akhir, kontribusi, subsidi, finalisasi |
| Sistem | — | Kalkulasi tarif & depresiasi, pengaliran alokasi |

## Alur Proses Inti (Kategori B)

Penyusunan RAB adalah **siklus berjenjang dua-arah**: **⇊ arah turun** (penetapan beban paralel di
semua tingkat; alokasi kontribusi & investasi keuangan Cabang/Pusat mengalir turun menjadi beban UP
Unit) lalu **⇈ arah naik** (review defisit → kunci → eskalasi Unit → Cabang → Pusat, dengan subsidi
Pusat sebagai upaya terakhir). Orkestrasinya ada pada SOP induk `SOP-f68b0b7a`.
