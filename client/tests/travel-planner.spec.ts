import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.

  //Find h3 element with text "Bästtrafik Reseplanerare"
  const title = await page.getByRole("heading", {
    name: "Bästtrafik Reseplanerare",
  });
  await expect(title).toBeVisible();
});
