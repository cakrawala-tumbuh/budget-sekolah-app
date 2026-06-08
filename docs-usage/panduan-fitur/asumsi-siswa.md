# Asumsi Siswa

Halaman **Asumsi Siswa** digunakan untuk memasukkan data jumlah siswa dan staf di organisasi tipe **UNIT**. Data ini menjadi dasar perhitungan otomatis tarif Uang Pangkal (UP) dan Uang Sekolah (US).

!!! info "Khusus UNIT"
    Fitur ini hanya tersedia untuk organisasi bertipe UNIT (sekolah individual).

## Membuka Asumsi Siswa

1. Buka halaman detail organisasi UNIT.
2. Klik kartu **Asumsi Siswa** di bagian atas halaman.

## Tampilan Halaman

Halaman terdiri dari tiga kartu:

- **Sebaran Siswa per Kelas** — Input jumlah siswa di setiap tingkat kelas.
- **Ringkasan Siswa & Staf** — Input jumlah siswa baru, siswa lama, dan guru/karyawan.
- **Override Tarif UP / US** — Opsional; isi bila ingin mengesampingkan hasil kalkulasi otomatis.

## Mengisi Data Asumsi

### Sebaran Siswa per Kelas

1. Masukkan jumlah siswa untuk setiap tingkat kelas (Kelas 1 sampai Kelas 6).
2. Total siswa akan dihitung otomatis di bagian bawah kartu.

!!! tip "Label Kelas"
    Nama kelas (Kelas 1–6, atau Kelas 7–9 untuk SMP) ditentukan di halaman [Label Kelas](label-kelas.md).

### Ringkasan Siswa & Staf

- **Jumlah Siswa Baru** — Siswa yang baru masuk di tahun ajaran ini; digunakan untuk menghitung tarif UP.
- **Jumlah Siswa Lama** — Siswa yang melanjutkan dari tahun sebelumnya.
- **Jumlah Guru / Karyawan** — Jumlah total staf di unit tersebut.

### Override Tarif UP / US *(Opsional)*

Bidang ini dapat dibiarkan kosong agar tarif dihitung otomatis dari komponen biaya.

- **Override Tarif UP** — Isi dengan nominal (Rp) bila ingin menggunakan tarif UP tetap, bukan hasil kalkulasi.
- **Override Tarif US** — Isi dengan nominal (Rp/siswa/bulan) bila ingin menggunakan tarif US tetap.

!!! warning "Efek Override"
    Bila override diisi, tarif yang digunakan dalam simulasi adalah nilai override tersebut (tanpa penambahan komponen depresiasi). Kosongkan kembali bila ingin kembali ke kalkulasi otomatis.

## Menyimpan

Setelah mengisi semua data, klik tombol **Simpan**. Pesan konfirmasi akan muncul bila data berhasil disimpan.
