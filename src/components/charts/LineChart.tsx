import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Line as SvgLine,
} from 'react-native-svg';
import { colors, spacing, typography } from '../../theme';
import {
  buildSmoothPath,
  buildStraightPath,
  getValueDomain,
  niceTicks,
  type ChartPoint,
} from './chartUtils';

export interface LineChartProps {
  data: ChartPoint[];
  height?: number;
  lineColor?: string;
  fillColor?: string;
  showArea?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
  smooth?: boolean;
  yMin?: number;
  yMax?: number;
  formatYLabel?: (value: number) => string;
  xLabelIndexes?: number[];
  markerIndex?: number;
  markerLabel?: string;
}

const PADDING = {
  top: 16,
  right: 12,
  bottom: 28,
  left: 44,
};

export function LineChart({
  data,
  height = 220,
  lineColor = colors.primaryLight,
  fillColor = colors.primaryLight,
  showArea = true,
  showDots = false,
  showGrid = true,
  smooth = true,
  yMin,
  yMax,
  formatYLabel = (value) => `${Math.round(value)}`,
  xLabelIndexes,
  markerIndex,
  markerLabel,
}: LineChartProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const domain = useMemo(() => {
    const auto = getValueDomain(data);
    return {
      min: yMin ?? auto.min,
      max: yMax ?? auto.max,
    };
  }, [data, yMin, yMax]);

  const chart = useMemo(() => {
    if (width <= 0 || data.length === 0) {
      return null;
    }

    const plotWidth = width - PADDING.left - PADDING.right;
    const plotHeight = height - PADDING.top - PADDING.bottom;
    const xMax = Math.max(...data.map((point) => point.x), 1);
    const yRange = domain.max - domain.min || 1;

    const mapped = data.map((point) => {
      const x = PADDING.left + (point.x / xMax) * plotWidth;
      const y =
        PADDING.top +
        plotHeight -
        ((point.y - domain.min) / yRange) * plotHeight;
      return { x, y, raw: point };
    });

    const linePath = smooth
      ? buildSmoothPath(mapped)
      : buildStraightPath(mapped);
    const first = mapped[0];
    const last = mapped[mapped.length - 1];
    const areaPath = `${linePath} L ${last.x} ${PADDING.top + plotHeight} L ${first.x} ${PADDING.top + plotHeight} Z`;

    const yTicks = niceTicks(domain.min, domain.max, 4).map((value) => ({
      value,
      y:
        PADDING.top +
        plotHeight -
        ((value - domain.min) / yRange) * plotHeight,
    }));

    const labelIndexes =
      xLabelIndexes ??
      Array.from(
        new Set([
          0,
          Math.floor((data.length - 1) / 3),
          Math.floor(((data.length - 1) * 2) / 3),
          data.length - 1,
        ]),
      );

    return {
      mapped,
      linePath,
      areaPath,
      yTicks,
      labelIndexes,
      plotBottom: PADDING.top + plotHeight,
    };
  }, [data, domain, height, smooth, width, xLabelIndexes]);

  return (
    <View style={[styles.container, { height }]} onLayout={onLayout}>
      {width > 0 && chart ? (
        <>
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="lineAreaFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={fillColor} stopOpacity={0.28} />
                <Stop offset="100%" stopColor={fillColor} stopOpacity={0.02} />
              </LinearGradient>
            </Defs>

            {showGrid
              ? chart.yTicks.map((tick) => (
                  <SvgLine
                    key={`grid-${tick.value}`}
                    x1={PADDING.left}
                    y1={tick.y}
                    x2={width - PADDING.right}
                    y2={tick.y}
                    stroke={colors.chartGrid}
                    strokeWidth={1}
                  />
                ))
              : null}

            {showArea ? (
              <Path d={chart.areaPath} fill="url(#lineAreaFill)" />
            ) : null}

            <Path
              d={chart.linePath}
              stroke={lineColor}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {typeof markerIndex === 'number' &&
            chart.mapped[markerIndex] ? (
              <SvgLine
                x1={chart.mapped[markerIndex].x}
                y1={PADDING.top}
                x2={chart.mapped[markerIndex].x}
                y2={chart.plotBottom}
                stroke={colors.accent}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
            ) : null}

            {showDots
              ? chart.mapped
                  .filter((_, index) => index % 7 === 0)
                  .map((point) => (
                    <Circle
                      key={`dot-${point.raw.x}`}
                      cx={point.x}
                      cy={point.y}
                      r={3.5}
                      fill={colors.white}
                      stroke={lineColor}
                      strokeWidth={2}
                    />
                  ))
              : null}

            {typeof markerIndex === 'number' &&
            chart.mapped[markerIndex] ? (
              <Circle
                cx={chart.mapped[markerIndex].x}
                cy={chart.mapped[markerIndex].y}
                r={5}
                fill={colors.accent}
                stroke={colors.white}
                strokeWidth={2}
              />
            ) : null}
          </Svg>

          {chart.yTicks.map((tick) => (
            <Text
              key={`ylabel-${tick.value}`}
              style={[styles.yLabel, { top: tick.y - 8 }]}
            >
              {formatYLabel(tick.value)}
            </Text>
          ))}

          {chart.labelIndexes.map((index) => {
            const point = chart.mapped[index];
            if (!point?.raw.label) {
              return null;
            }
            return (
              <Text
                key={`xlabel-${index}`}
                style={[
                  styles.xLabel,
                  {
                    left: clampLeft(point.x - 24, width),
                    width: 48,
                  },
                ]}
              >
                {point.raw.label}
              </Text>
            );
          })}

          {markerLabel &&
          typeof markerIndex === 'number' &&
          chart.mapped[markerIndex] ? (
            <View
              style={[
                styles.markerBadge,
                {
                  left: clampLeft(chart.mapped[markerIndex].x - 46, width, 92),
                  top: Math.max(4, chart.mapped[markerIndex].y - 36),
                },
              ]}
            >
              <Text style={styles.markerText}>{markerLabel}</Text>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

function clampLeft(left: number, width: number, badgeWidth = 48): number {
  return Math.min(Math.max(left, 0), Math.max(0, width - badgeWidth));
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  yLabel: {
    position: 'absolute',
    left: 0,
    width: PADDING.left - 6,
    textAlign: 'right',
    ...typography.label,
    fontSize: 11,
    color: colors.textMuted,
  },
  xLabel: {
    position: 'absolute',
    bottom: 2,
    textAlign: 'center',
    ...typography.label,
    fontSize: 11,
    color: colors.textMuted,
  },
  markerBadge: {
    position: 'absolute',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    width: 92,
    alignItems: 'center',
  },
  markerText: {
    ...typography.label,
    fontSize: 11,
    color: colors.white,
  },
});
