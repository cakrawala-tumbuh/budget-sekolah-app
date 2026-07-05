# Rencana Dokumen Tata Kelola & Operasional — Budget YPII

Dokumen ini **memetakan seluruh fitur aplikasi Budget YPII menjadi dua kategori besar
penggunaan**, lalu **menyarankan SOP dan Instruksi Kerja (IK)** yang perlu dibuat untuk tiap
kategori — beserta Decision Table (DT) & Otomasi Sistem (OTS) yang dirujuk pada titik keputusan
dan bagian yang dihitung sistem.

Klasifikasi jenis dokumen mengikuti kerangka keputusan pada skill `dokumen-tata-kelola`
(KBJ/SOP/IK/DT/OTS). Mekanik Wiki.js (frontmatter, path, tautan) mengikuti skill `wikijs-page`
saat dokumen final dibuat. `doc_id` di bawah sudah di-generate (format `[KODE]-[8HEX]`) dan
**bersifat usulan** hingga dipublikasikan.

> **Catatan:** ini adalah **rencana/usulan**, bukan dokumen final. Nilai `owner`, `tags`, dan
> struktur folder wiki mengikuti `CLAUDE.md` repo wiki tujuan saat file benar-benar dibuat.
> File SOP versi awal sudah ditulis di `docs-usage/tata-kelola/sop/`.

---

## Dua Kategori Besar Penggunaan

Aplikasi memiliki dua tipe pengguna dan dua pohon rute (`/admin/*` dan `/organizations/[id]/*`)
yang secara alami membelah penggunaan menjadi dua kategori:

| Kategori | Peran pelaku | Ruang lingkup | Rute |
|---|---|---|---|
| **A. Administrasi Sistem & Master Data** | **Admin** | Menyiapkan fondasi sistem: master kategori, akun organisasi, dan pemeliharaan database. Dilakukan **sebelum & selama** siklus anggaran. | `/admin/*`, `/login` |
| **B. Penyusunan RAB per Organisasi** | **Organisasi** (UNIT / CABANG / PUSAT) | Mengisi data anggaran, menjalankan simulasi tarif UP/US, mengonsolidasikan, dan mengunci budget. | `/organizations/[id]/*`, `/simulation` |

Kategori A adalah **prasyarat** Kategori B: tanpa master kategori & akun, unit tidak dapat
menginput anggaran.

---

## Kategori A — Administrasi Sistem & Master Data

### SOP (proses lintas-peran)

| `doc_id` | SOP | Ringkas alur & pelaku |
|---|---|---|
| `SOP-955c5e4b` | **Persiapan Tahun Anggaran Baru** | Admin menyiapkan/meninjau master kategori (biaya, pendapatan, investasi) → membuat/menyetel akun organisasi → membagikan kredensial ke tiap unit/cabang → menandai siklus siap diisi. Melibatkan Admin ↔ PIC Organisasi. |
| `SOP-56112c9a` | **Pemeliharaan & Pemulihan Database** | Admin melakukan backup berkala; saat insiden, memulihkan database dari backup dengan verifikasi pra/pascapulih. Melibatkan Admin ↔ (opsional) infra/pengguna terdampak. |

### IK (satu tugas, satu layar)

| `doc_id` | Instruksi Kerja | Layar / sumber |
|---|---|---|
| `IK-5a258878` | Mengelola Kategori Biaya (tambah/ubah/hapus) | `/admin/expense-categories` |
| `IK-875b31a7` | Mengelola Kategori Pendapatan | `/admin/income-categories` |
| `IK-2e8bacad` | Mengelola Kategori Investasi | `/admin/investment-categories` |
| `IK-eb6ca4bb` | Mengelola Akun Pengguna & Reset Password Organisasi | `/admin/users` |
| `IK-8beb6568` | Mengunduh Backup Database | `/admin/database` |
| `IK-c851c176` | Memulihkan (Restore) Database dari File Backup | `/admin/database` |
| `IK-18967569` | Login & Orientasi Antarmuka | `/login` (berlaku lintas kategori) |

**Turunan/rujukan:** SOP `SOP-955c5e4b` **memerinci** ke IK kategori & IK akun; SOP
`SOP-56112c9a` memerinci ke IK backup & IK restore.

---

## Kategori B — Penyusunan RAB per Organisasi

