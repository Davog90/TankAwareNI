import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing, typography } from '../../theme';
import type { TankStatus } from '../../types';
import { formatPercent, getTankStatusLabel } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';

interface TankLevelGaugeProps {
  percentFull: number;
  status: TankStatus;
  daysRemaining?: number;
}

function fillColorsForStatus(status: TankStatus): [string, string] {
  switch (status) {
    case 'critical':
      return ['#E85A4F', '#B42318'];
    case 'low':
      return ['#E0A04A', '#C47A1A'];
    default:
      return ['#2F8FA8', '#1A5A6E'];
  }
}

export function TankLevelGauge({
  percentFull,
  status,
  daysRemaining,
}: TankLevelGaugeProps) {
  const clamped = Math.max(6, Math.min(100, percentFull));
  const fillHeight = `${clamped}%` as `${number}%`;
  const [fillTop, fillBottom] = fillColorsForStatus(status);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tankColumn}>
        <View style={styles.tankCap} />
        <View style={styles.tankNeck} />
        <View style={styles.tankShell}>
          <View style={styles.tankInner}>
            <LinearGradient
              colors={[fillTop, fillBottom]}
              style={[styles.fill, { height: fillHeight }]}
            >
              <View style={styles.oilSheen} />
            </LinearGradient>

            {[25, 50, 75].map((mark) => (
              <View
                key={mark}
                style={[styles.levelMark, { bottom: `${mark}%` }]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.readout}>
        <StatusBadge label={getTankStatusLabel(status)} tone={status} />
        <Text style={styles.percent}>{formatPercent(percentFull)}</Text>
        <Text style={styles.caption}>Tank level</Text>
        {typeof daysRemaining === 'number' ? (
          <Text style={styles.daysHint}>
            About {daysRemaining} days of oil left
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  tankColumn: {
    alignItems: 'center',
  },
  tankCap: {
    width: 42,
    height: 10,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  tankNeck: {
    width: 22,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  tankShell: {
    width: 108,
    height: 168,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 7,
  },
  tankInner: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.22)',
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  oilSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  levelMark: {
    position: 'absolute',
    left: 0,
    width: 14,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  readout: {
    flex: 1,
    maxWidth: 160,
  },
  percent: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 62,
    color: colors.white,
    marginTop: spacing.md,
    letterSpacing: -1.5,
  },
  caption: {
    ...typography.body,
    color: 'rgba(255,255,255,0.72)',
    marginTop: spacing.xs,
  },
  daysHint: {
    ...typography.bodyBold,
    color: colors.white,
    marginTop: spacing.md,
    lineHeight: 24,
  },
});
