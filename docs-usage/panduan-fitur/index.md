# Semua Fitur

Daftar lengkap fitur aplikasi Budget YPII beserta deskripsi singkat dan tautan ke panduan masing-masing.

## Fitur Umum (Semua Pengguna)

| Fitur | Deskripsi |
|---|---|
| [Organisasi](organisasi.md) | Melihat daftar dan detail organisasi; mengedit nama, kota, dan saldo kas |
| [Asumsi Siswa](asumsi-siswa.md) | Mengatur sebaran siswa per kelas, jumlah siswa baru/lama, dan override tarif UP/US *(hanya UNIT)* |
| [Label Kelas](label-kelas.md) | Mengatur jumlah tingkat kelas dan nama label per tingkat *(hanya UNIT)* |
| [Biaya Operasional](biaya-operasional.md) | Memasukkan dan mengelola entri biaya operasional per kategori |
| [Biaya Non-Operasional](biaya-non-operasional.md) | Memasukkan dan mengelola entri biaya non-operasional |
| [Investasi Aset Tetap](investasi.md) | Mencatat rencana pembelian aset tetap baru beserta kalkulasi depresiasi otomatis |
| [Depresiasi Aset Lama](depresiasi-aset-lama.md) | Mencatat beban depresiasi aset tetap yang sudah ada sebelumnya |
| [Entri Pendapatan](pendapatan.md) | Mencatat entri pendapatan non-UP/US (pendapatan lain-lain, kontribusi, dsb.) |
| [Alokasi UP & US](alokasi.md) | Mengatur alokasi komponen biaya UP/US dari Cabang atau Pusat ke unit-unit *(hanya CABANG & PUSAT)* |
| [Investasi Keuangan](investasi-keuangan.md) | Mencatat instrumen investasi keuangan yang nominalnya dialokasikan sebagai beban UP ke unit anak *(hanya CABANG & PUSAT)* |
| [Subsidi ke Unit](subsidi.md) | Mencatat subsidi yang diberikan dari Cabang/Pusat kepada unit tertentu *(hanya CABANG & PUSAT)* |
| [Simulasi Anggaran](simulasi.md) | Melihat hasil kalkulasi tarif UP/US, simulasi pendapatan, biaya, kontribusi, dan depresiasi |
| [Summary Anggaran](summary.md) | Melihat ringkasan anggaran kas dan akrual dalam format siap cetak |
| [Penguncian Budget](penguncian-budget.md) | Mengunci budget organisasi agar tidak dapat diedit; menampilkan siapa yang mengunci dan kapan |

## Fitur Admin

| Fitur | Deskripsi |
|---|---|
| [Panel Admin](admin.md) | Mengelola kategori biaya, kategori investasi, dan mereset password akun organisasi |
| [Manajemen Database](database.md) | Mengunduh backup database dan memulihkan database dari file backup |

## Hierarki Organisasi

Aplikasi mengenal tiga tipe organisasi:

| Tipe | Keterangan |
|---|---|
| **UNIT** | Sekolah individual. Memiliki asumsi siswa, label kelas, dan input anggaran operasional lengkap. |
| **CABANG** | Yayasan cabang yang menaungi beberapa unit. Memiliki fitur alokasi UP/US dan subsidi. |
| **PUSAT** | Pusat yayasan. Memiliki fitur yang sama dengan CABANG serta visibilitas ke semua organisasi. |
