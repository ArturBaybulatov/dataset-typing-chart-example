import cn from 'classnames';
import _ from 'lodash';
import {CSSProperties} from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from 'recharts';
import {BaseItem, Dataset, Fields, XAxes, YAxes} from 'src/_types';
import {format} from 'src/_utils';
import {TooltipContent} from './_components';
import {adaptDatasets} from './_utils';
import $ from './index.module.scss';

type Props<Item extends BaseItem, XAxisTypes, YAxisTypes> = {
  className?: string;
  datasets: Array<Dataset<Item>>;
  fields: Fields<Item, YAxisTypes>;
  legend?: boolean;
  style?: CSSProperties;
  tooltip?: boolean;
  xAxes: XAxes<Item, XAxisTypes>;
  yAxes: YAxes<YAxisTypes>;
};

export const LineChart = <Item extends BaseItem, XAxisTypes, YAxisTypes>({
  className,
  datasets,
  fields,
  legend,
  style,
  tooltip,
  xAxes,
  yAxes,
}: Props<Item, XAxisTypes, YAxisTypes>) => (
  <div className={cn($.root, className)} style={style}>
    <ResponsiveContainer>
      <RechartsLineChart
        data={adaptDatasets(datasets, fields)}
        // @ts-ignore
        fontSize="0.7rem"
        style={{fontSize: '0.7rem'}}
      >
        <CartesianGrid />

        {datasets.map((dataset, datasetIndex) =>
          _.map(xAxes, xAxis => (
            <RechartsXAxis
              key={`xAxisKey_${dataset.id}_${xAxis.id}`}
              dataKey={JSON.stringify({
                datasetId: dataset.id,
                fieldId: xAxis.fieldId,
              })}
              domain={['dataMin', 'dataMax']}
              orientation={datasetIndex % 2 === 0 ? 'bottom' : 'top'}
              tickFormatter={val => {
                try {
                  return xAxis.format?.(val as any) ?? format(val, 'compact');
                } catch {
                  return '';
                }
              }}
              xAxisId={`xAxisId_${dataset.id}_${xAxis.id}`}
              {..._.omit(xAxis, ['fieldId', 'format', 'id'])}
            />
          )),
        )}

        {_.map(yAxes, yAxis => (
          <RechartsYAxis
            key={`yAxisKey_${yAxis.id}`}
            domain={['dataMin', 'dataMax']}
            tickFormatter={val => {
              try {
                return yAxis.format?.(val as any) ?? format(val, 'compact');
              } catch {
                return '';
              }
            }}
            yAxisId={`yAxisId_${yAxis.id}`}
            {..._.omit(yAxis, ['format', 'id'])}
          />
        ))}

        {/* It's important to put these after real axes for correct tooltip rendering */}
        <RechartsXAxis hide xAxisId="__specialXAxisId__" />
        <RechartsYAxis hide yAxisId="__specialYAxisId__" />

        {legend && <Legend />}

        {tooltip && (
          <Tooltip
            content={({active, payload}) => {
              if (!active || !payload) {
                return null;
              }

              return (
                <TooltipContent
                  datasets={datasets}
                  fields={fields}
                  payload={payload}
                />
              );
            }}
          />
        )}

        {datasets.map((dataset, datasetIndex) =>
          _.map(fields, field => (
            <Line
              key={`key_${dataset.id}_${field.id}`}
              dataKey={JSON.stringify({
                datasetId: dataset.id,
                fieldId: field.id,
              })}
              dot={false}
              hide={field.yAxisId === undefined}
              isAnimationActive={false}
              stroke={field.yAxisId && yAxes[field.yAxisId].stroke}
              strokeDasharray={
                datasetIndex === 0
                  ? undefined
                  : `${(datasetIndex + 1) ** 2.5} 3`
              }
              strokeWidth="2px"
              type="monotone"
              xAxisId="__specialXAxisId__"
              yAxisId={
                field.yAxisId
                  ? `yAxisId_${field.yAxisId}`
                  : '__specialYAxisId__'
              }
            />
          )),
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  </div>
);
