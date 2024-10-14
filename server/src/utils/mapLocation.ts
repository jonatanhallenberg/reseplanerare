import { Location } from "../api-clients/journey/types";
import { convertWGS84toRT90 } from "./convertCoordinates";

export type MappedLocation = {
  name: string;
  latitude: number;
  longitude: number;
  latitudeRT90: number;
  longitudeRT90: number;
};

export const mapLocation = (location: Location): MappedLocation => {
  const { latitudeRT90, longitudeRT90 } = convertWGS84toRT90(
    location.latitude,
    location.longitude
  );

  return {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeRT90,
    longitudeRT90,
  };
};
