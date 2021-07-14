import {YAxis} from 'src/_types';
import {KeyOf} from 'src/_types/utility';

export type YAxes<YAxisTypes> = {
  [Key in KeyOf<YAxisTypes>]: YAxis<YAxisTypes, Key>;
};
