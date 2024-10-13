import React from "react";
import { ArrowRight, Bus, Train } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type TravelCardProps = {
  result: {
    id: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    transfers: number;
    legs: { type: "bus" | "train"; number: string }[];
  };
};

export const TravelCard: React.FC<TravelCardProps> = ({ result }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold">
            {result.departureTime} <ArrowRight className="inline mx-2" />{" "}
            {result.arrivalTime}
          </div>
          <div className="text-sm text-muted-foreground">{result.duration}</div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <span>
            {result.transfers} byte{result.transfers !== 1 ? "n" : ""}
          </span>
        </div>
        <div className="flex space-x-2">
          {result.legs.map((leg, index) => (
            <div
              key={index}
              className="flex items-center bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs"
            >
              {leg.type === "bus" ? (
                <Bus className="w-3 h-3 mr-1" />
              ) : (
                <Train className="w-3 h-3 mr-1" />
              )}
              {leg.number}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
