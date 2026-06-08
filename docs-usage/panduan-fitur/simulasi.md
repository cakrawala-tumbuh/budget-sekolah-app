# Simulasi Anggaran

Halaman **Simulasi Anggaran** menampilkan hasil kalkulasi otomatis tarif UP dan US beserta proyeksi pendapatan, biaya, kontribusi, dan depresiasi berdasarkan semua data yang telah dimasukkan.

## Membuka Simulasi Anggaran

1. Buka halaman detail organisasi.
2. Klik tombol **Lihat Simulasi** di pojok kanan atas.

## Ringkasan Anggaran

Di bagian atas halaman terdapat kartu ringkasan yang menampilkan:

- **Total Pendapatan** — Proyeksi total pendapatan organisasi.
- **Total Biaya** — Total semua biaya operasional dan non-operasional.
- **Total Depresiasi** — Total beban depresiasi tahun berjalan.
- **Surplus / Defisit** — Selisih pendapatan dikurangi biaya dan depresiasi.

## Tab Simulasi

Halaman menggunakan tab untuk memisahkan jenis data. Tab yang tersedia berbeda tergantung tipe organisasi.

### Tab Uang Pangkal *(khusus UNIT)*

Menampilkan kalkulasi tarif Uang Pangkal:

- **Siswa baru** — Jumlah siswa baru yang digunakan sebagai pembagi.
- **Tarif UP otomatis** — Tarif yang dihitung dari total komponen UP dibagi jumlah siswa baru.
- **Tarif UP override** — Muncul bila override diisi di halaman [Asumsi Siswa](asumsi-siswa.md).
- Tabel komponen biaya UP dari unit sendiri, Cabang, dan Pusat.
- Kolom **Per Siswa** menampilkan kontribusi tiap komponen terhadap tarif UP.

### Tab Uang Sekolah *(khusus UNIT)*

Menampilkan kalkulasi tarif Uang Sekolah:

- **Total siswa** — Jumlah siswa aktif (dasar pembagi US).
- **Tarif US otomatis** — Tarif per siswa per bulan hasil kalkulasi.
- **Tarif US override** — Muncul bila override diisi di halaman [Asumsi Siswa](asumsi-siswa.md).
- Tabel komponen biaya US dari unit sendiri, Cabang, dan Pusat.

### Tab Pendapatan

Menampilkan proyeksi pendapatan dalam dua versi:

- **Otomatis** — Menggunakan tarif UP/US hasil kalkulasi.
- **Override Unit** — Menggunakan tarif UP/US yang diisi manual di unit.

Setiap baris menampilkan kode akun, deskripsi, dan nominal.

### Tab Biaya

Menampilkan daftar semua entri biaya (operasional dan non-operasional) beserta totalnya.

### Tab Kontribusi *(khusus CABANG & PUSAT)*

Menampilkan ringkasan kontribusi UP dan US dari unit-unit yang dinaungi ke organisasi ini, berdasarkan persentase kontribusi yang ditetapkan.

### Tab Depresiasi

Menampilkan ringkasan semua beban depresiasi — baik dari investasi baru maupun aset lama — dengan keterangan sumber setiap item.

## Membaca Hasil Simulasi

!!! tip "Tarif UP Override"
    Bila tarif UP override ditampilkan (warna biru), artinya unit menggunakan tarif tetap, bukan hasil kalkulasi. Tarif ini tidak ditambahkan komponen depresiasi.

!!! tip "Komponen dari Cabang/Pusat"
    Bagian "Alokasi biaya dari Cabang" atau "Alokasi biaya dari Pusat" di tab UP/US menunjukkan biaya yang dialokasikan oleh hierarki di atasnya dan menjadi tanggung jawab unit ini.
