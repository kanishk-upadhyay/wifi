import { test, expect } from "@playwright/test";

test("[WiFi Diagnostic Wizard] Root page has zero horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  // Zero horizontal overflow rule
  expect(
    dimensions.docScrollWidth,
    `Horizontal overflow detected: docScrollWidth (${dimensions.docScrollWidth}px) exceeds innerWidth (${dimensions.innerWidth}px)`
  ).toBeLessThanOrEqual(dimensions.innerWidth);

  expect(
    dimensions.bodyScrollWidth,
    `Body overflow detected: bodyScrollWidth (${dimensions.bodyScrollWidth}px) exceeds innerWidth (${dimensions.innerWidth}px)`
  ).toBeLessThanOrEqual(dimensions.innerWidth);

  // On mobile devices, verify form inputs do not trigger iOS Safari canvas auto-zoom
  if (testInfo.project.name.includes("Mobile")) {
    const inputFontSizes = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll("input, select, textarea"));
      return inputs.map((input) => parseFloat(window.getComputedStyle(input).fontSize));
    });

    for (const size of inputFontSizes) {
      if (!isNaN(size)) {
        expect(
          size,
          `Mobile form input font size ${size}px is smaller than 16px (triggers iOS Safari auto-zoom)`
        ).toBeGreaterThanOrEqual(16);
      }
    }
  }
});

test("[WiFi Diagnostic Wizard] Emergency Runbook modal has zero horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const modalTrigger = page.locator("button:has-text('Offline Runbook'), button:has-text('Emergency')").first();
  if (await modalTrigger.isVisible()) {
    await modalTrigger.click();
    await page.waitForTimeout(300);

    const dimensions = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      docScrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.docScrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
  }
});
