import type { ApiClient } from '../../../api';
import { apiEndpoints } from '../../../api';
import type { SmartCityStats } from '../../../models';
import type { SmartCityRepository } from '../types';

export class HttpSmartCityRepository implements SmartCityRepository {
  constructor(private readonly client: ApiClient) {}

  getStats() {
    return this.client.get<SmartCityStats>(apiEndpoints.smartCity);
  }
}
