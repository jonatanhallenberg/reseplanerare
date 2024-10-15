export type Journey = {
  reconstructionReference: string;
  detailsReference: string;
  tripLegs: TripLeg[];
};

type TripLeg = {
  origin: Origin;
  destination: Destination;
};

type Origin = {
  stopPoint: StopPoint;
  plannedTime: string;
  estimatedTime: string;
  estimatedOtherwisePlannedTime: string;
  notes: string[];
};

type Destination = {
  stopPoint: StopPoint;
  plannedTime: string;
  estimatedTime: string;
  estimatedOtherwisePlannedTime: string;
  notes: string[];
};

type StopPoint = {
  gid: string;
  name: string;
  platform: string;
  stopArea: StopArea;
};

type StopArea = {
  gid: string;
  name: string;
  latitude: number;
  longitude: number;
  tariffZone1: TariffZone1;
};

type TariffZone1 = {
  gid: string;
  name: string;
  number: number;
  shortName: string;
};

type ServiceJourney = {
  gid: string;
  direction: string;
  directionDetails: DirectionDetails;
  number: string;
  line: Line;
};

type Line = {
  shortName: string;
  designation: string;
  isWheelchairAccessible: boolean;
  name: string;
  backgroundColor: string;
  foregroundColor: string;
  borderColor: string;
  transportMode: string;
  transportSubMode: string;
};

type DirectionDetails = {
  fullDirection: string;
  shortDirection: string;
};

type Pagination = {
  limit: number;
  offset: number;
  size: number;
};

type Links = {
  previous: string;
  next: string;
  current: string;
};

export type JourneyResponse = {
  results: Journey[];
  pagination: Pagination;
  links: Links;
};
