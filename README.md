# TankAware NI

A React Native (Expo) MVP that helps Northern Ireland households monitor home heating oil tank levels, forecast when they will run out, receive refill reminders, and track local oil prices.

All data currently comes from mock services — no backend is required to run the app.

## Features

- **Home (Dashboard)** — tank level gauge, litres remaining, days left, refill suggestion
- **Forecast** — depletion outlook, confidence score, weather impact
- **Market** — NI average price, trends, forecast, buy recommendation
- **Alerts** — severity-coded tank, weather, refill, and leak notices

## Tech stack

- React Native + Expo (SDK 57)
- TypeScript
- React Navigation (bottom tabs)
- Service / repository layer for data access (mock today, HTTP-ready tomorrow)
- Expo Vector Icons & Linear Gradient

## Getting started

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

```bash
npm run typecheck
```

## Switching to a real API

1. Set `useMockData: false` in `src/config/appConfig.ts`
2. Point `apiBaseUrl` at your backend
3. Keep screens unchanged — they already call services/hooks

## Project structure

```
src/
  api/            # HTTP client + endpoint paths
  config/         # App config (mock vs REST switch)
  models/         # Domain data models
  services/       # Domain services + repositories (mock & HTTP)
  hooks/          # Async data hooks for screens
  providers/      # Shared app providers (alerts state)
  data/           # Mock seed data (used only by mock repositories)
  components/     # UI components
  screens/        # Tab screens
  navigation/     # Bottom tab navigator
  theme/          # Colours, typography, spacing
  types/          # Re-exports models for convenience
  utils/          # Formatters
```

## Design notes

Built for clarity and accessibility: large type, high-contrast deep-teal palette, simple four-tab navigation, and a calm dashboard layout suitable for older users.
