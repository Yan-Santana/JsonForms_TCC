import { AppDataSource } from '../config/database';
import { User } from '../models/User.entity';

export class AnalyticsService {
  private userRepository = AppDataSource.getRepository(User);

  async getGroupAnalytics() {
    const users = await this.userRepository.find();

    const groupA = users.filter((user) => user.group === 'Grupo A');
    const groupB = users.filter((user) => user.group === 'Grupo B');

    const calculateAverages = (group: User[]) => {
      if (group.length === 0) return null;

      return {
        averageSubmissions:
          group.reduce((sum, user) => sum + user.totalSubmissions, 0) / group.length,
        averageSchemaEdits: group.reduce((sum, user) => sum + user.schemaEdits, 0) / group.length,
        averageUiSchemaEdits:
          group.reduce((sum, user) => sum + user.uiSchemaEdits, 0) / group.length,
        averageTimeSpent: group.reduce((sum, user) => sum + user.totalTimeSpent, 0) / group.length,
        averageErrorCount: group.reduce((sum, user) => sum + user.errorCount, 0) / group.length,
        averageResetCount: group.reduce((sum, user) => sum + user.resetCount, 0) / group.length,
        averageFirstAttemptTime:
          group.reduce((sum, user) => sum + (user.firstAttemptTime || 0), 0) / group.length,
        totalUsers: group.length,
      };
    };

    const groupAAnalytics = calculateAverages(groupA);
    const groupBAnalytics = calculateAverages(groupB);

    return {
      groupA: groupAAnalytics,
      groupB: groupBAnalytics,
      comparison: {
        submissions:
          groupAAnalytics && groupBAnalytics
            ? groupAAnalytics.averageSubmissions / groupBAnalytics.averageSubmissions
            : null,
        timeEfficiency:
          groupAAnalytics && groupBAnalytics
            ? groupAAnalytics.averageSubmissions /
              (groupAAnalytics.averageTimeSpent / 60000) /
              (groupBAnalytics.averageSubmissions / (groupBAnalytics.averageTimeSpent / 60000))
            : null,
        errorRate:
          groupAAnalytics && groupBAnalytics
            ? groupAAnalytics.averageErrorCount /
              groupAAnalytics.averageSubmissions /
              (groupBAnalytics.averageErrorCount / groupBAnalytics.averageSubmissions)
            : null,
      },
    };
  }
}
