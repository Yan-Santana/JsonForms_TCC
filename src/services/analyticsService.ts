import { AnalyticsResponse } from '@/types/analytics';

export const fetchAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await fetch('/api/analytics');
  if (!response.ok) {
    throw new Error('Erro ao buscar dados de análise');
  }
  return response.json();
}; 