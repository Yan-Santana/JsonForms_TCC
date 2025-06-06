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

    const [groupAChartData, groupBChartData] = await Promise.all([
      this.analyticsService.getChartData('Grupo A'),
      this.analyticsService.getChartData('Grupo B'),
    ]);

    // Calcular diferenças percentuais
    const calculatePercentageDiff = (a: number, b: number) => {
      if (b === 0) return 0;
      return (a - b) / b;
    };

    const firstAttemptComparison = calculatePercentageDiff(
      groupAAnalytics.averageFirstAttemptTime / 60000,
      groupBAnalytics.averageFirstAttemptTime / 60000,
    );

    const resetsComparison = calculatePercentageDiff(
      groupAAnalytics.codeResets,
      groupBAnalytics.codeResets,
    );

    return {
      analytics: {
        groupA: groupAAnalytics,
        groupB: groupBAnalytics,
        comparison: {
          submissions: calculatePercentageDiff(
            groupAAnalytics.averageSubmissions,
            groupBAnalytics.averageSubmissions,
          ),
          timeEfficiency: calculatePercentageDiff(
            groupAAnalytics.averageTimeSpent,
            groupBAnalytics.averageTimeSpent,
          ),
          errorRate: calculatePercentageDiff(
            groupAAnalytics.averageErrorCount,
            groupBAnalytics.averageErrorCount,
          ),
          firstAttempt: firstAttemptComparison,
          resets: resetsComparison,
        },
      },
      chartData: {
        submissionsData: [
          {
            name: 'Total',
            grupoA: groupAChartData.submissionsData[0]?.grupoA || 0,
            grupoB: groupBChartData.submissionsData[0]?.grupoB || 0,
          },
        ],
        editsData: [
          {
            name: 'Schema',
            grupoA: groupAChartData.editsData[0]?.grupoA || 0,
            grupoB: groupBChartData.editsData[0]?.grupoB || 0,
          },
        ],
        completionTimeData: [
          {
            name: 'Média',
            grupoA: groupAAnalytics.averageTimeSpent,
            grupoB: groupBAnalytics.averageTimeSpent,
            grupoAFormatted: this.analyticsService.formatTime(groupAAnalytics.averageTimeSpent),
            grupoBFormatted: this.analyticsService.formatTime(groupBAnalytics.averageTimeSpent),
          },
        ],
        errorsData: [
          {
            name: 'Total',
            grupoA: groupAChartData.errorsData[0]?.grupoA || 0,
            grupoB: groupBChartData.errorsData[0]?.grupoB || 0,
          },
        ],
        performanceData: groupAChartData.performanceData,
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
            grupoA: this.analyticsService.formatTime(groupAAnalytics.averageFirstAttemptTime),
            grupoB: this.analyticsService.formatTime(groupBAnalytics.averageFirstAttemptTime),
            diferenca: `${Math.round(firstAttemptComparison * 100)}%`,
            significancia: 'p < 0.05',
          },
        ],
        firstAttemptTime: {
          grupoA: this.analyticsService.formatTime(groupAAnalytics.averageFirstAttemptTime),
          grupoB: this.analyticsService.formatTime(groupBAnalytics.averageFirstAttemptTime),
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
  async registerAttempt(@Body() body: { userId: number; timestamp: string }): Promise<void> {
    return this.analyticsService.registerAttempt(body.userId, body.timestamp);
  }
}
