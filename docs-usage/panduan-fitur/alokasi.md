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
| **Proporsi Otomatis** | Proporsi yang dihitung otomatis berdasarkan data siswa unit (UP: jumlah siswa baru; US: total siswa) relatif terhadap seluruh unit |
| **Override (%)** | Persentase distribusi yang diatur manual, menggantikan proporsi otomatis bila diisi |
| **Persentase Final** | Persentase yang benar-benar digunakan dalam distribusi — menampilkan Override bila diisi, atau Proporsi Otomatis bila tidak |

Di bagian bawah tabel **Proporsi per Unit**, terdapat baris **Total** yang menjumlahkan seluruh kolom Persentase Final dari semua unit. Bila tidak ada override, total seharusnya mendekati **100%**. Bila ada unit dengan override manual, periksa baris Total untuk memastikan distribusi proporsional tetap terjaga.

## Mengatur Alokasi

### Alokasi UP

Alokasi UP menentukan komponen biaya dari Cabang/Pusat yang akan dimasukkan ke dalam perhitungan tarif **Uang Pangkal** di unit-unit.

1. Klik tombol **+ Tambah Alokasi** atau klik entri yang sudah ada untuk mengedit.
2. Pilih **unit penerima**, **kategori biaya** yang dialokasikan, dan **nominal** (Rp).
3. Opsional: isi **Override (%)** bila ingin menentukan proporsi distribusi secara manual, berbeda dari proporsi otomatis berdasarkan jumlah siswa baru.
4. Klik **Simpan**.

### Alokasi US

Alokasi US menentukan komponen biaya dari Cabang/Pusat yang akan dimasukkan ke dalam perhitungan tarif **Uang Sekolah** di unit-unit.

Cara penggunaan identik dengan Alokasi UP. Proporsi otomatis dihitung berdasarkan **total siswa** masing-masing unit.

## Menghapus Alokasi

Klik ikon tempat sampah pada baris alokasi yang ingin dihapus.

!!! tip "Efek pada Simulasi Unit"
    Setelah alokasi disimpan, komponen yang dialokasikan akan muncul di halaman [Simulasi Anggaran](simulasi.md) unit penerima sebagai "Alokasi biaya dari Cabang" atau "Alokasi biaya dari Pusat", sehingga ikut mempengaruhi tarif UP/US unit tersebut.
