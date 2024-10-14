import { Request, Response } from "express";
import { findJourneyByGids } from "../api-clients/vasttrafik/findJourneyByGids";
import { mapJourney } from "./utils/mapJourney";

export const findJourney = async (req: Request, res: Response) => {
  const { fromGid, toGid } = req.query;
  const { results } = await findJourneyByGids(
    fromGid as string,
    toGid as string
  );
  const mappedJourneys = results.map(mapJourney);
  res.json(mappedJourneys);
};
