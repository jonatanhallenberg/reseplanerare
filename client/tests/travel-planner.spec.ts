import { test, expect } from "@playwright/test";
import { searchResultMock } from "./mock/searchResultMock";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.

  //Find h3 element with text "Bästtrafik Reseplanerare"
  const title = await page.getByRole("heading", {
    name: "Bästtrafik Reseplanerare",
  });
  await expect(title).toBeVisible();
});

//Add snapshot test for the page
test("snapshot test", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveScreenshot("travel-planner.png");
});

test("search for a destination", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  //Mock url independent of searchstring
  await page.route(
    "http://localhost:4000/api/location/search?searchString=*",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchResultMock),
      });
    }
  );

  const from = page.getByTestId("from-autocomplete");

  await from.fill("Falköping");

  //Wait for the autocomplete to show the results
  await page.waitForTimeout(2000);
  await from.press("ArrowDown");
  await from.press("Enter");

  expect(from).toHaveValue("FALKÖPING");
});
