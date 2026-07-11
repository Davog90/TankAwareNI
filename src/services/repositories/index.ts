import { appConfig } from '../../config';
import { createHttpRepositories } from './http';
import { createMockRepositories } from './mock';
import type { Repositories } from './types';

/**
 * Factory that returns mock or HTTP repositories based on app config.
 * Flip `appConfig.useMockData` to switch data sources without changing screens.
 */
export function createRepositories(): Repositories {
  if (appConfig.useMockData) {
    return createMockRepositories();
  }
  return createHttpRepositories();
}

export type { Repositories } from './types';
export type {
  AlertsRepository,
  ForecastRepository,
  MarketRepository,
  SmartCityRepository,
  TankRepository,
} from './types';
