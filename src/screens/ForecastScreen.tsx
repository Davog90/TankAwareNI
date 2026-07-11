import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/common/Card';
import { ErrorView, LoadingView } from '../components/common/StateViews';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ConfidenceScoreCard } from '../components/forecast/ConfidenceScoreCard';
import { DepletionLineChart } from '../components/forecast/DepletionLineChart';
import { WeatherImpactCard } from '../components/forecast/WeatherImpactCard';
import { useForecastData } from '../hooks';
import { colors, radii, spacing, typography } from '../theme';

export function ForecastScreen() {
  const { data, loading, error, reload } = useForecastData();

  if (loading && !data) {
    return <LoadingView label="Loading forecast…" />;
  }

  if (error || !data) {
    return <ErrorView message={error?.message} onRetry={reload} />;
  }

  const { summary: forecastSummary, depletionSeries, tankInfo } = data;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Projection</Text>
          <Text style={styles.title}>Forecast</Text>
          <Text style={styles.subtitle}>
            60-day depletion outlook from simulated household usage
          </Text>
        </View>

        <Card style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="calendar" size={22} color={colors.primary} />
          </View>
          <Text style={styles.heroLabel}>Forecasted empty date</Text>
          <Text style={styles.heroDate}>{forecastSummary.emptyDateLabel}</Text>
          <Text style={styles.heroBody}>
            At {forecastSummary.averageDailyUsageLitres.toFixed(1)} L per day,
            your {tankInfo.currentLitres} L balance is projected to run out on
            this date.
          </Text>
        </Card>

        <View style={styles.metricsGrid}>
          <MetricCard
            label="Avg daily usage"
            value={`${forecastSummary.averageDailyUsageLitres.toFixed(1)} L`}
            hint="Simulated 30-day mean"
            icon="speedometer-outline"
            accent={colors.info}
            accentSoft={colors.infoSoft}
          />
          <MetricCard
            label="Confidence"
            value={`${forecastSummary.confidencePercent}%`}
            hint="Model certainty"
            icon="shield-checkmark-outline"
            accent={colors.success}
            accentSoft={colors.successSoft}
          />
        </View>

        <View style={styles.section}>
          <ConfidenceScoreCard score={forecastSummary.confidencePercent} />
        </View>

        <View style={styles.section}>
          <WeatherImpactCard impact={forecastSummary.weatherImpact} />
        </View>

        <View style={styles.section}>
          <DepletionLineChart
            series={depletionSeries}
            emptyDateLabel={forecastSummary.emptyDateLabel}
          />
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
  heroCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.primaryMuted,
    borderColor: '#C5D9E0',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  heroDate: {
    ...typography.title,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  heroBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
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
});
