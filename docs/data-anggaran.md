# Input Data Anggaran

Halaman ini menjelaskan cara mengisi data anggaran sebuah organisasi. Masuk ke menu
**Organisasi → pilih organisasi**, lalu gunakan kartu pintasan di halaman detail.

!!! tip "Urutan disarankan"
    1. Asumsi Siswa & Label Kelas (khusus UNIT)
    2. Biaya Operasional & Non-Operasional
    3. Investasi & Depresiasi Aset Lama
    4. Entri Pendapatan
    5. Jalankan [Simulasi](simulasi.md)

## Asumsi Siswa *(khusus UNIT)*

Menu **Asumsi Siswa** menentukan dasar perhitungan tarif UP/US.

Isi kolom berikut:

- **Jumlah siswa per kelas** (Kelas 1–6, sesuai Label Kelas aktif).
- **Jumlah siswa baru** — dasar pembagi tarif **UP**.
- **Jumlah siswa lama** — siswa yang melanjutkan.
- **Jumlah staf**.
- **Override tarif UP** *(opsional)* — kosongkan untuk memakai tarif otomatis.
- **Override tarif US** *(opsional)* — kosongkan untuk memakai tarif otomatis.

Total siswa dihitung otomatis. Klik **Simpan** untuk menyimpan. Nilai negatif tidak
diperbolehkan.

## Label Kelas *(khusus UNIT)*

Menu **Label Kelas** mengatur jenjang kelas unit:

- **Jumlah tingkat** — antara 1 sampai 6 (mis. SMP = 3).
- **Label per tingkat** — nama tampilan tiap kelas (mis. "Kelas 7", "Kelas 8", "Kelas 9").

Gunakan tombol **Simpan** untuk menyimpan, atau **Reset** untuk mengembalikan ke
konfigurasi bawaan.

## Biaya Operasional

Menu **Biaya Operasional** memuat baris-baris biaya rutin. Tiap baris memiliki:

- **Nomor baris** dan **kategori biaya** (dari data master).
- **Deskripsi** dan **dasar (basis)** perhitungan.
- **Yayasan (foundation)** — porsi pendanaan dari yayasan.
- **BOS** — porsi pendanaan dari dana BOS.
- **Total** — dihitung otomatis (Yayasan + BOS).
- **Catatan** (opsional).
- **Alokasi per kelas** (grade allocation) bila relevan.

Tambah, ubah, atau hapus baris sesuai kebutuhan, lalu simpan.

## Biaya Non-Operasional

Menu **Biaya Non-Operasional** bekerja sama seperti biaya operasional, namun untuk
pos di luar operasional rutin. Struktur kolom dan cara input identik.

## Investasi

Menu **Investasi** mencatat pembelian aset baru:

- **Kategori investasi** (dari data master, punya umur ekonomis bawaan).
- **Kode aset** (opsional) dan **nama aset**.
- **Harga perolehan**.
- **Umur ekonomis** (tahun).
- **Bulan mulai** (1–12).

Aplikasi menghitung otomatis **depresiasi per tahun**, **depresiasi tahun berjalan**, dan
**nilai buku akhir**.

## Depresiasi Aset Lama

Menu **Depresiasi Aset Lama** mencatat aset yang sudah dimiliki sebelumnya:

- **Kode** (opsional) dan **nama aset**.
- **Harga perolehan** dan **tahun perolehan**.
- **Umur ekonomis**.

Hasilnya: **depresiasi per tahun**, **depresiasi tahun berjalan**, dan **nilai buku**.
Beban depresiasi ini ikut diperhitungkan pada simulasi dan basis akrual.

## Entri Pendapatan

Menu **Entri Pendapatan** mencatat sumber pendapatan organisasi. Tiap baris memiliki:

- **Nomor baris** dan **kategori pendapatan** (dari data master).
- **Deskripsi** dan **dasar (basis)**.
- **Jumlah (amount)**.
- **Catatan** (opsional).

!!! info "Pendapatan otomatis"
    Sebagian kategori pendapatan dihitung otomatis oleh sistem (mis. dari simulasi UP/US
    atau dari biaya/BOS), sesuai **metode kalkulasi** yang ditetapkan administrator pada
    [Kategori Pendapatan](admin.md#kategori-pendapatan). Untuk kategori bertipe **Manual**,
    Anda mengisi jumlahnya sendiri.

---

Untuk Cabang/Pusat, lanjutkan ke [Alokasi & Subsidi](alokasi-subsidi.md). Bila data sudah
lengkap, jalankan [Simulasi](simulasi.md).
