import type { ApiClient } from '../../../api';
import { apiClient } from '../../../api';
import type { Repositories } from '../types';
import { HttpAlertsRepository } from './HttpAlertsRepository';
import { HttpForecastRepository } from './HttpForecastRepository';
import { HttpMarketRepository } from './HttpMarketRepository';
import { HttpSmartCityRepository } from './HttpSmartCityRepository';
import { HttpTankRepository } from './HttpTankRepository';

export function createHttpRepositories(
  client: ApiClient = apiClient,
): Repositories {
  return {
    tank: new HttpTankRepository(client),
    forecast: new HttpForecastRepository(client),
    market: new HttpMarketRepository(client),
    alerts: new HttpAlertsRepository(client),
    smartCity: new HttpSmartCityRepository(client),
  };
}

export {
  HttpAlertsRepository,
  HttpForecastRepository,
  HttpMarketRepository,
  HttpSmartCityRepository,
  HttpTankRepository,
};
