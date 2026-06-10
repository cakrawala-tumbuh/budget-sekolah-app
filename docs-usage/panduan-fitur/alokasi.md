# Alokasi UP & US

Halaman **Alokasi UP** dan **Alokasi US** digunakan oleh organisasi **CABANG** dan **PUSAT** untuk mendistribusikan sebagian komponen biaya mereka ke unit-unit yang dinaungi. Alokasi ini akan menaikkan komponen biaya UP atau US di sisi unit penerima.

!!! info "Khusus CABANG & PUSAT"
    Fitur ini hanya tersedia untuk organisasi bertipe CABANG dan PUSAT.

## Membuka Alokasi UP atau US

1. Buka halaman detail organisasi CABANG atau PUSAT.
2. Klik kartu **Alokasi UP** atau **Alokasi US** di bagian navigasi fitur.

## Tampilan Halaman

Halaman menampilkan tabel alokasi per unit yang dinaungi. Setiap baris mewakili satu unit penerima dengan kolom:

| Kolom | Keterangan |
|---|---|
| **Unit** | Nama dan kode organisasi unit penerima |
| **Komponen Biaya** | Daftar komponen biaya dari Cabang/Pusat yang dialokasikan |
| **Nominal** | Nilai nominal yang dialokasikan ke unit tersebut |
| **Proporsi Otomatis** | Proporsi yang dihitung otomatis dari **sisa porsi** setelah dikurangi total semua override (UP: berdasarkan jumlah siswa baru; US: berdasarkan total siswa) |
| **Override (%)** | Persentase distribusi yang diatur manual, menggantikan proporsi otomatis bila diisi |
| **Persentase Final** | Persentase yang benar-benar digunakan dalam distribusi — menampilkan Override bila diisi, atau Proporsi Otomatis bila tidak |

Di bagian bawah tabel **Proporsi per Unit**, terdapat baris **Total** yang menjumlahkan seluruh kolom Persentase Final dari semua unit. Total ini **selalu 100%** — sistem menjamin hal ini dengan cara:

1. Unit yang memiliki Override: memakai nilai override secara langsung.
2. Unit tanpa Override: mendapat bagian dari **sisa** (100% − total semua override), dibagi proporsional berdasarkan jumlah siswa unit tersebut dibanding unit-unit lain yang juga tidak punya override.

!!! example "Contoh"
    Tiga unit dengan siswa baru: A (override 40%), B (100 siswa, tanpa override), C (300 siswa, tanpa override).
    Sisa = 100% − 40% = 60%. Total siswa auto = 400.
    B mendapat 60% × 100/400 = **15%**, C mendapat 60% × 300/400 = **45%**.
    Total: 40% + 15% + 45% = **100%** ✓

## Mengatur Alokasi

### Alokasi UP

Alokasi UP menentukan komponen biaya dari Cabang/Pusat yang akan dimasukkan ke dalam perhitungan tarif **Uang Pangkal** di unit-unit.

1. Klik tombol **+ Tambah Alokasi** atau klik entri yang sudah ada untuk mengedit.
2. Pilih **unit penerima**, **kategori biaya** yang dialokasikan, dan **nominal** (Rp).
3. Opsional: isi **Override (%)** bila ingin menentukan proporsi distribusi unit ini secara manual. Unit-unit lain yang **tidak** diisi override akan mendapat bagian dari sisa porsi secara otomatis.
4. Klik **Simpan**.

### Alokasi US

Alokasi US menentukan komponen biaya dari Cabang/Pusat yang akan dimasukkan ke dalam perhitungan tarif **Uang Sekolah** di unit-unit.

Cara penggunaan identik dengan Alokasi UP. Proporsi otomatis dihitung berdasarkan **total siswa** masing-masing unit.

## Menghapus Alokasi

Klik ikon tempat sampah pada baris alokasi yang ingin dihapus.

!!! tip "Efek pada Simulasi Unit"
    Setelah alokasi disimpan, komponen yang dialokasikan akan muncul di halaman [Simulasi Anggaran](simulasi.md) unit penerima sebagai "Alokasi biaya dari Cabang" atau "Alokasi biaya dari Pusat", sehingga ikut mempengaruhi tarif UP/US unit tersebut.
