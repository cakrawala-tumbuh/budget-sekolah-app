# Override Direct Income

Halaman **Override Direct Income** digunakan untuk menetapkan nilai pendapatan yang dipungut dari siswa bila berbeda dari nominal anggaran biaya. Nilai otomatis dihitung dari dana Yayasan pada entri biaya terkait.

## Membuka Override Direct Income

1. Buka halaman detail organisasi (tipe UNIT).
2. Klik kartu **Override Direct Income** di grid navigasi fitur.

## Tampilan Halaman

Halaman menampilkan tabel dengan satu baris per kategori biaya yang dikonfigurasi sebagai Direct Income.

| Kolom | Keterangan |
|---|---|
| **Kode Biaya** | Kode akun biaya sumber (5xxx) |
| **Uraian Biaya** | Nama biaya beserta kategori pendapatan tujuannya (→ kode + nama) |
| **Otomatis (Rp)** | Nilai yang dihitung otomatis dari anggaran biaya (dana Yayasan) |
| **Override (Rp)** | Nilai pengganti yang telah ditetapkan. Tampil **—** bila belum ada override. |

Baris yang sudah di-override ditandai badge **Override** berwarna amber.

## Menetapkan Override

1. Klik ikon **pensil** di ujung kanan baris yang ingin disesuaikan.
2. Ketik nilai baru pada kotak input yang muncul di kolom **Override**.
3. Tekan **Enter** atau klik ikon **centang** untuk menyimpan.

Simulasi pendapatan dan ringkasan anggaran akan otomatis menggunakan nilai override tersebut.

## Menghapus Override (Kembali ke Nilai Otomatis)

1. Pada baris yang memiliki badge **Override**, klik ikon **putar ulang** (↺).
2. Konfirmasi penghapusan.

Nilai Override kembali menampilkan **—** dan simulasi kembali menggunakan nilai otomatis.

!!! warning "Perhatian"
    Override tidak mengubah data anggaran biaya di halaman **Biaya Operasional**. Override hanya mempengaruhi nilai pendapatan yang diakui dalam simulasi.

!!! info "Hasil Override di Simulasi"
    Nilai yang sudah di-override dapat dilihat di tab **Direct Income** pada halaman [Simulasi Anggaran](simulasi.md). Kolom **Otomatis** tetap menampilkan nilai dari anggaran biaya, sedangkan kolom **Final** menampilkan nilai setelah override.
