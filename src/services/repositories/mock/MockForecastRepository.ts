import {
  depletionSeries,
  forecastDays,
  forecastSummary,
} from '../../../data/mockData';
import type { ForecastRepository } from '../types';
import { withMockLatency } from './delay';

export class MockForecastRepository implements ForecastRepository {
  getSummary() {
    return withMockLatency(forecastSummary);
  }

  getDepletionSeries() {
    return withMockLatency(depletionSeries);
  }

  getForecastDays() {
    return withMockLatency(forecastDays);
  }
}
