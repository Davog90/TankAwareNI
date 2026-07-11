import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import type { PricePoint } from '../../types';

interface PriceTrendChartProps {
  history: PricePoint[];
  weekLow: number;
  weekHigh: number;
}

export function PriceTrendChart({ history, weekLow, weekHigh }: PriceTrendChartProps) {
  const recent = history.slice(-10);
  const prices = recent.map((p) => p.pricePpl);
  const min = Math.min(...prices) - 0.5;
  const max = Math.max(...prices) + 0.5;
  const range = max - min || 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>14-day trend</Text>
        <Text style={styles.range}>
          Low {weekLow.toFixed(1)}p · High {weekHigh.toFixed(1)}p
        </Text>
      </View>

      <View style={styles.chart}>
        {recent.map((point, index) => {
          const height = ((point.pricePpl - min) / range) * 100;
          const isLast = index === recent.length - 1;

          return (
            <View key={point.date} style={styles.column}>
              <View style={styles.barArea}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${Math.max(8, height)}%`,
                      backgroundColor: isLast ? colors.accent : colors.primaryLight,
                    },
                  ]}
                />
              </View>
              {(index === 0 || isLast || index === Math.floor(recent.length / 2)) && (
                <Text style={styles.label}>{point.label}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
  },
  range: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
    gap: 4,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 8,
  },
  label: {
    ...typography.label,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
