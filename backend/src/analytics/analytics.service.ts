import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserGroup } from '../users/entities/user.entity';

interface UserSpeed {
  name: string;
  time: number;
}

interface GroupAnalytics {
  totalSubmissions: number;
  totalSchemaEdits: number;
  totalUiSchemaEdits: number;
  totalTimeSpent: number;
  medianTimeSpent: number;
  totalErrorCount: number;
  totalFormErrors: number;
  averageFirstAttemptTime: number;
  totalUsers: number;
  codeResets: number;
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

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  formatTime(milliseconds: number): string {
    if (!milliseconds) return '0:00';

    // Converter milissegundos para segundos
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calcular minutos e segundos
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Formatar com dois dígitos para segundos
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

  async getGroupAnalytics(groupId: string): Promise<GroupAnalytics> {
    const users = await this.userRepository.find({ where: { groupId: groupId as UserGroup } });

    if (users.length === 0) {
      return {
        totalSubmissions: 0,
        totalSchemaEdits: 0,
        totalUiSchemaEdits: 0,
        totalTimeSpent: 0,
        medianTimeSpent: 0,
        totalErrorCount: 0,
        totalFormErrors: 0,
        averageFirstAttemptTime: 0,
        totalUsers: 0,
        codeResets: 0,
        fastest: null,
        slowest: null,
      };
    }

    const usersWithAttempts = users.filter((user) => user.firstAttemptTime > 0);
    const sortedBySpeed = [...usersWithAttempts].sort(
      (a, b) => Number(a.firstAttemptTime) - Number(b.firstAttemptTime),
    );

    const timeSpentValues = users
      .map((user) => Number(user.totalTimeSpent || 0))
      .filter((time) => time > 0);
    const medianTimeSpent = this.calculateMedian(timeSpentValues);

    // Calcular a média do tempo da primeira tentativa em milissegundos
    const firstAttemptValues = usersWithAttempts
      .map((user) => Number(user.firstAttemptTime || 0))
      .filter((time) => time > 0);

    const averageFirstAttemptTime =
      firstAttemptValues.length > 0
        ? firstAttemptValues.reduce((sum, time) => sum + time, 0) / firstAttemptValues.length
        : 0;

    return {
      totalSubmissions: users.reduce((sum, user) => sum + (user.totalSubmissions || 0), 0),
      totalSchemaEdits: users.reduce((sum, user) => sum + (user.schemaEdits || 0), 0),
      totalUiSchemaEdits: users.reduce((sum, user) => sum + (user.uiSchemaEdits || 0), 0),
      totalTimeSpent:
        timeSpentValues.length > 0 ? timeSpentValues.reduce((sum, time) => sum + time, 0) : 0,
      medianTimeSpent,
      totalErrorCount: users.reduce((sum, user) => sum + (user.errorCount || 0), 0),
      totalFormErrors: users.reduce((sum, user) => sum + (user.formErrors || 0), 0),
      averageFirstAttemptTime,
      totalUsers: users.length,
      codeResets: users.reduce((sum, user) => sum + (user.codeResets || 0), 0),
      fastest: sortedBySpeed[0]
        ? {
            name: sortedBySpeed[0].name,
            time: Date.now() - Number(sortedBySpeed[0].firstAttemptTime),
          }
        : null,
      slowest: sortedBySpeed[sortedBySpeed.length - 1]
        ? {
            name: sortedBySpeed[sortedBySpeed.length - 1].name,
            time: Date.now() - Number(sortedBySpeed[sortedBySpeed.length - 1].firstAttemptTime),
          }
        : null,
    };
  }

  async getChartData(groupId: string): Promise<ChartData> {
    const users = await this.userRepository.find({ where: { groupId: groupId as UserGroup } });

    const submissionsData = [
      {
        name: 'Submissões Válidas',
        grupoA: users.reduce((sum, user) => sum + (user.totalSubmissions || 0), 0),
        grupoB: 0, // Será preenchido no controller
      },
    ];

    const editsData = [
      {
        name: 'Edições de Schema',
        grupoA: users.reduce((sum, user) => sum + (user.schemaEdits || 0), 0),
        grupoB: 0,
      },
      {
        name: 'Edições de UI',
        grupoA: users.reduce((sum, user) => sum + (user.uiSchemaEdits || 0), 0),
        grupoB: 0,
      },
    ];

    const timeSpentValues = users
      .map((user) => Number(user.totalTimeSpent || 0))
      .filter((time) => time > 0);
    const medianTimeSpent = this.calculateMedian(timeSpentValues);
    const averageTimeSpent =
      timeSpentValues.length > 0
        ? timeSpentValues.reduce((sum, time) => sum + time, 0) / timeSpentValues.length
        : 0;

    const usersWithAttempts = users.filter((user) => user.firstAttemptTime > 0);
    const sortedBySpeed = [...usersWithAttempts].sort(
      (a, b) => Number(a.firstAttemptTime) - Number(b.firstAttemptTime),
    );

    const completionTimeData = [
      {
        name: 'Média',
        grupoA: Math.round(averageTimeSpent),
        grupoB: 0,
        grupoAFormatted: this.formatTime(averageTimeSpent),
        grupoBFormatted: '0:00',
      },
      {
        name: 'Mediana',
        grupoA: Math.round(medianTimeSpent),
        grupoB: 0,
        grupoAFormatted: this.formatTime(medianTimeSpent),
        grupoBFormatted: '0:00',
      },
      {
        name: 'Mínimo',
        grupoA: sortedBySpeed[0] ? Math.round(Number(sortedBySpeed[0].firstAttemptTime)) : 0,
        grupoB: 0,
        grupoAFormatted: sortedBySpeed[0]
          ? this.formatTime(Date.now() - Number(sortedBySpeed[0].firstAttemptTime))
          : '0:00',
        grupoBFormatted: '0:00',
      },
      {
        name: 'Máximo',
        grupoA: sortedBySpeed[sortedBySpeed.length - 1]
          ? Math.round(Number(sortedBySpeed[sortedBySpeed.length - 1].firstAttemptTime))
          : 0,
        grupoB: 0,
        grupoAFormatted: sortedBySpeed[sortedBySpeed.length - 1]
          ? this.formatTime(
              Date.now() - Number(sortedBySpeed[sortedBySpeed.length - 1].firstAttemptTime),
            )
          : '0:00',
        grupoBFormatted: '0:00',
      },
    ];

    const errorsData = [
      {
        name: 'Erros de Código',
        grupoA: users.reduce((sum, user) => sum + (user.errorCount || 0), 0),
        grupoB: 0,
      },
      {
        name: 'Formulários Inválidos',
        grupoA: users.reduce((sum, user) => sum + (user.formErrors || 0), 0),
        grupoB: 0,
      },
    ];

    const performanceData = [
      {
        subject: 'Eficiência',
        grupoA: 0, // Será calculado no controller
        grupoB: 0,
        fullMark: 100,
      },
      {
        subject: 'Velocidade',
        grupoA: 0,
        grupoB: 0,
        fullMark: 100,
      },
      {
        subject: 'Qualidade',
        grupoA: 0,
        grupoB: 0,
        fullMark: 100,
      },
      {
        subject: 'Precisão',
        grupoA: 0,
        grupoB: 0,
        fullMark: 100,
      },
      {
        subject: 'Consistência',
        grupoA: 0,
        grupoB: 0,
        fullMark: 100,
      },
    ];

    const comparisonTable = [
      {
        metrica: 'Submissões Válidas',
        grupoA: Math.round(
          users.reduce((sum, user) => sum + (user.totalSubmissions || 0), 0) / users.length,
        ).toString(),
        grupoB: '0',
        diferenca: '0%',
        significancia: 'Alta',
      },
      {
        metrica: 'Edições de Schema',
        grupoA: Math.round(
          users.reduce((sum, user) => sum + (user.schemaEdits || 0), 0) / users.length,
        ).toString(),
        grupoB: '0',
        diferenca: '0%',
        significancia: 'Média',
      },
      {
        metrica: 'Tempo até Conclusão',
        grupoA: this.formatTime(
          users.reduce((sum, user) => sum + Number(user.totalTimeSpent || 0), 0) / users.length,
        ),
        grupoB: '0:00',
        diferenca: '0%',
        significancia: 'Alta',
      },
    ];

    return {
      submissionsData,
      editsData,
      completionTimeData,
      errorsData,
      performanceData,
      comparisonTable,
      firstAttemptTime: {
        grupoA: this.formatTime(
          usersWithAttempts.reduce((sum, user) => {
            const now = Date.now();
            const attempt = Number(user.firstAttemptTime || 0);
            return sum + (attempt > 0 ? now - attempt : 0);
          }, 0) / usersWithAttempts.length,
        ),
        grupoB: '0:00',
      },
      totalUsers: {
        grupoA: users.length,
        grupoB: 0,
      },
    };
  }

  async registerError(userId: number, type: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      if (type === 'form') {
        user.formErrors = (user.formErrors || 0) + 1;
      } else {
        user.errorCount = (user.errorCount || 0) + 1;
      }
      await this.userRepository.save(user);
    }
  }

  async registerReset(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.codeResets = (user.codeResets || 0) + 1;
      await this.userRepository.save(user);
    }
  }

  async registerAttempt(userId: number, elapsed: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.firstAttemptTime = elapsed; // sempre sobrescreve
      await this.userRepository.save(user);
    }
  }
}
