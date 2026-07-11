import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/common/Card';
import { MetricCard } from '../components/dashboard/MetricCard';
import { FuelPovertyRiskCard } from '../components/smartcity/FuelPovertyRiskCard';
import {
  PredictedRunOutsChart,
  RegionalAverageTrendChart,
  TankLevelDistributionChart,
} from '../components/smartcity/RegionalCharts';
import { smartCityStats } from '../data/mockData';
import { colors, radii, spacing, typography } from '../theme';
import { formatRelativeTime } from '../utils/formatters';

export function SmartCityScreen() {
  const stats = smartCityStats;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Smart City · Local government</Text>
          <Text style={styles.title}>Regional overview</Text>
          <Text style={styles.subtitle}>{stats.regionName}</Text>
        </View>

        <LinearGradient
          colors={[colors.primary, '#164B5C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <Ionicons name="business" size={16} color={colors.white} />
              <Text style={styles.heroBadgeText}>Anonymised analytics</Text>
            </View>
            <Text style={styles.heroUpdated}>
              Updated {formatRelativeTime(stats.lastUpdated)}
            </Text>
          </View>
          <Text style={styles.heroLabel}>Pilot programme</Text>
          <Text style={styles.heroValue}>{stats.pilotHomes}</Text>
          <Text style={styles.heroUnit}>homes monitored</Text>
          <Text style={styles.heroNote}>{stats.anonymisationNote}</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Key regional metrics</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            label="Pilot homes"
            value={`${stats.pilotHomes}`}
            hint="Active in programme"
            icon="home-outline"
            accent={colors.primary}
            accentSoft={colors.primaryMuted}
          />
          <MetricCard
            label="Avg tank level"
            value={`${stats.averageTankLevelPercent}%`}
            hint="Regional mean"
            icon="water-outline"
            accent={colors.info}
            accentSoft={colors.infoSoft}
          />
          <MetricCard
            label="Below 20%"
            value={`${stats.householdsBelow20}`}
            hint="Households at risk"
            icon="alert-circle-outline"
            accent={colors.warning}
            accentSoft={colors.warningSoft}
          />
          <MetricCard
            label="Predicted run-outs"
            value={`${stats.predictedRunOuts}`}
            hint="Next 14 days"
            icon="hourglass-outline"
            accent={colors.danger}
            accentSoft={colors.dangerSoft}
          />
        </View>

        <View style={styles.section}>
          <FuelPovertyRiskCard risk={stats.fuelPovertyRisk} />
        </View>

        <Card style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Ionicons name="clipboard-outline" size={20} color={colors.primary} />
            <Text style={styles.insightTitle}>Council briefing note</Text>
          </View>
          <Text style={styles.insightBody}>{stats.councilInsight}</Text>
        </Card>

        <View style={styles.section}>
          <TankLevelDistributionChart distribution={stats.distribution} />
        </View>

        <View style={styles.section}>
          <RegionalAverageTrendChart trends={stats.weeklyTrends} />
        </View>

        <View style={styles.section}>
          <PredictedRunOutsChart trends={stats.weeklyTrends} />
        </View>
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
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  hero: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
  },
  heroBadgeText: {
    ...typography.label,
    color: colors.white,
  },
  heroUpdated: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.65)',
  },
  heroLabel: {
    ...typography.body,
    color: 'rgba(255,255,255,0.75)',
  },
  heroValue: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 62,
    color: colors.white,
    letterSpacing: -1.5,
    marginTop: spacing.xs,
  },
  heroUnit: {
    ...typography.subheading,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  heroNote: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xl,
    lineHeight: 20,
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
  section: {
    marginBottom: spacing.md,
  },
  insightCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.primaryMuted,
    borderColor: '#C5D9E0',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  insightTitle: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  insightBody: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
