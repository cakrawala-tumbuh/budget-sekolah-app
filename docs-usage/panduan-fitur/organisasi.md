# Organisasi

Halaman Organisasi adalah titik masuk utama aplikasi. Di sini Anda dapat melihat semua organisasi yang dapat Anda akses, membuka detail organisasi, serta mengelola data dasarnya.

## Membuka Halaman Organisasi

Setelah login, Anda akan langsung diarahkan ke halaman **Organisasi**. Anda juga dapat mengaksesnya kapan saja lewat menu **Organisasi** di sidebar.

## Tampilan Daftar Organisasi

Halaman menampilkan kartu-kartu organisasi. Setiap kartu memuat:

- Nama dan kode organisasi
- Tipe organisasi (UNIT, CABANG, atau PUSAT)
- Kota (bila diisi)
- Jumlah unit di bawahnya (bila ada)

### Mencari Organisasi

Gunakan kolom pencarian di bagian atas untuk menyaring organisasi berdasarkan nama, kode, atau kota.

## Membuka Detail Organisasi

Klik kartu organisasi untuk masuk ke halaman detail. Di sini Anda dapat mengakses semua fitur terkait organisasi tersebut:

- Navigasi ke fitur input anggaran (biaya, investasi, pendapatan, dsb.)
- Tombol **Summary** untuk melihat ringkasan anggaran
- Tombol **Lihat Simulasi** untuk membuka halaman simulasi

## Mengedit Organisasi

Pengguna dengan peran **Admin** dapat mengedit nama dan kota organisasi.

1. Buka halaman detail organisasi.
2. Klik tombol **Edit** di pojok kanan atas.
3. Ubah data yang diperlukan, lalu klik **Simpan Perubahan**.

!!! note "Kode Organisasi"
    Kode organisasi tidak dapat diubah setelah dibuat. Hubungi admin bila kode perlu dikoreksi.

## Mengedit Saldo Kas & Setara Kas

Pengguna organisasi (bukan Admin) dapat memperbarui saldo kas awal.

1. Buka halaman detail organisasi.
2. Di kartu **Informasi Organisasi**, klik ikon pensil di sebelah nilai **Saldo Kas & Setara Kas**.
3. Masukkan nilai baru, lalu klik **Simpan Perubahan**.

!!! info "Fungsi Saldo Kas"
    Saldo kas digunakan sebagai dasar perhitungan anggaran kas pada halaman Summary.

## Menambah Organisasi *(Admin)*

1. Klik tombol **+ Tambah Organisasi** di halaman daftar organisasi.
2. Isi form: kode, nama, tipe organisasi, kota (opsional), saldo kas (opsional), dan organisasi induk (opsional).
3. Klik **Simpan**.

## Menghapus Organisasi *(Admin)*

Klik ikon tempat sampah pada kartu organisasi di halaman daftar. Konfirmasi penghapusan pada dialog yang muncul.

!!! danger "Perhatian"
    Menghapus organisasi akan menghapus seluruh data anggaran yang terkait. Tindakan ini tidak dapat dibatalkan.
