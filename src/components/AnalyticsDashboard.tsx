import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Paper } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsData {
  groupA: {
    averageSubmissions: number;
    averageSchemaEdits: number;
    averageUiSchemaEdits: number;
    averageTimeSpent: number;
    averageErrorCount: number;
    averageFirstAttemptTime: number;
    totalUsers: number;
    fastest?: { name: string; time: number };
    slowest?: { name: string; time: number };
  } | null;
  groupB: {
    averageSubmissions: number;
    averageSchemaEdits: number;
    averageUiSchemaEdits: number;
    averageTimeSpent: number;
    averageErrorCount: number;
    averageFirstAttemptTime: number;
    totalUsers: number;
    fastest?: { name: string; time: number };
    slowest?: { name: string; time: number };
  } | null;
  comparison: {
    submissions: number | null;
    timeEfficiency: number | null;
    errorRate: number | null;
  };
}

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const formatTime = (milliseconds: number): string => {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}min${seconds > 0 ? ` ${seconds}s` : ''}`;
    }

    if (minutes > 0) {
      return `${minutes}min${seconds > 0 ? ` ${seconds}s` : ''}`;
    }

    return `${seconds}s`;
  };

  const prepareChartData = () => {
    const timeData = [
      {
        name: 'Tempo Total',
        grupoA: analytics?.groupA?.averageTimeSpent ?? 0,
        grupoB: analytics?.groupB?.averageTimeSpent ?? 0,
        formattedA: formatTime(analytics?.groupA?.averageTimeSpent ?? 0),
        formattedB: formatTime(analytics?.groupB?.averageTimeSpent ?? 0),
      },
      {
        name: 'Tempo 1ª Tentativa',
        grupoA: analytics?.groupA?.averageFirstAttemptTime ?? 0,
        grupoB: analytics?.groupB?.averageFirstAttemptTime ?? 0,
        formattedA: formatTime(analytics?.groupA?.averageFirstAttemptTime ?? 0),
        formattedB: formatTime(analytics?.groupB?.averageFirstAttemptTime ?? 0),
      },
    ];

    const metricsData = [
      {
        name: 'Submissões',
        grupoA: analytics?.groupA?.averageSubmissions ?? 0,
        grupoB: analytics?.groupB?.averageSubmissions ?? 0,
      },
      {
        name: 'Schema Edits',
        grupoA: analytics?.groupA?.averageSchemaEdits ?? 0,
        grupoB: analytics?.groupB?.averageSchemaEdits ?? 0,
      },
      {
        name: 'UI Schema Edits',
        grupoA: analytics?.groupA?.averageUiSchemaEdits ?? 0,
        grupoB: analytics?.groupB?.averageUiSchemaEdits ?? 0,
      },
      {
        name: 'Erros',
        grupoA: analytics?.groupA?.averageErrorCount ?? 0,
        grupoB: analytics?.groupB?.averageErrorCount ?? 0,
      },
    ];

    return { timeData, metricsData };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Erro ao buscar dados de análise:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Typography>Carregando análise...</Typography>;
  if (!analytics) return <Typography>Não foi possível carregar os dados de análise</Typography>;

  const { timeData, metricsData } = prepareChartData();

  const renderMetricCard = (
    title: string,
    valueA: number | null,
    valueB: number | null,
    unit: string = '',
  ) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant='h6' gutterBottom color='primary'>
            {title}
          </Typography>
          <Typography>
            Grupo A: {valueA !== null ? valueA.toFixed(2) : 'N/A'} {unit}
          </Typography>
          <Typography>
            Grupo B: {valueB !== null ? valueB.toFixed(2) : 'N/A'} {unit}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        p: 3,
        maxHeight: '100vh',
        overflowY: 'auto',
        bgcolor: '#121212',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Typography variant='h4' gutterBottom color='primary' fontWeight='bold'>
        Análise Comparativa dos Grupos
      </Typography>

      {!analytics.groupA || !analytics.groupB ? (
        <Typography variant='body1' color='text.secondary'>
          Ainda não há dados suficientes para comparação entre os grupos.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#1E1E1E', color: '#fff' }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom color='primary'>
                    Métricas de Tempo
                  </Typography>
                  <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={timeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray='3 3' stroke='#333' />
                        <XAxis
                          dataKey='name'
                          angle={-45}
                          textAnchor='end'
                          height={100}
                          stroke='#fff'
                        />
                        <YAxis
                          stroke='#fff'
                          scale='log'
                          domain={['auto', 'auto']}
                          tickFormatter={(value) => formatTime(value)}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1E1E1E',
                            border: '1px solid #333',
                            color: '#fff',
                          }}
                          formatter={(value: any, name: string, props: any) => {
                            const item = props.payload;
                            if (item.formattedA && name === 'grupoA') {
                              return [item.formattedA, 'Grupo A'];
                            }
                            if (item.formattedB && name === 'grupoB') {
                              return [item.formattedB, 'Grupo B'];
                            }
                            return [formatTime(value), name];
                          }}
                        />
                        <Legend
                          formatter={(value) => (value === 'grupoA' ? 'Grupo A' : 'Grupo B')}
                        />
                        <Bar dataKey='grupoA' name='grupoA' fill='#9575cd' minPointSize={5} />
                        <Bar dataKey='grupoB' name='grupoB' fill='#ef5350' minPointSize={5} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#1E1E1E', color: '#fff' }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom color='primary'>
                    Outras Métricas
                  </Typography>
                  <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={metricsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray='3 3' stroke='#333' />
                        <XAxis
                          dataKey='name'
                          angle={-45}
                          textAnchor='end'
                          height={100}
                          stroke='#fff'
                        />
                        <YAxis stroke='#fff' tickFormatter={(value) => value.toFixed(1)} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1E1E1E',
                            border: '1px solid #333',
                            color: '#fff',
                          }}
                          formatter={(value: number) => value.toFixed(2)}
                        />
                        <Legend />
                        <Bar dataKey='grupoA' name='Grupo A' fill='#9575cd' />
                        <Bar dataKey='grupoB' name='Grupo B' fill='#ef5350' />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#1E1E1E', color: '#fff' }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom color='primary'>
                    Desempenho por Tempo
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#2C2C2C', color: '#fff' }}>
                        <Typography variant='subtitle1' color='primary'>
                          Grupo A
                        </Typography>
                        <Typography variant='body1'>
                          Mais rápido:{' '}
                          {analytics.groupA?.fastest
                            ? `${analytics.groupA.fastest.name} (${formatTime(analytics.groupA.fastest.time)})`
                            : 'N/A'}
                        </Typography>
                        <Typography variant='body1'>
                          Mais lento:{' '}
                          {analytics.groupA?.slowest
                            ? `${analytics.groupA.slowest.name} (${formatTime(analytics.groupA.slowest.time)})`
                            : 'N/A'}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#2C2C2C', color: '#fff' }}>
                        <Typography variant='subtitle1' color='primary'>
                          Grupo B
                        </Typography>
                        <Typography variant='body1'>
                          Mais rápido:{' '}
                          {analytics.groupB?.fastest
                            ? `${analytics.groupB.fastest.name} (${formatTime(analytics.groupB.fastest.time)})`
                            : 'N/A'}
                        </Typography>
                        <Typography variant='body1'>
                          Mais lento:{' '}
                          {analytics.groupB?.slowest
                            ? `${analytics.groupB.slowest.name} (${formatTime(analytics.groupB.slowest.time)})`
                            : 'N/A'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#1E1E1E', color: '#fff' }}>
                <CardContent>
                  <Typography variant='h6' gutterBottom color='primary'>
                    Total de Usuários
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#2C2C2C', color: '#fff' }}>
                        <Typography variant='subtitle1' color='primary'>
                          Grupo A
                        </Typography>
                        <Typography variant='h4'>{analytics.groupA.totalUsers}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: '#2C2C2C', color: '#fff' }}>
                        <Typography variant='subtitle1' color='primary'>
                          Grupo B
                        </Typography>
                        <Typography variant='h4'>{analytics.groupB?.totalUsers || 0}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AnalyticsDashboard;
