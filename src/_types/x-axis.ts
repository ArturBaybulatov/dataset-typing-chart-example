import {XAxisProps as RechartsXAxisProps} from 'recharts';

export type XAxis<Item, XAxisTypes, Key extends keyof XAxisTypes> = {
  fieldId: keyof Item;
  format?: (val: XAxisTypes[Key]) => string;
  id: Key;
} & Omit<RechartsXAxisProps, 'dataKey' | 'format' | 'id'>;
