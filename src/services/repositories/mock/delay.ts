import { appConfig } from '../../../config';

/** Simulates network latency for mock repositories */
export function mockDelay(ms: number = appConfig.mockLatencyMs): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function withMockLatency<T>(value: T): Promise<T> {
  await mockDelay();
  return value;
}
