import { AppDataSource } from '../config/database';
import { User } from '../models/User.entity';

interface UserSpeed {
  name: string;
  time: number;
}

interface GroupAnalytics {
  averageSubmissions: number;
  averageSchemaEdits: number;
  averageUiSchemaEdits: number;
  averageTimeSpent: number;
  medianTimeSpent: number;
  averageErrorCount: number;
  averageFormErrors: number;
  averageFirstAttemptTime: number;
  totalUsers: number;
  fastest: UserSpeed | null;
  slowest: UserSpeed | null;
}

interface ChartData {
  submissionsData: Array<{
    name: string;
    grupoA: number;
    grupoB: number;
  }>;
  editsData: Array<{
    name: string;
    grupoA: number;
    grupoB: number;
  }>;
  completionTimeData: Array<{
    name: string;
    grupoA: number;
    grupoB: number;
    grupoAFormatted: string;
    grupoBFormatted: string;
  }>;
  errorsData: Array<{
    name: string;
    grupoA: number;
    grupoB: number;
  }>;
  performanceData: Array<{
    subject: string;
    grupoA: number;
    grupoB: number;
    fullMark: number;
  }>;
  comparisonTable: Array<{
    metrica: string;
    grupoA: string;
    grupoB: string;
    diferenca: string;
    significancia: string;
  }>;
  firstAttemptTime: {
    grupoA: string;
    grupoB: string;
  };
  totalUsers: {
    grupoA: number;
    grupoB: number;
  };
}

export class AnalyticsService {
  private userRepository = AppDataSource.getRepository(User);

