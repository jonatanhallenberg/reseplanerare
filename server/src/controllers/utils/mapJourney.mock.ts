import { Journey } from "../../api-clients/vasttrafik/types/journey";

export const mockJourney: Journey = {
  reconstructionReference:
    "¶HKI¶T$A=1@O=Brunnsparken, Göteborg@L=1760001@a=128@$A=1@O=Korsvägen, Göteborg@L=3980004@a=128@$202410151013$202410151020$Spå    5$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#0#SICT#0#AM#97#AM2#0#RT#15#¶KRCC¶#VE#1#",
  detailsReference:
    "eyJUIjpbeyJSIjoiMXwxODIwMXwwfDgwfDE1MTAyMDI0IiwiTyI6MTcsIkQiOjIxLCJJIjowfV19",
  tripLegs: [
    {
      origin: {
        stopPoint: {
          gid: "9022014001760001",
          name: "Brunnsparken, Göteborg",
          platform: "A1",
          stopArea: {
            gid: "9021014001760000",
            name: "Brunnsparken",
            latitude: 57.70694042,
            longitude: 11.96784532,
            tariffZone1: {
              gid: "9081014200003000",
              name: "Zon A",
              number: 3000,
              shortName: "A",
            },
          },
        },
        plannedTime: "2024-10-15T10:13:00.0000000+02:00",
        estimatedTime: "2024-10-15T10:15:00.0000000+02:00",
        estimatedOtherwisePlannedTime: "2024-10-15T10:15:00.0000000+02:00",
        notes: [],
      },
      destination: {
        stopPoint: {
          gid: "9022014003980004",
          name: "Korsvägen, Göteborg",
          platform: "A3",
          stopArea: {
            gid: "9021014003980000",
            name: "Korsvägen",
            latitude: 57.69674539,
            longitude: 11.98691097,
            tariffZone1: {
              gid: "9081014200003000",
              name: "Zon A",
              number: 3000,
              shortName: "A",
            },
          },
        },
        plannedTime: "2024-10-15T10:20:00.0000000+02:00",
        estimatedTime: "2024-10-15T10:21:00.0000000+02:00",
        estimatedOtherwisePlannedTime: "2024-10-15T10:21:00.0000000+02:00",
        notes: [],
      },
    },
  ],
};
