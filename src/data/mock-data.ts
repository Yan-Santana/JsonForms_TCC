import { AnalyticsResponse } from '@/types/analytics';

export const fetchAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await fetch('/api/analytics');
  if (!response.ok) {
    throw new Error('Erro ao buscar dados de análise');
  }
  return response.json();
};

export const submissionsData = [
  { name: 'Submissões Válidas', grupoA: 120, grupoB: 105 },
  { name: 'Submissões Inválidas', grupoA: 15, grupoB: 25 },
];

export const editsData = [
  { name: 'Edições de Schema', grupoA: 45, grupoB: 65 },
  { name: 'Edições de UI', grupoA: 30, grupoB: 50 },
];

export const completionTimeData = [
  { name: 'Tempo Médio', grupoA: 25, grupoB: 30 },
  { name: 'Tempo Máximo', grupoA: 45, grupoB: 60 },
];

export const errorsData = [
  { name: 'Erros de Validação', grupoA: 20, grupoB: 35 },
  { name: 'Erros de Sistema', grupoA: 5, grupoB: 10 },
];

export const firstAttemptData = [{ name: 'Primeira Tentativa', grupoA: 15, grupoB: 22 }];

export const timelineData = [
  { name: 'Semana 1', grupoA: 20, grupoB: 15 },
  { name: 'Semana 2', grupoA: 25, grupoB: 20 },
  { name: 'Semana 3', grupoA: 30, grupoB: 25 },
  { name: 'Semana 4', grupoA: 35, grupoB: 30 },
  { name: 'Semana 5', grupoA: 40, grupoB: 35 },
];

export const performanceData = [
  { subject: 'Eficiência', grupoA: 90, grupoB: 75, fullMark: 100 },
  { subject: 'Velocidade', grupoA: 85, grupoB: 70, fullMark: 100 },
  { subject: 'Qualidade', grupoA: 95, grupoB: 80, fullMark: 100 },
  { subject: 'Precisão', grupoA: 88, grupoB: 72, fullMark: 100 },
  { subject: 'Consistência', grupoA: 92, grupoB: 78, fullMark: 100 },
];

export const comparisonTable = [
  {
    metrica: 'Submissões Válidas',
    grupoA: '120',
    grupoB: '105',
    diferenca: '+14%',
    significancia: 'Alta',
  },
  {
    metrica: 'Edições de Schema',
    grupoA: '45',
    grupoB: '65',
    diferenca: '-31%',
    significancia: 'Média',
  },
  {
    metrica: 'Tempo até Conclusão',
    grupoA: '25 min',
    grupoB: '30 min',
    diferenca: '-17%',
    significancia: 'Alta',
  },
  {
    metrica: 'Erros',
    grupoA: '25',
    grupoB: '45',
    diferenca: '-35%',
    significancia: 'Alta',
  },
];
