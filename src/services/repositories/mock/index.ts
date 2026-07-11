import type { Repositories } from '../types';
import { MockAlertsRepository } from './MockAlertsRepository';
import { MockForecastRepository } from './MockForecastRepository';
import { MockMarketRepository } from './MockMarketRepository';
import { MockSmartCityRepository } from './MockSmartCityRepository';
import { MockTankRepository } from './MockTankRepository';

export function createMockRepositories(): Repositories {
  return {
    tank: new MockTankRepository(),
    forecast: new MockForecastRepository(),
    market: new MockMarketRepository(),
    alerts: new MockAlertsRepository(),
    smartCity: new MockSmartCityRepository(),
  };
}

export {
  MockAlertsRepository,
  MockForecastRepository,
  MockMarketRepository,
  MockSmartCityRepository,
  MockTankRepository,
};