Kategori ini adalah **satu siklus berjenjang dua-arah**, bukan tiga proses datar:

- **Arah turun (paralel):** Unit, Cabang, dan Pusat menetapkan beban/investasi **serentak**.
  Cabang & Pusat juga menetapkan **investasi keuangan + alokasi kontribusi awal**, yang
  **mengalir turun** menjadi komponen beban UP di tiap Unit.
- **Titik sinkronisasi:** Unit menyelesaikan rencana pendapatan **setelah** menerima total
  beban teralokasi dari atas.
- **Arah naik (sekuensial):** review defisit → kunci → eskalasi Unit → Cabang → Pusat, dengan
  subsidi Pusat sebagai upaya terakhir.

Karena itu SOP-nya berbentuk **1 SOP induk (orkestrator) + 3 sub-SOP per tingkat**. Penguncian
budget **bukan SOP tersendiri** — ia menjadi gateway + langkah di ujung tiap tingkat
(tetap dirinci oleh `IK-acb4298f`).

### SOP (proses berjenjang)

| `doc_id` | SOP | Peran / Lane | Peran dalam hierarki |
|---|---|---|---|
| `SOP-f68b0b7a` | **Siklus Konsolidasi RAB Berjenjang** (induk/orkestrator) | Pusat, Cabang, Unit | Fork paralel penetapan beban → alir-turun alokasi → join → eskalasi bottom-up |
| `SOP-d3d42a08` | **Penyusunan RAB Tingkat Unit** | Unit | Sub-proses (Call Activity) |
| `SOP-a8608e7a` | **Evaluasi & Konsolidasi RAB Tingkat Cabang** | Cabang | Sub-proses (Call Activity) |
| `SOP-3ded94ef` | **Evaluasi, Konsolidasi & Subsidi RAB Tingkat Pusat** | Pusat | Sub-proses (Call Activity) |

### IK — Umum (semua tipe organisasi)

| `doc_id` | Instruksi Kerja | Layar / sumber |
|---|---|---|
| `IK-0955100a` | Melihat & Mengedit Detail Organisasi (nama, kota, saldo kas) | `/organizations/[id]` |
| `IK-34237bc1` | Input Biaya Operasional | `/organizations/[id]/budget-entries` |
| `IK-521ef63e` | Input Biaya Non-Operasional | `/organizations/[id]/non-op-entries` |
| `IK-86ddab34` | Input Investasi Aset Tetap | `/organizations/[id]/investments` |
| `IK-67c5682a` | Input Depresiasi Aset Lama | `/organizations/[id]/depreciation` |
| `IK-c67d79bf` | Input Entri Pendapatan | `/organizations/[id]/income-entries` |
| `IK-e54fa33c` | Menjalankan & Membaca Simulasi Anggaran | `/organizations/[id]/simulation` |
| `IK-71a239ba` | Melihat Summary Anggaran (kas & akrual) | `/organizations/[id]/summary` |
| `IK-acb4298f` | Mengunci / Membuka Penguncian Budget | tombol kunci di detail organisasi |

### IK — Khusus UNIT

| `doc_id` | Instruksi Kerja | Layar / sumber |
|---|---|---|
| `IK-92c82c50` | Mengatur Label Kelas | `/organizations/[id]/grade-config` |
| `IK-79bc84c4` | Mengisi Asumsi Siswa (sebaran, siswa baru/lama, staf) | `/organizations/[id]/asumsi` |
| `IK-5f6198f9` | Override Tarif UP/US & Direct Income | `/organizations/[id]/direct-income-override` |

### IK — Khusus CABANG / PUSAT

| `doc_id` | Instruksi Kerja | Layar / sumber |
|---|---|---|
| `IK-7fb3eb50` | Mengatur Alokasi UP | `/organizations/[id]/alokasi-up` |
| `IK-560c6a91` | Mengatur Alokasi US | `/organizations/[id]/alokasi-us` |
| `IK-52fc9ca3` | Mencatat Investasi Keuangan | `/organizations/[id]/financial-investments` |
| `IK-f8202a10` | Mencatat Subsidi ke Unit | `/organizations/[id]/subsidi` |
| `IK-6eefc4b5` | Melihat Summary Komparatif Antar-Unit | `/organizations/[id]/summary-komparatif` |

