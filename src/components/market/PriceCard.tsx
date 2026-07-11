import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import { formatPricePpl, formatSignedPpl } from '../../utils/formatters';

interface PriceCardProps {
  averagePpl: number;
  changeTodayPpl: number;
  changeWeekPpl: number;
  region: string;
}

export function PriceCard({
  averagePpl,
  changeTodayPpl,
  changeWeekPpl,
  region,
}: PriceCardProps) {
  const todayDown = changeTodayPpl <= 0;
  const weekDown = changeWeekPpl <= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.region}>{region} average</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatPricePpl(averagePpl)}</Text>
        <Text style={styles.unit}>per litre</Text>
      </View>

      <View style={styles.changes}>
        <View style={styles.changeItem}>
          <Ionicons
            name={todayDown ? 'arrow-down' : 'arrow-up'}
            size={18}
            color={todayDown ? colors.success : colors.danger}
          />
          <Text
            style={[
              styles.changeText,
              { color: todayDown ? colors.success : colors.danger },
            ]}
          >
            {formatSignedPpl(changeTodayPpl)} today
          </Text>
        </View>
        <View style={styles.changeItem}>
          <Ionicons
            name={weekDown ? 'arrow-down' : 'arrow-up'}
            size={18}
            color={weekDown ? colors.success : colors.danger}
          />
          <Text
            style={[
              styles.changeText,
              { color: weekDown ? colors.success : colors.danger },
            ]}
          >
            {formatSignedPpl(changeWeekPpl)} this week
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xxl,
  },
  region: {
    ...typography.label,
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  price: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 54,
    color: colors.white,
  },
  unit: {
    ...typography.body,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  changes: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  changeText: {
    ...typography.bodyBold,
  },
});
