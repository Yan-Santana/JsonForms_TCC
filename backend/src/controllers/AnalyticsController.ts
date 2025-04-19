import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';

export class AnalyticsController {
  private analyticsService = new AnalyticsService();

  async getGroupAnalytics(req: Request, res: Response) {
    try {
      const analytics = await this.analyticsService.getGroupAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter análise dos grupos' });
    }
  }
}
