export type Field<Item, Key extends keyof Item, YAxisTypes = unknown> = {
  format?: (val: Item[Key]) => string;
  id: Key;
  name: string;
  yAxisId?: keyof YAxisTypes;
};
