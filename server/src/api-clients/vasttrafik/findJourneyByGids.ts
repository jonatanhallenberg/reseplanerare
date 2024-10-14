import { JourneyResponse } from "./types/journey";

export const findJourneyByGids = async (
  fromGid: string,
  toGid: string
): Promise<JourneyResponse> => {
  const response = await fetch(
    `${process.env.VASTTRAFIK_API_URL}/journeys?originGid=${fromGid}&destinationGid=${toGid}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VASTTRAFIK_API_KEY}`,
      },
    }
  );

  const data = await response.json();
  console.log("data", data);
  return data as JourneyResponse;
};
