import {
  SearchLocationResponse,
  searchLocationResponseSchema,
} from "./types/location";

export const searchLocationByText = async (
  byText: string
): Promise<SearchLocationResponse> => {
  const response = await fetch(
    `${process.env.VASTTRAFIK_API_URL}/locations/by-text?q=${byText}&limit=10&offset=0`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VASTTRAFIK_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  const parsedData = searchLocationResponseSchema.parse(data);

  return parsedData;
};
