# AGENTS.md

## Cursor Cloud specific instructions

TankAware NI is a React Native + Expo (SDK 57) TypeScript app. By default it runs entirely on
mock data (`useMockData: true` in `src/config/appConfig.ts`), so no backend or secrets are needed
to develop or demo it. See `README.md` for the feature list and project structure.

### Running the app
- This VM has no iOS/Android emulator, so demo/run the app on **web**: `npm run web` (Expo/Metro
  serves on `http://localhost:8081`; the JS bundle builds on the first page request and can take
  ~30s the first time).
- Web requires the runtime deps `react-dom`, `react-native-web`, and `@expo/metro-runtime`. They
  are declared in `package.json`; the update script's `npm install` installs them. The `start`
  / `android` / `ios` scripts target native devices and are not runnable here.

### Lint / test / build
- There is **no ESLint config and no automated test suite**. The only static check is
  `npm run typecheck` (`tsc --noEmit`).
- There is no separate build step for local dev; running Metro (`npm run web`) is the dev workflow.

### Non-obvious gotchas
- Mock repositories add a small artificial async delay (`src/services/repositories/mock/delay.ts`),
  so screens briefly show a loading state before content appears — this is expected, not a bug.
- Alert read-state (unread count + the Alerts tab badge) lives in in-memory React state
  (`src/providers/AlertsProvider.tsx`); reloading the page resets alerts to their unread seed state.
- `AGENTS.md` is listed in `.gitignore`; this file is force-tracked so its guidance persists for
  future agents.
