export const formatDate = (date: Date): string =>
  date.toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
