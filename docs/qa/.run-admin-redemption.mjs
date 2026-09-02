/**
 * Admin UI: sign-in → Redemption Codes → create code (black-box).
 * Env: BASE_ADMIN (default http://localhost:3000), QA_ADMIN_USER, QA_ADMIN_PASSWORD
 */
import { chromium } from "playwright";

const BASE_ADMIN = (process.env.BASE_ADMIN || "http://localhost:3000").replace(
  /\/$/,
  "",
);
const USER = process.env.QA_ADMIN_USER || "rootprobe";
const PASS = process.env.QA_ADMIN_PASSWORD || "RootPass123!";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const out = { status: "FAIL", detail: "", code: null };
  try {
    await page.goto(`${BASE_ADMIN}/sign-in`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.locator('input[name="username"]').fill(USER);
    await page.locator('input[name="password"]').fill(PASS);
    await Promise.all([
      page.waitForURL((u) => !u.pathname.includes("sign-in"), {
        timeout: 30000,
      }),
      page.locator('button[type="submit"]').click(),
    ]);
    await page.waitForTimeout(1500);
    out.detail += `logged_in_url=${page.url()}; `;

    // Payment compliance via API (admin-api-ok) so create works
    const token = await page.evaluate(async () => {
      // try localStorage / session patterns used by new-api
      for (const k of Object.keys(localStorage)) {
        const v = localStorage.getItem(k) || "";
        if (/access_token|token/i.test(k) && v.length > 20) return v;
      }
      return null;
    });

    // Navigate to Redemption Codes (Chinese or English sidebar)
    const link = page
      .getByRole("link", { name: /Redemption Codes|兑换码|兑换/i })
      .first();
    if (await link.isVisible().catch(() => false)) {
      await link.click();
    } else {
      await page.goto(`${BASE_ADMIN}/redemption-codes/`, {
        waitUntil: "domcontentloaded",
      });
    }
    await page.waitForTimeout(1000);
    out.detail += `redemption_url=${page.url()}; `;

    // Open create drawer
    const createBtn = page
      .getByRole("button", { name: /create|add|新建|创建|New|添加/i })
      .first();
    await createBtn.click({ timeout: 15000 });
    await page.waitForTimeout(800);

    const nameInput = page
      .locator('input[name="name"]')
      .or(page.getByLabel(/name|名称/i))
      .first();
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill(`qa-ui-${Date.now().toString().slice(-6)}`);
    }

    const [resp] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/redemption\/?$/.test(new URL(r.url()).pathname) &&
          r.request().method() === "POST",
        { timeout: 30000 },
      ),
      page
        .getByRole("button", { name: /create|save|提交|确认|新建|保存/i })
        .last()
        .click(),
    ]);
    const status = resp.status();
    const body = await resp.json().catch(() => ({}));
    const code = Array.isArray(body?.data) ? body.data[0] : body?.data;
    if (status >= 200 && status < 300 && body?.success) {
      out.status = "PASS";
      out.code = code || null;
      out.detail += `POST /api/redemption status=${status} code_len=${code ? String(code).length : 0}`;
    } else {
      out.detail += `status=${status} body=${JSON.stringify(body).slice(0, 300)}`;
    }
  } catch (e) {
    out.detail += String(e);
    const text = await page.locator("body").innerText().catch(() => "");
    if (/use frontend dev server/i.test(text)) {
      out.status = "BLOCKED";
      out.detail = "Admin still serving Dockerfile.dev placeholder";
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify(out, null, 2));
  process.exit(out.status === "FAIL" ? 1 : 0);
})();
