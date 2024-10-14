import request from "supertest";
import nock from "nock";
import app from "../app";
import { SearchLocationResponse } from "../api-clients/vasttrafik/types/location";

describe("Location Controller", () => {
  beforeAll(() => {
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return mapped locations when searching", async () => {
    const mockResponse: SearchLocationResponse = {
      results: [
        {
          gid: "location1",
          name: "Testplats",
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
        next: "http://example.com/next",
        current: "http://example.com/current",
      },
    };

    console.log(process.env.VASTTRAFIK_API_URL);

    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")
      .query({ q: "Testplats", limit: 10, offset: 0 })
      .reply(200, mockResponse);

    const response = await request(app)
      .get("/api/location/search")
      .query({ searchString: "Testplats" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toEqual({
      gid: "location1",
      name: "Testplats",
      latitude: 57.7,
      longitude: 11.9,
      latitudeRT90: expect.any(Number),
      longitudeRT90: expect.any(Number),
    });
  });

  it("should handle API errors", async () => {
    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")
      .query({ q: "ErrorTest", limit: 10, offset: 0 })
      .reply(500, { error: "Internal Server Error" });

    const response = await request(app)
      .get("/api/location/search")
      .query({ searchString: "ErrorTest" });

    expect(response.status).toBe(500);
  });
});
