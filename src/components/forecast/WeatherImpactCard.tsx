import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme';
import type { WeatherImpact } from '../../types';
import { Card } from '../common/Card';
import { StatusBadge } from '../common/StatusBadge';

interface WeatherImpactCardProps {
  impact: WeatherImpact;
}

export function WeatherImpactCard({ impact }: WeatherImpactCardProps) {
  const tone =
    impact.level === 'high'
      ? 'warning'
      : impact.level === 'moderate'
        ? 'info'
        : 'healthy';

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="cloudy-night-outline" size={24} color={colors.info} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.label}>Weather impact</Text>
          <StatusBadge label={impact.label} tone={tone} />
        </View>
      </View>

      <Text style={styles.temp}>{impact.temperatureHint}</Text>
      <Text style={styles.change}>
        +{impact.usageChangePercent}% estimated usage
      </Text>
      <Text style={styles.description}>{impact.description}</Text>
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
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  temp: {
    ...typography.subheading,
    color: colors.text,
  },
  change: {
    ...typography.bodyBold,
    color: colors.warning,
    marginTop: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
