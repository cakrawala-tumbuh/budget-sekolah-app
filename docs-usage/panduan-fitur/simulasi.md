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

### Tab Detail BoS *(khusus UNIT)*

Menampilkan rincian sumber dana BoS (Bantuan Operasional Sekolah) yang menjadi komponen pendapatan unit. Data dikelompokkan dalam dua seksi:

- **Komponen Biaya Operasional** — Total kolom Dana BoS dari setiap kategori biaya anggaran (entri biaya yang diisi di tab [Biaya Operasional](biaya-operasional.md) dan [Biaya Non-Operasional](biaya-non-operasional.md)), diurutkan per kategori.
- **Komponen Investasi** — Total kolom Dana BoS dari setiap kategori investasi (entri yang diisi di tab [Investasi](investasi.md)), diurutkan per kategori.

Setiap seksi menampilkan subtotal, dan tabel diakhiri dengan **Total Pendapatan BoS** yang merupakan penjumlahan kedua seksi.

!!! info "Hubungan dengan Tab Pendapatan"
    Angka Total Pendapatan BoS di tab ini sama dengan nilai Dana BoS yang muncul sebagai satu baris di Tab Pendapatan. Tab ini hanya menampilkan rincian dari mana saja angka tersebut berasal.

### Tab Direct Income *(khusus UNIT)*

Menampilkan rincian biaya yang secara langsung dicatat sebagai pendapatan berdasarkan konfigurasi **Direct Income** pada kategori biaya.

Data ditampilkan **dikelompokkan per kategori pendapatan**. Setiap grup terdiri dari:

- **Baris header grup** — menampilkan kode dan nama kategori pendapatan beserta subtotal nilai seluruh biaya dalam grup tersebut.
- **Baris detail** (di bawah header, sedikit diindentasi) — menampilkan kode biaya, uraian biaya, dan nominal masing-masing biaya penyusun grup.

| Kolom | Keterangan |
|---|---|
| **Kode Biaya** | Kode akun biaya sumber (5xxx) |
| **Uraian Biaya** | Nama kategori biaya |
| **Nominal (Rp)** | Nilai dana yayasan dari biaya tersebut |

!!! info "Mengapa hanya dana Yayasan?"
    Nilai dana BoS tidak ikut diakumulasi di tab ini karena sudah diperhitungkan secara terpisah di **Tab Detail BoS** sebagai Pendapatan BoS. Tab Direct Income hanya mencatat porsi dana yayasan agar tidak terjadi penghitungan ganda.

Footer tabel menampilkan **Total Pendapatan dari Biaya** — jumlah keseluruhan semua grup.

Bila belum ada kategori biaya yang dikonfigurasi sebagai Direct Income, tabel menampilkan pesan kosong.

!!! info "Hubungan dengan Tab Pendapatan"
    Nilai di tab ini sama persis dengan baris-baris Direct Income yang muncul di **Tab Pendapatan**. Tab ini hanya menampilkan rincian dari biaya mana nilai tersebut berasal dan ke kategori pendapatan mana hasilnya dicatat.

!!! note "Konfigurasi Direct Income"
    Mapping biaya → pendapatan dikonfigurasi oleh Admin melalui [Panel Admin → Kategori Biaya](admin.md#menambah-kategori-biaya). Satu kategori biaya hanya bisa di-mapping ke satu kategori pendapatan.

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
