import cn from 'classnames';
import _ from 'lodash';
import {Dataset} from 'src/_types';
import {format} from 'src/_utils';
import $ from './index.module.scss';

type Props<Item> = {
  dataset: Dataset<Item>;
};

export const Table = <Item extends {id: string}>({
  dataset: {fields, items},
}: Props<Item>) => (
  <table className={$.table}>
    <thead>
      <tr>
        {_.map(fields, ({id, name}) => (
          <th key={id.toString()} className={$.cell}>
            {name}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {items.map(item => (
        <tr key={item.id} className={$.bodyRow}>
          {_.map(fields, field => {
            const val = item[field.id];

            return (
              <td
                key={field.id.toString()}
                className={cn($.cell, {
                  [$.cell_align_right!]: field.align === 'right',
                })}
              >
                {field.format?.(val) ?? format(val)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);
