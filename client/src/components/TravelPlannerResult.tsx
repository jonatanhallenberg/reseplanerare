import React from "react";
import { TravelCard } from "./TravelCard";
import { Journey } from "@/api/findJourney";

type TravelPlannerResultProps = {
  journeys: Journey[];
};

export const TravelPlannerResult: React.FC<TravelPlannerResultProps> = ({
  journeys,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="space-y-4">
        {journeys.map((journey, index) => (
          <TravelCard
            key={index}
            departureTime={new Date(journey.startTime)}
            arrivalTime={new Date(journey.endTime)}
            transfers={journey.numberOfLegs}
          />
        ))}
      </div>
    </div>
  );
};
