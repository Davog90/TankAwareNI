import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import type { ForecastDay } from '../../types';

interface ForecastChartProps {
  days: ForecastDay[];
}

export function ForecastChart({ days }: ForecastChartProps) {
  const sample = days.filter((_, index) => index % 3 === 0).slice(0, 7);
  const max = Math.max(...sample.map((d) => d.estimatedLitres), 1);

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {sample.map((day) => {
          const height = Math.max(12, (day.estimatedLitres / max) * 120);
          const barColor =
            day.percentFull <= 15
              ? colors.danger
              : day.percentFull <= 30
                ? colors.warning
                : colors.primaryLight;

          return (
            <View key={day.date} style={styles.barColumn}>
              <Text style={styles.value}>{day.estimatedLitres}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    { height, backgroundColor: barColor },
                  ]}
                />
              </View>
              <Text style={styles.label}>{day.label}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.caption}>Estimated litres remaining over the next 3 weeks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 160,
    gap: spacing.sm,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontSize: 11,
  },
  barTrack: {
    height: 120,
    width: '70%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: radii.sm,
    borderTopRightRadius: radii.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontSize: 12,
  },
  caption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
