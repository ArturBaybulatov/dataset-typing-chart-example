import {BaseItem, Field} from 'src/_types';
import {KeyOf} from 'src/_types/utility';

export type Fields<Item extends BaseItem, YAxisTypes> = {
  [Key in KeyOf<Item>]: Field<Item, Key, YAxisTypes>;
};
