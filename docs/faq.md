# Tanya Jawab (FAQ)

## Saya tidak bisa masuk (login)

- Pastikan **username** dan **password** benar.
- Akun mungkin **non-aktif** — hubungi administrator.
- Lupa kata sandi? Administrator dapat mengatur ulang melalui menu **Pengguna**.

## Kenapa menu yang saya lihat berbeda dari rekan saya?

Menu menyesuaikan **peran** Anda. Administrator melihat semua menu administrasi;
pengguna Organisasi melihat Dashboard, **Organisasi** (lihat saja — organisasinya
sendiri beserta organisasi di bawahnya secara berjenjang), dan Simulasi untuk
organisasinya. Tombol untuk menambah/mengubah organisasi hanya muncul bagi Administrator.

## Kenapa menu "Asumsi Siswa" / "Label Kelas" tidak muncul?

Kedua menu itu **khusus untuk organisasi tipe UNIT**. Organisasi Cabang dan Pusat tidak
memiliki siswa langsung, sehingga menggunakan **Alokasi UP/US** dan **Subsidi**.

## Kenapa menu "Alokasi UP/US" dan "Subsidi" tidak muncul?

Menu itu **khusus tipe CABANG dan PUSAT**. Tidak tampil pada organisasi UNIT.

## Tarif UP/US yang muncul bukan angka yang saya inginkan

Aplikasi menghitung **tarif otomatis** dari data biaya. Bila ingin memakai angka final
berbeda, isi **Override tarif UP/US** di menu [Asumsi Siswa](data-anggaran.md#asumsi-siswa-khusus-unit).
Kosongkan override untuk kembali memakai tarif otomatis.

## Pendapatan tidak bisa saya isi manual

Beberapa kategori pendapatan dihitung otomatis (mis. dari simulasi UP/US atau dari BOS)
sesuai **metode kalkulasi** yang diatur administrator. Hanya kategori bertipe **MANUAL**
yang diisi manual. Lihat [Kategori Pendapatan](admin.md#kategori-pendapatan).

## Apa beda basis Kas dan Akrual di Summary?

- **Kas** memperhitungkan pengeluaran **investasi** secara penuh.
- **Akrual** memperhitungkan **beban depresiasi** alih-alih investasi penuh.

Lihat [Simulasi & Laporan](simulasi.md#ringkasan-anggaran-summary).

## Hasil simulasi defisit, apa yang harus saya lakukan?

Tinjau kembali:

1. **Asumsi siswa** (jumlah siswa baru/total).
2. **Tarif UP/US** (otomatis vs override).
3. **Komponen biaya** operasional/non-operasional.
4. **Pendapatan** dan **subsidi** yang tersedia.

## Bagaimana cara menambah organisasi baru?

Hanya Administrator melalui menu **Organisasi**. Lihat
[Manajemen Organisasi](organisasi.md#menambah-mengubah-organisasi).

---

Belum terjawab? Hubungi tim administrator aplikasi Anda.
