import { test, expect } from "@playwright/test";
import {
  searchLocationMockFalkoping,
  searchLocationMockUddevalla,
} from "./mock/searchLocation.mock";
import { findJourneyMock } from "./mock/findJourney.mock";

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
        body: JSON.stringify(searchLocationMockFalkoping),
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

test("search for a trip and take screenshot", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.route(
    "http://localhost:4000/api/location/search?searchString=Falk*",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchLocationMockFalkoping),
      });
    }
  );

  await page.route(
    "http://localhost:4000/api/location/search?searchString=Udde*",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(searchLocationMockUddevalla),
      });
    }
  );

  await page.route("http://localhost:4000/api/journey/find?*", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(findJourneyMock),
    });
  });

  const toAutocomplete = page.getByTestId("to-autocomplete");
  const fromAutocomplete = page.getByTestId("from-autocomplete");
  const searchButton = page.getByTestId("searchButton");

  await toAutocomplete.fill("Falköping");

  await page.waitForResponse(
    "http://localhost:4000/api/location/search?searchString=Falk*"
  );

  await toAutocomplete.press("ArrowDown");
  await toAutocomplete.press("ArrowDown");
  await toAutocomplete.press("Enter");

  await fromAutocomplete.fill("Uddevalla");

  await page.waitForResponse(
    "http://localhost:4000/api/location/search?searchString=Udde*"
  );

  await fromAutocomplete.press("ArrowDown");
  await fromAutocomplete.press("ArrowDown");
  await fromAutocomplete.press("Enter");

  await searchButton.click();

  await page.waitForResponse("http://localhost:4000/api/journey/find?*");

  await expect(page).toHaveScreenshot("travel-planner-falkoping-uddevalla.png");
});
