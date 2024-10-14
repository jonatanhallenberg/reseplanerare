
## Introduktion

Nu när vi har gått igenom hur man testar mapJourney-funktionen, ska ni skapa tester för en liknande funktion kallad mapLocation. Denna funktion tar emot ett Location-objekt och returnerar ett MappedLocation-objekt.

## Funktionen som ska testas

Här är funktionen och dess relaterade typer från mapLocation.ts:

```ts
export const mapLocation = (location: Location): MappedLocation => {
  const { latitudeRT90, longitudeRT90 } = convertWGS84toRT90(
    location.latitude,
    location.longitude
  );

  return {
    gid: location.gid,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeRT90,
    longitudeRT90,
  };
};

type Location = {
  gid?: string;
  name: string;
  latitude: number;
  longitude: number;
};

type MappedLocation = {
  gid?: string;
  name: string;
  latitude: number;
  longitude: number;
  latitudeRT90: number;
  longitudeRT90: number;
};
```

## Uppgiftsbeskrivning

1. Skapa en ny testfil kallad mapLocation.test.ts.
	- Skriv minst två testfall som verifierar att mapLocation-funktionen fungerar korrekt.
	- Tänk på att testa olika scenarier, som till exempel när gid finns och när det saknas.

## Tips

- Använd Jest som testramverk, precis som i exemplet med mapJourney.test.ts.
- Skapa mock-data för Location-objektet.
- Verifiera att alla fält i det returnerade MappedLocation-objektet har korrekta värden.
- Testa edge cases, som t.ex. extrema latitud- och longitudvärden.

## Exempel på teststruktur

```ts
import { mapLocation } from "./mapLocation";

import { convertWGS84toRT90 } from "./convertCoordinates";

jest.mock("./convertCoordinates");

describe("mapLocation function", () => {
  beforeEach(() => {
    // Återställ alla mock-funktioner före varje test
    jest.clearAllMocks();

    // Ställ in ett standardvärde för den mockade funktionen

    (convertWGS84toRT90 as jest.Mock).mockReturnValue({
      latitudeRT90: 1000000,
      longitudeRT90: 2000000,
    });
  });

  it("should correctly map a location with gid", () => {
    // Skriv ditt test här
  });

  it("should correctly map a location without gid", () => {
    // Skriv ditt test här
  });
});

```