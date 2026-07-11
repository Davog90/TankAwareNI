import type { ApiClient } from '../../../api';
import { apiEndpoints } from '../../../api';
import type {
  DepletionPoint,
  ForecastDay,
  ForecastSummary,
} from '../../../models';
import type { ForecastRepository } from '../types';

export class HttpForecastRepository implements ForecastRepository {
  constructor(private readonly client: ApiClient) {}

  getSummary() {
    return this.client.get<ForecastSummary>(apiEndpoints.forecast.summary);
  }

  getDepletionSeries() {
    return this.client.get<DepletionPoint[]>(apiEndpoints.forecast.depletion);
  }

  getForecastDays() {
    return this.client.get<ForecastDay[]>(apiEndpoints.forecast.days);
  }
}
