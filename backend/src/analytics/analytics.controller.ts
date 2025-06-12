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
            significancia: 'p < 0.05',
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
            significancia: 'p < 0.05',
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
