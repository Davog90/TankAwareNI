import type {
  AlertItem,
  DepletionPoint,
  ForecastDay,
  ForecastSummary,
  Household,
  MarketSummary,
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
  currentAveragePpl: 68.4,
  changeTodayPpl: -0.6,
  changeWeekPpl: -1.8,
  weekLowPpl: 67.2,
  weekHighPpl: 70.9,
  region: 'Northern Ireland',
  lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  history: [
    { date: '2026-06-26', label: '26 Jun', pricePpl: 70.9 },
    { date: '2026-06-27', label: '27 Jun', pricePpl: 70.4 },
    { date: '2026-06-28', label: '28 Jun', pricePpl: 69.8 },
    { date: '2026-06-29', label: '29 Jun', pricePpl: 69.5 },
    { date: '2026-06-30', label: '30 Jun', pricePpl: 69.1 },
    { date: '2026-07-01', label: '1 Jul', pricePpl: 68.7 },
    { date: '2026-07-02', label: '2 Jul', pricePpl: 68.9 },
    { date: '2026-07-03', label: '3 Jul', pricePpl: 69.2 },
    { date: '2026-07-04', label: '4 Jul', pricePpl: 68.8 },
    { date: '2026-07-05', label: '5 Jul', pricePpl: 68.5 },
    { date: '2026-07-06', label: '6 Jul', pricePpl: 68.3 },
    { date: '2026-07-07', label: '7 Jul', pricePpl: 68.1 },
    { date: '2026-07-08', label: '8 Jul', pricePpl: 68.6 },
    { date: '2026-07-09', label: '9 Jul', pricePpl: 69.0 },
    { date: '2026-07-10', label: 'Today', pricePpl: 68.4 },
  ],
  suppliers: [
    {
      id: 's1',
      name: 'Ulster Oil Direct',
      pricePpl: 66.9,
      minOrderLitres: 500,
      deliveryDays: '1–2 days',
      rating: 4.8,
      isBestValue: true,
    },
    {
      id: 's2',
      name: 'Lagan Fuels',
      pricePpl: 67.4,
      minOrderLitres: 500,
      deliveryDays: '2–3 days',
      rating: 4.6,
    },
    {
      id: 's3',
      name: 'County Heating Oil',
      pricePpl: 67.8,
      minOrderLitres: 450,
      deliveryDays: 'Next day',
      rating: 4.7,
    },
    {
      id: 's4',
      name: 'NI Home Fuels',
      pricePpl: 68.2,
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
    severity: 'info',
    title: 'Refill planned',
    message:
      'Your tank is at 68%. At current usage you have about 31 days left. Next refill is planned for 18 December 2026.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'a2',
    type: 'price',
    severity: 'info',
    title: 'Prices eased this week',
    message:
      'Average NI heating oil is down 1.8p this week to 68.4p per litre. A good window to compare quotes.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'a3',
    type: 'forecast',
    severity: 'warning',
    title: 'Cold spell may raise usage',
    message:
      'Overnight lows near 2°C are forecast next week. Daily burn could rise by about 15%.',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'a4',
    type: 'system',
    severity: 'info',
    title: 'Estimate updated',
    message:
      'TankAware refreshed your level estimate using recent weather and typical household usage.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'a5',
    type: 'refill',
    severity: 'info',
    title: 'Reminder set',
    message:
      'You will get a refill reminder when the tank is projected to drop below 20%.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export const refillSuggestion = {
  recommendedLitres: 290,
  estimatedCost: 198.4,
  reason: 'Top up to full capacity ahead of colder weather.',
};
