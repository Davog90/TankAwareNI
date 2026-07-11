import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface SectionLabelProps {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function SectionLabel({ title, icon }: SectionLabelProps) {
  return (
    <View style={styles.row}>
      {icon ? (
        <Ionicons name={icon} size={18} color={colors.primary} style={styles.icon} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  title: {
    ...typography.subheading,
    color: colors.text,
  },
});
