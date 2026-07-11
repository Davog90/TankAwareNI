export const apiEndpoints = {
  household: '/household',
  tank: '/tank',
  forecast: {
    summary: '/forecast/summary',
    depletion: '/forecast/depletion',
    days: '/forecast/days',
  },
  market: '/market',
  alerts: {
    list: '/alerts',
    byId: (id: string) => `/alerts/${id}`,
    markAllRead: '/alerts/mark-all-read',
  },
  smartCity: '/smart-city/stats',
} as const;
