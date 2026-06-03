# Manajemen Organisasi

!!! note "Akses"
    - **Administrator** melihat dan mengelola **seluruh** organisasi.
    - Pengguna **Organisasi** (non-admin) juga dapat membuka menu **Organisasi**,
      namun hanya melihat **organisasinya sendiri** beserta **seluruh organisasi
      yang dinaunginya secara berjenjang** — tidak hanya anak langsung, tetapi juga
      seluruh keturunan di hierarki bawahnya (mis. Pusat melihat semua Cabang dan
      semua Unit di bawah tiap Cabang).
    - Pengguna **Organisasi** **tidak** memiliki tombol untuk **menambah**,
      **mengubah**, atau **menghapus** organisasi — fitur tersebut khusus Administrator.

## Melihat daftar organisasi

Buka menu **Organisasi** di sidebar. Anda akan melihat kartu setiap organisasi beserta:

- Nama dan **tipe** (Pusat / Cabang / Unit).
- **Kode** organisasi dan **kota**.
- Relasi induk–anak (hierarki).

Daftar yang tampil sudah otomatis dibatasi sesuai hak akses Anda: Administrator
melihat semua, sedangkan pengguna Organisasi melihat lingkup organisasinya sendiri
dan turunannya.

## Menambah / mengubah organisasi

!!! info "Khusus Administrator"
    Langkah pada bagian ini hanya tersedia bagi **Administrator**. Bagi pengguna
    **Organisasi**, tombol **Tambah Organisasi** dan **Edit** tidak ditampilkan.

1. Pada halaman **Organisasi**, gunakan form/tombol tambah.
2. Isi data:
   - **Kode** — kode unik organisasi.
   - **Nama** — nama lengkap organisasi.
   - **Tipe** — Pusat, Cabang, atau Unit.
   - **Kota** — opsional.
   - **Saldo Kas & Setara Kas** — saldo kas awal organisasi (total saja; bawaan `0`).
     Dipakai sebagai dasar perhitungan budget kas pada Summary.
   - **Induk (parent)** — pilih organisasi induk (untuk cabang/unit).
3. Simpan. Untuk mengubah, buka halaman detail organisasi lalu klik **Edit**. Pada mode
   edit, **kode** dan **tipe** organisasi tidak dapat diubah.

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
