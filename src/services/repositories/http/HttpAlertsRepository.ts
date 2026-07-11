import type { ApiClient } from '../../../api';
import { apiEndpoints } from '../../../api';
import type { AlertItem } from '../../../models';
import type { AlertsRepository } from '../types';

export class HttpAlertsRepository implements AlertsRepository {
  constructor(private readonly client: ApiClient) {}

  getAlerts() {
    return this.client.get<AlertItem[]>(apiEndpoints.alerts.list);
  }

  markAsRead(id: string, read = true) {
    return this.client.patch<AlertItem[]>(apiEndpoints.alerts.byId(id), {
      read,
    });
  }

  markAllRead() {
    return this.client.post<AlertItem[]>(apiEndpoints.alerts.markAllRead);
  }
}
