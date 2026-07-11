import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { AlertItem } from '../models';
import { services } from '../services';

interface AlertsContextValue {
  alerts: AlertItem[];
  loading: boolean;
  error: Error | null;
  unreadCount: number;
  reload: () => Promise<void>;
  markAsRead: (id: string, read?: boolean) => Promise<void>;
  markAllRead: () => Promise<void>;
}

const AlertsContext = createContext<AlertsContextValue | null>(null);

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await services.alerts.getAlerts();
      setAlerts(next);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load alerts'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const markAsRead = useCallback(async (id: string, read = true) => {
    const next = await services.alerts.markAsRead(id, read);
    setAlerts(next);
  }, []);

  const markAllRead = useCallback(async () => {
    const next = await services.alerts.markAllRead();
    setAlerts(next);
  }, []);

  const value = useMemo<AlertsContextValue>(
    () => ({
      alerts,
      loading,
      error,
      unreadCount: alerts.filter((alert) => !alert.read).length,
      reload,
      markAsRead,
      markAllRead,
    }),
    [alerts, loading, error, reload, markAsRead, markAllRead],
  );

  return (
    <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
  );
}

export function useAlerts(): AlertsContextValue {
  const ctx = useContext(AlertsContext);
  if (!ctx) {
    throw new Error('useAlerts must be used within AlertsProvider');
  }
  return ctx;
}
