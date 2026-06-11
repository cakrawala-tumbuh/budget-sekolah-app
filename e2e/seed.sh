#!/bin/sh
# Seed data untuk test e2e.
# Dijalankan oleh service `seed` di docker-compose.e2e.yml.
#
# Struktur yang dibuat:
#   org 1 — YPII Pusat   (PUSAT)
#   org 2 — YPII Bandung (CABANG, parent=1)
#   org 3 — SD MBL       (UNIT,   parent=2)
#
#   asumsi org 3 — 120 siswa (grade 1-6 masing-masing 20), 10 siswa baru
#   alokasi org 3 → org 2 (CABANG)
#   alokasi org 3 → org 1 (PUSAT)
#
# Script ini idempotent: 409 pada org dan 200 pada PUT asumsi/alokasi diabaikan.

set -e

BASE="${BACKEND_URL:-http://localhost:18000}"
PASS="${ADMIN_PASSWORD:-admin123}"

echo "[seed] Backend: $BASE"

# ── Login ──────────────────────────────────────────────────────────────────────
# Endpoint /auth/login memakai OAuth2PasswordRequestForm (form-urlencoded)
TOKEN=$(curl -sf -X POST "$BASE/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=$PASS" \
  | grep -o '"access_token":"[^"]*"' \
  | sed 's/"access_token":"//;s/"//')

if [ -z "$TOKEN" ]; then
  echo "[seed] ERROR: Gagal login sebagai admin" >&2
  exit 1
fi

echo "[seed] Login berhasil"

AUTH="-H \"Authorization: Bearer $TOKEN\""

# ── Helper: buat organisasi (abaikan 409 jika sudah ada) ───────────────────────
create_org() {
  NAME="$1"; CODE="$2"; TYPE="$3"; PARENT="$4"

  if [ -z "$PARENT" ] || [ "$PARENT" = "null" ]; then
    BODY="{\"name\":\"$NAME\",\"code\":\"$CODE\",\"org_type\":\"$TYPE\",\"city\":\"Jakarta\"}"
  else
    BODY="{\"name\":\"$NAME\",\"code\":\"$CODE\",\"org_type\":\"$TYPE\",\"city\":\"Jakarta\",\"parent_id\":$PARENT}"
  fi

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/organizations" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BODY")

  if [ "$STATUS" = "201" ]; then
    echo "[seed] Dibuat: $NAME ($TYPE)"
  elif [ "$STATUS" = "409" ]; then
    echo "[seed] Sudah ada: $NAME — dilewati"
  else
    echo "[seed] ERROR buat org $NAME — HTTP $STATUS" >&2; exit 1
  fi
}

# ── Helper: PUT JSON (idempotent, 200/201 diterima) ────────────────────────────
put_json() {
  LABEL="$1"; URL="$2"; BODY="$3"

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$BASE$URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BODY")

  if [ "$STATUS" = "200" ] || [ "$STATUS" = "201" ]; then
    echo "[seed] OK: $LABEL"
  else
    echo "[seed] ERROR: $LABEL — HTTP $STATUS" >&2; exit 1
  fi
}

# ── Helper: POST JSON (abaikan 409 jika sudah ada) ─────────────────────────────
post_json() {
  LABEL="$1"; URL="$2"; BODY="$3"

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE$URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BODY")

  if [ "$STATUS" = "200" ] || [ "$STATUS" = "201" ]; then
    echo "[seed] Dibuat: $LABEL"
  elif [ "$STATUS" = "409" ]; then
    echo "[seed] Sudah ada: $LABEL — dilewati"
  else
    echo "[seed] ERROR: $LABEL — HTTP $STATUS" >&2; exit 1
  fi
}

# ── 1. Organisasi ───────────────────────────────────────────────────────────────
create_org "YPII Pusat"   "PUSAT"   "PUSAT"  null
create_org "YPII Bandung" "CABANG1" "CABANG" 1
create_org "SD MBL"       "SD-MBL"  "UNIT"   2

# ── 2. Asumsi org 3 (SD MBL) — 120 siswa, 10 siswa baru ───────────────────────
put_json "Asumsi SD MBL" "/organizations/3/assumption" \
  '{"grade_1":20,"grade_2":20,"grade_3":20,"grade_4":20,"grade_5":20,"grade_6":20,"new_student_count":10,"returning_student_count":110,"staff_count":15}'

# ── 3. Alokasi SD MBL → CABANG (org 2) ─────────────────────────────────────────
put_json "Alokasi SD MBL → YPII Bandung" "/organizations/2/contribution-allocations" \
  '{"from_organization_id":3,"total_students":120,"new_students":10}'

# ── 4. Alokasi SD MBL → PUSAT (org 1) ──────────────────────────────────────────
put_json "Alokasi SD MBL → YPII Pusat" "/organizations/1/contribution-allocations" \
  '{"from_organization_id":3,"total_students":120,"new_students":10}'

# ── 5. ParentExpenseAllocation org 1 (PUSAT) — kategori biaya UP ───────────────
# Dibutuhkan agar tabel kategori biaya muncul di halaman alokasi-up PUSAT,
# sehingga tabel proporsi unit berada di index ke-2 (nth(1)) sesuai ekspektasi test.
post_json "ParentExpenseAllocation PUSAT 5130.01" "/organizations/1/parent-expense-allocations" \
  '{"expense_category_id":5,"affects_up":true,"is_active":true}'

echo "[seed] Selesai — semua data e2e siap"
