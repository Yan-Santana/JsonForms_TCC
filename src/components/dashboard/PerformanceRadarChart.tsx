import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PerformanceRadarChartProps {
  title: string;
  description?: string;
  data: Array<{
    subject: string;
    grupoA: number;
    grupoB: number;
    fullMark: number;
  }>;
  colors?: {
    grupoA: string;
    grupoB: string;
  };
}

export function PerformanceRadarChart({
  title,
  description,
  data,
  colors = { grupoA: '#8B5CF6', grupoB: '#D946EF' },
}: PerformanceRadarChartProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={450}>
          <RadarChart
            cx='50%'
            cy='50%'
            outerRadius='100%'
            data={data}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey='subject' />
            <PolarRadiusAxis />
            <Radar
              name='Grupo A'
              dataKey='grupoA'
              stroke={colors.grupoA}
              fill={colors.grupoA}
              fillOpacity={0.3}
            />
            <Radar
              name='Grupo B'
              dataKey='grupoB'
              stroke={colors.grupoB}
              fill={colors.grupoB}
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
