import {YAxisProps as RechartsYAxisProps} from 'recharts';
import {KeyOf} from 'src/_types/utility';

export type YAxis<YAxisTypes, Key extends KeyOf<YAxisTypes>> = {
  format?: (val: YAxisTypes[Key]) => string;
  id: Key;
} & Omit<RechartsYAxisProps, 'format' | 'id'>;
