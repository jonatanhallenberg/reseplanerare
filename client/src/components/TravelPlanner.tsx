import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TravelPlannerForm } from "./TravelPlannerForm";
import { TravelPlannerResult } from "./TravelPlannerResult";

type SearchResult = {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  transfers: number;
  legs: { type: "bus" | "train"; number: string }[];
};

export const TravelPlanner = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    // Simulate API call with mock data
    const mockResults: SearchResult[] = [
      {
        id: "1",
        departureTime: "12:15",
        arrivalTime: "13:05",
        duration: "50 min",
        transfers: 1,
        legs: [
          { type: "bus", number: "42" },
          { type: "train", number: "J35" },
        ],
      },
      {
        id: "2",
        departureTime: "12:30",
        arrivalTime: "13:15",
        duration: "45 min",
        transfers: 0,
        legs: [{ type: "train", number: "X2000" }],
      },
      {
        id: "3",
        departureTime: "12:45",
        arrivalTime: "13:40",
        duration: "55 min",
        transfers: 2,
        legs: [
          { type: "bus", number: "19" },
          { type: "bus", number: "76" },
          { type: "train", number: "P12" },
        ],
      },
    ];
    setSearchResults(mockResults);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Bästtrafik Reseplanerare
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TravelPlannerForm onSearch={handleSearch} />
      </CardContent>
      <CardFooter className="flex-col">
        {searchResults.length > 0 && (
          <TravelPlannerResult searchResults={searchResults} />
        )}
      </CardFooter>
    </Card>
  );
};
