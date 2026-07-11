import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type {
  AlertItem as AlertItemType,
  AlertSeverity,
  AlertType,
} from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

interface AlertCardProps {
  alert: AlertItemType;
  onPress?: () => void;
}

const severityMeta: Record<
  AlertSeverity,
  {
    label: string;
    color: string;
    soft: string;
    border: string;
  }
> = {
  critical: {
    label: 'Critical',
    color: colors.danger,
    soft: colors.dangerSoft,
    border: '#F0B8B4',
  },
  warning: {
    label: 'Warning',
    color: colors.warning,
    soft: colors.warningSoft,
    border: '#F0D9B0',
  },
  info: {
    label: 'Info',
    color: colors.info,
    soft: colors.infoSoft,
    border: '#C5E0EC',
  },
};

function iconForType(type: AlertType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'refill':
      return 'water';
    case 'weather':
    case 'forecast':
      return 'snow';
    case 'leak':
      return 'warning';
    case 'price':
      return 'pricetag';
    default:
      return 'notifications';
  }
}

export function AlertCard({ alert, onPress }: AlertCardProps) {
  const meta = severityMeta[alert.severity];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: meta.border,
          backgroundColor: alert.read ? colors.surface : meta.soft,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.severityBar, { backgroundColor: meta.color }]} />

      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.iconWrap, { backgroundColor: colors.white }]}>
            <Ionicons
              name={iconForType(alert.type)}
              size={22}
              color={meta.color}
            />
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title}>{alert.title}</Text>
            <Text style={styles.time}>{formatRelativeTime(alert.timestamp)}</Text>
          </View>

          <View style={[styles.severityBadge, { backgroundColor: meta.color }]}>
            <Text style={styles.severityText}>{meta.label}</Text>
          </View>
        </View>

        <Text style={styles.message}>{alert.message}</Text>

        <View style={styles.footer}>
          {!alert.read ? (
            <View style={styles.unreadPill}>
              <View style={[styles.unreadDot, { backgroundColor: meta.color }]} />
              <Text style={[styles.unreadText, { color: meta.color }]}>New</Text>
            </View>
          ) : (
            <Text style={styles.readLabel}>Seen</Text>
          )}
          <Text style={[styles.severityHint, { color: meta.color }]}>
            {meta.label} severity
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/** @deprecated Use AlertCard */
export const AlertItem = AlertCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: radii.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
  },
  severityBar: {
    width: 6,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
  },
  time: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  severityBadge: {
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  severityText: {
    ...typography.label,
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  unreadPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unreadText: {
    ...typography.bodyBold,
  },
  readLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  severityHint: {
    ...typography.caption,
    fontWeight: '600',
  },
});
