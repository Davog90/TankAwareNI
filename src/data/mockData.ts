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
} from '../types';

export const household: Household = {
  name: 'The Murphy Home',
  location: 'Lisburn, Co. Antrim',
  postcode: 'BT28',
};

export const tankInfo: TankInfo = {
  capacityLitres: 912,
  currentLitres: 620,
  percentFull: 68,
  status: 'healthy',
  lastUpdated: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  estimatedDaysRemaining: 31,
  dailyUsageLitres: 4.2,
  nextRefillDate: '2026-12-18',
  nextRefillLabel: '18 December 2026',
};

export const usageStats: UsageStat[] = [
  {
    label: 'Daily use',
    value: '4.2 L',
    hint: '30-day average',
  },
  {
    label: 'This week',
    value: '29 L',
    hint: 'Within normal range',
  },
  {
    label: 'Last refill',
    value: '4 Nov',
    hint: '700 L delivered',
  },
];

export const forecastSummary: ForecastSummary = {
  averageDailyUsageLitres: 4.2,
  emptyDate: '2026-12-18',
  emptyDateLabel: '18 December 2026',
  confidencePercent: 87,
  horizonDays: 60,
  weatherImpact: {
    level: 'moderate',
    label: 'Moderate impact',
    temperatureHint: 'Cooler nights expected',
    usageChangePercent: 12,
    description:
      'Forecast lows near 4°C over the next fortnight may lift daily burn by about 12% versus the mild baseline.',
  },
};

function buildForecast(): ForecastDay[] {
  const days: ForecastDay[] = [];
  let litres = tankInfo.currentLitres;
  const today = new Date();
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const usagePattern = [3.8, 4.5, 4.2, 4.0, 4.3, 4.8, 3.6];

  for (let i = 0; i < 21; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const usage = usagePattern[date.getDay()];

    if (i > 0) {
      litres = Math.max(0, litres - usage);
    }

    const percentFull = (litres / tankInfo.capacityLitres) * 100;

    days.push({
      date: date.toISOString(),
      label: i === 0 ? 'Today' : weekday[date.getDay()],
      estimatedLitres: Math.round(litres),
      percentFull: Math.round(percentFull),
      usageLitres: i === 0 ? 0 : usage,
      isToday: i === 0,
      isProjectedEmpty: litres <= 40 && litres > 0,
    });
  }

  return days;
}

function buildDepletionSeries(days = 60): DepletionPoint[] {
  const points: DepletionPoint[] = [];
  let litres = tankInfo.currentLitres;
  const today = new Date();
  const baseUsage = forecastSummary.averageDailyUsageLitres;

  for (let i = 0; i < days; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Mild seasonal/weather variation around the average burn rate
    const weatherFactor = 1 + Math.sin(i / 9) * 0.08 + (i > 40 ? 0.05 : 0);
    const usage = i === 0 ? 0 : baseUsage * weatherFactor;
    if (i > 0) {
      litres = Math.max(0, litres - usage);
    }

    const showLabel = i === 0 || i === 19 || i === 39 || i === days - 1;
    points.push({
      dayIndex: i,
      date: date.toISOString().slice(0, 10),
      label: showLabel
        ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        : '',
      litres: Math.round(litres * 10) / 10,
    });
  }

  return points;
}

export const forecastDays: ForecastDay[] = buildForecast();
export const depletionSeries: DepletionPoint[] = buildDepletionSeries(
  forecastSummary.horizonDays,
);
export const emptyDateEstimate = forecastSummary.emptyDateLabel;

