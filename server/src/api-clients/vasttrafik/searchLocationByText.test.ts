import nock from "nock";

import { searchLocationByText } from "./searchLocationByText";

import { SearchLocationResponse } from "./types/location";

describe("searchLocationByText function", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should fetch and parse location data", async () => {
    const mockResponse: SearchLocationResponse = {
      results: [
        {
          gid: "location1",
          name: "Test Location",
          locationType: "STOP_AREA",
          latitude: 57.7,
          longitude: 11.9,
          hasLocalService: true,
        },
      ],

      pagination: {
        limit: 10,
        offset: 0,
        size: 1,
      },

      links: {
        next: "http://example.com/next1",
        current: "http://example.com/current",
      },
    };

    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")
      .query({ q: "Test", limit: 10, offset: 0 })
      .reply(200, mockResponse);

    const result = await searchLocationByText("Test");

    expect(result).toEqual(mockResponse);
  });

  it("should handle API errors", async () => {
    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")

      .query({ q: "Error", limit: 10, offset: 0 })

      .reply(500, { error: "Internal Server Error" });

    await expect(searchLocationByText("Error")).rejects.toThrow();
  });
});
