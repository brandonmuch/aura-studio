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


test("Spa experience card spans the full Explore Aura row", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const positions = await page.evaluate(() => {
    const grid = document.querySelector(".division-section .division-grid");
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".division-section .division-card"));
    if (!grid || cards.length !== 3) throw new Error("Explore Aura cards are missing.");
    const gridBox = grid.getBoundingClientRect();
    const boxes = cards.map((card) => {
      const box = card.getBoundingClientRect();
      return { left: box.left, right: box.right, top: box.top, width: box.width };
    });
    return { grid: { left: gridBox.left, right: gridBox.right, width: gridBox.width }, boxes };
  });
  expect(Math.abs(positions.boxes[0].top - positions.boxes[1].top)).toBeLessThan(2);
  expect(positions.boxes[2].top).toBeGreaterThan(positions.boxes[0].top);
  expect(Math.abs(positions.boxes[2].left - positions.grid.left)).toBeLessThan(2);
  expect(Math.abs(positions.boxes[2].width - positions.grid.width)).toBeLessThan(2);
});

test("Clothing page opens with two full-width editorial sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/clothing");
  const layout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>(".clothing-page > .page-hero");
    const lookbook = document.querySelector<HTMLElement>(".clothing-page .clothing-lookbook");
    if (!hero || !lookbook) throw new Error("Clothing editorial sections are missing.");
    return {
      heroWidth: hero.getBoundingClientRect().width,
      lookbookWidth: lookbook.getBoundingClientRect().width,
      viewportWidth: window.innerWidth,
    };
  });
  expect(layout.heroWidth).toBe(layout.viewportWidth);
  expect(layout.lookbookWidth).toBe(layout.viewportWidth);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileWidth = await page.locator(".clothing-page .clothing-lookbook").evaluate((node) => node.getBoundingClientRect().width);
  expect(mobileWidth).toBe(390);
});


test("homepage tagline is centred beneath the headline as part of the hero group", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const metrics = await page.locator(".home-hero").evaluate((hero) => {
      const group = hero.querySelector<HTMLElement>(".home-hero-content");
      const title = group?.querySelector<HTMLElement>(".hero-title");
      const copy = group?.querySelector<HTMLElement>("p");
      if (!group || !title || !copy) throw new Error("Homepage hero content is incomplete.");
      const rect = (node: HTMLElement) => {
        const box = node.getBoundingClientRect();
        return { left: box.left, top: box.top, width: box.width, height: box.height };
      };
      return {
        hero: rect(hero as HTMLElement),
        group: rect(group),
        title: rect(title),
        copy: rect(copy),
        textAlign: getComputedStyle(copy).textAlign,
        groupPosition: getComputedStyle(group).position,
      };
    });
    const heroCenterX = metrics.hero.left + metrics.hero.width / 2;
    const groupCenterX = metrics.group.left + metrics.group.width / 2;
    const heroCenterY = metrics.hero.top + metrics.hero.height / 2;
    const groupCenterY = metrics.group.top + metrics.group.height / 2;
    expect(Math.abs(heroCenterX - groupCenterX)).toBeLessThanOrEqual(2);
    expect(Math.abs(heroCenterY - groupCenterY)).toBeLessThanOrEqual(2);
    expect(metrics.textAlign).toBe("center");
    expect(metrics.groupPosition).toBe("relative");
    expect(metrics.copy.width).toBeLessThan(metrics.group.width);
  }
});
