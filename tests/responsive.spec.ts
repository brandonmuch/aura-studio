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

test("key pages fit common mobile widths without horizontal scrolling", async ({ page }) => {
  const routes = [
    "/",
    "/transfers",
    "/clothing",
    "/product/look-01",
    "/spa",
    "/about",
    "/contact",
    "/faq",
    "/trust",
    "/cart",
  ];

  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("#main-content")).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(
        Math.max(dimensions.document, dimensions.body) - dimensions.viewport,
        `Unexpected horizontal overflow at ${width}px on ${route}`
      ).toBeLessThanOrEqual(1);
    }
  }
});

test("mobile navigation remains reachable and easy to tap", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  const menuSize = await menuButton.boundingBox();
  expect(menuSize?.width).toBeGreaterThanOrEqual(44);
  expect(menuSize?.height).toBeGreaterThanOrEqual(44);

  await menuButton.click();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation.getByRole("link", { name: "Contact" })).toBeVisible();
  await navigation.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: "Let's begin with a conversation." })).toBeVisible();
});

test("section reveals are present and remain visible with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#main-content > section.section-reveal")).toHaveCount(4);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/clothing");
  await expect(page.locator("#main-content > section.section-reveal")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Made for the moments in between." })).toBeVisible();
});
