import {Field} from 'src/_types';

export type Dataset<Item> = {
  fields: {[Key in keyof Item]: Field<Item, Key>};
  id: string;
  items: Array<Item>;
  name: string;
};
