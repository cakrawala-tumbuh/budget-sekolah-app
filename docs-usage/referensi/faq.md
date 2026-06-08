# FAQ (Pertanyaan yang Sering Diajukan)

## Login & Akses

**Saya lupa password. Apa yang harus dilakukan?**  
Hubungi administrator sistem. Admin akan mereset password Anda dan memberikan password baru secara langsung.

**Saya tidak bisa melihat organisasi lain. Apakah normal?**  
Ya. Pengguna organisasi hanya dapat mengakses organisasi mereka sendiri beserta unit/cabang yang dinaunginya. Untuk akses lebih luas, hubungi Admin.

---

## Asumsi Siswa

**Apa perbedaan "Siswa Baru" dengan "Siswa Lama" di Asumsi Siswa?**  
- **Siswa Baru** — Siswa yang baru masuk di tahun ajaran ini; digunakan sebagai pembagi dalam kalkulasi tarif UP.
- **Siswa Lama** — Siswa yang melanjutkan dari tahun sebelumnya; termasuk dalam total siswa untuk kalkulasi tarif US.

**Kapan saya harus mengisi Override Tarif UP/US?**  
Isi override hanya bila yayasan sudah menetapkan tarif tertentu yang tidak ingin dihitung ulang dari komponen biaya. Bila dikosongkan, tarif dihitung otomatis dari data biaya yang dimasukkan.

---

## Biaya & Investasi

**Apa perbedaan kolom "Yayasan" dan "BOS" di form biaya?**  
- **Yayasan** — Nominal yang ditanggung oleh yayasan dari anggaran internal.
- **BOS/BOP** — Nominal yang bersumber dari dana Bantuan Operasional Sekolah atau Bantuan Operasional Pendidikan pemerintah.

Total keduanya menjadi total biaya entri tersebut.

**Kategori biaya mana yang masuk ke komponen UP?**  
Kategori yang ditandai badge **UP** di halaman Biaya Operasional. Secara umum, kategori dengan kode akun `5130.xx` termasuk komponen UP. Untuk daftar pasti, lihat konfigurasi di panel Admin → Kategori Biaya.

**Apa bedanya halaman Investasi dengan Depresiasi Aset Lama?**  
- **Investasi** — Untuk aset yang *baru dibeli* tahun ini. Depresiasi dihitung otomatis oleh sistem.
- **Depresiasi Aset Lama** — Untuk aset yang sudah dimiliki sebelumnya. Nilai depresiasi diisi manual.

---

## Simulasi

**Mengapa tarif UP/US saya sangat tinggi?**  
Kemungkinan penyebab:
1. Total biaya terlalu besar relatif terhadap jumlah siswa — periksa entri biaya untuk memastikan tidak ada duplikasi atau kesalahan nominal.
2. Jumlah siswa baru (untuk UP) atau total siswa (untuk US) terlalu kecil — periksa halaman Asumsi Siswa.
3. Ada alokasi biaya dari Cabang/Pusat yang menambah komponen biaya — hubungi Cabang/Pusat terkait.

**Apa perbedaan kolom "Otomatis" dan "Override Unit" di tab Pendapatan?**  
- **Otomatis** — Proyeksi pendapatan menggunakan tarif UP/US hasil kalkulasi sistem.
- **Override Unit** — Proyeksi pendapatan menggunakan tarif UP/US yang diisi manual di halaman Asumsi Siswa.

**Mengapa ada komponen "Alokasi biaya dari Cabang" di simulasi saya?**  
Cabang Anda telah mengalokasikan sebagian biaya mereka ke unit Anda. Biaya ini ikut masuk dalam perhitungan tarif UP/US. Hubungi Cabang bila perlu klarifikasi mengenai alokasi tersebut.

---

## Summary & Cetak

**Bagaimana cara mencetak Summary Anggaran sebagai PDF?**  
1. Buka halaman Summary Anggaran.
2. Klik tombol **Cetak** (ikon printer).
3. Di dialog cetak browser, pilih printer **Save as PDF** atau **Microsoft Print to PDF**.
4. Klik **Save** / **Cetak**.
