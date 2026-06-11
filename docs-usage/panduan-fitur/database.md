# Manajemen Database

Fitur Manajemen Database memungkinkan Admin mengunduh salinan database (backup) dan memulihkan database dari file backup yang tersimpan.

## Membuka Manajemen Database

Klik **Database** di sidebar bagian **Administrasi**. Menu ini hanya tampil bila Anda login sebagai Admin.

## Tampilan Utama

Halaman ini terdiri dari dua kartu:

- **Backup Database** — mengunduh salinan database aktif sebagai file `.db`.
- **Restore Database** — memulihkan database dari file backup `.db` yang diunggah.

<!-- Screenshot: halaman Manajemen Database dengan dua kartu Backup dan Restore -->

---

## Backup Database

Backup menghasilkan file `.db` yang berisi seluruh data aplikasi: organisasi, anggaran, investasi, pengguna, dan konfigurasi.

### Cara Mengunduh Backup

1. Di kartu **Backup Database**, klik tombol **Unduh Backup**.
2. Browser akan mengunduh file dengan nama seperti `backup_budget_20250611_103000.db`.
3. Simpan file ini di tempat yang aman.

!!! warning "Kerahasiaan File Backup"
    File backup berisi seluruh data termasuk kata sandi terenkripsi. Jangan bagikan file backup kepada pihak yang tidak berwenang.

!!! tip "Lakukan Backup Secara Rutin"
    Biasakan mengunduh backup sebelum melakukan perubahan data yang besar, seperti reset database atau restore dari backup lama.

---

## Restore Database

Restore menggantikan seluruh database aktif dengan isi file backup yang diunggah.

### Cara Melakukan Restore

1. Di kartu **Restore Database**, klik **Choose File** (atau area pilih file di browser Anda).
2. Pilih file backup `.db` yang telah Anda simpan sebelumnya.
3. Nama dan ukuran file akan ditampilkan di bawah input.
4. Klik tombol **Restore Database**.
5. Dialog konfirmasi akan muncul — baca pesan dengan seksama, lalu klik **OK** untuk melanjutkan.
6. Tunggu hingga muncul pesan **"Database berhasil dipulihkan dari file backup"**.

!!! danger "Operasi Tidak Dapat Dibatalkan"
    Setelah restore selesai, semua data yang ada sebelumnya akan hilang permanen dan digantikan oleh isi file backup. Pastikan Anda telah mengunduh backup data terkini sebelum melakukan restore.

!!! note "Format File yang Diterima"
    Hanya file database SQLite (`.db`) yang dihasilkan dari fitur **Unduh Backup** di aplikasi ini yang dapat digunakan. File dari aplikasi lain mungkin tidak kompatibel.
