import { DataTable } from '@/components/dashboard/DataTable';
import { GroupComparisonChart } from '@/components/dashboard/GroupComparisonChart';
import { Navbar } from '@/components/dashboard/Navbar';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bug, Clock, FileText, Timer, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PerformanceRadarChart } from '@/components/dashboard/PerformanceRadarChart';
import { AnalyticsResponse, ChartData } from '@/types/analytics';
import { fetchAnalytics } from '@/services/analyticsService';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
        setChartData(data.chartData);
      } catch (error) {
        console.error('Erro ao carregar dados de análise:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Carregando...</div>;
  }

  if (!analytics || !chartData) {
    return <div className='flex items-center justify-center h-screen'>Erro ao carregar dados</div>;
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 overflow-auto'>
        <main className='container mx-auto space-y-4 p-4 md:p-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Análise Comparativa de Grupos</h1>
          </div>

          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <StatCard
              title='Submissões'
              value={`${chartData.submissionsData[0].grupoA} vs ${chartData.submissionsData[0].grupoB}`}
              description='Total de submissões por grupo'
              icon={<BarChart className='h-4 w-4' />}
              trend={{
                value: Math.round((analytics.analytics.comparison.submissions || 0) * 100),
                isPositive: true,
              }}
            />
            <StatCard
              title='Edições'
              value={`${chartData.editsData[0].grupoA + chartData.editsData[1].grupoA} vs ${chartData.editsData[0].grupoB + chartData.editsData[1].grupoB}`}
              description='Total de edições em schemas'
              icon={<FileText className='h-4 w-4' />}
              trend={{
                value: Math.round((analytics.analytics.comparison.timeEfficiency || 0) * 100),
                isPositive: false,
              }}
            />
            <StatCard
              title='Tempo até Conclusão'
              value={`${chartData.completionTimeData[0].grupoAFormatted} vs ${chartData.completionTimeData[0].grupoBFormatted}`}
              description='Tempo médio para finalizar'
              icon={<Clock className='h-4 w-4' />}
              trend={{
                value: Math.round((analytics.analytics.comparison.errorRate || 0) * 100),
                isPositive: true,
              }}
            />
            <StatCard
              title='Erros'
              value={`${chartData.errorsData[0].grupoA} vs ${chartData.errorsData[0].grupoB}`}
              description='Total de erros ocorridos'
              icon={<Bug className='h-4 w-4' />}
              trend={{
                value: Math.round((analytics.analytics.comparison.errorRate || 0) * 100),
                isPositive: true,
              }}
            />
          </div>

          <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
            <div className='col-span-1 md:col-span-2'>
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                  <CardDescription>
                    Comparação entre o Grupo A e o Grupo B em diferentes métricas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground mb-4'>
                    A análise indica que o{' '}
                    <span className='font-bold text-purple-600'>Grupo A</span> apresenta melhor
                    desempenho em 6 das 7 métricas analisadas, com destaque para menos erros (-35%).
                  </p>
                  <div className='grid gap-4 grid-cols-1'>
                    <StatCard
                      title='Primeira Tentativa'
                      value={`${chartData.firstAttemptTime.grupoA} vs ${chartData.firstAttemptTime.grupoB} min`}
                      description='Tempo até a primeira tentativa'
                      icon={<Timer className='h-4 w-4' />}
                      trend={{ value: 31, isPositive: true }}
                    />
                    <StatCard
                      title='Total de Usuários'
                      value={`${chartData.totalUsers.grupoA} vs ${chartData.totalUsers.grupoB}`}
                      description='Grupo A vs Grupo B'
                      icon={<Users className='h-4 w-4' />}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className='col-span-1 md:col-span-2 h-full'>
              <PerformanceRadarChart
                title='Comparativo de Performance'
                description='Análise global das capacidades'
                data={chartData.performanceData}
              />
            </div>
          </div>

          <Tabs defaultValue='graficos'>
            <TabsList className='mb-4'>
              <TabsTrigger value='graficos'>Gráficos</TabsTrigger>
              <TabsTrigger value='tabelas'>Tabelas</TabsTrigger>
            </TabsList>
            <TabsContent value='graficos' className='space-y-4'>
              <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                <GroupComparisonChart
                  title='Submissões'
                  description='Análise de submissões por tipo'
                  data={chartData.submissionsData}
                />
                <GroupComparisonChart
                  title='Edições de Schema'
                  description='Quantidade de edições por tipo'
                  data={chartData.editsData}
                />
                <GroupComparisonChart
                  title='Tempo até Conclusão (minutos)'
                  description='Análise estatística do tempo'
                  data={chartData.completionTimeData}
                />
                <GroupComparisonChart
                  title='Análise de Erros'
                  description='Tipos de erros encontrados'
                  data={chartData.errorsData}
                />
              </div>
            </TabsContent>
            <TabsContent value='tabelas'>
              <DataTable
                title='Comparação Detalhada entre Grupos'
                description='Análise comparativa com significância estatística'
                columns={[
                  { key: 'metrica', header: 'Métrica' },
                  { key: 'grupoA', header: 'Grupo A' },
                  { key: 'grupoB', header: 'Grupo B' },
                  { key: 'diferenca', header: 'Diferença' },
                  { key: 'significancia', header: 'Significância' },
                ]}
                data={chartData.comparisonTable}
              />
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Conclusões</CardTitle>
              <CardDescription>Análise final de desempenho entre os grupos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p>
                  Com base nas métricas analisadas, podemos concluir que o{' '}
                  <span className='font-bold text-purple-600'>Grupo A</span> apresentou um
                  desempenho significativamente superior ao{' '}
                  <span className='font-bold text-pink-600'>Grupo B</span> na maioria dos
                  indicadores:
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>
                    <strong>Eficiência:</strong> O Grupo A conseguiu realizar mais submissões (
                    {Math.round((analytics.analytics.comparison.submissions || 0) * 100)}%) com
                    menos edições em schemas (
                    {Math.round((analytics.analytics.comparison.timeEfficiency || 0) * 100)}% em
                    média).
                  </li>
                  <li>
                    <strong>Velocidade:</strong> O tempo médio até a conclusão foi{' '}
                    {Math.round((analytics.analytics.comparison.errorRate || 0) * 100)}% menor no
                    Grupo A.
                  </li>
                  <li>
                    <strong>Qualidade:</strong> O Grupo A apresentou{' '}
                    {Math.round((analytics.analytics.comparison.errorRate || 0) * 100)}% menos
                    erros.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
