import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("aura-cookie-choice", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
    }));
    localStorage.removeItem("aura-cart");
  });
});

test("homepage exposes a clear clothing discovery section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "The clothing edit." })).toBeVisible();
  await expect(page.locator(".shop-feature-card")).toHaveCount(4);
  await expect(page.getByRole("link", { name: /Explore all clothing/ })).toHaveAttribute("href", "/clothing");
});

test("shopper can add, adjust, persist and remove a bag item", async ({ page }) => {
  await page.goto("/product/look-01");
  await page.getByRole("button", { name: /Add to bag/ }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("heading", { name: "Shopping bag" })).toBeVisible();

  const quantity = page.locator(".cart-quantity-value");
  await expect(quantity).toHaveText("1");
  await page.getByRole("button", { name: "Increase quantity of Look 01" }).click();
  await expect(quantity).toHaveText("2");
  await expect(page.getByRole("link", { name: "Shopping bag" })).toContainText("2");

  await page.reload();
  await expect(page.locator(".cart-quantity-value")).toHaveText("2");
  await page.getByRole("button", { name: "Decrease quantity of Look 01" }).click();
  await expect(page.locator(".cart-quantity-value")).toHaveText("1");
  await page.getByRole("button", { name: "Remove Look 01 from bag" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
});

test("homepage reflows on a narrow mobile viewport without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "The clothing edit." })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
