import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { DepletionPoint } from '../../types';
import { colors, typography } from '../../theme';
import { ChartCard, LineChart, type ChartPoint } from '../charts';

interface DepletionLineChartProps {
  series: DepletionPoint[];
  emptyDateLabel: string;
}

export function DepletionLineChart({
  series,
  emptyDateLabel,
}: DepletionLineChartProps) {
  const chartData: ChartPoint[] = useMemo(
    () =>
      series.map((point) => ({
        x: point.dayIndex,
        y: point.litres,
        label: point.label || undefined,
      })),
    [series],
  );

  const endLitres = series[series.length - 1]?.litres ?? 0;
  const startLitres = series[0]?.litres ?? 0;

  return (
    <ChartCard
      title="Projected depletion"
      subtitle="Estimated litres remaining over the next 60 days"
      legend="Tank level"
      footer={
        <Text style={styles.footer}>
          Starts at {Math.round(startLitres)} L and trends to about{' '}
          {Math.round(endLitres)} L in 60 days. Forecasted empty date:{' '}
          {emptyDateLabel}.
        </Text>
      }
    >
      <LineChart
        data={chartData}
        height={240}
        lineColor={colors.primaryLight}
        fillColor={colors.primaryLight}
        showArea
        showGrid
        smooth
        yMin={0}
        formatYLabel={(value) => `${Math.round(value)}`}
        markerIndex={Math.min(series.length - 1, 45)}
        markerLabel="Trend"
      />
    </ChartCard>
  );
}

const styles = StyleSheet.create({
  footer: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
