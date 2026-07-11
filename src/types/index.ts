export type TankStatus = 'healthy' | 'low' | 'critical';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export type AlertType = 'refill' | 'price' | 'forecast' | 'system';

export interface Household {
  name: string;
  location: string;
  postcode: string;
}

export interface TankInfo {
  capacityLitres: number;
  currentLitres: number;
  percentFull: number;
  status: TankStatus;
  lastUpdated: string;
  estimatedDaysRemaining: number;
  dailyUsageLitres: number;
  nextRefillDate: string;
  nextRefillLabel: string;
}

export interface ForecastDay {
  date: string;
  label: string;
  estimatedLitres: number;
  percentFull: number;
  usageLitres: number;
  isToday?: boolean;
  isProjectedEmpty?: boolean;
}

export type WeatherImpactLevel = 'low' | 'moderate' | 'high';

export interface WeatherImpact {
  level: WeatherImpactLevel;
  label: string;
  temperatureHint: string;
  usageChangePercent: number;
  description: string;
}

export interface ForecastSummary {
  averageDailyUsageLitres: number;
  emptyDate: string;
  emptyDateLabel: string;
  confidencePercent: number;
  weatherImpact: WeatherImpact;
  horizonDays: number;
}

export interface DepletionPoint {
  dayIndex: number;
  date: string;
  label: string;
  litres: number;
}

export interface PricePoint {
  date: string;
  label: string;
  pricePpl: number;
}

export interface SupplierQuote {
  id: string;
  name: string;
  pricePpl: number;
  minOrderLitres: number;
  deliveryDays: string;
  rating: number;
  isBestValue?: boolean;
}

export interface MarketSummary {
  currentAveragePpl: number;
  changeTodayPpl: number;
  changeWeekPpl: number;
  weekLowPpl: number;
  weekHighPpl: number;
  region: string;
  lastUpdated: string;
  history: PricePoint[];
  suppliers: SupplierQuote[];
}

export interface AlertItem {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface UsageStat {
  label: string;
  value: string;
  hint: string;
}
