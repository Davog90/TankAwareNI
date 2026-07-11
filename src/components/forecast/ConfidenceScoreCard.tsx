import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';

interface ConfidenceScoreCardProps {
  score: number;
  hint?: string;
}

export function ConfidenceScoreCard({
  score,
  hint = 'Based on recent usage, tank capacity, and local weather patterns',
}: ConfidenceScoreCardProps) {
  const tone =
    score >= 80 ? colors.success : score >= 60 ? colors.warning : colors.danger;

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>Confidence score</Text>
      <View style={styles.row}>
        <Text style={[styles.score, { color: tone }]}>{score}%</Text>
        <View style={styles.barWrap}>
          <ProgressBar progress={score} height={10} fillColor={tone} />
          <Text style={styles.hint}>{hint}</Text>
        </View>
      </View>
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
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  score: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 44,
    letterSpacing: -1,
    minWidth: 84,
  },
  barWrap: {
    flex: 1,
    gap: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
