const apiUrl = import.meta.env.VITE_API_URL;

export type Journey = {
  startTime: string;
  endTime: string;
  numberOfLegs: number;
};

export const findJourney = async (
  fromGid: string,
  toGid: string
): Promise<Journey[]> => {
  const response = await fetch(
    `${apiUrl}/api/journey/find?fromGid=${fromGid}&toGid=${toGid}`
  );
  return response.json() as Promise<Journey[]>;
};
