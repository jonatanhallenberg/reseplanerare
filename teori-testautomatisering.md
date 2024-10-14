## Testautomatisering, vadå?

- Automatisk körning av tester
- Snabb feedback om kodkvalitet
- Integreras i utvecklingsprocessen
- Säkerställer konsekvent testkörning

---

## Fördelar med Testautomatisering

- Sparar tid och resurser
- Ökar testfrekvensen
- Minskar mänskliga fel
- Möjliggör snabbare releaser
- Förbättrar kodkvaliteten över tid

---

## GitHub Actions

- Inbyggt CI/CD-verktyg i GitHub
- Automatiserar arbetsflöden baserat på GitHub-händelser
- Konfigureras med YAML-filer i `.github/workflows/`

---

## Grundläggande GitHub Actions Workflow

```yaml
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test
```

---

## GitHub Actions för olika testtyper

```yaml
name: Full Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm ci
    
    - name: Run unit and integration tests
      run: npm run test
    
    - name: Run E2E tests
      uses: cypress-io/github-action@v2
      with:
        command: npm run test:e2e
    
    - name: Run Playwright tests
      run: npx playwright test
```

---

## Rapportering och visualisering

- GitHub Actions genererar automatiskt testrapporter
- Använd Actions för att publicera testresultat och täckningsrapporter
- Integrera med verktyg som Codecov för visualisering av kodtäckning

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v1
```

---

## Best Practices för GitHub Actions

1. Håll workflows enkla och fokuserade
2. Använd officiella och välunderhållna actions
3. Sätt upp matris-byggen för olika miljöer
4. Implementera caching för snabbare byggen
5. Använd hemligheter för känslig information
6. Granska och optimera workflows regelbundet
