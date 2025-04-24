import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface GroupComparisonChartProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    grupoA: number | string;
    grupoB: number | string;
  }>;
  colors?: {
    grupoA: string;
    grupoB: string;
  };
}

// Componente personalizado para o tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-2 border border-gray-200 shadow-md rounded-md'>
        <p className='font-bold'>{`${label}`}</p>
        {payload.map((item, index) => {
          const formattedValue = (item.payload as any)[`${item.dataKey}Formatted`];
          return (
            <p key={index} style={{ color: item.color }}>
              {`${item.name}: ${formattedValue || item.value}`}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

export function GroupComparisonChart({
  title,
  description,
  data,
  colors = { grupoA: '#8B5CF6', grupoB: '#D946EF' },
}: GroupComparisonChartProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey='grupoA' name='Grupo A' fill={colors.grupoA} />
            <Bar dataKey='grupoB' name='Grupo B' fill={colors.grupoB} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
