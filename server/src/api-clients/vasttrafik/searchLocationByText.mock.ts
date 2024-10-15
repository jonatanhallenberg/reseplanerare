import { SearchLocationResponse } from "./types";

export const mockSearchLocationByText: SearchLocationResponse = {
  results: [
    {
      name: "Wieselgrensplatsen",
      locationType: "stop",
      latitude: 59.33405,
      longitude: 18.06682,
    },
    {
      name: "Wieselgrensplatsen",
      locationType: "stop",
      latitude: 59.33405,
      longitude: 18.06682,
    },
  ],
  pagination: {
    limit: 10,
    offset: 0,
    size: 1,
  },
  links: {
    next: "",
    current: "",
  },
};
