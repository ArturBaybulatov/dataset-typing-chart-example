import {YAxisProps as RechartsYAxisProps} from 'recharts';

export type YAxis<YAxisTypes, Key extends keyof YAxisTypes> = {
  format?: (val: YAxisTypes[Key]) => string;
  id: Key;
} & Omit<RechartsYAxisProps, 'format' | 'id'>;