**Turunan/rujukan:**
- `SOP-f68b0b7a` (induk) memanggil ketiga sub-SOP tingkat via Call Activity.
- `SOP-d3d42a08` memerinci ke IK label kelas, asumsi siswa, override, seluruh IK input
  biaya/investasi/depresiasi/pendapatan, dan IK simulasi.
- `SOP-a8608e7a` & `SOP-3ded94ef` memerinci ke IK alokasi UP/US, investasi keuangan, subsidi,
  summary komparatif, dan IK penguncian budget.

---

## Decision Table (DT) & Otomasi Sistem (OTS) yang dirujuk

Beberapa aturan aplikasi berbentuk **lookup kondisi→hasil** (DT) atau **dihitung sistem otomatis**
(OTS). SOP/IK di atas **merujuk** dokumen ini pada titik keputusan / bagian yang otomatis —
bukan menuliskan ulang logikanya di narasi.

| `doc_id` | Jenis | Judul | Dirujuk oleh |
|---|---|---|---|
| `DT-80c8a72a` | DT | Ketersediaan Tipe Simulasi per Tipe Organisasi (UP/US hanya UNIT; alokasi hanya CABANG/PUSAT) | `SOP-d3d42a08`, `SOP-a8608e7a` |
| `DT-b7d9cedd` | DT | Klasifikasi Komponen Biaya: UP vs US vs Direct-Income (berdasarkan kode akun) | `IK-e54fa33c`, `SOP-d3d42a08` |
| `DT-e80fe01d` | DT | Tarif Kontribusi Default (UP→Pusat 4%, UP→Cabang 12%, US→Pusat 5%, US→Cabang 10%) | `SOP-a8608e7a`, `SOP-3ded94ef` |
| `DT-e348eca6` | DT | **Opsi Penanganan Defisit per Tingkat** (tuas yang tersedia & urutan prioritas di Unit/Cabang/Pusat; subsidi = upaya terakhir) | `SOP-d3d42a08`, `SOP-a8608e7a`, `SOP-3ded94ef` |
| `OTS-6f1cf35a` | OTS | Kalkulasi Otomatis Tarif UP & US saat Simulasi | `IK-e54fa33c`, `SOP-d3d42a08` |
| `OTS-9c82d229` | OTS | Kalkulasi Depresiasi Proporsional `(nilai_beli/umur)×(13−bulan)/12` | `IK-86ddab34`, `IK-67c5682a` |

---

## Hierarki turunan (ringkas)

```
Kategori A — Administrasi Sistem & Master Data
  SOP Persiapan Tahun Anggaran Baru ─┬─► IK Kategori Biaya/Pendapatan/Investasi
                                     └─► IK Akun & Reset Password
  SOP Pemeliharaan & Pemulihan DB ───┬─► IK Backup Database
                                     └─► IK Restore Database

Kategori B — Siklus Konsolidasi RAB Berjenjang (SOP-f68b0b7a, induk)
  │  ⇊ FASE TURUN (paralel): Unit/Cabang/Pusat menetapkan beban & investasi serentak;
  │     Cabang/Pusat menetapkan investasi keuangan + alokasi kontribusi awal → mengalir
  │     turun sebagai beban UP ke tiap Unit (sinkronisasi di Unit).
  │  ⇈ FASE NAIK (eskalasi): review defisit → kunci → Unit → Cabang → Pusat → subsidi.
  │
  ├─ Call ─► SOP Penyusunan RAB Unit (SOP-d3d42a08)
  │            ├─► IK Label Kelas, Asumsi Siswa, Override
  │            ├─► IK Input Biaya/Investasi/Depresiasi/Pendapatan
  │            ├─► IK Simulasi ──► DT-b7d9cedd, OTS-6f1cf35a
  │            └─► Gerbang defisit ──► DT-e348eca6 ; kunci ──► IK-acb4298f
  ├─ Call ─► SOP Evaluasi & Konsolidasi Cabang (SOP-a8608e7a)
  │            ├─► IK Alokasi UP/US, Investasi Keuangan, Summary Komparatif
  │            └─► Gerbang opsi ──► DT-e348eca6, DT-e80fe01d ; kunci ──► IK-acb4298f
  └─ Call ─► SOP Evaluasi, Konsolidasi & Subsidi Pusat (SOP-3ded94ef)
               ├─► IK Alokasi (revisi kontribusi), IK Subsidi
               └─► Gerbang opsi ──► DT-e348eca6 ; subsidi = upaya terakhir ──► IK-f8202a10
```

