import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { MarketTrendDirection } from '../../types';
import { formatPricePpl } from '../../utils/formatters';

interface CurrentPriceHeroProps {
  pricePpl: number;
  region: string;
  trend: MarketTrendDirection;
  trendLabel: string;
  weeklyChangePercent: number;
  updatedLabel: string;
}

export function CurrentPriceHero({
  pricePpl,
  region,
  trend,
  trendLabel,
  weeklyChangePercent,
  updatedLabel,
}: CurrentPriceHeroProps) {
  const rising = trend === 'rising';
  const falling = trend === 'falling';
  const trendColor = rising
    ? '#FFB4A8'
    : falling
      ? '#9BE7C4'
      : 'rgba(255,255,255,0.85)';

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.topRow}>
        <Text style={styles.region}>{region} heating oil</Text>
        <Text style={styles.updated}>{updatedLabel}</Text>
      </View>

      <Text style={styles.label}>Current price</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPricePpl(pricePpl)}</Text>
        <Text style={styles.unit}>per litre</Text>
      </View>

      <View style={styles.trendPill}>
        <Ionicons
          name={
            rising ? 'trending-up' : falling ? 'trending-down' : 'remove-outline'
          }
          size={18}
          color={trendColor}
        />
        <Text style={[styles.trendText, { color: trendColor }]}>
          {trendLabel}
          {weeklyChangePercent !== 0
            ? ` · ${weeklyChangePercent > 0 ? '+' : ''}${weeklyChangePercent.toFixed(1)}% this week`
            : ''}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xxl,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  region: {
    ...typography.label,
    color: 'rgba(255,255,255,0.72)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    flex: 1,
  },
  updated: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  label: {
    ...typography.body,
    color: 'rgba(255,255,255,0.75)',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 62,
    color: colors.white,
    letterSpacing: -1.5,
  },
  unit: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  trendText: {
    ...typography.bodyBold,
  },
});
