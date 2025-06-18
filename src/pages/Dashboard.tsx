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
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        if (!data || !data.chartData) {
          throw new Error('Dados inválidos recebidos do servidor');
        }
        setAnalytics(data);
        setChartData(data.chartData);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar dados de análise:', error);
        setError(error instanceof Error ? error.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Carregando...</div>;
  }

  if (
    error ||
    !analytics ||
    !chartData ||
    !analytics.analytics ||
    !chartData.submissionsData?.[0]
  ) {
    return (
      <div className='flex items-center justify-center h-screen'>
        {error || 'Erro ao carregar dados'}
      </div>
    );
  }

  // Garantir que os dados necessários existem
  const submissionsData = chartData.submissionsData[0] || { grupoA: 0, grupoB: 0 };

  // Calcular total de edições (schema + uischema)
  const totalSchemaEditsA =
    chartData.editsData?.reduce((sum, item) => sum + (item.grupoA || 0), 0) || 0;
  const totalSchemaEditsB =
    chartData.editsData?.reduce((sum, item) => sum + (item.grupoB || 0), 0) || 0;
  const editsData = { grupoA: totalSchemaEditsA, grupoB: totalSchemaEditsB };

  const completionTimeData = chartData.completionTimeData[0] || {
    grupoA: 0,
    grupoB: 0,
    grupoAFormatted: '0 min',
    grupoBFormatted: '0 min',
  };
  const errorsData = chartData.errorsData[0] || { grupoA: 0, grupoB: 0 };
  const firstAttemptTime = chartData.firstAttemptTime || { grupoA: '0 min', grupoB: '0 min' };
  const totalUsers = chartData.totalUsers || { grupoA: 0, grupoB: 0 };

  // Determinar qual grupo teve melhor desempenho
  const determineBestGroup = () => {
    const submissionsA = submissionsData.grupoA || 0;
    const submissionsB = submissionsData.grupoB || 0;
    const editsA = editsData.grupoA || 0;
    const editsB = editsData.grupoB || 0;
    const timeA = completionTimeData.grupoA || 0;
    const timeB = completionTimeData.grupoB || 0;
    const errorsA = errorsData.grupoA || 0;
    const errorsB = errorsData.grupoB || 0;
    const resetsA = analytics.analytics.groupA?.codeResets || 0;
    const resetsB = analytics.analytics.groupB?.codeResets || 0;

    // Pontuação baseada em múltiplas métricas
    let scoreA = 0;
    let scoreB = 0;

    // Submissões (mais é melhor)
    if (submissionsA > submissionsB) scoreA += 1;
    else if (submissionsB > submissionsA) scoreB += 1;

    // Edições (menos é melhor) - Peso maior
    if (editsA < editsB) scoreA += 3;
    else if (editsB < editsA) scoreB += 3;

    // Tempo (menos é melhor)
    if (timeA < timeB) scoreA += 2;
    else if (timeB < timeA) scoreB += 2;

    // Erros (menos é melhor) - Peso maior
    if (errorsA < errorsB) scoreA += 4;
    else if (errorsB < errorsA) scoreB += 4;

    // Resets (menos é melhor)
    if (resetsA < resetsB) scoreA += 2;
    else if (resetsB < resetsA) scoreB += 2;

    return scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'tie';
  };

  const bestGroup = determineBestGroup();
  const isGroupABetter = bestGroup === 'A';
  const isGroupBBetter = bestGroup === 'B';
  const isTie = bestGroup === 'tie';

  // Obter dados do grupo vencedor
  const getWinningGroupData = () => {
    if (isGroupABetter) {
      return {
        name: 'Grupo A',
        color: 'text-purple-600',
        submissions: submissionsData.grupoA || 0,
        edits: editsData.grupoA || 0,
        timeEfficiency: analytics.analytics.comparison?.timeEfficiency || 0,
        errorRate: analytics.analytics.comparison?.errorRate || 0,
        resets: analytics.analytics.groupA?.codeResets || 0,
        errors: errorsData.grupoA || 0,
      };
    } else if (isGroupBBetter) {
      return {
        name: 'Grupo B',
        color: 'text-pink-600',
        submissions: submissionsData.grupoB || 0,
        edits: editsData.grupoB || 0,
        timeEfficiency: -(analytics.analytics.comparison?.timeEfficiency || 0),
        errorRate: -(analytics.analytics.comparison?.errorRate || 0),
        resets: analytics.analytics.groupB?.codeResets || 0,
        errors: errorsData.grupoB || 0,
      };
    }
    return null;
  };

  const winningGroup = getWinningGroupData();

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 overflow-auto'>
        <main className='container mx-auto space-y-4 p-4 md:p-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>Análise Comparativa de Grupos</h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            <StatCard
              title='Submissões'
              value={`${submissionsData.grupoA} vs ${submissionsData.grupoB}`}
              trend={{
                value: Math.round((analytics.analytics.comparison?.submissions || 0) * 100),
                isPositive: (analytics.analytics.comparison?.submissions || 0) >= 0,
              }}
              description='Total de submissões por grupo'
              icon={<FileText className='h-4 w-4' />}
            />
            <StatCard
              title='Edições'
              value={`${editsData.grupoA} vs ${editsData.grupoB}`}
              trend={{
                value: Math.round((analytics.analytics.comparison?.edits || 0) * 100),
                isPositive: (analytics.analytics.comparison?.edits || 0) >= 0,
              }}
              description='Total de edições em schemas'
              icon={<BarChart className='h-4 w-4' />}
            />
            <StatCard
              title='Tempo até Conclusão'
              value={`${completionTimeData.grupoAFormatted || '0:00'} vs ${
                completionTimeData.grupoBFormatted || '0:00'
              }`}
              trend={{
                value: Math.round((analytics.analytics.comparison?.timeEfficiency || 0) * 100),
                isPositive: (analytics.analytics.comparison?.timeEfficiency || 0) >= 0,
              }}
              description='Tempo médio para finalizar'
              icon={<Clock className='h-4 w-4' />}
            />
            <StatCard
              title='Erros'
              value={`${errorsData.grupoA} vs ${errorsData.grupoB}`}
              trend={{
                value: Math.round((analytics.analytics.comparison?.errorRate || 0) * 100),
                isPositive: (analytics.analytics.comparison?.errorRate || 0) >= 0,
              }}
              description='Total de erros ocorridos'
              icon={<Bug className='h-4 w-4' />}
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
                  <div className='grid gap-4 grid-cols-1'>
                    <StatCard
                      title='Resets de Código'
                      value={`${analytics.analytics.groupA?.codeResets || 0} vs ${
                        analytics.analytics.groupB?.codeResets || 0
                      }`}
                      description='Total de resets por grupo'
                      icon={<Timer className='h-4 w-4' />}
                      trend={{
                        value:
                          analytics.analytics.groupA?.codeResets === 0 &&
                          analytics.analytics.groupB?.codeResets === 0
                            ? 0
                            : Math.round((analytics.analytics.comparison?.resets || 0) * 100),
                        isPositive: (analytics.analytics.comparison?.resets || 0) >= 0,
                      }}
                    />
                    <StatCard
                      title='Primeira Tentativa'
                      value={`${firstAttemptTime.grupoA} vs ${firstAttemptTime.grupoB}`}
                      description='Tempo até a primeira tentativa'
                      icon={<Timer className='h-4 w-4' />}
                      trend={{ value: 31, isPositive: true }}
                    />
                    <StatCard
                      title='Total de Usuários'
                      value={`${totalUsers.grupoA} vs ${totalUsers.grupoB}`}
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
                {isTie ? (
                  <>
                    <p>
                      Com base nas métricas analisadas, ambos os grupos apresentaram{' '}
                      <span className='font-bold text-blue-600'>desempenho similar</span> nos
                      indicadores avaliados:
                    </p>
                    <ul className='list-disc pl-6 space-y-2'>
                      <li>
                        <strong>Submissões:</strong> Grupo A: {submissionsData.grupoA}, Grupo B:{' '}
                        {submissionsData.grupoB}
                      </li>
                      <li>
                        <strong>Edições:</strong> Grupo A: {editsData.grupoA}, Grupo B:{' '}
                        {editsData.grupoB}
                      </li>
                      <li>
                        <strong>Tempo:</strong> Grupo A: {completionTimeData.grupoAFormatted}, Grupo
                        B: {completionTimeData.grupoBFormatted}
                      </li>
                      <li>
                        <strong>Erros:</strong> Grupo A: {errorsData.grupoA}, Grupo B:{' '}
                        {errorsData.grupoB}
                      </li>
                      <li>
                        <strong>Resets:</strong> Grupo A: {analytics.analytics.groupA?.codeResets},
                        Grupo B: {analytics.analytics.groupB?.codeResets}
                      </li>
                    </ul>
                  </>
                ) : (
                  <p>
                    Com base nas métricas analisadas, podemos concluir que o{' '}
                    <span className={`font-bold ${winningGroup?.color}`}>{winningGroup?.name}</span>{' '}
                    apresentou um desempenho significativamente superior ao{' '}
                    <span
                      className={`font-bold ${
                        winningGroup?.name === 'Grupo A' ? 'text-pink-600' : 'text-purple-600'
                      }`}
                    >
                      {winningGroup?.name === 'Grupo A' ? 'Grupo B' : 'Grupo A'}
                    </span>{' '}
                    na maioria dos indicadores:
                  </p>
                )}

                {!isTie && winningGroup && (
                  <ul className='list-disc pl-6 space-y-2'>
                    <li>
                      <strong>Eficiência:</strong> O {winningGroup.name} conseguiu realizar{' '}
                      {winningGroup.submissions} submissões vs{' '}
                      {winningGroup.name === 'Grupo A'
                        ? submissionsData.grupoB
                        : submissionsData.grupoA}{' '}
                      do outro grupo.
                    </li>
                    <li>
                      <strong>Edições:</strong> O {winningGroup.name} fez {winningGroup.edits}{' '}
                      edições vs{' '}
                      {winningGroup.name === 'Grupo A' ? editsData.grupoB : editsData.grupoA} do
                      outro grupo.
                    </li>
                    <li>
                      <strong>Velocidade:</strong> O tempo médio até a conclusão foi{' '}
                      {Math.abs(Math.round(winningGroup.timeEfficiency * 100))}%{' '}
                      {winningGroup.timeEfficiency > 0 ? 'menor' : 'maior'} no {winningGroup.name}.
                    </li>
                    <li>
                      <strong>Qualidade:</strong> O {winningGroup.name} apresentou{' '}
                      {winningGroup.errors} erros vs{' '}
                      {winningGroup.name === 'Grupo A' ? errorsData.grupoB : errorsData.grupoA} do
                      outro grupo.
                    </li>
                    <li>
                      <strong>Resets:</strong> O {winningGroup.name} fez {winningGroup.resets}{' '}
                      resets vs{' '}
                      {winningGroup.name === 'Grupo A'
                        ? analytics.analytics.groupB?.codeResets
                        : analytics.analytics.groupA?.codeResets}{' '}
                      do outro grupo.
                    </li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