export const marketSummary: MarketSummary = {
  currentPricePpl: 58,
  currentAveragePpl: 58,
  changeTodayPpl: 0.4,
  changeWeekPpl: 1.6,
  weeklyTrend: 'rising',
  weeklyTrendLabel: 'Rising',
  weeklyChangePpl: 1.6,
  weeklyChangePercent: 2.8,
  forecastChangePercent: 7,
  forecastHorizonDays: 14,
  forecastLabel: '+7% within 14 days',
  recommendation: 'BUY NOW',
  recommendationReason:
    'Prices are rising and are forecast to climb another 7% within two weeks. Locking in 58p/L now can protect against a move toward ~62p/L.',
  weekLowPpl: 55.8,
  weekHighPpl: 58.0,
  region: 'Northern Ireland',
  lastUpdated: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  history: [
    { date: '2026-06-27', label: '27 Jun', pricePpl: 55.2 },
    { date: '2026-06-28', label: '28 Jun', pricePpl: 55.4 },
    { date: '2026-06-29', label: '29 Jun', pricePpl: 55.6 },
    { date: '2026-06-30', label: '30 Jun', pricePpl: 55.9 },
    { date: '2026-07-01', label: '1 Jul', pricePpl: 56.1 },
    { date: '2026-07-02', label: '2 Jul', pricePpl: 56.3 },
    { date: '2026-07-03', label: '3 Jul', pricePpl: 56.6 },
    { date: '2026-07-04', label: '4 Jul', pricePpl: 56.8 },
    { date: '2026-07-05', label: '5 Jul', pricePpl: 57.0 },
    { date: '2026-07-06', label: '6 Jul', pricePpl: 57.2 },
    { date: '2026-07-07', label: '7 Jul', pricePpl: 57.4 },
    { date: '2026-07-08', label: '8 Jul', pricePpl: 57.6 },
    { date: '2026-07-09', label: '9 Jul', pricePpl: 57.8 },
    { date: '2026-07-10', label: '10 Jul', pricePpl: 57.9 },
    { date: '2026-07-11', label: 'Today', pricePpl: 58.0 },
  ],
  forecastSeries: [
    { dayIndex: 0, date: '2026-07-11', label: 'Today', pricePpl: 58.0 },
    { dayIndex: 2, date: '2026-07-13', label: '', pricePpl: 58.5, isProjected: true },
    { dayIndex: 4, date: '2026-07-15', label: '15 Jul', pricePpl: 59.1, isProjected: true },
    { dayIndex: 6, date: '2026-07-17', label: '', pricePpl: 59.6, isProjected: true },
    { dayIndex: 8, date: '2026-07-19', label: '', pricePpl: 60.2, isProjected: true },
    { dayIndex: 10, date: '2026-07-21', label: '21 Jul', pricePpl: 60.8, isProjected: true },
    { dayIndex: 12, date: '2026-07-23', label: '', pricePpl: 61.4, isProjected: true },
    { dayIndex: 14, date: '2026-07-25', label: '+14d', pricePpl: 62.1, isProjected: true },
  ],
  suppliers: [
    {
      id: 's1',
      name: 'Ulster Oil Direct',
      pricePpl: 57.4,
      minOrderLitres: 500,
      deliveryDays: '1–2 days',
      rating: 4.8,
      isBestValue: true,
    },
    {
      id: 's2',
      name: 'Lagan Fuels',
      pricePpl: 57.9,
      minOrderLitres: 500,
      deliveryDays: '2–3 days',
      rating: 4.6,
    },
    {
      id: 's3',
      name: 'County Heating Oil',
      pricePpl: 58.1,
      minOrderLitres: 450,
      deliveryDays: 'Next day',
      rating: 4.7,
    },
    {
      id: 's4',
      name: 'NI Home Fuels',
      pricePpl: 58.5,
      minOrderLitres: 500,
      deliveryDays: '2–4 days',
      rating: 4.4,
    },
  ],
};

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    type: 'refill',
    severity: 'critical',
    title: 'Low Tank Warning',
    message: 'Tank below 20%.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'a2',
    type: 'weather',
    severity: 'warning',
    title: 'Weather Alert',
    message: 'Cold weather expected next week.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'a3',
    type: 'refill',
    severity: 'info',
    title: 'Refill Reminder',
    message: 'Recommended refill within 14 days.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'a4',
    type: 'leak',
    severity: 'critical',
    title: 'Potential Leak',
    message: 'Abnormal consumption detected.',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export const refillSuggestion = {
  recommendedLitres: 290,
  estimatedCost: 168.2,
  reason: 'Top up to full capacity ahead of colder weather.',
};

export const smartCityStats: SmartCityStats = {
  regionName: 'Lisburn & Castlereagh pilot',
  pilotHomes: 100,
  averageTankLevelPercent: 52,
  householdsBelow20: 14,
  predictedRunOuts: 7,
  fuelPovertyRisk: 'Medium',
  lastUpdated: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  anonymisationNote:
    'All figures are aggregated and anonymised. No household addresses or personal identifiers are shown.',
  distribution: [
    { label: '80–100%', households: 18, colorHint: 'healthy' },
    { label: '60–79%', households: 27, colorHint: 'healthy' },
    { label: '40–59%', households: 24, colorHint: 'watch' },
    { label: '20–39%', households: 17, colorHint: 'low' },
    { label: 'Below 20%', households: 14, colorHint: 'critical' },
  ],
  weeklyTrends: [
    {
      weekLabel: 'W1',
      averageTankPercent: 61,
      householdsBelow20: 8,
      predictedRunOuts: 3,
    },
    {
      weekLabel: 'W2',
      averageTankPercent: 58,
      householdsBelow20: 9,
      predictedRunOuts: 4,
    },
    {
      weekLabel: 'W3',
      averageTankPercent: 56,
      householdsBelow20: 11,
      predictedRunOuts: 5,
    },
    {
      weekLabel: 'W4',
      averageTankPercent: 54,
      householdsBelow20: 12,
      predictedRunOuts: 5,
    },
    {
      weekLabel: 'W5',
      averageTankPercent: 53,
      householdsBelow20: 13,
      predictedRunOuts: 6,
    },
    {
      weekLabel: 'W6',
      averageTankPercent: 52,
      householdsBelow20: 14,
      predictedRunOuts: 7,
    },
  ],
  councilInsight:
    'Fourteen pilot homes are below 20% capacity, with seven predicted run-outs in the next fortnight. A targeted refill outreach in colder postcodes could reduce fuel-poverty risk before demand peaks.',
};
