import {BaseItem, XAxis} from 'src/_types';
import {KeyOf} from 'src/_types/utility';

export type XAxes<Item extends BaseItem, XAxisTypes> = {
  [Key in KeyOf<XAxisTypes>]: XAxis<Item, XAxisTypes, Key>;
};
