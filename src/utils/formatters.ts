export function formatLitres(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)} L`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatPricePpl(value: number): string {
  return `${value.toFixed(1)}p`;
}

export function formatSignedPpl(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}p`;
}

export function formatDaysRemaining(days: number): string {
  if (days <= 0) {
    return 'Empty soon';
  }
  if (days === 1) {
    return '1 day left';
  }
  return `${days} days left`;
}

export function formatRelativeTime(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((now - then) / 60000);

  if (diffMinutes < 1) {
    return 'Just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) {
    return 'Yesterday';
  }
  return `${diffDays} days ago`;
}

export function getTankStatusLabel(status: 'healthy' | 'low' | 'critical'): string {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'low':
      return 'Running low';
    case 'critical':
      return 'Refill soon';
    default:
      return status;
  }
}
