import * as dateFns from 'date-fns';
import _ from 'lodash';
import {Dataset} from 'src/_types';
import {formatNumber} from 'src/_utils';
import {Table} from './_components';
import {Item} from './_types';
import $ from './index.module.scss';

const dataset: Dataset<Item> = {
  fields: {
    id: {
      align: 'right',
      id: 'id',
      name: 'ID',
    },
    joined: {
      id: 'joined',
      name: 'Join Date',
    },
    revenue: {
      align: 'right',
      id: 'revenue',
      name: 'Revenue',
    },
    revenueRate: {
      align: 'right',
      format: num => formatNumber(num, 'percent'),
      id: 'revenueRate',
      name: 'Revenue Rate',
    },
    username: {
      id: 'username',
      name: 'Username',
    },
  },
  id: '1',
  items: _.times(10, i => ({
    id: i.toString(),
    joined: dateFns.subDays(new Date(), _.random(30)),
    revenue: _.random(1_000_000),
    revenueRate: _.random(1, true),
    username: `${_.sample(['Alice', 'Bob', 'John', 'Jane', 'Carl'])}${i}`,
  })),
  name: 'Lorem Ipsum',
};

export const Home = () => (
  <div className={$.root}>
    <Table dataset={dataset} />
  </div>
);
