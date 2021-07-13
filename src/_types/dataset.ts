import {Field, XAxis} from 'src/_types';

export type Dataset<Item, XAxisTypes, YAxisTypes> = {
  fields: {[Key in keyof Item]: Field<Item, Key, YAxisTypes>};
  id: string;
  items: Array<Item>;
  name: string;
  xAxes: {[Key in keyof XAxisTypes]: XAxis<Item, XAxisTypes, Key>};
};