  private formatTime(milliseconds: number): string {
    if (!milliseconds) return '0:00';

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private calculateMedian(numbers: number[]): number {
    const sorted = numbers.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }

  private calculateAverages = (group: User[]) => {
    if (group.length === 0) return null;

    const usersWithAttempts = group.filter((user) => user.firstAttemptTime > 0);
    const sortedBySpeed = [...usersWithAttempts].sort(
      (a, b) => Number(a.firstAttemptTime) - Number(b.firstAttemptTime),
    );

    const fastest: UserSpeed | null =
      sortedBySpeed.length > 0
        ? {
            name: sortedBySpeed[0].name,
            time: Number(sortedBySpeed[0].firstAttemptTime),
          }
        : null;

    const slowest: UserSpeed | null =
      sortedBySpeed.length > 0
        ? {
            name: sortedBySpeed[sortedBySpeed.length - 1].name,
            time: Number(sortedBySpeed[sortedBySpeed.length - 1].firstAttemptTime),
          }
        : null;

    const timeSpentValues = group.map((user) => Number(user.totalTimeSpent));
    const medianTimeSpent = this.calculateMedian(timeSpentValues);

    const averageTimeSpent =
      group.reduce((sum, user) => sum + Number(user.totalTimeSpent), 0) / group.length;

    return {
      averageSubmissions:
        group.reduce((sum, user) => sum + user.totalSubmissions, 0) / group.length,
      averageSchemaEdits: group.reduce((sum, user) => sum + user.schemaEdits, 0) / group.length,
      averageUiSchemaEdits: group.reduce((sum, user) => sum + user.uiSchemaEdits, 0) / group.length,
      averageTimeSpent,
      medianTimeSpent,
      averageErrorCount:
        group.reduce((sum, user) => sum + (user.codeErrors || 0), 0) / group.length,
      averageFormErrors:
        group.reduce((sum, user) => sum + (user.formErrors || 0), 0) / group.length,
      averageFirstAttemptTime:
        group.reduce((sum, user) => sum + Number(user.firstAttemptTime || 0), 0) / group.length,
      totalUsers: group.length,
      fastest,
      slowest,
    };
  };

  async getGroupAnalytics() {
    const users = await this.userRepository.find();

    const groupA = users.filter((user) => user.group === 'Grupo A');
    const groupB = users.filter((user) => user.group === 'Grupo B');

    const groupAAnalytics = this.calculateAverages(groupA);
    const groupBAnalytics = this.calculateAverages(groupB);

    const comparison = {
      submissions:
        groupAAnalytics && groupBAnalytics
          ? groupAAnalytics.averageSubmissions / groupBAnalytics.averageSubmissions
          : null,
      timeEfficiency:
        groupAAnalytics && groupBAnalytics
          ? groupBAnalytics.averageTimeSpent / groupAAnalytics.averageTimeSpent
          : null,
      errorRate:
        groupAAnalytics && groupBAnalytics
          ? groupBAnalytics.averageErrorCount / groupAAnalytics.averageErrorCount || 1
          : null,
    };

    const chartData: ChartData = {
      submissionsData: [
        {
          name: 'Submissões Válidas',
          grupoA: Math.round(groupAAnalytics?.averageSubmissions || 0),
          grupoB: Math.round(groupBAnalytics?.averageSubmissions || 0),
        },
      ],
      editsData: [
        {
          name: 'Edições de Schema',
          grupoA: Math.round(groupAAnalytics?.averageSchemaEdits || 0),
          grupoB: Math.round(groupBAnalytics?.averageSchemaEdits || 0),
        },
        {
          name: 'Edições de UI',
          grupoA: Math.round(groupAAnalytics?.averageUiSchemaEdits || 0),
          grupoB: Math.round(groupBAnalytics?.averageUiSchemaEdits || 0),
        },
      ],
      completionTimeData: [
        {
          name: 'Média',
          grupoA: Math.round(groupAAnalytics?.averageTimeSpent || 0),
          grupoB: Math.round(groupBAnalytics?.averageTimeSpent || 0),
          grupoAFormatted: this.formatTime(groupAAnalytics?.averageTimeSpent || 0),
          grupoBFormatted: this.formatTime(groupBAnalytics?.averageTimeSpent || 0),
        },
        {
          name: 'Mediana',
          grupoA: Math.round(groupAAnalytics?.medianTimeSpent || 0),
          grupoB: Math.round(groupBAnalytics?.medianTimeSpent || 0),
          grupoAFormatted: this.formatTime(groupAAnalytics?.medianTimeSpent || 0),
          grupoBFormatted: this.formatTime(groupBAnalytics?.medianTimeSpent || 0),
        },
        {
          name: 'Mínimo',
          grupoA: Math.round(groupAAnalytics?.fastest?.time || 0),
          grupoB: Math.round(groupBAnalytics?.fastest?.time || 0),
          grupoAFormatted: this.formatTime(groupAAnalytics?.fastest?.time || 0),
          grupoBFormatted: this.formatTime(groupBAnalytics?.fastest?.time || 0),
        },
        {
          name: 'Máximo',
          grupoA: Math.round(groupAAnalytics?.slowest?.time || 0),
          grupoB: Math.round(groupBAnalytics?.slowest?.time || 0),
          grupoAFormatted: this.formatTime(groupAAnalytics?.slowest?.time || 0),
          grupoBFormatted: this.formatTime(groupBAnalytics?.slowest?.time || 0),
        },
      ],
      errorsData: [
        {
          name: 'Erros de Código',
          grupoA: Math.round(groupAAnalytics?.averageErrorCount || 0),
          grupoB: Math.round(groupBAnalytics?.averageErrorCount || 0),
        },
        {
          name: 'Formulários Inválidos',
          grupoA: Math.round(groupAAnalytics?.averageFormErrors || 0),
          grupoB: Math.round(groupBAnalytics?.averageFormErrors || 0),
        },
      ],
      performanceData: [
        {
          subject: 'Eficiência',
          grupoA: Math.round((comparison.submissions || 0) * 100),
          grupoB: Math.round((comparison.timeEfficiency || 0) * 100),
          fullMark: 100,
        },
        {
          subject: 'Velocidade',
          grupoA: Math.round((comparison.errorRate || 0) * 100),
          grupoB: Math.round((comparison.errorRate || 0) * 100),
          fullMark: 100,
        },
        {
          subject: 'Qualidade',
          grupoA: Math.round((comparison.errorRate || 0) * 100),
          grupoB: Math.round((comparison.errorRate || 0) * 100),
          fullMark: 100,
        },
        {
          subject: 'Precisão',
          grupoA: Math.round((comparison.submissions || 0) * 100),
          grupoB: Math.round((comparison.timeEfficiency || 0) * 100),
          fullMark: 100,
        },
        {
          subject: 'Consistência',
          grupoA: Math.round((comparison.errorRate || 0) * 100),
          grupoB: Math.round((comparison.errorRate || 0) * 100),
          fullMark: 100,
        },
      ],
      comparisonTable: [
        {
          metrica: 'Submissões Válidas',
          grupoA: Math.round(groupAAnalytics?.averageSubmissions || 0).toString(),
          grupoB: Math.round(groupBAnalytics?.averageSubmissions || 0).toString(),
          diferenca: `${Math.round((comparison.submissions || 0) * 100)}%`,
          significancia: 'Alta',
        },
        {
          metrica: 'Edições de Schema',
          grupoA: Math.round(groupAAnalytics?.averageSchemaEdits || 0).toString(),
          grupoB: Math.round(groupBAnalytics?.averageSchemaEdits || 0).toString(),
          diferenca: `${Math.round((comparison.timeEfficiency || 0) * 100)}%`,
          significancia: 'Média',
        },
        {
          metrica: 'Tempo até Conclusão',
          grupoA: this.formatTime(groupAAnalytics?.averageTimeSpent || 0),
          grupoB: this.formatTime(groupBAnalytics?.averageTimeSpent || 0),
          diferenca: `${Math.round((comparison.errorRate || 0) * 100)}%`,
          significancia: 'Alta',
        },
      ],
      firstAttemptTime: {
        grupoA: this.formatTime(groupAAnalytics?.averageFirstAttemptTime || 0),
        grupoB: this.formatTime(groupBAnalytics?.averageFirstAttemptTime || 0),
      },
      totalUsers: {
        grupoA: groupAAnalytics?.totalUsers || 0,
        grupoB: groupBAnalytics?.totalUsers || 0,
      },
    };

    return {
      analytics: {
        groupA: groupAAnalytics,
        groupB: groupBAnalytics,
        comparison,
      },
      chartData,
    };
  }
}
