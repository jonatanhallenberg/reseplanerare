import { Request, Response } from "express";
import { searchLocationByText } from "../api-clients/journey";
import { mapLocation, MappedLocation } from "../utils/mapLocation";

export const searchLocation = async (req: Request, res: Response) => {
  const { searchString } = req.body;
  const { results } = await searchLocationByText(searchString);
  const mappedLocations = results.map(mapLocation);
  res.json(mappedLocations);
};
