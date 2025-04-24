import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/* 
  Este componente é responsável por exibir um gráfico de linha que compara as respostas dos grupos A e B.
  Ao longo do tempo, o gráfico exibe o número de respostas dos grupos A e B.
  Tenho que ver como fazer isso com o Seninho.
*/

interface TimelineChartProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    grupoA: number;
    grupoB: number;
  }>;
  colors?: {
    grupoA: string;
    grupoB: string;
  };
  yAxisLabel?: string;
}

export function TimelineChart({
  title,
  description,
  data,
  colors = { grupoA: '#8B5CF6', grupoB: '#D946EF' },
  yAxisLabel,
}: TimelineChartProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
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
            <YAxis
              label={
                yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined
              }
            />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='grupoA'
              name='Grupo A'
              stroke={colors.grupoA}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='grupoB'
              name='Grupo B'
              stroke={colors.grupoB}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
