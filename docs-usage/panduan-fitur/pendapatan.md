# Entri Pendapatan

Halaman **Entri Pendapatan** digunakan untuk mencatat pendapatan yang nilainya dimasukkan secara manual, seperti pendapatan jasa giro atau pendapatan lain-lain.

## Membuka Entri Pendapatan

1. Buka halaman detail organisasi.
2. Klik kartu **Entri Pendapatan** di bagian navigasi fitur.

## Tampilan Halaman

Entri pendapatan dikelompokkan berdasarkan **kategori pendapatan**. Setiap baris menampilkan:

| Kolom | Keterangan |
|---|---|
| **No** | Nomor urut baris |
| **Uraian** | Deskripsi rincian pendapatan |
| **Dasar** | Catatan dasar perhitungan (opsional) |
| **Nominal (Rp)** | Nilai pendapatan |

## Menambah Entri Pendapatan

1. Klik tombol **+ Tambah Entri**.
2. Isi form:
   - **Kategori Pendapatan** — Pilih dari daftar kategori yang tersedia. Hanya kategori bertipe **Manual** yang dapat dipilih.
   - **No. Baris** — Nomor urut dalam kategori.
   - **Uraian** — Deskripsi rincian pendapatan.
   - **Dasar / Catatan Perhitungan** — Cara menghitung nominal (opsional).
   - **Nominal (Rp)** — Nilai pendapatan.
   - **Catatan** — Catatan tambahan (opsional).
3. Klik **Simpan**.

## Mengedit & Menghapus

Klik ikon pensil untuk mengedit atau ikon tempat sampah untuk menghapus entri.

!!! info "Hubungan dengan Simulasi Pendapatan"
    Entri pendapatan yang dimasukkan di sini akan muncul di tab **Pendapatan** pada halaman [Simulasi Anggaran](simulasi.md), berdampingan dengan pendapatan dari UP dan US.

!!! note "Pendapatan Otomatis dari Biaya (Direct Income)"
    Beberapa kategori pendapatan nilainya **tidak diinput di halaman ini** — nilainya dihitung otomatis dari entri biaya yang di-mapping sebagai *Direct Income*. Kategori jenis ini tidak muncul di daftar pilihan form di atas.

    Bila nilai otomatis tersebut perlu disesuaikan, gunakan halaman [Override Direct Income](override-direct-income.md) yang tersedia di kartu navigasi pada halaman detail organisasi.
