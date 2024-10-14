import {
  Journey,
  JourneyResponse,
} from "../../api-clients/vasttrafik/types/journey";
import { convertWGS84toRT90 } from "./convertCoordinates";

export type MappedJourney = {
  startTime: string;
  endTime: string;
  numberOfLegs: number;
};

export const mapJourney = (journey: Journey): MappedJourney => {
  const startTime = journey.tripLegs[0].origin.plannedTime;
  const endTime =
    journey.tripLegs[journey.tripLegs.length - 1].destination.plannedTime;
  const numberOfLegs = journey.tripLegs.length;

  return {
    startTime,
    endTime,
    numberOfLegs,
  };
};
