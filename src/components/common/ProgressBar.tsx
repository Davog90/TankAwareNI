import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radii } from '../../theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  fillColor?: string;
  trackColor?: string;
}

export function ProgressBar({
  progress,
  height = 12,
  fillColor = colors.primaryLight,
  trackColor = colors.tankEmpty,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
            backgroundColor: fillColor,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radii.full,
  },
});
