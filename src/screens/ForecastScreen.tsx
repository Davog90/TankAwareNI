import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/common/Card';
import { ScreenHeader } from '../components/common/ScreenHeader';
import { SectionLabel } from '../components/common/SectionLabel';
import { StatusBadge } from '../components/common/StatusBadge';
import { DayEstimateRow } from '../components/forecast/DayEstimateRow';
import { ForecastChart } from '../components/forecast/ForecastChart';
import { emptyDateEstimate, forecastDays, tankInfo } from '../data/mockData';
import { colors, spacing, typography } from '../theme';

export function ForecastScreen() {
  const nearTerm = forecastDays.slice(0, 10);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Forecast"
          subtitle="Estimated tank level based on recent usage"
        />

        <Card style={styles.summaryCard}>
          <StatusBadge label="Projection" tone="info" />
          <Text style={styles.summaryTitle}>Likely to need oil by</Text>
          <Text style={styles.summaryDate}>{emptyDateEstimate}</Text>
          <Text style={styles.summaryBody}>
            At about {tankInfo.dailyUsageLitres.toFixed(1)} L per day, your tank
            should last roughly {tankInfo.estimatedDaysRemaining} more days.
          </Text>
        </Card>

        <View style={styles.section}>
          <SectionLabel title="Level outlook" icon="bar-chart-outline" />
          <ForecastChart days={forecastDays} />
        </View>

        <View style={styles.section}>
          <SectionLabel title="Day-by-day estimate" icon="calendar-outline" />
          <Card padded={false} style={styles.listCard}>
            <View style={styles.listInner}>
              {nearTerm.map((day) => (
                <DayEstimateRow key={day.date} day={day} />
              ))}
            </View>
          </Card>
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
  summaryCard: {
    marginBottom: spacing.xxl,
    backgroundColor: colors.primaryMuted,
    borderColor: '#C5D9E0',
  },
  summaryTitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
  summaryDate: {
    ...typography.title,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  summaryBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  listCard: {
    overflow: 'hidden',
  },
  listInner: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
});
