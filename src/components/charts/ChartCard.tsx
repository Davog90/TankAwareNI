import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Card } from '../common/Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  legend?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  footer?: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  legend,
  children,
  style,
  footer,
}: ChartCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {legend ? (
          <View style={styles.legend}>
            <View style={styles.legendSwatch} />
            <Text style={styles.legendText}>{legend}</Text>
          </View>
        ) : null}
      </View>
      {children}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
  },
  legendSwatch: {
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryLight,
  },
  legendText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  footer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
