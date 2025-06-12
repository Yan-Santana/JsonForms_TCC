import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGroup } from '../users/entities/user.entity';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtém todos os dados de analytics' })
  @ApiResponse({ status: 200, description: 'Dados de analytics' })
  async getAllAnalytics() {
    const [groupAAnalytics, groupBAnalytics] = await Promise.all([
      this.analyticsService.getGroupAnalytics('Grupo A'),
      this.analyticsService.getGroupAnalytics('Grupo B'),
    ]);

    const [_groupAChartData, _groupBChartData] = await Promise.all([
      this.analyticsService.getChartData('Grupo A'),
      this.analyticsService.getChartData('Grupo B'),
    ]);

    // Calcular diferenças percentuais em relação à média dos dois grupos
    const calculatePercentageDiff = (a: number, b: number) => {
      const avg = (a + b) / 2;
      if (avg === 0) return 0;
      return (a - b) / avg;
    };

    const firstAttemptComparison = calculatePercentageDiff(
      groupAAnalytics.averageFirstAttemptTime / 60000,
      groupBAnalytics.averageFirstAttemptTime / 60000,
    );

    const resetsComparison = calculatePercentageDiff(
      groupAAnalytics.codeResets,
      groupBAnalytics.codeResets,
    );

    // Cálculo das métricas de performance para o radar
    const maxSubmissions = Math.max(
      groupAAnalytics.totalSubmissions,
      groupBAnalytics.totalSubmissions,
      1,
    );
    const maxTime = Math.max(groupAAnalytics.totalTimeSpent, groupBAnalytics.totalTimeSpent, 1);
    const maxErrors = Math.max(groupAAnalytics.totalErrorCount, groupBAnalytics.totalErrorCount, 1);
    const maxResets = Math.max(groupAAnalytics.codeResets, groupBAnalytics.codeResets, 1);
    const maxUsers = Math.max(groupAAnalytics.totalUsers, groupBAnalytics.totalUsers, 1);

    const performanceData = [
      {
        subject: 'Eficiência',
        grupoA: Math.round((groupAAnalytics.totalSubmissions / maxSubmissions) * 100),
        grupoB: Math.round((groupBAnalytics.totalSubmissions / maxSubmissions) * 100),
        fullMark: 100,
      },
      {
        subject: 'Velocidade',
        grupoA: Math.round((1 - groupAAnalytics.totalTimeSpent / maxTime) * 100),
        grupoB: Math.round((1 - groupBAnalytics.totalTimeSpent / maxTime) * 100),
        fullMark: 100,
      },
      {
        subject: 'Qualidade',
        grupoA: Math.round((1 - groupAAnalytics.totalErrorCount / maxErrors) * 100),
        grupoB: Math.round((1 - groupBAnalytics.totalErrorCount / maxErrors) * 100),
        fullMark: 100,
      },
      {
        subject: 'Precisão',
        grupoA: Math.round((1 - groupAAnalytics.codeResets / maxResets) * 100),
        grupoB: Math.round((1 - groupBAnalytics.codeResets / maxResets) * 100),
        fullMark: 100,
      },
      {
        subject: 'Consistência',
        grupoA: Math.round((groupAAnalytics.totalUsers / maxUsers) * 100),
        grupoB: Math.round((groupBAnalytics.totalUsers / maxUsers) * 100),
        fullMark: 100,
      },
    ];

    // Função de CDF normal padrão
    function erf(x: number): number {
      // aproximação de Abramowitz e Stegun
      const sign = x >= 0 ? 1 : -1;
      x = Math.abs(x);
      const a1 = 0.254829592;
      const a2 = -0.284496736;
      const a3 = 1.421413741;
      const a4 = -1.453152027;
      const a5 = 1.061405429;
      const p = 0.3275911;
      const t = 1 / (1 + p * x);
      const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return sign * y;
    }
    function normalCdf(z: number): number {
      return (1.0 + erf(z / Math.sqrt(2))) / 2.0;
    }

    // Função simples de Mann-Whitney U
    function mannWhitneyUTest(a: number[], b: number[]): number {
      const all = [...a.map((v) => ({ v, g: 'a' })), ...b.map((v) => ({ v, g: 'b' }))].sort(
        (x, y) => x.v - y.v,
      );
      let rank = 1;
      let last = null;
      let sumRanksA = 0;
      let countA = 0;
      for (const item of all) {
        if (last !== null && item.v !== last) rank++;
        if (item.g === 'a') {
          sumRanksA += rank;
          countA++;
        }
        last = item.v;
      }
      const U1 = sumRanksA - (countA * (countA + 1)) / 2;
      const n1 = a.length;
      const n2 = b.length;
      const mu = (n1 * n2) / 2;
      const sigma = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
      const z = (U1 - mu) / sigma;
      const p = 2 * (1 - normalCdf(Math.abs(z)));
      return p;
    }

    // Coletar dados dos usuários dos dois grupos para os testes
    const usersA = await this.analyticsService.getUsersByGroup('Grupo A');
    const usersB = await this.analyticsService.getUsersByGroup('Grupo B');

    // Resets de código
    const resetsA = usersA.map((u) => u.codeResets || 0);
    const resetsB = usersB.map((u) => u.codeResets || 0);
    const pResets = mannWhitneyUTest(resetsA, resetsB);
    const significanciaResets = pResets < 0.05 ? 'p < 0.05' : 'n.s.';

    // Primeira tentativa (em ms)
    const firstA = usersA.map((u) => u.firstAttemptTime || 0).filter((x) => x > 0);
    const firstB = usersB.map((u) => u.firstAttemptTime || 0).filter((x) => x > 0);
    const pFirst = firstA.length > 1 && firstB.length > 1 ? mannWhitneyUTest(firstA, firstB) : 1;
    const significanciaFirst = pFirst < 0.05 ? 'p < 0.05' : 'n.s.';

    return {
      analytics: {
        groupA: groupAAnalytics,
        groupB: groupBAnalytics,
        comparison: {
          submissions: calculatePercentageDiff(
            groupAAnalytics.totalSubmissions,
            groupBAnalytics.totalSubmissions,
          ),
          edits: calculatePercentageDiff(
            groupAAnalytics.totalSchemaEdits,
            groupBAnalytics.totalSchemaEdits,
          ),
          timeEfficiency: calculatePercentageDiff(
            groupAAnalytics.totalTimeSpent,
            groupBAnalytics.totalTimeSpent,
          ),
          errorRate: calculatePercentageDiff(
            groupAAnalytics.totalErrorCount,
            groupBAnalytics.totalErrorCount,
          ),
          firstAttempt: firstAttemptComparison,
          resets: resetsComparison,
        },
      },
      chartData: {
        submissionsData: [
          {
            name: 'Total',
            grupoA: groupAAnalytics.totalSubmissions,
            grupoB: groupBAnalytics.totalSubmissions,
          },
        ],
        editsData: [
          {
            name: 'Schema',
            grupoA: groupAAnalytics.totalSchemaEdits,
            grupoB: groupBAnalytics.totalSchemaEdits,
          },
        ],
        completionTimeData: [
          {
            name: 'Média',
            grupoA: groupAAnalytics.totalTimeSpent,
            grupoB: groupBAnalytics.totalTimeSpent,
            grupoAFormatted: this.analyticsService.formatTime(groupAAnalytics.totalTimeSpent),
            grupoBFormatted: this.analyticsService.formatTime(groupBAnalytics.totalTimeSpent),
          },
        ],
        errorsData: [
          {
            name: 'Total',
            grupoA: groupAAnalytics.totalErrorCount,
            grupoB: groupBAnalytics.totalErrorCount,
          },
        ],
        performanceData: performanceData,
        comparisonTable: [
          {
            metrica: 'Resets de Código',
            grupoA: `${groupAAnalytics.codeResets}`,
            grupoB: `${groupBAnalytics.codeResets}`,
            diferenca: `${Math.round(resetsComparison * 100)}%`,
            significancia: significanciaResets,
          },
          {
            metrica: 'Primeira Tentativa',
            grupoA: this.analyticsService.formatTime(
              Math.round(groupAAnalytics.averageFirstAttemptTime),
            ),
            grupoB: this.analyticsService.formatTime(
              Math.round(groupBAnalytics.averageFirstAttemptTime),
            ),
            diferenca: `${Math.round(firstAttemptComparison * 100)}%`,
            significancia: significanciaFirst,
          },
        ],
        firstAttemptTime: {
          grupoA: this.analyticsService.formatTime(
            Math.round(groupAAnalytics.averageFirstAttemptTime),
          ),
          grupoB: this.analyticsService.formatTime(
            Math.round(groupBAnalytics.averageFirstAttemptTime),
          ),
        },
        totalUsers: {
          grupoA: groupAAnalytics.totalUsers,
          grupoB: groupBAnalytics.totalUsers,
        },
      },
    };
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: 'Obtém analytics de um grupo' })
  @ApiResponse({ status: 200, description: 'Analytics do grupo' })
  getGroupAnalytics(@Param('groupId') groupId: string) {
    return this.analyticsService.getGroupAnalytics(groupId as UserGroup);
  }

  @Get('chart/:groupId')
  @ApiOperation({ summary: 'Obtém dados para gráficos de um grupo' })
  @ApiResponse({ status: 200, description: 'Dados para gráficos' })
  getChartData(@Param('groupId') groupId: string) {
    return this.analyticsService.getChartData(groupId as UserGroup);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Registra um reset de código' })
  @ApiResponse({ status: 200, description: 'Reset registrado com sucesso' })
  async registerReset(@Body() body: { userId: number; timestamp: string }) {
    return this.analyticsService.registerReset(body.userId);
  }

  @Post('error')
  @ApiOperation({ summary: 'Registra um erro' })
  @ApiResponse({ status: 200, description: 'Erro registrado com sucesso' })
  async registerError(@Body() body: { userId: number; errorType: string; timestamp: string }) {
    return this.analyticsService.registerError(body.userId, body.errorType);
  }

  @Post('attempt')
  @ApiOperation({ summary: 'Registra o tempo da primeira tentativa' })
  @ApiResponse({ status: 200, description: 'Primeira tentativa registrada com sucesso' })
  async registerAttempt(@Body() body: { userId: number; elapsed: number }): Promise<void> {
    return this.analyticsService.registerAttempt(body.userId, body.elapsed);
  }
}
