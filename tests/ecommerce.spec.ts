import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem("aura-cookie-choice", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
    }));
    localStorage.removeItem("aura-cart");
  });
  await page.reload();
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

  await expect.poll(() => page.evaluate(() => localStorage.getItem("aura-cart"))).toContain('"quantity":2');
  await page.reload();
  await expect(page.locator(".cart-quantity-value")).toHaveText("2");
  await page.getByRole("button", { name: "Decrease quantity of Look 01" }).click();
  await expect(page.locator(".cart-quantity-value")).toHaveText("1");
  await page.getByRole("button", { name: "Remove Look 01 from bag" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty." })).toBeVisible();
});

test("clothing product cards expose a quick add-to-bag action", async ({ page }) => {
  await page.goto("/clothing");
  await expect(page.locator(".product-card")).toHaveCount(4);

  const addButtons = page.getByRole("button", { name: "Add to bag" });
  await expect(addButtons).toHaveCount(4);
  await addButtons.first().click();

  await expect(page.getByRole("status").filter({ hasText: "Added to bag" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View bag (1)" })).toHaveAttribute("href", "/cart");
  await expect(page.getByRole("link", { name: "Shopping bag" })).toContainText("1");
});

test("contact page uses the guided form and requires privacy acknowledgement", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Let's begin with a conversation." })).toBeVisible();

  await page.getByLabel("What should we call you?").fill("Taylor Example");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("What's the best email address to reach you?").fill("taylor@example.com");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("What are you getting in touch about?").selectOption("Clothing");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("How can we help?").fill("I'd like to learn more about the clothing collection.");
  await page.getByRole("button", { name: "Continue" }).click();

  const acknowledgement = page.getByRole("checkbox", { name: /I have read the Privacy Policy/ });
  await expect(acknowledgement).toHaveAttribute("required", "");
  await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/policies/privacy");
  await expect(page.getByRole("link", { name: "Terms and Conditions" })).toHaveAttribute("href", "/policies/terms");
  await acknowledgement.check();
  await page.getByRole("button", { name: "Complete message preview" }).click();
  await expect(page.getByText(/secure contact route will be connected before launch/)).toBeVisible();
});

test("homepage has three editorial campaign moments and Cape Town transfer messaging", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".home-hero")).toBeVisible();
  await expect(page.locator(".division-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Explore Aura." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The clothing edit." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Cape Town airport transfers/ })).toHaveAttribute("href", "/transfers");
});

test("transfers page states the Cape Town-only airport transfer area", async ({ page }) => {
  await page.goto("/transfers");
  await expect(page.getByRole("heading", { name: "Arrive well. In Cape Town." })).toBeVisible();
  await expect(page.getByText(/These airport transfer services are not currently offered in Zimbabwe/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Plan your Cape Town transfer" })).toBeVisible();
});

test("homepage reflows on a narrow mobile viewport without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "The clothing edit." })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("transfer enquiry follows a guided flow and shows policy acknowledgement before completion", async ({ page }) => {
  await page.goto("/transfers");
  await expect(page.getByRole("heading", { name: "Plan your Cape Town transfer" })).toBeVisible();

  await page.getByLabel("What should we call you?").fill("Taylor Example");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("What's the best email address to reach you?").fill("taylor@example.com");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Where should we collect you?").fill("OR Tambo International Airport");
  await page.getByLabel("Where are you heading?").fill("Sandton");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("What date would you like to travel?").fill("2026-12-10");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByLabel("Anything else we should know? Optional")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();

  const acknowledgement = page.getByRole("checkbox", { name: /I have read the Privacy Policy/ });
  await expect(acknowledgement).toHaveAttribute("required", "");
  await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/policies/privacy");
  await expect(page.getByRole("link", { name: "Terms and Conditions" })).toHaveAttribute("href", "/policies/terms");
  await page.getByRole("button", { name: "Complete enquiry preview" }).click();
  await expect(page.getByText(/not connected to a live inbox/)).toHaveCount(0);
  await acknowledgement.check();
  await page.getByRole("button", { name: "Complete enquiry preview" }).click();
  await expect(page.getByText(/not connected to a live inbox/)).toBeVisible();

  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.getByLabel("What should we call you?")).toBeVisible();
});


test("homepage clothing cards keep consistent framing and responsive alignment", async ({ page }) => {
  await page.goto("/");
  const inspectLayout = async (width: number, expectedColumns: number) => {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const grid = document.querySelector<HTMLElement>(".shop-feature-grid");
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".shop-feature-card"));
      const images = Array.from(document.querySelectorAll<HTMLImageElement>(".shop-feature-image img"));
      const buttons = Array.from(document.querySelectorAll<HTMLElement>(".shop-feature-add"));
      if (!grid || cards.length !== 4 || images.length !== 4 || buttons.length !== 4) {
        throw new Error("The homepage clothing grid is missing one or more of its four product cards.");
      }
      const gridBox = grid.getBoundingClientRect();
      const cardBoxes = cards.map((card) => {
        const box = card.getBoundingClientRect();
        const action = card.querySelector<HTMLElement>(".shop-feature-actions");
        const actionBox = action?.getBoundingClientRect();
        return {
          left: box.left,
          width: box.width,
          actionTop: actionBox?.top ?? 0,
        };
      });
      return {
        columns: getComputedStyle(grid).gridTemplateColumns.trim().split(" ").filter(Boolean).length,
        gridLeft: gridBox.left,
        gridWidth: gridBox.width,
        cards: cardBoxes,
        imageFits: images.map((image) => getComputedStyle(image).objectFit),
        buttonHeights: buttons.map((button) => button.getBoundingClientRect().height),
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });

    expect(layout.columns).toBe(expectedColumns);
    expect(layout.imageFits.every((fit) => fit === "contain")).toBe(true);
    expect(layout.buttonHeights.every((height) => height >= 44)).toBe(true);
    expect(layout.documentWidth - layout.viewportWidth).toBeLessThanOrEqual(1);
    for (const card of layout.cards.slice(1)) {
      expect(Math.abs(card.width - layout.cards[0].width)).toBeLessThan(2);
    }
    for (let rowStart = 0; rowStart < layout.cards.length; rowStart += expectedColumns) {
      const row = layout.cards.slice(rowStart, rowStart + expectedColumns);
      for (const card of row.slice(1)) {
        expect(card.actionTop).toBeCloseTo(row[0].actionTop, 0);
      }
    }
  };

  await inspectLayout(1440, 4);
  await inspectLayout(820, 2);
  await inspectLayout(390, 2);
});
test("main navigation exposes its state and controlled menu on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });

  await expect(menuButton).toHaveAttribute("aria-controls", "primary-navigation");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await expect(navigation.getByRole("link", { name: "Home" })).toBeVisible();
  await navigation.getByRole("link", { name: "Clothing" }).click();
  await expect(page).toHaveURL(/clothing$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
});

