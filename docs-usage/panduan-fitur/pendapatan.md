# Entri Pendapatan

Halaman **Entri Pendapatan** digunakan untuk mencatat pendapatan selain Uang Pangkal (UP) dan Uang Sekolah (US), seperti pendapatan kontribusi dari unit, pendapatan jasa giro, atau pendapatan lain-lain.

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
   - **Kategori Pendapatan** — Pilih dari daftar kategori yang tersedia.
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

!!! note "Pendapatan Otomatis dari Biaya"
    Beberapa kategori pendapatan nilainya **tidak perlu diinput manual** di sini — nilainya dihitung otomatis dari entri biaya yang di-mapping sebagai *Direct Income*. Konfigurasi mapping dilakukan oleh Admin melalui [Panel Admin → Kategori Biaya](admin.md#mapping-ke-kategori-pendapatan). Pendapatan jenis ini tetap akan muncul di simulasi, tetapi tidak akan tampil di halaman Entri Pendapatan karena bukan input manual.
