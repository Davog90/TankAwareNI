import type { AlertItem } from '../../../models';
import { alerts as seedAlerts } from '../../../data/mockData';

/** In-memory mutable store so mock alert mutations persist for the session */
let alertStore: AlertItem[] = seedAlerts.map((alert) => ({ ...alert }));

export function getAlertStore(): AlertItem[] {
  return alertStore.map((alert) => ({ ...alert }));
}

export function setAlertStore(next: AlertItem[]): AlertItem[] {
  alertStore = next.map((alert) => ({ ...alert }));
  return getAlertStore();
}

export function resetAlertStore(): void {
  alertStore = seedAlerts.map((alert) => ({ ...alert }));
}
