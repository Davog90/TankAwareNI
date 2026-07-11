export interface ChartPoint {
  x: number;
  y: number;
  label?: string;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getValueDomain(
  points: ChartPoint[],
  paddingRatio = 0.08,
): { min: number; max: number } {
  if (points.length === 0) {
    return { min: 0, max: 1 };
  }

  const values = points.map((point) => point.y);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const span = rawMax - rawMin || Math.max(rawMax, 1);
  const pad = span * paddingRatio;

  return {
    min: Math.max(0, rawMin - pad),
    max: rawMax + pad,
  };
}

export function buildSmoothPath(
  points: Array<{ x: number; y: number }>,
): string {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    path += ` Q ${current.x} ${current.y} ${midX} ${(current.y + next.y) / 2}`;
  }

  const last = points[points.length - 1];
  path += ` T ${last.x} ${last.y}`;
  return path;
}

export function buildStraightPath(
  points: Array<{ x: number; y: number }>,
): string {
  if (points.length === 0) {
    return '';
  }

  return points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(' ');
}

export function niceTicks(min: number, max: number, count = 4): number[] {
  if (count <= 1 || max <= min) {
    return [min];
  }

  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => min + step * index);
}
