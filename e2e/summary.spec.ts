import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3099";

async function login(page: Page, username = "admin", password = "admin123") {
  await page.goto(`${BASE}/login`);
  await page.fill('[placeholder="admin"]', username);
  await page.fill('[placeholder="••••••••"]', password);
  await page.click('button:has-text("Masuk")');
  await page.waitForURL(/\/organizations|\/$/);
}

// ── Summary page tersedia di Pusat, Cabang, dan Sekolah ───────────────────────

test.describe("Halaman Summary RAB", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Summary Pusat (org 1) menampilkan tabel ringkasan keuangan", async ({ page }) => {
    await page.goto(`${BASE}/organizations/1/summary`);
    await page.waitForSelector("h1:has-text('Summary RAB')");

    // Header harus menampilkan nama organisasi
    await expect(page.locator("h1")).toContainText("Summary RAB");
    await expect(page.locator("text=YPII Pusat").first()).toBeVisible();

    // Tabel harus ada
    const table = page.locator("table");
    await table.waitFor({ timeout: 10000 });

    // Seksi Pendapatan harus ada
    await expect(page.locator("text=Pendapatan").first()).toBeVisible();

    // Seksi Biaya Operasional harus ada
    await expect(page.locator("text=Biaya Operasional").first()).toBeVisible();

    // Seksi Biaya Non Operasional harus ada
    await expect(page.locator("text=Biaya Non Operasional").first()).toBeVisible();

    // Header kolom Budget KAS dan Budget AKRUAL harus ada
    await expect(page.locator("th:has-text('Budget KAS')")).toBeVisible();
    await expect(page.locator("th:has-text('Budget AKRUAL')")).toBeVisible();

    console.log("✓ Summary Pusat tampil dengan benar");
    await page.screenshot({ path: "test-results/summary-pusat.png", fullPage: true });
  });

  test("Summary Cabang (org 2) menampilkan tabel ringkasan keuangan", async ({ page }) => {
    await page.goto(`${BASE}/organizations/2/summary`);
    await page.waitForSelector("h1:has-text('Summary RAB')");

    await expect(page.locator("h1")).toContainText("Summary RAB");
    await expect(page.locator("text=YPII Bandung").first()).toBeVisible();

    const table = page.locator("table");
    await table.waitFor({ timeout: 10000 });

    await expect(page.locator("text=Pendapatan").first()).toBeVisible();
    await expect(page.locator("text=Biaya Operasional").first()).toBeVisible();

    console.log("✓ Summary Cabang tampil dengan benar");
    await page.screenshot({ path: "test-results/summary-cabang.png", fullPage: true });
  });

  test("Summary Sekolah (org 3) menampilkan tabel ringkasan keuangan", async ({ page }) => {
    await page.goto(`${BASE}/organizations/3/summary`);
    await page.waitForSelector("h1:has-text('Summary RAB')");

    await expect(page.locator("h1")).toContainText("Summary RAB");

    const table = page.locator("table");
    await table.waitFor({ timeout: 10000 });

    await expect(page.locator("text=Pendapatan").first()).toBeVisible();
    await expect(page.locator("text=Biaya Operasional").first()).toBeVisible();

    console.log("✓ Summary Sekolah tampil dengan benar");
    await page.screenshot({ path: "test-results/summary-sekolah.png", fullPage: true });
  });

  test("Tombol Summary ada di halaman detail organisasi", async ({ page }) => {
    await page.goto(`${BASE}/organizations/1`);
    await page.waitForSelector("h1");

    // Tombol Summary harus terlihat
    const summaryBtn = page.locator('a:has-text("Summary")');
    await expect(summaryBtn).toBeVisible();
    await summaryBtn.click();

    await page.waitForURL(/\/summary/);
    await expect(page.locator("h1")).toContainText("Summary RAB");
    console.log("✓ Tombol Summary navigasi ke halaman summary");
  });
});

// ── UP/US simulation hanya untuk Sekolah ─────────────────────────────────────

test.describe("Simulasi UP/US hanya untuk Sekolah", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Tab Uang Pangkal dan Uang Sekolah muncul di Sekolah (org 3)", async ({ page }) => {
    await page.goto(`${BASE}/organizations/3/simulation`);
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 });

    await expect(page.locator('[role="tab"]:has-text("Uang Pangkal")')).toBeVisible();
    await expect(page.locator('[role="tab"]:has-text("Uang Sekolah")')).toBeVisible();
    console.log("✓ Tab UP/US terlihat di Sekolah");
  });

  test("Tab Uang Pangkal dan Uang Sekolah TIDAK muncul di Pusat (org 1)", async ({ page }) => {
    await page.goto(`${BASE}/organizations/1/simulation`);
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 });

    await expect(page.locator('[role="tab"]:has-text("Uang Pangkal")')).not.toBeVisible();
    await expect(page.locator('[role="tab"]:has-text("Uang Sekolah")')).not.toBeVisible();
    console.log("✓ Tab UP/US tidak tampil di Pusat");
  });

  test("Tab Uang Pangkal dan Uang Sekolah TIDAK muncul di Cabang (org 2)", async ({ page }) => {
    await page.goto(`${BASE}/organizations/2/simulation`);
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 });

    await expect(page.locator('[role="tab"]:has-text("Uang Pangkal")')).not.toBeVisible();
    await expect(page.locator('[role="tab"]:has-text("Uang Sekolah")')).not.toBeVisible();
    console.log("✓ Tab UP/US tidak tampil di Cabang");
  });
});

// ── Verifikasi efek alokasi Pusat → Cabang → Sekolah ─────────────────────────

test.describe("Verifikasi efek alokasi di Sekolah", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("Summary Sekolah memuat tanpa error setelah alokasi Pusat dan Cabang", async ({ page }) => {
    // Navigasi ke summary Pusat — alokasi ke Pusat harus aktif
    await page.goto(`${BASE}/organizations/1/summary`);
    await page.waitForSelector("table", { timeout: 10000 });
    await page.screenshot({ path: "test-results/verify-pusat-summary.png", fullPage: true });

    // Navigasi ke summary Cabang
    await page.goto(`${BASE}/organizations/2/summary`);
    await page.waitForSelector("table", { timeout: 10000 });
    await page.screenshot({ path: "test-results/verify-cabang-summary.png", fullPage: true });

    // Navigasi ke simulasi Sekolah — UP simulation harus memuat alokasi dari induk
    await page.goto(`${BASE}/organizations/3/simulation`);
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 });

    // Klik tab Uang Pangkal
    await page.locator('[role="tab"]:has-text("Uang Pangkal")').click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "test-results/verify-sekolah-up.png", fullPage: true });

    // Tab Uang Pangkal harus menampilkan data (bukan error) — judul CardTitle simulation
    await expect(page.locator('text=Simulasi Uang Pangkal')).toBeVisible();
    console.log("✓ Simulasi UP Sekolah memuat setelah alokasi dari Pusat/Cabang");
  });

  test("Halaman Simulasi Sekolah menampilkan ringkasan surplus/defisit", async ({ page }) => {
    await page.goto(`${BASE}/organizations/3/summary`);
    await page.waitForSelector("table", { timeout: 10000 });

    // Harus ada baris Surplus atau Defisit
    const hasSurplus = await page.locator("text=SURPLUS").count();
    const hasDefisit = await page.locator("text=DEFISIT").count();
    expect(hasSurplus + hasDefisit).toBeGreaterThan(0);

    console.log("✓ Summary Sekolah menampilkan baris surplus/defisit");
    await page.screenshot({ path: "test-results/verify-sekolah-summary.png", fullPage: true });
  });
});
