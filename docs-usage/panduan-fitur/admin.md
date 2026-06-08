# Panel Admin

Panel Admin hanya dapat diakses oleh pengguna dengan peran **Admin**. Di sini Admin dapat mengelola data master (kategori biaya, kategori investasi) dan mereset password akun organisasi.

## Mengakses Panel Admin

Klik menu **Admin** di sidebar. Menu ini hanya tampil bila Anda login sebagai Admin.

Panel Admin memiliki tiga bagian yang dapat diakses lewat submenu:

- **Kategori Biaya**
- **Kategori Investasi**
- **Manajemen Pengguna**

## Kategori Biaya

Halaman ini menampilkan daftar semua kategori biaya operasional dan non-operasional yang tersedia di seluruh aplikasi.

### Menambah Kategori Biaya

1. Klik tombol **+ Tambah Kategori**.
2. Isi form:
   - **Kode** — Kode akun biaya (misal: 5160).
   - **Label** — Nama kategori (misal: Biaya Operasional Sekolah).
   - **Jenis** — Operasional atau Non-Operasional.
   - **Komponen UP** — Centang bila kategori ini masuk ke perhitungan tarif UP.
   - **Urutan tampil** — Angka urutan di halaman input biaya.
3. Klik **Simpan**.

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
