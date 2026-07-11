export type TankStatus = 'healthy' | 'low' | 'critical';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export type AlertType = 'refill' | 'price' | 'forecast' | 'weather' | 'leak' | 'system';

export interface AlertItem {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

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

export type MarketTrendDirection = 'rising' | 'falling' | 'stable';

export type BuyRecommendation = 'BUY NOW' | 'WAIT' | 'MONITOR';

export interface PriceForecastPoint {
  dayIndex: number;
  date: string;
  label: string;
  pricePpl: number;
  isProjected?: boolean;
}

export interface MarketIntelligence {
  currentPricePpl: number;
  weeklyTrend: MarketTrendDirection;
  weeklyTrendLabel: string;
  weeklyChangePpl: number;
  weeklyChangePercent: number;
  forecastChangePercent: number;
  forecastHorizonDays: number;
  forecastLabel: string;
  recommendation: BuyRecommendation;
  recommendationReason: string;
  region: string;
  lastUpdated: string;
  weekLowPpl: number;
  weekHighPpl: number;
  history: PricePoint[];
  forecastSeries: PriceForecastPoint[];
  suppliers: SupplierQuote[];
}

export interface MarketSummary extends MarketIntelligence {
  currentAveragePpl: number;
  changeTodayPpl: number;
  changeWeekPpl: number;
}

export interface UsageStat {
  label: string;
  value: string;
  hint: string;
}

export type FuelPovertyRisk = 'Low' | 'Medium' | 'High';

export interface RegionalDistributionBucket {
  label: string;
  households: number;
  colorHint: 'healthy' | 'watch' | 'low' | 'critical';
}

export interface RegionalTrendPoint {
  weekLabel: string;
  averageTankPercent: number;
  householdsBelow20: number;
  predictedRunOuts: number;
}

export interface SmartCityStats {
  regionName: string;
  pilotHomes: number;
  averageTankLevelPercent: number;
  householdsBelow20: number;
  predictedRunOuts: number;
  fuelPovertyRisk: FuelPovertyRisk;
  lastUpdated: string;
  anonymisationNote: string;
  distribution: RegionalDistributionBucket[];
  weeklyTrends: RegionalTrendPoint[];
  councilInsight: string;
}
