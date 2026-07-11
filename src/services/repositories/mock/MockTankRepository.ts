import {
  household,
  tankInfo,
  usageStats,
} from '../../../data/mockData';
import type { TankRepository } from '../types';
import { withMockLatency } from './delay';

export class MockTankRepository implements TankRepository {
  getHousehold() {
    return withMockLatency(household);
  }

  getTankInfo() {
    return withMockLatency(tankInfo);
  }

  getUsageStats() {
    return withMockLatency(usageStats);
  }
}
