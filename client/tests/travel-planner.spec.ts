import { test, expect } from "@playwright/test";

test("has heading", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const heading = page.getByRole("heading", {
    name: "Bästtrafik Reseplanerare",
  });

  await expect(heading).toBeVisible();
});

test("screenshot test", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveScreenshot("travel-planner.png");
});
