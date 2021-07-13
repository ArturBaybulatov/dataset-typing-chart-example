import {Dataset} from 'src/_types';
import {format} from 'src/_utils';
import $ from './index.module.scss';

type Props<Item, XAxisTypes, YAxisTypes> = {
  datasets: Array<Dataset<Item, XAxisTypes, YAxisTypes>>;
  payload: any;
};

export const TooltipContent = <Item, XAxisTypes, YAxisTypes>({
  datasets,
  payload,
}: Props<Item, XAxisTypes, YAxisTypes>) => (
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
              fieldId: keyof Item;
            } = JSON.parse(compoundKey);

            if (dataset.id !== datasetId) {
              return null;
            }

            const field = dataset.fields[fieldId];

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
