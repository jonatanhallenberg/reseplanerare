import { mapJourney } from "./mapJourney";
import { Journey } from "../../api-clients/vasttrafik/types/journey";

describe("mapJourney function", () => {
  it("should correctly map a journey", () => {
    const mockJourney: Journey = {
      reconstructionReference: "ref123",
      detailsReference: "details123",
      tripLegs: [
        {
          origin: {
            stopPoint: {
              gid: "origin1",
              name: "Start",
              platform: "1",
              stopArea: {
                gid: "area1",
                name: "StartArea",
                latitude: 57.7,
                longitude: 11.9,
                tariffZone1: {
                  gid: "zone1",
                  name: "Zone1",
                  number: 1,
                  shortName: "Z1",
                },
              },
            },

            plannedTime: "2023-05-01T10:00:00",
          },

          destination: {
            stopPoint: {
              gid: "dest1",
              name: "End",
              platform: "2",
              stopArea: {
                gid: "area2",
                name: "EndArea",
                latitude: 57.8,
                longitude: 12.0,
                tariffZone1: {
                  gid: "zone2",
                  name: "Zone2",
                  number: 2,
                  shortName: "Z2",
                },
              },
            },

            plannedTime: "2023-05-01T11:30:00",
          },
        },
      ],
    };

    const mappedJourney = mapJourney(mockJourney);

    expect(mappedJourney).toEqual({
      startTime: "2023-05-01T10:00:00",

      endTime: "2023-05-01T11:30:00",

      numberOfLegs: 1,
    });
  });

  it("should handle journeys with multiple legs", () => {
    const mockJourney: Journey = {
      reconstructionReference: "ref456",

      detailsReference: "details456",

      tripLegs: [
        {
          origin: {
            stopPoint: {
              gid: "origin1",
              name: "Start",
              platform: "1",
              stopArea: {
                gid: "area1",
                name: "StartArea",
                latitude: 57.7,
                longitude: 11.9,
                tariffZone1: {
                  gid: "zone1",
                  name: "Zone1",
                  number: 1,
                  shortName: "Z1",
                },
              },
            },

            plannedTime: "2023-05-01T10:00:00",
          },

          destination: {
            stopPoint: {
              gid: "mid1",
              name: "Middle",
              platform: "2",
              stopArea: {
                gid: "area2",
                name: "MiddleArea",
                latitude: 57.8,
                longitude: 12.0,
                tariffZone1: {
                  gid: "zone2",
                  name: "Zone2",
                  number: 2,
                  shortName: "Z2",
                },
              },
            },

            plannedTime: "2023-05-01T11:00:00",
          },
        },

        {
          origin: {
            stopPoint: {
              gid: "mid1",
              name: "Middle",
              platform: "3",
              stopArea: {
                gid: "area2",
                name: "MiddleArea",
                latitude: 57.8,
                longitude: 12.0,
                tariffZone1: {
                  gid: "zone2",
                  name: "Zone2",
                  number: 2,
                  shortName: "Z2",
                },
              },
            },

            plannedTime: "2023-05-01T11:15:00",
          },

          destination: {
            stopPoint: {
              gid: "dest1",
              name: "End",
              platform: "4",
              stopArea: {
                gid: "area3",
                name: "EndArea",
                latitude: 57.9,
                longitude: 12.1,
                tariffZone1: {
                  gid: "zone3",
                  name: "Zone3",
                  number: 3,
                  shortName: "Z3",
                },
              },
            },

            plannedTime: "2023-05-01T12:00:00",
          },
        },
      ],
    };

    const mappedJourney = mapJourney(mockJourney);

    expect(mappedJourney).toEqual({
      startTime: "2023-05-01T10:00:00",
      endTime: "2023-05-01T12:00:00",
      numberOfLegs: 2,
    });
  });
});
