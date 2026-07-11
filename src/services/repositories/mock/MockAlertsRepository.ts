import type { AlertsRepository } from '../types';
import { getAlertStore, setAlertStore } from './alertStore';
import { withMockLatency } from './delay';

export class MockAlertsRepository implements AlertsRepository {
  async getAlerts() {
    return withMockLatency(getAlertStore());
  }

  async markAsRead(id: string, read = true) {
    const next = getAlertStore().map((alert) =>
      alert.id === id ? { ...alert, read } : alert,
    );
    return withMockLatency(setAlertStore(next));
  }

  async markAllRead() {
    const next = getAlertStore().map((alert) => ({ ...alert, read: true }));
    return withMockLatency(setAlertStore(next));
  }
}
