import { Router } from 'express';
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
    const { userId, formData } = req.body;

    if (!formData?.schema || !formData?.uischema) {
      return res.status(400).json({
        success: false,
        message: 'Schema e UISchema são obrigatórios',
      });
    }

    // Buscar o usuário
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    const formRepository = AppDataSource.getRepository(Form);

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

export default router;
