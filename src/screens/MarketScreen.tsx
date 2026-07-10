import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { SectionLabel } from '../components/common/SectionLabel';
import { PriceCard } from '../components/market/PriceCard';
import { PriceTrendChart } from '../components/market/PriceTrendChart';
import { SupplierRow } from '../components/market/SupplierRow';
import { marketSummary } from '../data/mockData';
import { colors, spacing, typography } from '../theme';
import { formatRelativeTime } from '../utils/formatters';

export function MarketScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Market"
          subtitle={`Heating oil prices · updated ${formatRelativeTime(marketSummary.lastUpdated)}`}
        />

        <PriceCard
          averagePpl={marketSummary.currentAveragePpl}
          changeTodayPpl={marketSummary.changeTodayPpl}
          changeWeekPpl={marketSummary.changeWeekPpl}
          region={marketSummary.region}
        />

        <View style={styles.section}>
          <PriceTrendChart
            history={marketSummary.history}
            weekLow={marketSummary.weekLowPpl}
            weekHigh={marketSummary.weekHighPpl}
          />
        </View>

        <Card style={styles.noteCard}>
          <Text style={styles.noteTitle}>Buying tip</Text>
          <Text style={styles.noteBody}>
            Prices below 69p/L are generally favourable in Northern Ireland.
            Compare at least two suppliers before ordering 500 L or more.
          </Text>
        </Card>

        <View style={styles.section}>
          <SectionLabel title="Local supplier quotes" icon="storefront-outline" />
          {marketSummary.suppliers.map((supplier) => (
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
  section: {
    marginTop: spacing.xxl,
  },
  noteCard: {
    marginTop: spacing.xxl,
    backgroundColor: colors.accentSoft,
    borderColor: '#F0D9B0',
  },
  noteTitle: {
    ...typography.bodyBold,
    color: colors.accent,
  },
  noteBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
