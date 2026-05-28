# Copilot Instructions — Budget App YPII

## Konvensi Git Commit

Ketika diminta untuk melakukan commit:

1. **Gunakan bahasa Indonesia** untuk seluruh commit message
2. **Buat commit message seinformatif mungkin** — sertakan:
   - Baris pertama: ringkasan singkat perubahan (maks. 72 karakter)
   - Baris berikutnya (jika perlu): penjelasan *apa* yang berubah, *mengapa*, dan *dampaknya*
   - Sebutkan file atau modul yang terpengaruh jika relevan

Contoh commit message yang baik:
```
Tambah halaman simulasi anggaran untuk level UNIT

Implementasi halaman baru di app/organizations/[id]/simulation/.
Komponen SimulationTable ditambahkan di components/simulation/.
Menggunakan hook useSimulation() untuk fetch data dari backend.
```

---

## Konvensi Tag (Semantic Versioning)

Ketika diminta untuk membuat tag, gunakan format **`vMAJOR.MINOR.PATCH`** berdasarkan jenis perubahan:

| Jenis Perubahan | Contoh | Bump |
|----------------|--------|------|
| Bug fix, perbaikan tampilan kecil, perbaikan typo/doc | `v1.0.0` → `v1.0.1` | **Patch** |
| Fitur baru non-breaking: halaman baru, komponen baru, hook baru | `v1.0.1` → `v1.1.0` | **Minor** |
| Perubahan breaking: ubah struktur routing, ubah kontrak API, hapus halaman | `v1.1.0` → `v2.0.0` | **Major** |

Langkah membuat tag:
```bash
# Cek tag terakhir
git tag --sort=-v:refname | head -5

# Buat annotated tag
git tag -a v1.2.0 -m "Deskripsi singkat perubahan versi ini (bahasa Indonesia)"

# Push tag ke remote
git push origin v1.2.0
```

---

## Konvensi Push ke GitHub

Ketika diminta untuk push:

- **Ikuti instruksi eksplisit** dari user: push langsung ke `master` atau buat Pull Request (PR)
- Jika tidak ada instruksi eksplisit, **tanyakan** terlebih dahulu sebelum push

### Push langsung ke master
```bash
git push origin master
```

### Buat Pull Request
```bash
# Push ke branch baru terlebih dahulu
git push origin <nama-branch>

# Kemudian buat PR via GitHub CLI (jika tersedia)
gh pr create --title "Judul PR" --body "Deskripsi perubahan"
```
