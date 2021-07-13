export const formatNumber = (
  num: number,
  style?: 'compact' | 'percent',
): string => {
  if (style === 'compact') {
    return num.toLocaleString('ru', {
      maximumFractionDigits: 2,
      notation: 'compact',
    });
  }

  if (style === 'percent') {
    return num.toLocaleString('ru', {style: 'percent'});
  }

  return num.toLocaleString('ru');
};
