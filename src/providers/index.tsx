import React from 'react';
import { AlertsProvider } from './AlertsProvider';

/** Root data providers — extend here when adding auth/session contexts. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AlertsProvider>{children}</AlertsProvider>;
}

export { AlertsProvider, useAlerts } from './AlertsProvider';
