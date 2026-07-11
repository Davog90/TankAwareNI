import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { RegionalDistributionBucket, RegionalTrendPoint } from '../../types';
import { colors, typography } from '../../theme';
import { BarChart, ChartCard, LineChart, type ChartPoint } from '../charts';

const bucketColors: Record<RegionalDistributionBucket['colorHint'], string> = {
  healthy: colors.success,
  watch: colors.info,
  low: colors.warning,
  critical: colors.danger,
};

interface DistributionChartProps {
  distribution: RegionalDistributionBucket[];
}

export function TankLevelDistributionChart({ distribution }: DistributionChartProps) {
  const data = useMemo(
    () =>
      distribution.map((bucket) => ({
        label: bucket.label,
        value: bucket.households,
        color: bucketColors[bucket.colorHint],
      })),
    [distribution],
  );

  return (
    <ChartCard
      title="Tank level distribution"
      subtitle="Anonymised household bands across the pilot"
      footer={
        <Text style={styles.footer}>
          {distribution.find((b) => b.colorHint === 'critical')?.households ?? 0}{' '}
          homes are currently below 20% capacity.
        </Text>
      }
    >
      <BarChart data={data} height={210} formatValue={(value) => `${value}`} />
    </ChartCard>
  );
}

interface TrendChartProps {
  trends: RegionalTrendPoint[];
}

export function RegionalAverageTrendChart({ trends }: TrendChartProps) {
  const data: ChartPoint[] = useMemo(
    () =>
      trends.map((point, index) => ({
        x: index,
        y: point.averageTankPercent,
        label: point.weekLabel,
      })),
    [trends],
  );

  return (
    <ChartCard
      title="Average tank level trend"
      subtitle="Weekly anonymised regional average (%)"
      legend="Avg level"
      footer={
        <Text style={styles.footer}>
          Average tank level has eased from {trends[0]?.averageTankPercent}% to{' '}
          {trends[trends.length - 1]?.averageTankPercent}% over six weeks.
        </Text>
      }
    >
      <LineChart
        data={data}
        height={210}
        lineColor={colors.primaryLight}
        fillColor={colors.primaryLight}
        showArea
        showGrid
        smooth
        yMin={40}
        yMax={70}
        formatYLabel={(value) => `${Math.round(value)}%`}
      />
    </ChartCard>
  );
}

export function PredictedRunOutsChart({ trends }: TrendChartProps) {
  const data: ChartPoint[] = useMemo(
    () =>
      trends.map((point, index) => ({
        x: index,
        y: point.predictedRunOuts,
        label: point.weekLabel,
      })),
    [trends],
  );

  return (
    <ChartCard
      title="Predicted run-outs"
      subtitle="Homes forecast to empty within 14 days"
      legend="Run-outs"
      footer={
        <Text style={styles.footer}>
          Predicted run-outs rose to {trends[trends.length - 1]?.predictedRunOuts}{' '}
          this week — prioritise outreach where levels are lowest.
        </Text>
      }
    >
      <LineChart
        data={data}
        height={200}
        lineColor={colors.danger}
        fillColor={colors.danger}
        showArea
        showGrid
        smooth
        showDots
        yMin={0}
        formatYLabel={(value) => `${Math.round(value)}`}
        markerIndex={trends.length - 1}
        markerLabel="Now"
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
