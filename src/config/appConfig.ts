/**
 * Application configuration for data sources.
 * Flip `useMockData` to false when a real TankAware API is available.
 */
export const appConfig = {
  /** When true, repositories serve local mock data. When false, HTTP repositories are used. */
  useMockData: true,
  /** Base URL for the future REST API */
  apiBaseUrl: 'https://api.tankaware.ni/v1',
  /** Artificial latency for mock repositories (ms) to mimic network calls */
  mockLatencyMs: 120,
  /** Default request timeout for HTTP calls (ms) */
  requestTimeoutMs: 15000,
} as const;

export type AppConfig = typeof appConfig;
