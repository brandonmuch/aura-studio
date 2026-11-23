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
  await expect(page.locator(".shop-feature-card")).toHaveCount(3);
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
