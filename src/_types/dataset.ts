import {BaseItem} from 'src/_types';

export type Dataset<Item extends BaseItem> = {
  id: string;
  items: Array<Item>;
  name: string;
};
