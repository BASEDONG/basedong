/**
 * One-shot black-box runner for remaining QA journeys (playground-chat + smoke check).
 * Env: BASE_WEB, QA_USER_EMAIL, QA_USER_PASSWORD
 */
import { chromium } from "playwright";

const BASE_WEB = process.env.BASE_WEB || "http://localhost:3001";
const EMAIL = process.env.QA_USER_EMAIL || "qa.ui@example.com";
const PASS = process.env.QA_USER_PASSWORD || "QaPass123!";

async function login(page) {
  await page.goto(`${BASE_WEB}/login/`, { waitUntil: "domcontentloaded" });
  await page.getByRole("textbox", { name: "邮箱" }).fill(EMAIL);
  await page.getByRole("textbox", { name: "密码" }).fill(PASS);
  await page.getByRole("checkbox", { name: /我同意/ }).click();
  await Promise.all([
    page.waitForURL(/\/me\//, { timeout: 20000 }),
    page.locator('button[type="submit"]').click(),
  ]);
}

async function journeyPlaygroundChat(page) {
  const result = { name: "playground-chat", status: "FAIL", detail: "" };
  await page.goto(`${BASE_WEB}/me/playground/chat/`, {
    waitUntil: "domcontentloaded",
  });
  // Wait for catalog fetch
  await page
    .waitForResponse(
      (r) => r.url().includes("/api/user/models") && r.status() === 200,
      { timeout: 15000 },
    )
    .catch(() => null);
  await page.waitForTimeout(500);

  const empty = page.getByRole("button", { name: "暂无可用模型" });
  if (await empty.isVisible().catch(() => false)) {
    result.status = "BLOCKED";
    result.detail = "no models in picker after /api/user/models";
    return result;
  }

  // Ensure a model is selected (first option auto-selected by app)
  const modelBtn = page.locator("button").filter({ hasText: /gpt-4o-mini/ }).first();
  const hasModel = await modelBtn.isVisible().catch(() => false);
  if (!hasModel) {
    // open picker and choose
    const anyModel = page.getByText("gpt-4o-mini");
    if (await anyModel.first().isVisible().catch(() => false)) {
      await anyModel.first().click();
    }
  }

  const quotaBefore = (
    await page.locator("text=/额度\\s*\\d+/").first().textContent().catch(() => "")
  )?.trim();

  await page.getByPlaceholder("请输入提示词...").fill("say hi in one word");
  const send = page.getByRole("button", { name: "send" });
  await send.waitFor({ state: "visible" });
  // enable send by having text
  const [resp] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().includes("/pg/chat/completions") && r.request().method() === "POST",
      { timeout: 45000 },
    ),
    send.click(),
  ]);
  const status = resp.status();
  const body = await resp.json().catch(() => ({}));
  const content = body?.choices?.[0]?.message?.content;
  if (status !== 200 || typeof content !== "string") {
    result.detail = `pg status=${status} body=${JSON.stringify(body).slice(0, 240)}`;
    return result;
  }
  await page.waitForTimeout(3000);
  const quotaAfter = (
    await page.locator("text=/额度\\s*\\d+/").first().textContent().catch(() => "")
  )?.trim();
  result.status = "PASS";
  result.detail = `content=${JSON.stringify(content)} ${quotaBefore} -> ${quotaAfter} http=${status}`;
  return result;
}

async function journeySmoke(page, path, expectTitle) {
  await page.goto(`${BASE_WEB}${path}`, { waitUntil: "networkidle" }).catch(() =>
    page.goto(`${BASE_WEB}${path}`, { waitUntil: "domcontentloaded" }),
  );
  await page.waitForTimeout(800);
  const ok = await page.getByText(expectTitle).first().isVisible().catch(() => false);
  const chrome = await page.locator("text=/额度\\s*\\d+/").first().isVisible().catch(() => false);
  return {
    name: `smoke:${path}`,
    status: ok && chrome ? "PASS" : "FAIL",
    detail: `titleVisible=${ok} chrome=${chrome} url=${page.url()}`,
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];
  try {
    await login(page);
    results.push({ name: "login", status: "PASS", detail: page.url() });
    results.push(await journeyPlaygroundChat(page));
    results.push(await journeySmoke(page, "/me/playground/image/", "图像生成"));
    results.push(
      await journeySmoke(page, "/me/playground/text-to-speech/", "语音"),
    );
    results.push(await journeySmoke(page, "/me/playground/video/", "视频生成"));
  } catch (e) {
    results.push({ name: "runner", status: "FAIL", detail: String(e) });
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify(results, null, 2));
  const bad = results.some((r) => r.status === "FAIL");
  process.exit(bad ? 1 : 0);
})();
