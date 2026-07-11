import type { ApiClient } from '../../../api';
import { apiEndpoints } from '../../../api';
import type { MarketSummary } from '../../../models';
import type { MarketRepository } from '../types';

export class HttpMarketRepository implements MarketRepository {
  constructor(private readonly client: ApiClient) {}

  getMarketSummary() {
    return this.client.get<MarketSummary>(apiEndpoints.market);
  }
}
