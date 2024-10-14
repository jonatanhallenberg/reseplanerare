import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Autocomplete from "./Autocomplete";

type TravelPlannerFormProps = {
  onSearch: (fromGid: string, toGid: string) => Promise<void>;
};

export const TravelPlannerForm: React.FC<TravelPlannerFormProps> = ({
  onSearch,
}) => {
  const [fromGid, setFromGid] = useState("");
  const [toGid, setToGid] = useState("");

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from">Från</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Autocomplete
              placeholder="Start"
              onLocationSelect={(location) => setFromGid(location.gid)}
              testId="from-autocomplete"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">Till</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Autocomplete
              placeholder="Destination"
              onLocationSelect={(location) => setToGid(location.gid)}
              testId="to-autocomplete"
            />
          </div>
        </div>
      </div>
      <Button className="w-full" onClick={() => onSearch(fromGid, toGid)}>
        <Search className="mr-2 h-4 w-4" /> Sök resa
      </Button>
    </>
  );
};
