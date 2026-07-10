import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertItem } from '../components/alerts/AlertItem';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { alerts as mockAlerts } from '../data/mockData';
import { colors, radii, spacing, typography } from '../theme';
import type { AlertItem as AlertItemType } from '../types';

type FilterKey = 'all' | 'unread';

export function AlertsScreen() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [items, setItems] = useState<AlertItemType[]>(mockAlerts);

  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length,
    [items],
  );

  const visible = useMemo(() => {
    if (filter === 'unread') {
      return items.filter((item) => !item.read);
    }
    return items;
  }, [filter, items]);

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Alerts"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} unread reminder${unreadCount === 1 ? '' : 's'}`
              : 'You are up to date'
          }
        />

        <View style={styles.toolbar}>
          <View style={styles.filters}>
            <FilterChip
              label="All"
              active={filter === 'all'}
              onPress={() => setFilter('all')}
            />
            <FilterChip
              label="Unread"
              active={filter === 'unread'}
              onPress={() => setFilter('unread')}
            />
          </View>
          {unreadCount > 0 ? (
            <Pressable onPress={markAllRead} hitSlop={8}>
              <Text style={styles.markRead}>Mark all read</Text>
            </Pressable>
          ) : null}
        </View>

        {visible.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No unread alerts</Text>
            <Text style={styles.emptyBody}>
              New refill reminders and price updates will appear here.
            </Text>
          </View>
        ) : (
          visible.map((alert) => <AlertItem key={alert.id} alert={alert} />)
        )}
      </ScrollView>
    </SafeAreaView>
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
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