---

## Pemetaan ke `docs-usage` yang sudah ada

Materi mentah untuk dokumen di atas **sebagian sudah tersedia** dan tinggal diubah bentuknya:

| Sumber `docs-usage` | Menjadi |
|---|---|
| `tutorial/input-anggaran-unit.md` | `SOP-d3d42a08` (Penyusunan RAB Unit) — perlu ditambah fase pendapatan, sinkronisasi alokasi, & gerbang defisit |
| `tutorial/membaca-simulasi.md` | `IK-e54fa33c` (Membaca Simulasi) + `OTS-6f1cf35a` |
| `panduan-fitur/*.md` (per fitur) | IK terkait masing-masing (satu panduan fitur ≈ satu IK) |
| `panduan-fitur/admin.md`, `database.md` | IK Kategori A + `SOP-56112c9a` |

> Tiap `panduan-fitur/*.md` berbentuk "cara memakai satu layar" — persis definisi **IK**.
> Tutorial berbentuk "alur ujung-ke-ujung lintas langkah" — persis definisi **SOP**.

---

## Rekap jumlah

| Kategori | SOP | IK | Total |
|---|---|---|---|
| A. Administrasi Sistem & Master Data | 2 | 7 | 9 |
| B. Penyusunan RAB per Organisasi | 4 | 17 | 21 |
| **Total** | **6** | **24** | **30** |

Selain itu terdapat **4 DT** dan **2 OTS** yang dirujuk (bukan SOP/IK).

---

## Langkah selanjutnya (usulan)

1. ✅ Konfirmasi dua kategori & daftar SOP/IK.
2. ✅ Restrukturisasi SOP Kategori B menjadi 1 induk + 3 tingkat (model dua-arah).
3. ✅ Tulis file SOP awal di `docs-usage/tata-kelola/sop/`.
4. ✅ Buat DT (`DT-80c8a72a`, `DT-b7d9cedd`, `DT-e80fe01d`, `DT-e348eca6`) & OTS (`OTS-6f1cf35a`,
   `OTS-9c82d229`) di `docs-usage/tata-kelola/dt/` & `docs-usage/tata-kelola/ots/`, dirujuk dari SOP.
5. ✅ Ubah `panduan-fitur/*.md` menjadi 24 IK bert-`doc_id` di `docs-usage/tata-kelola/ik/`,
   tautkan ke SOP induk & DT/OTS terkait.
6. ✅ Tulis SOP Kategori A (`SOP-955c5e4b` Persiapan Tahun Anggaran Baru, `SOP-56112c9a`
   Pemeliharaan & Pemulihan Database) di `docs-usage/tata-kelola/sop/`.
7. ✅ **Seluruh dokumen tata kelola (6 SOP + 4 DT + 2 OTS + 24 IK) LENGKAP.**
8. ✅ Perbaiki sintaks Wiki.js (`{.is-info}`, `{.is-warning}`, `{.is-danger}`, `{.is-tip}`, `{.dense}`)
   di 30 dokumen tata kelola menjadi admonition MkDocs standar (`!!! info` dkk.) — situs yang
   dideploy memakai MkDocs Material, bukan Wiki.js, sehingga sintaks Wiki.js asli tidak dikenali
   temanya (tabel `{.dense}` bahkan bocor jadi teks di HTML sebelum diperbaiki).
9. ✅ **Pensiunkan `panduan-fitur/*.md` & `tutorial/*.md`** — kontennya tumpang tindih persis
   dengan IK/SOP hasil konversi. Kedua folder kini berisi halaman stub singkat yang menautkan ke
   IK/SOP pengganti (bukan dihapus, agar bookmark/tautan lama tidak 404), dan **dikeluarkan dari
   nav** `mkdocs-usage.yml`. `docs-usage/tata-kelola/` kini satu-satunya sumber dokumentasi fitur
   yang dinavigasi.
10. Berikutnya: terapkan mekanik Wiki.js (frontmatter, path, tautan) via skill `wikijs-page` bila
    dokumen ini suatu saat juga dipublikasikan ke instance Wiki.js terpisah.
