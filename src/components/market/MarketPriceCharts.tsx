import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { PriceForecastPoint, PricePoint } from '../../types';
import { colors, typography } from '../../theme';
import { ChartCard, LineChart, type ChartPoint } from '../charts';

interface MarketPriceChartsProps {
  history: PricePoint[];
  forecastSeries: PriceForecastPoint[];
  forecastChangePercent: number;
  currentPricePpl: number;
}

export function WeeklyTrendChart({ history }: { history: PricePoint[] }) {
  const data: ChartPoint[] = useMemo(
    () =>
      history.map((point, index) => ({
        x: index,
        y: point.pricePpl,
        label: point.label || undefined,
      })),
    [history],
  );

  const start = history[0]?.pricePpl ?? 0;
  const end = history[history.length - 1]?.pricePpl ?? 0;
  const delta = end - start;

  return (
    <ChartCard
      title="Weekly price trend"
      subtitle="Recent heating oil prices (p/L)"
      legend="Spot price"
      footer={
        <Text style={styles.footer}>
          Moved {delta >= 0 ? '+' : ''}
          {delta.toFixed(1)}p across the period, ending at {end.toFixed(1)}p.
        </Text>
      }
    >
      <LineChart
        data={data}
        height={210}
        lineColor={colors.danger}
        fillColor={colors.danger}
        showArea
        showGrid
        smooth
        formatYLabel={(value) => `${value.toFixed(0)}p`}
        xLabelIndexes={[0, Math.floor((history.length - 1) / 2), history.length - 1]}
      />
    </ChartCard>
  );
}

export function ForecastMovementChart({
  forecastSeries,
  forecastChangePercent,
  currentPricePpl,
}: Omit<MarketPriceChartsProps, 'history'>) {
  const data: ChartPoint[] = useMemo(
    () =>
      forecastSeries.map((point) => ({
        x: point.dayIndex,
        y: point.pricePpl,
        label: point.label || undefined,
      })),
    [forecastSeries],
  );

  const target = forecastSeries[forecastSeries.length - 1]?.pricePpl ?? currentPricePpl;

  return (
    <ChartCard
      title="Forecasted price movement"
      subtitle={`Projected path over the next ${forecastSeries[forecastSeries.length - 1]?.dayIndex ?? 14} days`}
      legend="Forecast"
      footer={
        <Text style={styles.footer}>
          Model expects about +{forecastChangePercent}% from{' '}
          {currentPricePpl.toFixed(0)}p toward {target.toFixed(1)}p.
        </Text>
      }
    >
      <LineChart
        data={data}
        height={210}
        lineColor={colors.accent}
        fillColor={colors.accent}
        showArea
        showGrid
        smooth
        showDots
        formatYLabel={(value) => `${value.toFixed(0)}p`}
        markerIndex={forecastSeries.length - 1}
        markerLabel={`+${forecastChangePercent}%`}
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
