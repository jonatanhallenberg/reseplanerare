const apiUrl = import.meta.env.VITE_API_URL;

export type Location = {
  gid: string;
  name: string;
  latitude: number;
  longitude: number;
  latitudeRT90: number;
  longitudeRT90: number;
};

export const searchLocations = async (
  searchString: string
): Promise<Location[]> => {
  const response = await fetch(
    `${apiUrl}/api/location/search?searchString=${searchString}`
  );

  const data = await response.json();

  console.log(data);
  return data as Promise<Location[]>;
};
