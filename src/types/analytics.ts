export interface UserSpeed {
  name: string;
  time: number;
}

export interface GroupAnalytics {
  averageSubmissions: number;
  averageSchemaEdits: number;
  averageUiSchemaEdits: number;
  averageTimeSpent: number;
  medianTimeSpent: number;
  averageErrorCount: number;
  averageFirstAttemptTime: number;
  totalUsers: number;
  codeResets: number;
  fastest?: UserSpeed;
  slowest?: UserSpeed;
}

export interface ChartData {
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

export interface AnalyticsResponse {
  analytics: {
    groupA: GroupAnalytics | null;
    groupB: GroupAnalytics | null;
    comparison: {
      submissions: number | null;
      edits: number | null;
      timeEfficiency: number | null;
      errorRate: number | null;
      resets: number | null;
    };
  };
  chartData: ChartData;
}
