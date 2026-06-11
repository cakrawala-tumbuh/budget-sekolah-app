# Penguncian Budget

Fitur penguncian budget memungkinkan pengguna membekukan data anggaran sebuah organisasi sehingga tidak ada perubahan yang bisa dilakukan setelah anggaran selesai disusun. Setelah dikunci, nama pengunci dan waktu penguncian ditampilkan sebagai informasi audit.

## Cara Mengunci Budget

1. Buka halaman detail organisasi yang ingin dikunci.
2. Klik tombol **Kunci Budget** (ikon gembok tertutup, berwarna kuning-oranye) di bagian kanan atas halaman.
3. Budget langsung terkunci — halaman akan menampilkan banner merah dan status **Terkunci** beserta nama pengguna yang mengunci.

!!! warning "Konfirmasi Sebelum Mengunci"
    Tidak ada dialog konfirmasi. Tombol langsung mengunci budget. Pastikan semua data sudah lengkap dan benar sebelum mengunci.

## Cara Membuka Kunci (Unlock)

1. Buka halaman detail organisasi yang sudah terkunci.
2. Klik tombol **Buka Kunci** (ikon gembok terbuka, berwarna merah) di bagian kanan atas halaman.
3. Budget kembali terbuka dan dapat diedit.

!!! info "Siapa yang Bisa Membuka Kunci?"
    Aturan yang berlaku sama dengan siapa yang berhak mengunci. Pengguna yang berwenang mengunci sebuah organisasi juga berwenang membukanya kembali.

## Siapa yang Bisa Mengunci Siapa?

Hak penguncian mengikuti hierarki organisasi:

| Pengguna | Yang Dapat Dikunci |
|---|---|
| **Admin** | Semua organisasi (UNIT, CABANG, PUSAT) |
| **PUSAT** | Dirinya sendiri, semua CABANG, dan semua UNIT |
| **CABANG** | Dirinya sendiri dan semua UNIT yang berada di bawahnya |
| **UNIT** | Hanya dirinya sendiri |

## Informasi yang Ditampilkan Saat Terkunci

Ketika sebuah organisasi sudah dikunci, halaman detail menampilkan:

- **Banner merah** di bagian atas: menampilkan nama pengguna yang mengunci dan keterangan bahwa data tidak dapat diubah.
- **Badge "Terkunci"** di kartu Informasi Organisasi, dilengkapi nama pengunci dan tanggal penguncian.
- Tombol **Edit** dan tombol edit saldo kas disembunyikan.

## Data yang Tidak Bisa Diubah Saat Terkunci

Setelah budget dikunci, semua input data anggaran pada organisasi tersebut diblokir, termasuk:

- Asumsi siswa
- Label kelas
- Entri biaya operasional
- Entri biaya non-operasional
- Investasi aset tetap
- Depresiasi aset lama
- Entri pendapatan
- Override direct income
- Subsidi ke unit
- Saldo kas & setara kas
- Informasi dasar organisasi (nama, kota)

## Pengecualian: Alokasi UP & US Tetap Bisa Diubah

Satu-satunya operasi yang **tetap bisa dilakukan** meski budget sudah dikunci adalah pengelolaan alokasi biaya UP/US oleh CABANG atau PUSAT:

- Mengubah persentase kontribusi UP/US
- Menyinkronkan alokasi biaya UP/US ke unit-unit di bawahnya (termasuk yang sudah dikunci)
- Mengatur alokasi biaya dari induk ke unit *(parent expense allocations)*

Ini memungkinkan Cabang atau Pusat melakukan penyesuaian struktural terhadap komposisi biaya unit bahkan setelah unit-unit tersebut sudah mengunci anggaran mereka.

!!! tip "Kapan Budget Sebaiknya Dikunci?"
    Kunci budget unit setelah semua data input sudah final dan telah diverifikasi. Cabang atau Pusat mengunci budget mereka sendiri setelah semua rekap dari unit-unit di bawahnya sudah lengkap.
