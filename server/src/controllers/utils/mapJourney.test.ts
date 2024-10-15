import { Journey } from "../../api-clients/vasttrafik/types/journey";
import { mapJourney, MappedJourney } from "./mapJourney";
import { mockJourney } from "./mapJourney.mock";

describe("mapJourney", () => {
  it("should map a journey", () => {
    //1. definiera mock-data
    const journey = mockJourney;

    //2. definiera expected-data
    const expectedJourney: MappedJourney = {
      startTime: "2024-10-15T10:13:00.0000000+02:00",
      endTime: "2024-10-15T10:20:00.0000000+02:00",
      numberOfLegs: 1,
    };

    //3. anropa funktionen
    const result = mapJourney(journey);

    //4. jämför resultatet med expected-data
    expect(result).toEqual(expectedJourney);
  });
});
