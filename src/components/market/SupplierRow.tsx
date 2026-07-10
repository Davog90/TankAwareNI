import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { SupplierQuote } from '../../types';
import { formatLitres, formatPricePpl } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';

interface SupplierRowProps {
  supplier: SupplierQuote;
}

export function SupplierRow({ supplier }: SupplierRowProps) {
  return (
    <View style={[styles.row, supplier.isBestValue && styles.best]}>
      <View style={styles.main}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{supplier.name}</Text>
          {supplier.isBestValue ? (
            <StatusBadge label="Best value" tone="healthy" />
          ) : null}
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>{supplier.deliveryDays}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cube-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>
              Min {formatLitres(supplier.minOrderLitres)}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={16} color={colors.accent} />
            <Text style={styles.metaText}>{supplier.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>{formatPricePpl(supplier.pricePpl)}</Text>
        <Text style={styles.perLitre}>/ litre</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  best: {
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  main: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    ...typography.bodyBold,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  price: {
    ...typography.heading,
    color: colors.primary,
  },
  perLitre: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
