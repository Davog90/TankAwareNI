import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/common/Card';
import { ErrorView, LoadingView } from '../components/common/StateViews';
import { MetricCard } from '../components/dashboard/MetricCard';
import { TankLevelGauge } from '../components/dashboard/TankLevelGauge';
import { useDashboardData } from '../hooks';
import { colors, radii, spacing, typography } from '../theme';
import { formatLitres, formatRelativeTime } from '../utils/formatters';

export function DashboardScreen() {
  const { data, loading, error, reload } = useDashboardData();

  if (loading && !data) {
    return <LoadingView label="Loading dashboard…" />;
  }

  if (error || !data) {
    return <ErrorView message={error?.message} onRetry={reload} />;
  }

  const { household, tankInfo } = data;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.brand}>TankAware NI</Text>
            <Text style={styles.subtitle}>
              {household.name} · {household.location}
            </Text>
          </View>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTop}>
            <Text style={styles.heroLabel}>Oil tank balance</Text>
            <Text style={styles.heroUpdated}>
              Updated {formatRelativeTime(tankInfo.lastUpdated)}
            </Text>
          </View>

          <TankLevelGauge
            percentFull={tankInfo.percentFull}
            status={tankInfo.status}
            daysRemaining={tankInfo.estimatedDaysRemaining}
          />

          <View style={styles.heroFooter}>
            <Ionicons name="shield-checkmark" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.heroFooterText}>
              Estimate based on recent household usage
            </Text>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Key metrics</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            label="Litres remaining"
            value={formatLitres(tankInfo.currentLitres)}
            hint={`of ${formatLitres(tankInfo.capacityLitres)} capacity`}
            icon="water-outline"
            accent={colors.info}
            accentSoft={colors.infoSoft}
          />
          <MetricCard
            label="Days remaining"
            value={`${tankInfo.estimatedDaysRemaining}`}
            hint="At current daily use"
            icon="time-outline"
            accent={colors.success}
            accentSoft={colors.successSoft}
          />
        </View>

        <Card style={styles.refillCard}>
          <View style={styles.refillIcon}>
            <Ionicons name="calendar-outline" size={24} color={colors.accent} />
          </View>
          <View style={styles.refillContent}>
            <Text style={styles.refillLabel}>Next refill date</Text>
            <Text style={styles.refillValue}>{tankInfo.nextRefillLabel}</Text>
            <Text style={styles.refillHint}>
              Planned top-up before winter demand rises
            </Text>
          </View>
          <View style={styles.refillBadge}>
            <Text style={styles.refillBadgeText}>
              {tankInfo.estimatedDaysRemaining}d
            </Text>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>At a glance</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Tank level</Text>
            <Text style={styles.summaryValue}>{tankInfo.percentFull}%</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Estimated litres</Text>
            <Text style={styles.summaryValue}>
              {formatLitres(tankInfo.currentLitres)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Estimated days left</Text>
            <Text style={styles.summaryValue}>
              {tankInfo.estimatedDaysRemaining} days
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowLast]}>
            <Text style={styles.summaryKey}>Next refill</Text>
            <Text style={styles.summaryValue}>{tankInfo.nextRefillLabel}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.huge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  brand: {
    ...typography.title,
    color: colors.primary,
    letterSpacing: -0.4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.successSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveText: {
    ...typography.label,
    color: colors.success,
  },
  heroCard: {
    borderRadius: radii.xl,
    padding: spacing.xxl,
    marginBottom: spacing.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 6,
  },
  heroTop: {
    marginBottom: spacing.xxl,
  },
  heroLabel: {
    ...typography.label,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroUpdated: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.65)',
    marginTop: spacing.xs,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  heroFooterText: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.75)',
    flex: 1,
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  refillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  refillIcon: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refillContent: {
    flex: 1,
  },
  refillLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  refillValue: {
    ...typography.heading,
    color: colors.text,
    marginTop: spacing.xs,
  },
  refillHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  refillBadge: {
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  refillBadgeText: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  summaryCard: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  summaryTitle: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  summaryKey: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryValue: {
    ...typography.bodyBold,
    color: colors.text,
    textAlign: 'right',
  },
});
