## Appen - Bästtrafik reseplanerare

https://github.com/jonatanhallenberg/reseplanerare

Bästtrafik Reseplanerare är en fullstack-applikation som består av en klient (frontend) och en server (backend). Applikationen använder moderna webbteknologier och följer en typisk klient-server-arkitektur.

![](res/2024-10-14-22-42-00.png)

## Teknologier

### Frontend

- React: JavaScript-bibliotek för att bygga användargränssnitt
- TypeScript: Typat superset av JavaScript för bättre kodkvalitet och utvecklarupplevelse
- Vite: Snabb och modern byggverktyg och utvecklingsserver
- Tailwind CSS: Utility-first CSS-ramverk för snabb och flexibel styling
- Shadcn/ui: Komponentbibliotek baserat på Radix UI och Tailwind CSS

### Backend

- Node.js: JavaScript-runtime för serversidan
- Express: Webbramverk för Node.js
- TypeScript: Används även på serversidan för konsekvent kodning
- Zod: Bibliotek för schema-validering

### API

Vi använder Västtrafik PlaneraResa API

https://developer.vasttrafik.se/apis/13/v4
### Gemensamma teknologier

- RESTful API: För kommunikation mellan klient och server
- Environment variables: För konfiguration och hantering av känslig information
## Arkitektur

### Frontend-arkitektur

1. Komponenter: React-komponenter för UI-element (t.ex. TravelPlanner, TravelPlannerForm)

- API-klienter: Funktioner för att kommunicera med backend-API:et (t.ex. searchLocations, findJourney)

- Utilities: Hjälpfunktioner och gemensam logik

### Backend-arkitektur

- Server: Express-applikation som hanterar HTTP-förfrågningar
- Routes: Definierar API-endpoints och kopplar dem till controllers
- Controllers: Hanterar affärslogik och datamanipulation
- API-klienter: Kommunicerar med externa API:er (t.ex. Västtrafik API)
- Utilities: Hjälpfunktioner för datakonvertering och mappning

### Dataflöde

- Användaren interagerar med frontend-gränssnittet
- Frontend skickar förfrågningar till backend-API:et
- Backend bearbetar förfrågningar, kommunicerar med externa API:er vid behov
- Backend skickar svar tillbaka till frontend
- Frontend uppdaterar användargränssnittet baserat på svaret

## Utvecklingsmiljö

- Git: Versionhantering
- npm: Pakethanterare för både frontend och backend
- ESLint: Linting-verktyg för att upprätthålla kodkvalitet
- Environment files: .env-filer för att hantera miljövariabler