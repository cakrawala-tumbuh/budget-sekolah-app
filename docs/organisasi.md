# Manajemen Organisasi

!!! note "Akses"
    Daftar dan pengelolaan organisasi tersedia bagi **Administrator**. Pengguna
    **Organisasi** langsung diarahkan ke organisasinya sendiri.

## Melihat daftar organisasi

Buka menu **Organisasi** di sidebar. Anda akan melihat kartu setiap organisasi beserta:

- Nama dan **tipe** (Pusat / Cabang / Unit).
- **Kode** organisasi dan **kota**.
- Relasi induk–anak (hierarki).

## Menambah / mengubah organisasi

1. Pada halaman **Organisasi**, gunakan form/tombol tambah.
2. Isi data:
   - **Kode** — kode unik organisasi.
   - **Nama** — nama lengkap organisasi.
   - **Tipe** — Pusat, Cabang, atau Unit.
   - **Kota** — opsional.
   - **Induk (parent)** — pilih organisasi induk (untuk cabang/unit).
3. Simpan. Untuk mengubah, buka kartu organisasi lalu ubah datanya.

## Halaman detail organisasi

Klik sebuah organisasi untuk membuka halaman detailnya. Di sini tersedia pintasan ke
semua fitur, yang **menyesuaikan tipe organisasi**:

### Tersedia untuk semua tipe

- **Summary** — ringkasan RAB organisasi.
- **Lihat Simulasi** — hasil simulasi anggaran.
- **Biaya Operasional**
- **Biaya Non-Operasional**
- **Investasi**
- **Depresiasi Aset Lama**
- **Entri Pendapatan**

### Khusus UNIT

- **Asumsi Siswa** — sebaran siswa per kelas, jumlah siswa baru/lama, override tarif UP/US.
- **Label Kelas** — jumlah tingkat dan nama label per kelas.

### Khusus CABANG & PUSAT

- **Alokasi UP** — komponen Uang Pangkal yang dialokasikan.
- **Alokasi US** — komponen Uang Sekolah yang dialokasikan.
- **Subsidi ke Unit** — beban pemberi menjadi pendapatan penerima.

---

Cara mengisi tiap data dijelaskan di [Input Data Anggaran](data-anggaran.md) dan
[Alokasi & Subsidi](alokasi-subsidi.md).
