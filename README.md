# TankAware NI

A React Native (Expo) MVP that helps Northern Ireland households monitor home heating oil tank levels, forecast when they will run out, receive refill reminders, and track local oil prices.

All data is simulated — no backend required.

## Features

- **Dashboard** — tank level gauge, days remaining, usage stats, refill suggestion
- **Forecast** — 3-week level outlook and day-by-day estimates
- **Market** — NI average price, 14-day trend, local supplier quotes
- **Alerts** — refill, price, and weather reminders with unread filtering
- **Region** — anonymised Smart City analytics for local government stakeholders

## Tech stack

- React Native + Expo (SDK 57)
- TypeScript
- React Navigation (bottom tabs)
- Expo Vector Icons & Linear Gradient

## Getting started

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Project structure

```
src/
  components/   # Reusable UI (common, dashboard, forecast, market, alerts)
  data/         # Mock household, tank, market, and alert data
  navigation/   # Bottom tab navigator
  screens/      # Dashboard, Forecast, Market, Alerts
  theme/        # Colours, typography, spacing
  types/        # Shared TypeScript types
  utils/        # Formatters
```

## Design notes

Built for clarity and accessibility: large type, high-contrast teal palette, simple bottom navigation, and a calm dashboard layout suitable for older users.
