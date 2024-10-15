import { searchLocationByText } from "./searchLocationByText";
import nock from "nock";
import { mockSearchLocationByText } from "./searchLocationByText.mock";

describe("searchLocationByText", () => {
  beforeAll(() => {
    //Dra ut sladden till internet
    nock.disableNetConnect();
  });

  afterAll(() => {
    //Sätt i sladden till internet
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return a list of locations", async () => {
    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")
      .query({ q: "Wieselgrensplatsen", limit: 10, offset: 0 })
      .reply(200, mockSearchLocationByText);

    const { results } = await searchLocationByText("Wieselgrensplatsen");

    expect(results).toHaveLength(2);
  });

  it("should throw an error if the API call fails", async () => {
    nock(process.env.VASTTRAFIK_API_URL!)
      .get("/locations/by-text")
      .query({ q: "Wieselgrensplatsen", limit: 10, offset: 0 })
      .reply(500, "Internal Server Error");

    await expect(searchLocationByText("Wieselgrensplatsen")).rejects.toThrow(
      "Internal Server Error"
    );
  });
});
