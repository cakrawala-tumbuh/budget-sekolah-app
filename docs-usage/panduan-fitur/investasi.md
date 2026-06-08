# Investasi Aset Tetap

Halaman **Investasi Aset Tetap** digunakan untuk mencatat rencana pembelian aset tetap baru pada tahun anggaran berjalan. Aplikasi akan menghitung depresiasi tahun berjalan secara otomatis berdasarkan harga beli, umur ekonomis, dan bulan mulai penggunaan.

## Membuka Investasi Aset Tetap

1. Buka halaman detail organisasi.
2. Klik kartu **Investasi** di bagian navigasi fitur.

## Tampilan Halaman

Tabel menampilkan semua aset yang direncanakan beserta kolom kalkulasi:

| Kolom | Keterangan |
|---|---|
| **Kode** | Kode aset (opsional) |
| **Nama Aset** | Nama aset tetap |
| **Kategori** | Kategori aset (misal: Peralatan Kantor, Kendaraan) |
| **Harga Beli** | Harga perolehan aset (Rp) |
| **Dana BoS** | Porsi yang bersumber dari dana BOS/BOP |
| **Umur** | Umur ekonomis dalam tahun |
| **Bln Mulai** | Bulan aset mulai digunakan |
| **Dep/Tahun** | Depresiasi per tahun penuh |
| **Dep Th Ini** | Depresiasi tahun berjalan (dihitung proporsional sejak bulan mulai) |
| **Nilai Akhir** | Nilai buku akhir tahun |

## Menambah Aset Tetap

1. Klik tombol **+ Tambah Aset**.
2. Isi form:
   - **Kategori Aset** — Pilih dari daftar kategori yang tersedia.
   - **Kode Aset** — Kode unik aset (opsional, contoh: KT-001).
   - **Nama Aset** — Nama deskriptif aset.
   - **Harga Perolehan (Rp)** — Harga beli aset.
   - **Dana BoS (Rp)** — Porsi dari dana BOS/BOP (isi 0 bila tidak ada).
   - **Umur Ekonomis (tahun)** — Berapa tahun aset ini akan disusutkan. Nilai default diambil dari kategori aset.
   - **Bulan Mulai Pakai** — Bulan ketika aset mulai digunakan; mempengaruhi besarnya depresiasi tahun berjalan.
3. Klik **Simpan**.

!!! tip "Rumus Depresiasi"
    Depresiasi tahun berjalan dihitung sebagai:  
    `(Harga Beli / Umur Ekonomis) × (13 - Bulan Mulai) / 12`  
    Contoh: aset seharga Rp 12.000.000 dengan umur 4 tahun mulai Juli (bulan 7) →  
    Dep. tahun ini = (12.000.000 / 4) × (13 - 7) / 12 = **Rp 1.500.000**

## Mengedit & Menghapus Aset

Klik ikon pensil untuk mengedit atau ikon tempat sampah untuk menghapus. Konfirmasi pada dialog yang muncul.

## Hubungan dengan Simulasi UP

Depresiasi aset tetap baru (investasi tahun ini) masuk sebagai **komponen UP** dalam simulasi, sehingga ikut menaikkan tarif Uang Pangkal.
