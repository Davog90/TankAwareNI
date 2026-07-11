import type {
  AlertItem,
  DepletionPoint,
  ForecastDay,
  ForecastSummary,
  Household,
  MarketSummary,
  SmartCityStats,
  TankInfo,
  UsageStat,
} from '../../models';

export interface TankRepository {
  getHousehold(): Promise<Household>;
  getTankInfo(): Promise<TankInfo>;
  getUsageStats(): Promise<UsageStat[]>;
}

export interface ForecastRepository {
  getSummary(): Promise<ForecastSummary>;
  getDepletionSeries(): Promise<DepletionPoint[]>;
  getForecastDays(): Promise<ForecastDay[]>;
}

export interface MarketRepository {
  getMarketSummary(): Promise<MarketSummary>;
}

export interface AlertsRepository {
  getAlerts(): Promise<AlertItem[]>;
  markAsRead(id: string, read?: boolean): Promise<AlertItem[]>;
  markAllRead(): Promise<AlertItem[]>;
}

export interface SmartCityRepository {
  getStats(): Promise<SmartCityStats>;
}

export interface Repositories {
  tank: TankRepository;
  forecast: ForecastRepository;
  market: MarketRepository;
  alerts: AlertsRepository;
  smartCity: SmartCityRepository;
}
