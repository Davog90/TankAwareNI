import { createRepositories } from './repositories';
import { createServices, type AppServices } from './domain';

const repositories = createRepositories();

/** Application service container — swap data source via `appConfig.useMockData`. */
export const services: AppServices = createServices(repositories);

export {
  AlertsService,
  ForecastService,
  MarketService,
  SmartCityService,
  TankService,
  createServices,
} from './domain';
export type { AppServices } from './domain';
export { createRepositories } from './repositories';
export type {
  AlertsRepository,
  ForecastRepository,
  MarketRepository,
  Repositories,
  SmartCityRepository,
  TankRepository,
} from './repositories';