test("blog is removed from the storefront navigation and legacy URLs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Blog" })).toHaveCount(0);
  await expect(page.locator(".footer-column").getByRole("link", { name: "Blog" })).toHaveCount(0);
  await expect(page.locator(".blog-teaser")).toHaveCount(0);

  await page.goto("/blog");
  await expect(page).toHaveURL("/");
  await page.goto("/journal");
  await expect(page).toHaveURL("/");
});


test("demo prices are visible on homepage and clothing product cards", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".shop-feature-card .product-demo-price")).toHaveCount(4);
  await expect(page.locator(".shop-feature-card .product-demo-price").first()).toContainText("Demo price");
  await expect(page.locator(".shop-feature-card .product-demo-price").first()).toContainText("R 1,250");

  await page.goto("/clothing");
  await expect(page.locator(".product-card .product-demo-price")).toHaveCount(4);
  await expect(page.locator(".product-card .product-demo-price").nth(3)).toContainText("R 1,450");
  const italicStyles = await page.locator("em, i").evaluateAll((nodes) =>
    nodes.map((node) => getComputedStyle(node).fontStyle)
  );
  expect(italicStyles.every((style) => style === "normal")).toBe(true);
});

test("homepage product photography has no border or inset image padding", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const styles = await page.locator(".shop-feature-image").first().evaluate((node) => {
    const image = node.querySelector("img");
    if (!image) throw new Error("Product image is missing.");
    const link = getComputedStyle(node);
    const imageStyle = getComputedStyle(image);
    return {
      border: link.borderTopWidth,
      outline: link.outlineStyle,
      boxShadow: link.boxShadow,
      padding: imageStyle.padding,
    };
  });
  expect(styles.border).toBe("0px");
  expect(styles.outline).toBe("none");
  expect(styles.boxShadow).toBe("none");
  expect(styles.padding).toBe("0px");
});


test("Transfers hero supporting copy remains readable over the image", async ({ page }) => {
  await page.goto("/transfers");
  const intro = page.locator(".page-hero--image .page-hero-copy > p");
  await expect(intro).toBeVisible();
  await expect(intro).toContainText("Private airport transfers for selected journeys in Cape Town");
  const style = await intro.evaluate((node) => ({
    color: getComputedStyle(node).color,
    opacity: getComputedStyle(node).opacity,
    fontSize: parseFloat(getComputedStyle(node).fontSize),
    textShadow: getComputedStyle(node).textShadow,
  }));
  expect(style.color).toBe("rgb(255, 255, 255)");
  expect(style.opacity).toBe("1");
  expect(style.fontSize).toBeGreaterThanOrEqual(15);
  expect(style.textShadow).not.toBe("none");
});
