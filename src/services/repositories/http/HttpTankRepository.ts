import type { ApiClient } from '../../../api';
import { apiEndpoints } from '../../../api';
import type { Household, TankInfo, UsageStat } from '../../../models';
import type { TankRepository } from '../types';

export class HttpTankRepository implements TankRepository {
  constructor(private readonly client: ApiClient) {}

  getHousehold() {
    return this.client.get<Household>(apiEndpoints.household);
  }

  getTankInfo() {
    return this.client.get<TankInfo>(apiEndpoints.tank);
  }

  getUsageStats() {
    return this.client.get<UsageStat[]>(`${apiEndpoints.tank}/usage-stats`);
  }
}
