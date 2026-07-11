import { smartCityStats } from '../../../data/mockData';
import type { SmartCityRepository } from '../types';
import { withMockLatency } from './delay';

export class MockSmartCityRepository implements SmartCityRepository {
  getStats() {
    return withMockLatency(smartCityStats);
  }
}
