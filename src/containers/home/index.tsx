import * as dateFns from 'date-fns';
import _ from 'lodash';
import {LineChart} from 'src/_components';
import {Dataset, YAxis} from 'src/_types';
import {formatNumber} from 'src/_utils';
import {User, UserChartXAxisTypes, UserChartYAxisTypes} from './_types';
import $ from './index.module.scss';

const yAxes: {
  [Key in keyof UserChartYAxisTypes]: YAxis<UserChartYAxisTypes, Key>;
} = {
  numberAxis: {
    id: 'numberAxis',
    stroke: 'blue',
  },
  percentAxis: {
    format: num => formatNumber(num, 'percent'),
    id: 'percentAxis',
    stroke: 'indigo',
  },
};

const userDataset: Dataset<User, UserChartXAxisTypes, UserChartYAxisTypes> = {
  fields: {
    date: {
      id: 'date',
      name: 'Date',
    },
    id: {
      id: 'id',
      name: 'ID',
    },
    revenue: {
      id: 'revenue',
      name: 'Revenue',
      yAxisId: 'numberAxis',
    },
    revenueRate: {
      format: num => formatNumber(num, 'percent'),
      id: 'revenueRate',
      name: 'Revenue Rate',
      yAxisId: 'percentAxis',
    },
  },
  id: '1',
  items: _.times(10, i => ({
    date: dateFns.subDays(new Date(), _.random(30)),
    id: i.toString(),
    revenue: _.random(1_000_000),
    revenueRate: Math.random(),
  })),
  name: 'Lorem Ipsum',
  xAxes: {
    dateAxis: {
      fieldId: 'date',
      id: 'dateAxis',
    },
  },
};

export const Home = () => (
  <div className={$.root}>
    <LineChart datasets={[userDataset]} legend tooltip yAxes={yAxes} />
  </div>
);
