import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { AlertItem as AlertItemType, AlertSeverity, AlertType } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';

interface AlertItemProps {
  alert: AlertItemType;
}

function iconForType(type: AlertType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'refill':
      return 'water';
    case 'price':
      return 'pricetag';
    case 'forecast':
      return 'cloudy-night';
    default:
      return 'information-circle';
  }
}

function toneForSeverity(severity: AlertSeverity): AlertSeverity {
  return severity;
}

export function AlertItem({ alert }: AlertItemProps) {
  const iconColor =
    alert.severity === 'critical'
      ? colors.danger
      : alert.severity === 'warning'
        ? colors.warning
        : colors.info;

  return (
    <View style={[styles.container, !alert.read && styles.unread]}>
      <View style={[styles.iconWrap, { backgroundColor: `${iconColor}18` }]}>
        <Ionicons name={iconForType(alert.type)} size={24} color={iconColor} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{alert.title}</Text>
          {!alert.read ? <View style={styles.dot} /> : null}
        </View>
        <Text style={styles.message}>{alert.message}</Text>
        <View style={styles.footer}>
          <StatusBadge
            label={alert.severity}
            tone={toneForSeverity(alert.severity)}
          />
          <Text style={styles.time}>{formatRelativeTime(alert.timestamp)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  unread: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.primaryMuted,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  time: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
