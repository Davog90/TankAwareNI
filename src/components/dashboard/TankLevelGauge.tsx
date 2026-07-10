import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing, typography } from '../../theme';
import type { TankStatus } from '../../types';
import { formatLitres, formatPercent, getTankStatusLabel } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';

interface TankLevelGaugeProps {
  percentFull: number;
  currentLitres: number;
  capacityLitres: number;
  status: TankStatus;
  daysRemaining: number;
}

function fillColorForStatus(status: TankStatus): string {
  switch (status) {
    case 'critical':
      return colors.tankFillCritical;
    case 'low':
      return colors.tankFillLow;
    default:
      return colors.tankFill;
  }
}

export function TankLevelGauge({
  percentFull,
  currentLitres,
  capacityLitres,
  status,
  daysRemaining,
}: TankLevelGaugeProps) {
  const fillHeight = `${Math.max(8, Math.min(100, percentFull))}%` as `${number}%`;
  const fillColor = fillColorForStatus(status);

  return (
    <View style={styles.container}>
      <View style={styles.gaugeColumn}>
        <View style={styles.tankShell}>
          <View style={styles.tankInner}>
            <View style={[styles.fill, { height: fillHeight, backgroundColor: fillColor }]}>
              <LinearGradient
                colors={['rgba(255,255,255,0.18)', 'transparent']}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </View>
          <View style={styles.tankCap} />
        </View>
        <Text style={styles.capacityLabel}>{formatLitres(capacityLitres)} tank</Text>
      </View>

      <View style={styles.details}>
        <StatusBadge label={getTankStatusLabel(status)} tone={status} />
        <Text style={styles.percent}>{formatPercent(percentFull)}</Text>
        <Text style={styles.litres}>
          {formatLitres(currentLitres)} remaining
        </Text>
        <View style={styles.daysBox}>
          <Text style={styles.daysValue}>{daysRemaining}</Text>
          <Text style={styles.daysLabel}>days of heat left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },
  gaugeColumn: {
    alignItems: 'center',
  },
  tankShell: {
    width: 92,
    height: 160,
    borderRadius: radii.lg,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
    padding: 6,
    justifyContent: 'flex-end',
  },
  tankInner: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.tankEmpty,
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tankCap: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: 36,
    height: 12,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
  },
  capacityLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  details: {
    flex: 1,
  },
  percent: {
    ...typography.hero,
    color: colors.text,
    marginTop: spacing.md,
  },
  litres: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  daysBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  daysValue: {
    ...typography.heading,
    color: colors.primary,
  },
  daysLabel: {
    ...typography.caption,
    color: colors.primaryLight,
    marginTop: 2,
  },
});
