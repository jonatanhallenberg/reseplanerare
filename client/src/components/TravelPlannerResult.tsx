import React from "react";
import { TravelCard } from "./TravelCard";

interface SearchResult {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  transfers: number;
  legs: { type: "bus" | "train"; number: string }[];
}

type TravelPlannerResultProps = {
  searchResults: SearchResult[];
};

export const TravelPlannerResult: React.FC<TravelPlannerResultProps> = ({
  searchResults,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="space-y-4">
        {searchResults.map((result) => (
          <TravelCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};
