import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { ErrorView, LoadingView } from '../components/common/StateViews';
import { SectionLabel } from '../components/common/SectionLabel';
import { CurrentPriceHero } from '../components/market/CurrentPriceHero';
import {
  ForecastMovementChart,
  WeeklyTrendChart,
} from '../components/market/MarketPriceCharts';
import { RecommendationBanner } from '../components/market/RecommendationBanner';
import { SupplierRow } from '../components/market/SupplierRow';
import { TrendIndicatorCard } from '../components/market/TrendIndicatorCard';
import { useMarketData } from '../hooks';
import { colors, spacing, typography } from '../theme';
import { formatRelativeTime } from '../utils/formatters';

export function MarketScreen() {
  const { data: market, loading, error, reload } = useMarketData();

  if (loading && !market) {
    return <LoadingView label="Loading market data…" />;
  }

  if (error || !market) {
    return <ErrorView message={error?.message} onRetry={reload} />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Market intelligence</Text>
          <Text style={styles.title}>Market</Text>
          <Text style={styles.subtitle}>
            NI heating oil prices, trends, and buy guidance
          </Text>
        </View>

        <CurrentPriceHero
          pricePpl={market.currentPricePpl}
          region={market.region}
          trend={market.weeklyTrend}
          trendLabel={market.weeklyTrendLabel}
          weeklyChangePercent={market.weeklyChangePercent}
          updatedLabel={`Updated ${formatRelativeTime(market.lastUpdated)}`}
        />

        <View style={styles.section}>
          <TrendIndicatorCard
            trend={market.weeklyTrend}
            trendLabel={market.weeklyTrendLabel}
            weeklyChangePpl={market.weeklyChangePpl}
            weeklyChangePercent={market.weeklyChangePercent}
            weekLowPpl={market.weekLowPpl}
            weekHighPpl={market.weekHighPpl}
          />
        </View>

        <View style={styles.section}>
          <Card style={styles.forecastCard}>
            <Text style={styles.forecastLabel}>Forecasted price movement</Text>
            <Text style={styles.forecastValue}>{market.forecastLabel}</Text>
            <Text style={styles.forecastHint}>
              Simulated outlook for the next {market.forecastHorizonDays} days
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <RecommendationBanner
            recommendation={market.recommendation}
            reason={market.recommendationReason}
            forecastLabel={market.forecastLabel}
          />
        </View>

        <View style={styles.section}>
          <WeeklyTrendChart history={market.history} />
        </View>

        <View style={styles.section}>
          <ForecastMovementChart
            forecastSeries={market.forecastSeries}
            forecastChangePercent={market.forecastChangePercent}
            currentPricePpl={market.currentPricePpl}
          />
        </View>

        <View style={styles.section}>
          <SectionLabel title="Local supplier quotes" icon="storefront-outline" />
          {market.suppliers.map((supplier) => (
            <SupplierRow key={supplier.id} supplier={supplier} />
          ))}
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
  section: {
    marginBottom: spacing.md,
  },
  forecastCard: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  forecastLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  forecastValue: {
    ...typography.heading,
    color: colors.accent,
    marginTop: spacing.sm,
  },
  forecastHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
