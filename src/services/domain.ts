import type { Repositories } from './repositories';

/**
 * Domain services sit above repositories.
 * Add orchestration / mapping logic here without leaking transport details to UI.
 */
export class TankService {
  constructor(private readonly repos: Repositories) {}

  getHousehold() {
    return this.repos.tank.getHousehold();
  }

  getTankInfo() {
    return this.repos.tank.getTankInfo();
  }

  getUsageStats() {
    return this.repos.tank.getUsageStats();
  }

  async getDashboard() {
    const [household, tankInfo, usageStats] = await Promise.all([
      this.getHousehold(),
      this.getTankInfo(),
      this.getUsageStats(),
    ]);
    return { household, tankInfo, usageStats };
  }
}

export class ForecastService {
  constructor(private readonly repos: Repositories) {}

  getSummary() {
    return this.repos.forecast.getSummary();
  }

  getDepletionSeries() {
    return this.repos.forecast.getDepletionSeries();
  }

  getForecastDays() {
    return this.repos.forecast.getForecastDays();
  }

  async getForecastDashboard() {
    const [summary, depletionSeries, tankInfo] = await Promise.all([
      this.getSummary(),
      this.getDepletionSeries(),
      this.repos.tank.getTankInfo(),
    ]);
    return { summary, depletionSeries, tankInfo };
  }
}

export class MarketService {
  constructor(private readonly repos: Repositories) {}

  getMarketSummary() {
    return this.repos.market.getMarketSummary();
  }
}

export class AlertsService {
  constructor(private readonly repos: Repositories) {}

  getAlerts() {
    return this.repos.alerts.getAlerts();
  }

  markAsRead(id: string, read = true) {
    return this.repos.alerts.markAsRead(id, read);
  }

  markAllRead() {
    return this.repos.alerts.markAllRead();
  }

  async getUnreadCount() {
    const alerts = await this.getAlerts();
    return alerts.filter((alert) => !alert.read).length;
  }
}

export class SmartCityService {
  constructor(private readonly repos: Repositories) {}

  getStats() {
    return this.repos.smartCity.getStats();
  }
}

export interface AppServices {
  tank: TankService;
  forecast: ForecastService;
  market: MarketService;
  alerts: AlertsService;
  smartCity: SmartCityService;
}

export function createServices(repos: Repositories): AppServices {
  return {
    tank: new TankService(repos),
    forecast: new ForecastService(repos),
    market: new MarketService(repos),
    alerts: new AlertsService(repos),
    smartCity: new SmartCityService(repos),
  };
}
