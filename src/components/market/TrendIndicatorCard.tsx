import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { MarketTrendDirection } from '../../types';
import { Card } from '../common/Card';

interface TrendIndicatorCardProps {
  trend: MarketTrendDirection;
  trendLabel: string;
  weeklyChangePpl: number;
  weeklyChangePercent: number;
  weekLowPpl: number;
  weekHighPpl: number;
}

export function TrendIndicatorCard({
  trend,
  trendLabel,
  weeklyChangePpl,
  weeklyChangePercent,
  weekLowPpl,
  weekHighPpl,
}: TrendIndicatorCardProps) {
  const rising = trend === 'rising';
  const accent = rising ? colors.danger : trend === 'falling' ? colors.success : colors.info;
  const soft = rising ? colors.dangerSoft : trend === 'falling' ? colors.successSoft : colors.infoSoft;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: soft }]}>
          <Ionicons
            name={
              rising ? 'arrow-up' : trend === 'falling' ? 'arrow-down' : 'remove'
            }
            size={22}
            color={accent}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.label}>Weekly trend</Text>
          <Text style={[styles.trend, { color: accent }]}>{trendLabel}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Change</Text>
          <Text style={styles.statValue}>
            {weeklyChangePpl > 0 ? '+' : ''}
            {weeklyChangePpl.toFixed(1)}p
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Percent</Text>
          <Text style={styles.statValue}>
            {weeklyChangePercent > 0 ? '+' : ''}
            {weeklyChangePercent.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Range</Text>
          <Text style={styles.statValue}>
            {weekLowPpl.toFixed(1)}–{weekHighPpl.toFixed(1)}p
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  trend: {
    ...typography.heading,
    marginTop: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  statLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  statValue: {
    ...typography.bodyBold,
    color: colors.text,
    marginTop: spacing.xs,
  },
});
