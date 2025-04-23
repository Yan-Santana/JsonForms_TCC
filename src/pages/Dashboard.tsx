import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { GroupComparisonChart } from '@/components/dashboard/GroupComparisonChart';
import { TimelineChart } from '@/components/dashboard/TimelineChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { PerformanceRadarChart } from '@/components/dashboard/PerformanceRadarChart';
import { Navbar } from '@/components/dashboard/Navbar';
import { BarChart, Users, Clock, Bug, Timer, FileText } from 'lucide-react';

import {
  submissionsData,
  editsData,
  completionTimeData,
  errorsData,
  firstAttemptData,
  timelineData,
  performanceData,
  comparisonTable,
} from '@/data/mock-data';

const Dashboard = () => {
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
              value={`${submissionsData[0].grupoA} vs ${submissionsData[0].grupoB}`}
              description='Total de submissões por grupo'
              icon={<BarChart className='h-4 w-4' />}
              trend={{ value: 14, isPositive: true }}
            />
            <StatCard
              title='Edições'
              value={`${editsData[0].grupoA + editsData[1].grupoA} vs ${editsData[0].grupoB + editsData[1].grupoB}`}
              description='Total de edições em schemas'
              icon={<FileText className='h-4 w-4' />}
              trend={{ value: 31, isPositive: false }}
            />
            <StatCard
              title='Tempo até Conclusão'
              value={`${completionTimeData[0].grupoA} vs ${completionTimeData[0].grupoB} min`}
              description='Tempo médio para finalizar'
              icon={<Clock className='h-4 w-4' />}
              trend={{ value: 17, isPositive: true }}
            />
            <StatCard
              title='Erros'
              value={`${errorsData[0].grupoA + errorsData[1].grupoA} vs ${errorsData[0].grupoB + errorsData[1].grupoB}`}
              description='Total de erros ocorridos'
              icon={<Bug className='h-4 w-4' />}
              trend={{ value: 35, isPositive: true }}
            />
          </div>

          <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
            <Card className='col-span-1 md:col-span-2'>
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>
                  Comparação entre o Grupo A e o Grupo B em diferentes métricas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>
                  A análise indica que o <span className='font-bold text-purple-600'>Grupo A</span>{' '}
                  apresenta melhor desempenho em 6 das 7 métricas analisadas, com destaque para
                  menos erros (-35%).
                </p>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                  <StatCard
                    title='Primeira Tentativa'
                    value={`${firstAttemptData[0].grupoA} vs ${firstAttemptData[0].grupoB} min`}
                    description='Tempo até a primeira tentativa'
                    icon={<Timer className='h-4 w-4' />}
                    trend={{ value: 31, isPositive: true }}
                  />
                  <StatCard
                    title='Total de Usuários'
                    value='25 vs 28'
                    description='Grupo A vs Grupo B'
                    icon={<Users className='h-4 w-4' />}
                  />
                </div>
              </CardContent>
            </Card>
            <PerformanceRadarChart
              title='Comparativo de Performance'
              description='Análise global das capacidades'
              data={performanceData}
            />
          </div>

          <Tabs defaultValue='graficos'>
            <TabsList className='mb-4'>
              <TabsTrigger value='graficos'>Gráficos</TabsTrigger>
              <TabsTrigger value='tabelas'>Tabelas</TabsTrigger>
              <TabsTrigger value='timeline'>Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value='graficos' className='space-y-4'>
              <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                <GroupComparisonChart
                  title='Submissões'
                  description='Análise de submissões por tipo'
                  data={submissionsData}
                />
                <GroupComparisonChart
                  title='Edições de Schema'
                  description='Quantidade de edições por tipo'
                  data={editsData}
                />
                <GroupComparisonChart
                  title='Tempo até Conclusão (minutos)'
                  description='Análise estatística do tempo'
                  data={completionTimeData}
                />
                <GroupComparisonChart
                  title='Análise de Erros'
                  description='Tipos de erros encontrados'
                  data={errorsData}
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
                data={comparisonTable}
              />
            </TabsContent>
            <TabsContent value='timeline'>
              <TimelineChart
                title='Evolução Semanal'
                description='Progresso de submissões ao longo do tempo'
                data={timelineData}
                yAxisLabel='Submissões'
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
                    <strong>Eficiência:</strong> O Grupo A conseguiu realizar mais submissões (+14%)
                    com menos edições em schemas (-32% em média).
                  </li>
                  <li>
                    <strong>Velocidade:</strong> O tempo médio até a conclusão foi 17% menor no
                    Grupo A, e o tempo até a primeira tentativa foi 31% menor.
                  </li>
                  <li>
                    <strong>Qualidade:</strong> O Grupo A apresentou 35% menos erros.
                  </li>
                  <li>
                    <strong>Significância:</strong> As diferenças mais significativas foram
                    observadas nos aspectos de qualidade (erros).
                  </li>
                </ul>
                <p className='mt-4'>
                  Estes resultados sugerem que a abordagem pedagógica utilizada com o Grupo A foi
                  mais efetiva e poderia ser expandida para futuros grupos de aprendizado.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
