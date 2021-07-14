import {BaseItem} from 'src/_types';
import {KeyOf} from 'src/_types/utility';

export type Field<
  Item extends BaseItem,
  Key extends KeyOf<Item>,
  YAxisTypes,
> = {
  format?: (val: Item[Key]) => string;
  id: Key;
  name: string;
  yAxisId?: KeyOf<YAxisTypes>;
};
