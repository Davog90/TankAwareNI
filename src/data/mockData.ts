import type {
  AlertItem,
  ForecastDay,
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
  capacityLitres: 1200,
  currentLitres: 384,
  percentFull: 32,
  status: 'low',
  lastUpdated: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  estimatedDaysRemaining: 19,
  dailyUsageLitres: 20.2,
};

export const usageStats: UsageStat[] = [
  {
    label: 'Daily use',
    value: '20.2 L',
    hint: '7-day average',
  },
  {
    label: 'This week',
    value: '141 L',
    hint: 'Slightly above normal',
  },
  {
    label: 'Last refill',
    value: '28 Jan',
    hint: '900 L delivered',
  },
];

function buildForecast(): ForecastDay[] {
  const days: ForecastDay[] = [];
  let litres = tankInfo.currentLitres;
  const today = new Date();

  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const usagePattern = [18, 22, 21, 19, 20, 24, 17];

  for (let i = 0; i < 21; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const usage = usagePattern[date.getDay()];

    if (i > 0) {
      litres = Math.max(0, litres - usage);
    }

    const percentFull = (litres / tankInfo.capacityLitres) * 100;
    const isProjectedEmpty = litres <= 40 && litres > 0;

    days.push({
      date: date.toISOString(),
      label: i === 0 ? 'Today' : weekday[date.getDay()],
      estimatedLitres: Math.round(litres),
      percentFull: Math.round(percentFull),
      usageLitres: i === 0 ? 0 : usage,
      isToday: i === 0,
      isProjectedEmpty,
    });
  }

  return days;
}

export const forecastDays: ForecastDay[] = buildForecast();

export const emptyDateEstimate = (() => {
  const emptyDay = forecastDays.find((day) => day.estimatedLitres <= 40);
  if (!emptyDay) {
    return 'Beyond 3 weeks';
  }
  return new Date(emptyDay.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
})();

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
    severity: 'warning',
    title: 'Tank running low',
    message:
      'Your tank is at 32%. At current usage you may need a refill within 19 days. Consider ordering soon.',
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
    severity: 'critical',
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
  recommendedLitres: 800,
  estimatedCost: 547.2,
  reason: 'Bring the tank back to about 98% before colder weather.',
};
