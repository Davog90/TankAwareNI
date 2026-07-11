import { services } from '../services';
import { useAsyncData } from './useAsyncData';

export function useDashboardData() {
  return useAsyncData(() => services.tank.getDashboard(), []);
}

export function useForecastData() {
  return useAsyncData(() => services.forecast.getForecastDashboard(), []);
}

export function useMarketData() {
  return useAsyncData(() => services.market.getMarketSummary(), []);
}

export function useSmartCityData() {
  return useAsyncData(() => services.smartCity.getStats(), []);
}
