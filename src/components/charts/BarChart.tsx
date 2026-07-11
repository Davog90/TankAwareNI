import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors, spacing, typography } from '../../theme';

export interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  height?: number;
  formatValue?: (value: number) => string;
  showValues?: boolean;
}

const PADDING = {
  top: 20,
  right: 8,
  bottom: 32,
  left: 8,
};

export function BarChart({
  data,
  height = 200,
  formatValue = (value) => `${value}`,
  showValues = true,
}: BarChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const chart = useMemo(() => {
    if (width <= 0 || data.length === 0) {
      return null;
    }

    const maxValue = Math.max(...data.map((item) => item.value), 1);
    const plotWidth = width - PADDING.left - PADDING.right;
    const plotHeight = height - PADDING.top - PADDING.bottom;
    const gap = 10;
    const barWidth = Math.max(12, (plotWidth - gap * (data.length - 1)) / data.length);

    const bars = data.map((item, index) => {
      const barHeight = (item.value / maxValue) * plotHeight;
      const x = PADDING.left + index * (barWidth + gap);
      const y = PADDING.top + plotHeight - barHeight;
      return {
        ...item,
        x,
        y,
        barWidth,
        barHeight: Math.max(4, barHeight),
        color: item.color ?? colors.primaryLight,
      };
    });

    return { bars, plotBottom: PADDING.top + plotHeight };
  }, [data, height, width]);

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width > 0 && chart ? (
        <>
          <Svg width={width} height={height}>
            {chart.bars.map((bar) => (
              <Rect
                key={bar.label}
                x={bar.x}
                y={bar.y}
                width={bar.barWidth}
                height={bar.barHeight}
                rx={6}
                fill={bar.color}
              />
            ))}
          </Svg>

          {chart.bars.map((bar) => (
            <React.Fragment key={`meta-${bar.label}`}>
              {showValues ? (
                <Text
                  style={[
                    styles.value,
                    {
                      left: bar.x,
                      width: bar.barWidth,
                      top: Math.max(0, bar.y - 18),
                    },
                  ]}
                >
                  {formatValue(bar.value)}
                </Text>
              ) : null}
              <Text
                style={[
                  styles.label,
                  {
                    left: bar.x - 4,
                    width: bar.barWidth + 8,
                    top: chart.plotBottom + 6,
                  },
                ]}
                numberOfLines={1}
              >
                {bar.label}
              </Text>
            </React.Fragment>
          ))}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  value: {
    position: 'absolute',
    textAlign: 'center',
    ...typography.label,
    fontSize: 11,
    color: colors.textSecondary,
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    ...typography.label,
    fontSize: 10,
    color: colors.textMuted,
  },
});
