import { marketSummary } from '../../../data/mockData';
import type { MarketRepository } from '../types';
import { withMockLatency } from './delay';

export class MockMarketRepository implements MarketRepository {
  getMarketSummary() {
    return withMockLatency(marketSummary);
  }
}
