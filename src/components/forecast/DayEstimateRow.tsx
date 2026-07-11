import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import type { ForecastDay } from '../../types';
import { formatLitres, formatPercent } from '../../utils/formatters';
import { ProgressBar } from '../common/ProgressBar';

interface DayEstimateRowProps {
  day: ForecastDay;
}

export function DayEstimateRow({ day }: DayEstimateRowProps) {
  const date = new Date(day.date);
  const dateLabel = day.isToday
    ? 'Today'
    : date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  const fillColor =
    day.percentFull <= 15
      ? colors.danger
      : day.percentFull <= 30
        ? colors.warning
        : colors.primaryLight;

  return (
    <View style={[styles.row, day.isProjectedEmpty && styles.highlight]}>
      <View style={styles.left}>
        <Text style={styles.date}>{dateLabel}</Text>
        {day.usageLitres > 0 ? (
          <Text style={styles.usage}>Uses ~{formatLitres(day.usageLitres)}</Text>
        ) : (
          <Text style={styles.usage}>Current level</Text>
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.litres}>{formatLitres(day.estimatedLitres)}</Text>
        <Text style={styles.percent}>{formatPercent(day.percentFull)}</Text>
        <ProgressBar progress={day.percentFull} height={8} fillColor={fillColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
  },
  highlight: {
    backgroundColor: colors.warningSoft,
    marginHorizontal: -spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.sm,
  },
  left: {
    flex: 1,
  },
  date: {
    ...typography.bodyBold,
    color: colors.text,
  },
  usage: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  right: {
    width: 120,
  },
  litres: {
    ...typography.bodyBold,
    color: colors.text,
    textAlign: 'right',
  },
  percent: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
});
