import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import { formatLitres, formatPricePpl } from '../../utils/formatters';

interface RefillReminderCardProps {
  recommendedLitres: number;
  estimatedCost: number;
  reason: string;
  averagePpl: number;
}

export function RefillReminderCard({
  recommendedLitres,
  estimatedCost,
  reason,
  averagePpl,
}: RefillReminderCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="water" size={26} color={colors.accent} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Suggested refill</Text>
        <Text style={styles.amount}>{formatLitres(recommendedLitres)}</Text>
        <Text style={styles.meta}>
          About £{estimatedCost.toFixed(0)} at {formatPricePpl(averagePpl)}/L
        </Text>
        <Text style={styles.reason}>{reason}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.accentSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#F0D9B0',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.label,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  amount: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.xs,
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  reason: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
