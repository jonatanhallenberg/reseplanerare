# Introduktion till Playwright

---

# Vad är Playwright?

- Ett öppet källkodsverktyg för automatisering av webbläsare
- Stöder Chrome, Firefox, Safari och Edge
- Skapad av Microsoft, baserad på erfarenheter från Puppeteer

---

# Varför använda Playwright?

- Snabb och pålitlig testning över flera webbläsare
- Automatisk väntan på element och nätverksanrop
- Kraftfull API för interaktion med webbsidor
- Stöd för moderna webbteknologier (Shadow DOM, iframes)

---

# Playwright vs Cypress

| Funktion | Playwright | Cypress |
|----------|------------|---------|
| Webbläsarstöd | Flera (Chrome, Firefox, Safari, Edge) | Primärt Chrome |
| Språkstöd | JavaScript, TypeScript, Python, .NET, Java | JavaScript, TypeScript |
| Arkitektur | Kör utanför webbläsaren | Kör inuti webbläsaren |
| Väntan | Automatisk intelligent väntan | Manuell konfiguration av väntetider |

---

# Kodexempel: Grundläggande test

```javascript
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
  await page.click('a[href="https://www.iana.org/domains/example"]');
  await expect(page).toHaveURL('https://www.iana.org/domains/reserved');
});
```

---

# Vad kan man göra?

Docs

https://playwright.dev/docs/writing-tests#actions

---
# Best Practices

1. Skriv atomära och oberoende tester
2. Använd data-testid för att välja element
3. Utnyttja Playwrights inbyggda väntefunktioner
4. Kör tester parallellt för ökad hastighet

---

# # Snapshottestning i Playwright

- Jämför aktuellt UI-tillstånd med tidigare sparade snapshots
- Användbart för att upptäcka oavsiktliga visuella förändringar
- Kan användas för både visuella och innehållsmässiga jämförelser


---
# Kodexempel: Snapshottestning

```js
const { test, expect } = require('@playwright/test');

test('snapshot test', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Ta en screenshot och jämför med sparad snapshot
  await expect(page).toHaveScreenshot('homepage.png');
  
});
```

---
# Uppdatera Snapshots

- Kör tester med flaggan `--update-snapshots` för att uppdatera:
    
    Copy
    
    `npx playwright test --update-snapshots`
    
- Använd när avsiktliga UI-ändringar har gjorts
- Granska ändringarna noga innan du committar

---

# Tips för Snapshottestning

1. Använd selektiv snapshottestning för specifika komponenter
2. Exkludera dynamiskt innehåll från jämförelser
3. Kör tester i samma miljö för konsekventa resultat
4. Använd tillsammans med andra testmetoder för omfattande täckning