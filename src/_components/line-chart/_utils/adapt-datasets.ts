import _ from 'lodash';
import {BaseItem, Dataset, Fields} from 'src/_types';

export const adaptDatasets = <Item extends BaseItem, YAxisTypes>(
  datasets: Array<Dataset<Item>>,
  fields: Fields<Item, YAxisTypes>,
) =>
  _.zipWith(
    ...datasets.map(dataset =>
      dataset.items.map(item => ({
        ..._.fromPairs(
          _.map(fields, field => [
            JSON.stringify({datasetId: dataset.id, fieldId: field.id}),
            item[field.id],
          ]),
        ),
      })),
    ),
    (...arr) => Object.assign({}, ...arr),
  );
