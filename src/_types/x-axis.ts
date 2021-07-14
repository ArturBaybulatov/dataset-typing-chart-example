import {XAxisProps as RechartsXAxisProps} from 'recharts';
import {KeyOf} from 'src/_types/utility';
import {BaseItem} from './base-item';

export type XAxis<
  Item extends BaseItem,
  XAxisTypes,
  Key extends KeyOf<XAxisTypes>,
> = {
  fieldId: KeyOf<Item>;
  format?: (val: XAxisTypes[Key]) => string;
  id: Key;
} & Omit<RechartsXAxisProps, 'dataKey' | 'format' | 'id'>;
