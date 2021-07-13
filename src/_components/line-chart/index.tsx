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
import {Dataset, YAxis} from 'src/_types';
import {format} from 'src/_utils';
import {TooltipContent} from './_components';
import {adaptDatasets} from './_utils';
import $ from './index.module.scss';

type Props<Item, XAxisTypes, YAxisTypes> = {
  className?: string;
  datasets: Array<Dataset<Item, XAxisTypes, YAxisTypes>>;
  legend?: boolean;
  style?: CSSProperties;
  tooltip?: boolean;
  yAxes: {[Key in keyof YAxisTypes]: YAxis<YAxisTypes, Key>};
};

export const LineChart = <Item, XAxisTypes, YAxisTypes>({
  className,
  datasets,
  legend,
  style,
  tooltip,
  yAxes,
}: Props<Item, XAxisTypes, YAxisTypes>) => (
  <div className={cn($.root, className)} style={style}>
    <ResponsiveContainer>
      <RechartsLineChart
        data={adaptDatasets(datasets)}
        // @ts-ignore
        fontSize="0.7rem"
        style={{fontSize: '0.7rem'}}
      >
        <CartesianGrid />

        {datasets.map((dataset, datasetIndex) =>
          _.map(dataset.xAxes, xAxis => (
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

              return <TooltipContent datasets={datasets} payload={payload} />;
            }}
          />
        )}

        {datasets.map((dataset, datasetIndex) =>
          _.map(dataset.fields, field => (
            <Line
              key={`key_${dataset.id}_${field.id}`}
              dataKey={JSON.stringify({
                datasetId: dataset.id,
                fieldId: field.id,
              })}
              dot={false}
              isAnimationActive={false}
              stroke={field.yAxisId && yAxes[field.yAxisId].stroke}
              strokeDasharray={
                datasetIndex === 0
                  ? undefined
                  : `${(datasetIndex + 1) ** 2.5} 3`
              }
              strokeWidth="2px"
              type="monotone"
              xAxisId={
                /*field.xAxisId
                  ? `xAxisId_${dataset.id}_${field.xAxisId}`
                  :*/ '__specialXAxisId__'
              }
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
