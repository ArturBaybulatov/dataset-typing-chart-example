export type Field<Item, Key extends keyof Item> = {
  align?: 'left' | 'right';
  format?: (val: Item[Key]) => string;
  id: Key;
  name: string;
};
