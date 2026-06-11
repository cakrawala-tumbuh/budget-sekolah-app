# Panel Admin

Panel Admin hanya dapat diakses oleh pengguna dengan peran **Admin**. Di sini Admin dapat mengelola data master (kategori biaya, kategori investasi), mereset password akun organisasi, serta melakukan backup dan restore database.

## Mengakses Panel Admin

Klik bagian **Administrasi** di sidebar. Menu ini hanya tampil bila Anda login sebagai Admin.

Panel Admin memiliki empat halaman yang dapat diakses lewat submenu:

- **Kategori Biaya**
- **Kategori Investasi**
- **Pengguna**
- **Database**

## Kategori Biaya

Halaman ini menampilkan daftar semua kategori biaya operasional dan non-operasional yang tersedia di seluruh aplikasi.

### Tabel Kategori Biaya

Setiap baris menampilkan kolom berikut:

| Kolom | Keterangan |
|---|---|
| **Kode Akun** | Kode akun biaya (misal: `5130.01`) |
| **Label** | Nama kategori |
| **Operasional** | Apakah kategori ini bersifat operasional |
| **Komp. UP** | Apakah masuk komponen perhitungan tarif UP |
| **Direct Inc.** | Apakah biaya ini otomatis menjadi pendapatan |
| **Mapping Pendapatan** | Kode akun pendapatan tujuan (jika Direct Income aktif) |
| **Peran Kontribusi** | Peran dalam alokasi kontribusi antar organisasi |

### Menambah Kategori Biaya

1. Klik tombol **+ Tambah**.
2. Isi form:
   - **Kode Akun** — Kode akun biaya (misal: `5130.01`).
   - **Label** — Nama kategori (misal: Pengembangan Guru).
   - **Peran Kontribusi** — Isi bila kategori ini berperan dalam kontribusi antar organisasi (misal: `up_to_pusat`). Kosongkan jika tidak relevan.
   - **Flag** — Centang flag yang sesuai:
     - **Operasional** — Biaya operasional rutin.
     - **Komponen UP** — Masuk ke komponen perhitungan tarif Uang Pangkal.
     - **Direct Income** — Biaya ini secara langsung menghasilkan pendapatan. Bila dicentang, field **Mapping ke Kategori Pendapatan** akan muncul.
   - **Mapping ke Kategori Pendapatan** — Muncul hanya bila **Direct Income** dicentang. Pilih satu kategori pendapatan tujuan. Nilai realisasi biaya ini akan otomatis dihitung sebagai pendapatan pada kategori yang dipilih saat simulasi dijalankan.
   - **Urutan** — Angka urutan tampil di halaman input biaya.
3. Klik **Simpan**.

!!! info "Pendapatan Otomatis dari Biaya (Direct Income)"
    Bila sebuah kategori biaya ditandai **Direct Income** dan di-mapping ke kategori pendapatan tertentu, sistem akan otomatis menjumlahkan nilai entri biaya tersebut sebagai pendapatan — tanpa perlu input manual di halaman Entri Pendapatan. Satu kategori biaya hanya bisa di-mapping ke **satu** kategori pendapatan.

### Mengedit & Menghapus Kategori Biaya

Klik ikon pensil untuk mengedit atau ikon tempat sampah untuk menghapus kategori.

!!! danger "Perhatian"
    Menghapus kategori biaya yang sudah memiliki entri akan menyebabkan entri tersebut kehilangan referensi. Sebaiknya jangan hapus kategori yang sudah digunakan.

## Kategori Investasi

Menampilkan kategori-kategori aset tetap beserta umur ekonomis default per kategori.

### Menambah Kategori Investasi

1. Klik **+ Tambah Kategori**.
2. Isi kode, label, dan umur ekonomis default (tahun).
3. Klik **Simpan**.

## Manajemen Pengguna

Halaman ini menampilkan daftar semua akun pengguna yang terdaftar — baik Admin maupun akun organisasi.

### Mereset Password Organisasi

Bila pengguna organisasi lupa password, Admin dapat mereset passwordnya:

1. Temukan baris organisasi yang bersangkutan.
2. Klik tombol **Reset Password** (ikon kunci).
3. Konfirmasi pada dialog yang muncul.
4. Password baru akan ditampilkan sekali di layar. **Salin dan simpan sebelum menutup dialog** — password tidak dapat dilihat lagi setelah dialog ditutup.
5. Berikan password baru kepada pengguna organisasi tersebut secara langsung.

!!! danger "Password Ditampilkan Sekali"
    Setelah dialog reset password ditutup, password baru tidak dapat dilihat lagi dari sistem. Pastikan sudah menyalinnya sebelum menutup dialog.

## Manajemen Database

Halaman **Database** menyediakan fitur backup dan restore database aplikasi.

Lihat [Panduan Manajemen Database](database.md) untuk petunjuk lengkap.
