import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { FuelPovertyRisk } from '../../types';
import { Card } from '../common/Card';

interface RiskBadgeProps {
  risk: FuelPovertyRisk;
}

const riskStyles: Record<
  FuelPovertyRisk,
  { color: string; soft: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  Low: { color: colors.success, soft: colors.successSoft, icon: 'shield-checkmark' },
  Medium: { color: colors.warning, soft: colors.warningSoft, icon: 'alert-circle' },
  High: { color: colors.danger, soft: colors.dangerSoft, icon: 'warning' },
};

export function FuelPovertyRiskCard({ risk }: RiskBadgeProps) {
  const palette = riskStyles[risk];

  return (
    <Card style={[styles.card, { backgroundColor: palette.soft, borderColor: palette.color }]}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.white }]}>
          <Ionicons name={palette.icon} size={26} color={palette.color} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>Fuel poverty risk</Text>
          <Text style={[styles.value, { color: palette.color }]}>{risk}</Text>
          <Text style={styles.hint}>
            Aggregated regional indicator for council planning
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  iconWrap: {
    width: 56,
    height: 56,
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
  value: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: spacing.xs,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
