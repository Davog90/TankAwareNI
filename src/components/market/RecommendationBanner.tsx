import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { BuyRecommendation } from '../../types';
import { Card } from '../common/Card';

interface RecommendationBannerProps {
  recommendation: BuyRecommendation;
  reason: string;
  forecastLabel: string;
}

const stylesByRec: Record<
  BuyRecommendation,
  { bg: string; border: string; accent: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  'BUY NOW': {
    bg: colors.successSoft,
    border: '#B7E0C8',
    accent: colors.success,
    icon: 'flash',
  },
  WAIT: {
    bg: colors.warningSoft,
    border: '#F0D9B0',
    accent: colors.warning,
    icon: 'pause-circle',
  },
  MONITOR: {
    bg: colors.infoSoft,
    border: '#C5E0EC',
    accent: colors.info,
    icon: 'eye',
  },
};

export function RecommendationBanner({
  recommendation,
  reason,
  forecastLabel,
}: RecommendationBannerProps) {
  const palette = stylesByRec[recommendation];

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}
    >
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: colors.white }]}>
          <Ionicons name={palette.icon} size={24} color={palette.accent} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>Recommendation</Text>
          <Text style={[styles.action, { color: palette.accent }]}>
            {recommendation}
          </Text>
        </View>
      </View>
      <View style={[styles.forecastChip, { backgroundColor: colors.white }]}>
        <Ionicons name="analytics-outline" size={16} color={palette.accent} />
        <Text style={[styles.forecastText, { color: palette.accent }]}>
          Forecast: {forecastLabel}
        </Text>
      </View>
      <Text style={styles.reason}>{reason}</Text>
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
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  action: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    letterSpacing: 0.5,
    marginTop: spacing.xs,
  },
  forecastChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  forecastText: {
    ...typography.bodyBold,
  },
  reason: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
