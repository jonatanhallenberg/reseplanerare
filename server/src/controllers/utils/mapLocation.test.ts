import { mapLocation } from "./mapLocation";
import { convertWGS84toRT90 } from "./convertCoordinates";
import { Location } from "../../api-clients/vasttrafik/types/location";

jest.mock("./convertCoordinates");

describe("mapLocation function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (convertWGS84toRT90 as jest.Mock).mockReturnValue({
      latitudeRT90: 6587000,
      longitudeRT90: 1337000,
    });
  });

  it("should correctly map a location with gid", () => {
    const mockLocation: Location = {
      gid: "9021014001760000",
      name: "Göteborg Central",
      locationType: "STOP_AREA",
      latitude: 57.708734,
      longitude: 11.974764,
    };

    const result = mapLocation(mockLocation);

    expect(result).toEqual({
      gid: "9021014001760000",
      name: "Göteborg Central",
      latitude: 57.708734,
      longitude: 11.974764,
      latitudeRT90: 6587000,
      longitudeRT90: 1337000,
    });

    expect(convertWGS84toRT90).toHaveBeenCalledWith(57.708734, 11.974764);
  });

  it("should correctly map a location without gid", () => {
    const mockLocation: Location = {
      name: "Slottsskogen",
      locationType: "POINT_OF_INTEREST",
      latitude: 57.685255,
      longitude: 11.942625,
    };

    const result = mapLocation(mockLocation);

    expect(result).toEqual({
      name: "Slottsskogen",
      latitude: 57.685255,
      longitude: 11.942625,
      latitudeRT90: 6587000,
      longitudeRT90: 1337000,
    });

    expect(convertWGS84toRT90).toHaveBeenCalledWith(57.685255, 11.942625);
  });
});
