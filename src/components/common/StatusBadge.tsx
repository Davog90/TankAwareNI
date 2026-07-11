import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import type { AlertSeverity, TankStatus } from '../../types';

type BadgeTone = TankStatus | AlertSeverity | 'neutral';

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
}

const toneStyles: Record<
  BadgeTone,
  { backgroundColor: string; color: string }
> = {
  healthy: { backgroundColor: colors.successSoft, color: colors.success },
  low: { backgroundColor: colors.warningSoft, color: colors.warning },
  critical: { backgroundColor: colors.dangerSoft, color: colors.danger },
  info: { backgroundColor: colors.infoSoft, color: colors.info },
  warning: { backgroundColor: colors.warningSoft, color: colors.warning },
  neutral: { backgroundColor: colors.surfaceAlt, color: colors.textSecondary },
};

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  const palette = toneStyles[tone];

  return (
    <View style={[styles.badge, { backgroundColor: palette.backgroundColor }]}>
      <Text style={[styles.label, { color: palette.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  label: {
    ...typography.label,
    textTransform: 'uppercase',
  },
});
