# Administrasi

!!! note "Akses"
    Seluruh fitur pada halaman ini hanya tersedia untuk **Administrator**.

Bagian **Administrasi** di sidebar berisi pengelolaan pengguna dan data master yang
dipakai di seluruh aplikasi.

## Manajemen Pengguna

Menu **Pengguna** untuk mengelola akun:

- **Username** dan **password**.
- **Peran (role)** — Administrator (ADMIN) atau Organisasi (ORG).
- **Organisasi** — untuk peran ORG, tentukan organisasi yang ditugaskan.
- **Status aktif** — akun non-aktif tidak dapat masuk.

!!! warning "Penugasan organisasi"
    Pengguna berperan **ORG** hanya dapat mengakses data organisasi yang ditugaskan
    kepadanya. Pastikan field organisasi terisi benar.

## Data Master

Data master menjadi acuan saat menginput biaya, pendapatan, dan investasi. Mengubahnya
memengaruhi seluruh organisasi.

### Kategori Pendapatan

Menu **Kategori Pendapatan**. Tiap kategori memiliki:

- **Kode** dan **label**.
- **Metode kalkulasi (calc method)** — menentukan bagaimana nilai dihitung:

| Metode | Arti |
|--------|------|
| `MANUAL` | Diisi manual oleh pengguna. |
| `SIMULATED_UP` | Diambil dari hasil simulasi Uang Pangkal. |
| `SIMULATED_US` | Diambil dari hasil simulasi Uang Sekolah. |
| `FROM_EXPENSE` | Diturunkan dari pos biaya tertentu. |
| `GRADE_BASED` | Dihitung berdasarkan kelas/grade. |
| `SUM_FROM_BOS` | Dijumlahkan dari porsi BOS. |

- **Urutan tampil (sort order)**.

### Kategori Biaya

Menu **Kategori Biaya**. Tiap kategori memiliki:

- **Kode** dan **label**.
- **Operasional?** — apakah termasuk biaya operasional.
- **Komponen UP?** — apakah ikut perhitungan Uang Pangkal.
- **Pendapatan langsung?** — apakah dipetakan langsung sebagai pendapatan.
- **Dipetakan ke kategori pendapatan** — relasi opsional ke kategori pendapatan.
- **Peran kontribusi (contribution role)** — peran dalam alokasi kontribusi.
- **Urutan tampil**.

### Kategori Investasi

Menu **Kategori Investasi**. Tiap kategori memiliki:

- **Kode** dan **label**.
- **Umur ekonomis bawaan (default economic life)** — tahun, dipakai sebagai nilai awal
  saat input investasi.
- **Urutan tampil**.

---

Perubahan data master sebaiknya dilakukan sebelum organisasi mulai menginput data agar
perhitungan konsisten.
