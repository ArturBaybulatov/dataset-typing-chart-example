import _ from 'lodash';
import {Dataset} from 'src/_types';

export const adaptDatasets = <Item, XAxisTypes, YAxisTypes>(
  datasets: Array<Dataset<Item, XAxisTypes, YAxisTypes>>,
) =>
  _.zipWith(
    ...datasets.map(dataset =>
      dataset.items.map(item => ({
        ..._.fromPairs(
          _.map(dataset.fields, field => [
            JSON.stringify({datasetId: dataset.id, fieldId: field.id}),
            item[field.id],
          ]),
        ),
      })),
    ),
    (...arr) => Object.assign({}, ...arr),
  );
