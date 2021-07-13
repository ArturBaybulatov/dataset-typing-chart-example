import {formatDate, formatNumber} from 'src/_utils';

export const format = (val: unknown, style?: 'compact'): string => {
  if (typeof val === 'number') {
    return formatNumber(val, style);
  }

  if (val instanceof Date) {
    return formatDate(val, style);
  }

  return String(val);
};
