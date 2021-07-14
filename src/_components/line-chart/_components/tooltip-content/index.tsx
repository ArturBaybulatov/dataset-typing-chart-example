import {BaseItem, Dataset, Fields} from 'src/_types';
import {KeyOf} from 'src/_types/utility';
import {format} from 'src/_utils';
import $ from './index.module.scss';

type Props<Item extends BaseItem, YAxisTypes> = {
  datasets: Array<Dataset<Item>>;
  fields: Fields<Item, YAxisTypes>;
  payload: any;
};

export const TooltipContent = <Item extends BaseItem, YAxisTypes>({
  datasets,
  fields,
  payload,
}: Props<Item, YAxisTypes>) => (
  <div className={$.root}>
    {datasets.map(dataset => (
      <div key={dataset.id} style={{marginBottom: '0.2rem'}}>
        <div>{dataset.name}</div>

        <div style={{marginLeft: '0.6rem'}}>
          {payload.map(({dataKey: compoundKey, value}: any) => {
            const {
              datasetId,
              fieldId,
            }: {
              datasetId: string; // Dataset<Item…>['id']
              fieldId: KeyOf<Item>;
            } = JSON.parse(compoundKey);

            if (dataset.id !== datasetId) {
              return null;
            }

            const field = fields[fieldId];

            return (
              <div key={field.id.toString()}>
                {field.name}: {field.format?.(value as any) ?? format(value)}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);
