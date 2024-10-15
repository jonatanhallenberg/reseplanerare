import { test, expect } from "@playwright/test";
import { searchLocationMock } from "./mock/searchLocation.mock";

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

test("search for a destination", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.route(
    "http://localhost:4000/api/location/search?searchString=*",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchLocationMock),
      });
    }
  );

  const toAutocomplete = page.getByTestId("to-autocomplete");

  await toAutocomplete.fill("Falköping");

  await page.waitForResponse(
    "http://localhost:4000/api/location/search?searchString=*"
  );

  await toAutocomplete.press("ArrowDown");
  await toAutocomplete.press("ArrowDown");
  await toAutocomplete.press("Enter");

  await expect(toAutocomplete).toHaveValue("FALKÖPING");
});
