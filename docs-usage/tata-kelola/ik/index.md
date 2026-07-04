# Instruksi Kerja (IK)

Kumpulan Instruksi Kerja tata kelola RAB yayasan pendidikan. Tiap IK memerinci **satu tugas di satu
layar** aplikasi Budget YPII oleh satu pelaksana, dengan langkah imperatif. IK diturunkan dari SOP
induknya dan dikonversi dari panduan fitur aplikasi.

## Kategori A — Administrasi Sistem & Master Data

Tabel di bawah memuat IK Kategori A (pelaksana Admin) beserta `doc_id`, layar terkait, dan SOP
induknya.

| `doc_id` | Instruksi Kerja | Layar | SOP Induk |
|---|---|---|---|
| `IK-5a258878` | [Mengelola Kategori Biaya](ik-5a258878-mengelola-kategori-biaya.md) | `/admin/expense-categories` | `SOP-955c5e4b` |
| `IK-875b31a7` | [Mengelola Kategori Pendapatan](ik-875b31a7-mengelola-kategori-pendapatan.md) | `/admin/income-categories` | `SOP-955c5e4b` |
| `IK-2e8bacad` | [Mengelola Kategori Investasi](ik-2e8bacad-mengelola-kategori-investasi.md) | `/admin/investment-categories` | `SOP-955c5e4b` |
| `IK-eb6ca4bb` | [Mengelola Akun & Reset Password](ik-eb6ca4bb-mengelola-akun-reset-password.md) | `/admin/users` | `SOP-955c5e4b` |
| `IK-8beb6568` | [Mengunduh Backup Database](ik-8beb6568-backup-database.md) | `/admin/database` | `SOP-56112c9a` |
| `IK-c851c176` | [Memulihkan (Restore) Database](ik-c851c176-restore-database.md) | `/admin/database` | `SOP-56112c9a` |
| `IK-18967569` | [Login & Orientasi Antarmuka](ik-18967569-login-orientasi.md) | `/login` | — (umum) |

## Kategori B — Penyusunan RAB per Organisasi

### Umum (semua tipe organisasi)

Tabel di bawah memuat IK umum yang berlaku untuk semua tipe organisasi beserta `doc_id` dan SOP
induknya.

| `doc_id` | Instruksi Kerja | Layar | SOP Induk |
|---|---|---|---|
| `IK-0955100a` | [Detail Organisasi](ik-0955100a-detail-organisasi.md) | `/organizations/{id}` | `SOP-d3d42a08` |
| `IK-34237bc1` | [Input Biaya Operasional](ik-34237bc1-input-biaya-operasional.md) | `/organizations/{id}/budget-entries` | `SOP-d3d42a08` |
| `IK-521ef63e` | [Input Biaya Non-Operasional](ik-521ef63e-input-biaya-non-operasional.md) | `/organizations/{id}/non-op-entries` | `SOP-d3d42a08` |
| `IK-86ddab34` | [Input Investasi Aset Tetap](ik-86ddab34-input-investasi-aset-tetap.md) | `/organizations/{id}/investments` | `SOP-d3d42a08` |
| `IK-67c5682a` | [Input Depresiasi Aset Lama](ik-67c5682a-input-depresiasi-aset-lama.md) | `/organizations/{id}/depreciation` | `SOP-d3d42a08` |
| `IK-c67d79bf` | [Input Entri Pendapatan](ik-c67d79bf-input-entri-pendapatan.md) | `/organizations/{id}/income-entries` | `SOP-d3d42a08` |
| `IK-e54fa33c` | [Menjalankan & Membaca Simulasi](ik-e54fa33c-menjalankan-membaca-simulasi.md) | `/organizations/{id}/simulation` | `SOP-d3d42a08` |
| `IK-71a239ba` | [Melihat Summary Anggaran](ik-71a239ba-melihat-summary-anggaran.md) | `/organizations/{id}/summary` | `SOP-d3d42a08` |
| `IK-acb4298f` | [Mengunci / Membuka Budget](ik-acb4298f-mengunci-membuka-budget.md) | tombol kunci | `SOP-d3d42a08`, `SOP-a8608e7a`, `SOP-3ded94ef` |

### Khusus UNIT

Tabel di bawah memuat IK yang hanya berlaku bagi organisasi bertipe UNIT.

| `doc_id` | Instruksi Kerja | Layar | SOP Induk |
|---|---|---|---|
| `IK-92c82c50` | [Mengatur Label Kelas](ik-92c82c50-mengatur-label-kelas.md) | `/organizations/{id}/grade-config` | `SOP-d3d42a08` |
| `IK-79bc84c4` | [Mengisi Asumsi Siswa](ik-79bc84c4-mengisi-asumsi-siswa.md) | `/organizations/{id}/asumsi` | `SOP-d3d42a08` |
| `IK-5f6198f9` | [Override Tarif UP/US & Direct Income](ik-5f6198f9-override-tarif-direct-income.md) | `/organizations/{id}/direct-income-override` | `SOP-d3d42a08` |

### Khusus CABANG / PUSAT

Tabel di bawah memuat IK yang hanya berlaku bagi organisasi bertipe CABANG dan PUSAT.

| `doc_id` | Instruksi Kerja | Layar | SOP Induk |
|---|---|---|---|
| `IK-7fb3eb50` | [Mengatur Alokasi UP](ik-7fb3eb50-mengatur-alokasi-up.md) | `/organizations/{id}/alokasi-up` | `SOP-a8608e7a`, `SOP-3ded94ef` |
| `IK-560c6a91` | [Mengatur Alokasi US](ik-560c6a91-mengatur-alokasi-us.md) | `/organizations/{id}/alokasi-us` | `SOP-a8608e7a`, `SOP-3ded94ef` |
| `IK-52fc9ca3` | [Mencatat Investasi Keuangan](ik-52fc9ca3-mencatat-investasi-keuangan.md) | `/organizations/{id}/financial-investments` | `SOP-a8608e7a`, `SOP-f68b0b7a` |
| `IK-f8202a10` | [Mencatat Subsidi ke Unit](ik-f8202a10-mencatat-subsidi.md) | `/organizations/{id}/subsidi` | `SOP-3ded94ef` |
| `IK-6eefc4b5` | [Melihat Summary Komparatif](ik-6eefc4b5-melihat-summary-komparatif.md) | `/organizations/{id}/summary-komparatif` | `SOP-a8608e7a`, `SOP-3ded94ef` |
