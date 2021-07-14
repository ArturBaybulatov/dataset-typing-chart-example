import _ from 'lodash';
import {LineChart} from 'src/_components';
import {Dataset, Fields, XAxes, YAxes} from 'src/_types';
import {formatNumber} from 'src/_utils';
import {User, UserXAxisTypes, UserYAxisTypes} from './_types';
import $ from './index.module.scss';

const userFields: Fields<User, UserYAxisTypes> = {
  category: {
    id: 'category',
    name: 'Category',
  },
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
};

const userXAxes: XAxes<User, UserXAxisTypes> = {
  dateAxis: {
    fieldId: 'date',
    id: 'dateAxis',
  },
};

const userYAxes: YAxes<UserYAxisTypes> = {
  numberAxis: {
    id: 'numberAxis',
    stroke: 'blue',
  },
  percentAxis: {
    format: num => formatNumber(num, 'percent'),
    id: 'percentAxis',
    orientation: 'right',
    stroke: 'red',
  },
};

const userDatasets: Array<Dataset<User>> = [
  {
    id: '1',
    items: _.range(1, 10 + 1).map(i => ({
      category: `${_.sample('foo bar baz qux quux corge'.split(' '))}${i}`,
      date: new Date(
        _.random(new Date('1990-01-01').getTime(), new Date().getTime()),
      ),
      id: i.toString(),
      revenue: _.random(1_000_000),
      revenueRate: Math.random(),
    })),
    name: 'Lorem Ipsum',
  },
  {
    id: '2',
    items: _.range(11, 25 + 1).map(i => ({
      category: `${_.sample('foo bar baz qux quux corge'.split(' '))}${i}`,
      date: new Date(
        _.random(new Date('1990-01-01').getTime(), new Date().getTime()),
      ),
      id: i.toString(),
      revenue: _.random(1_000_000),
      revenueRate: Math.random(),
    })),
    name: 'Dolor Sit Amet',
  },
];

export const Home = () => (
  <div className={$.root}>
    <LineChart
      datasets={userDatasets}
      fields={userFields}
      legend
      tooltip
      xAxes={userXAxes}
      yAxes={userYAxes}
    />
  </div>
);
