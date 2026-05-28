import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3099";
const API = "http://localhost:8000";

async function login(page: Page, username: string, password: string) {
  await page.goto(`${BASE}/login`);
  await page.fill('[placeholder="admin"]', username);
  await page.fill('[placeholder="••••••••"]', password);
  await page.click('button:has-text("Masuk")');
  await page.waitForURL(/\/organizations|\/$/);
}

test.describe("Alokasi UP — PUSAT ke semua UNIT", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "admin", "admin123");
  });

  test("halaman Alokasi UP PUSAT menampilkan semua sekolah (bukan CABANG)", async ({
    page,
  }) => {
    // Navigasi ke halaman alokasi UP milik PUSAT (org_id=1)
    await page.goto(`${BASE}/organizations/1/alokasi-up`);
    await page.waitForSelector("h1:has-text('Alokasi UP')");

    // Header harus menampilkan nama PUSAT
    await expect(page.locator("h1")).toContainText("Alokasi UP");

    // Tabel kedua = tabel proporsi unit (tabel pertama = kategori biaya)
    const tableBody = page.locator("table tbody").nth(1);
    await tableBody.waitFor({ timeout: 10000 });

    const rows = tableBody.locator("tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    const rowTexts = await rows.allTextContents();
    console.log("Rows in alokasi-up PUSAT:", rowTexts);

    // Harus ada sekolah SD
    const hasUnit = rowTexts.some(
      (t) => t.includes("SD") || t.includes("SMP") || t.includes("SMA") || t.includes("TK") || t.includes("Daycare")
    );
    expect(hasUnit, "Harus ada baris sekolah (UNIT) di tabel").toBe(true);
  });

  test("dialog Atur menampilkan data siswa dari asumsi (read-only)", async ({
    page,
  }) => {
    await page.goto(`${BASE}/organizations/1/alokasi-up`);
    await page.waitForSelector("h1:has-text('Alokasi UP')");

    // Tabel kedua = tabel proporsi unit
    const tableBody = page.locator("table tbody").nth(1);
    await tableBody.waitFor({ timeout: 10000 });

    // Klik tombol Atur/Edit di baris pertama
    const firstButton = tableBody.locator("tr:first-child button");
    await firstButton.click();

    // Dialog harus terbuka
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor();
    await expect(dialog.locator("h2, [data-slot='dialog-title']")).toContainText("Atur Proporsi UP");

    // Dialog harus menampilkan section "Data dari Asumsi Unit"
    await expect(dialog.locator("text=Data dari Asumsi Unit")).toBeVisible();

    // Input field hanya Override (%), bukan input jumlah siswa
    const inputs = dialog.locator("input");
    const inputCount = await inputs.count();
    // Hanya 1 input (override_pct_up), bukan 3 (total, baru, override)
    expect(inputCount).toBe(1);

    // Tutup dialog
    await dialog.locator('button:has-text("Batal")').click();
  });

  test("tombol Sinkronkan Semua tersedia", async ({ page }) => {
    await page.goto(`${BASE}/organizations/1/alokasi-up`);
    await page.waitForSelector("h1:has-text('Alokasi UP')");

    await expect(page.locator('button:has-text("Sinkronkan Semua")')).toBeVisible();
  });
});

test.describe("Alokasi US — PUSAT ke semua UNIT", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "admin", "admin123");
  });

  test("halaman Alokasi US PUSAT menampilkan semua sekolah", async ({ page }) => {
    await page.goto(`${BASE}/organizations/1/alokasi-us`);
    await page.waitForSelector("h1:has-text('Alokasi US')");

    const tableBody = page.locator("table tbody");
    await tableBody.waitFor({ timeout: 10000 });

    const rows = tableBody.locator("tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    const rowTexts = await rows.allTextContents();
    console.log("Rows in alokasi-us PUSAT:", rowTexts);

    const hasUnit = rowTexts.some(
      (t) => t.includes("SD") || t.includes("SMP") || t.includes("SMA") || t.includes("TK") || t.includes("Daycare")
    );
    expect(hasUnit).toBe(true);
  });
});

test.describe("Alokasi UP — CABANG hanya ke UNIT anak langsung", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, "admin", "admin123");
  });

  test("halaman Alokasi UP CABANG Bandung menampilkan unit anak saja", async ({
    page,
  }) => {
    await page.goto(`${BASE}/organizations/2/alokasi-up`);
    await page.waitForSelector("h1:has-text('Alokasi UP')");

    const tableBody = page.locator("table tbody");
    await tableBody.waitFor({ timeout: 10000 });

    const rowTexts = await tableBody.locator("tr").allTextContents();
    console.log("Rows in alokasi-up CABANG:", rowTexts);

    // CABANG Bandung punya SD MBL sebagai unit anak
    const hasSD = rowTexts.some((t) => t.includes("SD") || t.includes("MBL"));
    expect(hasSD, "CABANG Bandung harus punya unit anak SD").toBe(true);
  });
});
