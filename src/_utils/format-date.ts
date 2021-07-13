export const formatDate = (date: Date, style?: 'compact'): string =>
  date.toLocaleString('en', {
    year:
      date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    month: style === 'compact' ? 'short' : 'long',
    day: 'numeric',
  });
