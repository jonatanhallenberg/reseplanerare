import { Request, Response } from "express";
import { searchLocationByText } from "../api-clients/vasttrafik";
import { mapLocation } from "./utils/mapLocation";

export const searchLocation = async (req: Request, res: Response) => {
  const { searchString } = req.query;
  const { results } = await searchLocationByText(searchString as string);
  const locationsWithGid = results.filter((location) => location.gid);
  const mappedLocations = locationsWithGid.map(mapLocation);
  res.json(mappedLocations);
};
