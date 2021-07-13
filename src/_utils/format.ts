import {formatDate, formatNumber} from 'src/_utils';

export const format = (val: unknown): string => {
  if (typeof val === 'number') {
    return formatNumber(val);
  }

  if (val instanceof Date) {
    return formatDate(val);
  }

  return String(val);
};
