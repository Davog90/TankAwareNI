import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCard } from '../components/alerts/AlertCard';
import { Card } from '../components/common/Card';
import { ErrorView, LoadingView } from '../components/common/StateViews';
import { useAlerts } from '../hooks';
import { colors, radii, spacing, typography } from '../theme';
import type { AlertSeverity } from '../models';

type FilterKey = 'all' | 'unread' | AlertSeverity;

const severityFilters: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'critical', label: 'Critical' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
];

export function AlertsScreen() {
  const {
    alerts: items,
    loading,
    error,
    unreadCount,
    reload,
    markAsRead,
    markAllRead,
  } = useAlerts();
  const [filter, setFilter] = useState<FilterKey>('all');

  const criticalCount = useMemo(
    () => items.filter((item) => item.severity === 'critical').length,
    [items],
  );

  const visible = useMemo(() => {
    if (filter === 'unread') {
      return items.filter((item) => !item.read);
    }
    if (filter === 'critical' || filter === 'warning' || filter === 'info') {
      return items.filter((item) => item.severity === filter);
    }
    return items;
  }, [filter, items]);

  if (loading && items.length === 0) {
    return <LoadingView label="Loading alerts…" />;
  }

  if (error && items.length === 0) {
    return <ErrorView message={error.message} onRetry={reload} />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Notifications</Text>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0
              ? `${unreadCount} unread · ${criticalCount} critical`
              : 'You are up to date'}
          </Text>
        </View>

        <Card style={styles.legendCard}>
          <Text style={styles.legendTitle}>Severity guide</Text>
          <View style={styles.legendRow}>
            <SeverityLegendSwatch tone="critical" label="Critical" />
            <SeverityLegendSwatch tone="warning" label="Warning" />
            <SeverityLegendSwatch tone="info" label="Info" />
          </View>
        </Card>

        <View style={styles.toolbar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {severityFilters.map((item) => (
              <FilterChip
                key={item.key}
                label={item.label}
                active={filter === item.key}
                onPress={() => setFilter(item.key)}
              />
            ))}
          </ScrollView>
          {unreadCount > 0 ? (
            <Pressable
              onPress={() => {
                void markAllRead();
              }}
              hitSlop={8}
              style={styles.markReadBtn}
            >
              <Text style={styles.markRead}>Mark all read</Text>
            </Pressable>
          ) : null}
        </View>

        {visible.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No alerts in this view</Text>
            <Text style={styles.emptyBody}>
              Try another filter to see tank, weather, and refill notices.
            </Text>
          </View>
        ) : (
          visible.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onPress={() => {
                void markAsRead(alert.id, !alert.read);
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SeverityLegendSwatch({
  tone,
  label,
}: {
  tone: AlertSeverity;
  label: string;
}) {
  const color =
    tone === 'critical'
      ? colors.danger
      : tone === 'warning'
        ? colors.warning
        : colors.info;

  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  legendCard: {
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  legendTitle: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    ...typography.bodyBold,
    color: colors.text,
  },
  toolbar: {
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodyBold,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  markReadBtn: {
    alignSelf: 'flex-start',
  },
  markRead: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  empty: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
