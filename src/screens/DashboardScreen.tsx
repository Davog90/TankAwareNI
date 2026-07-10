import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { SectionLabel } from '../components/common/SectionLabel';
import { QuickStat } from '../components/dashboard/QuickStat';
import { RefillReminderCard } from '../components/dashboard/RefillReminderCard';
import { TankLevelGauge } from '../components/dashboard/TankLevelGauge';
import {
  household,
  marketSummary,
  refillSuggestion,
  tankInfo,
  usageStats,
} from '../data/mockData';
import { colors, spacing, typography } from '../theme';
import { formatRelativeTime } from '../utils/formatters';

export function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="TankAware NI"
          subtitle={`${household.name} · ${household.location}`}
        />

        <Card style={styles.heroCard}>
          <Text style={styles.updated}>
            Updated {formatRelativeTime(tankInfo.lastUpdated)}
          </Text>
          <TankLevelGauge
            percentFull={tankInfo.percentFull}
            currentLitres={tankInfo.currentLitres}
            capacityLitres={tankInfo.capacityLitres}
            status={tankInfo.status}
            daysRemaining={tankInfo.estimatedDaysRemaining}
          />
        </Card>

        <View style={styles.section}>
          <SectionLabel title="Usage at a glance" icon="speedometer-outline" />
          <View style={styles.statsRow}>
            {usageStats.map((stat) => (
              <QuickStat key={stat.label} stat={stat} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionLabel title="Refill reminder" icon="notifications-outline" />
          <RefillReminderCard
            recommendedLitres={refillSuggestion.recommendedLitres}
            estimatedCost={refillSuggestion.estimatedCost}
            reason={refillSuggestion.reason}
            averagePpl={marketSummary.currentAveragePpl}
          />
        </View>

        <Card style={styles.tipCard}>
          <Text style={styles.tipTitle}>Tip for colder nights</Text>
          <Text style={styles.tipBody}>
            Turning the thermostat down by 1°C can save roughly 10% on heating
            oil over a winter month.
          </Text>
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
  heroCard: {
    marginBottom: spacing.xxl,
  },
  updated: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tipCard: {
    backgroundColor: colors.infoSoft,
    borderColor: '#C5E0EC',
  },
  tipTitle: {
    ...typography.bodyBold,
    color: colors.info,
  },
  tipBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
