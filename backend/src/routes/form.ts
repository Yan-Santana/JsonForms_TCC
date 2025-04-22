import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth';
import { AppDataSource } from '../config/database';
import { Form } from '../models/Form.entity';
import { User } from '../models/User.entity';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Formulários
 *   description: Endpoints para gerenciamento de formulários
 */

/**
 * @swagger
 * /api/form/submit:
 *   post:
 *     summary: Submete um formulário
 *     tags: [Formulários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - formData
 *             properties:
 *               userId:
 *                 type: number
 *               formData:
 *                 type: object
 *                 properties:
 *                   schema:
 *                     type: object
 *                   uischema:
 *                     type: object
 *                   data:
 *                     type: object
 *     responses:
 *       200:
 *         description: Formulário submetido com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/submit', async (req, res) => {
  try {
    const { userId, formData, metrics } = req.body;

    if (!formData?.schema || !formData?.uischema) {
      return res.status(400).json({
        success: false,
        message: 'Schema e UISchema são obrigatórios',
      });
    }

    // Buscar o usuário
    const userRepository = AppDataSource.getRepository(User);
    const formRepository = AppDataSource.getRepository(Form);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Atualizar métricas do usuário
    user.totalSubmissions += 1;
    user.totalTimeSpent = (user.totalTimeSpent || 0) + (metrics.totalTimeSpent || 0);

    // Só atualizar firstAttemptTime se ainda não tiver sido definido
    if (metrics.firstAttemptTime && !user.firstAttemptTime) {
      user.firstAttemptTime = metrics.firstAttemptTime;
    }

    // Atualizar contadores de edição
    const previousForm = await formRepository.findOne({
      where: { user: { id: userId }, title: formData.name },
    });

    if (previousForm) {
      // Se houver uma versão anterior, comparar para contar edições
      if (JSON.stringify(previousForm.schema) !== JSON.stringify(formData.schema)) {
        user.schemaEdits += 1;
      }
      if (JSON.stringify(previousForm.uischema) !== JSON.stringify(formData.uischema)) {
        user.uiSchemaEdits += 1;
      }
    }

    await userRepository.save(user);

    const newForm = formRepository.create({
      title: formData.name || formData.schema.title || 'Formulário sem título',
      schema: formData.schema,
      uischema: formData.uischema,
      user: user,
    });

    const savedForm = await formRepository.save(newForm);

    const formWithUserId = await formRepository.findOne({
      where: { id: savedForm.id },
      relations: ['user'],
      select: {
        user: {
          id: true,
        },
        id: true,
        title: true,
        schema: true,
        uischema: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Formulário enviado com sucesso',
      data: formWithUserId,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({
      success: false,
      message: 'Erro ao processar o formulário',
      error: errorMessage,
    });
  }
});

/**
 * @swagger
 * /api/form/error:
 *   post:
 *     summary: Registra um erro de formulário
 *     tags: [Form]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - errorType
 *               - formName
 *             properties:
 *               userId:
 *                 type: number
 *               errorType:
 *                 type: string
 *               formName:
 *                 type: string
 *               timestamp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Erro registrado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/error', authenticateToken, async (req, res) => {
  try {
    const { userId, errorType } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Incrementar o contador de erros
    user.errorCount += 1;
    await userRepository.save(user);

    res.json({ message: 'Erro registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar erro:', error);
    res.status(500).json({ message: 'Erro ao registrar erro' });
  }
});

export default router;
