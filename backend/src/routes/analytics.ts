import { Router } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';

const router = Router();
const analyticsService = new AnalyticsService();

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Retorna a análise comparativa dos grupos
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Dados de análise dos grupos
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', async (req, res) => {
  try {
    const analytics = await analyticsService.getGroupAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Erro ao buscar dados de análise:', error);
    res.status(500).json({ message: 'Erro ao buscar dados de análise' });
  }
});

export default router;
