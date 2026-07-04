# SOP — Standard Operating Procedure

Kumpulan Standard Operating Procedure (SOP) tata kelola RAB yayasan pendidikan (Unit, Cabang, dan
Pusat). SOP Kategori B (Penyusunan RAB) berbentuk **siklus berjenjang dua-arah**: satu SOP induk
mengorkestrasi tiga sub-SOP per tingkat. Narasi Prosedur tiap SOP selaras BPMN (Start/End Event,
Task, Lane, Gateway, Sequence/Message Flow).

## SOP Kategori A — Administrasi Sistem & Master Data

Tabel di bawah memuat SOP administrasi (pelaksana Administrator Sistem) yang menyiapkan dan memelihara
fondasi sebelum & selama siklus RAB.

| `doc_id` | SOP | Peran / Lane | Posisi |
|---|---|---|---|
| `SOP-955c5e4b` | [Persiapan Tahun Anggaran Baru](sop-955c5e4b-persiapan-tahun-anggaran-baru.md) | Administrator Sistem | Prasyarat siklus RAB |
| `SOP-56112c9a` | [Pemeliharaan & Pemulihan Database](sop-56112c9a-pemeliharaan-pemulihan-database.md) | Administrator Sistem | Pemeliharaan berkelanjutan |

## SOP Kategori B — Penyusunan RAB (siklus berjenjang)

Tabel di bawah memuat SOP penyusunan RAB beserta `doc_id`, peran, dan posisinya dalam hierarki
proses. Sub-SOP tingkat dipanggil oleh SOP induk melalui Call Activity.

| `doc_id` | SOP | Peran / Lane | Posisi |
|---|---|---|---|
| `SOP-f68b0b7a` | [Siklus Konsolidasi RAB Berjenjang](sop-f68b0b7a-siklus-konsolidasi-rab-berjenjang.md) | Pusat, Cabang, Unit | Induk / orkestrator |
| `SOP-d3d42a08` | [Penyusunan RAB Tingkat Unit](sop-d3d42a08-penyusunan-rab-tingkat-unit.md) | Unit | Sub-proses |
| `SOP-a8608e7a` | [Evaluasi & Konsolidasi RAB Tingkat Cabang](sop-a8608e7a-evaluasi-konsolidasi-rab-tingkat-cabang.md) | Cabang | Sub-proses |
| `SOP-3ded94ef` | [Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat](sop-3ded94ef-evaluasi-konsolidasi-subsidi-rab-tingkat-pusat.md) | Pusat | Sub-proses (eskalasi terakhir) |

## Alur ringkas

Siklus berjalan dua arah: **⇊ arah turun** (penetapan beban paralel di semua tingkat; alokasi
kontribusi & investasi keuangan Cabang/Pusat mengalir turun menjadi beban UP Unit) lalu **⇈ arah
naik** (review defisit → kunci → eskalasi Unit → Cabang → Pusat, dengan subsidi Pusat sebagai upaya
terakhir).

## Dokumen turunan yang dirujuk

SOP di atas merujuk Decision Table dan Otomasi Sistem: [Daftar DT](../dt/index.md)
(`DT-80c8a72a`, `DT-b7d9cedd`, `DT-e80fe01d`, `DT-e348eca6`) dan [Daftar OTS](../ots/index.md)
(`OTS-6f1cf35a`, `OTS-9c82d229`), serta diperinci oleh [Daftar IK](../ik/index.md). Seluruh jenis
dokumen tata kelola (SOP/DT/OTS/IK) kini lengkap. Rencana lengkap ada di
[Rencana Dokumen Tata Kelola](../../rencana-dokumen-tata-kelola.md).
