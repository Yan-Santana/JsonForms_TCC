import { Router } from 'express';
import { AppDataSource } from '../config/database';
import { Form } from '../entities/Form';

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
 *               - user
 *               - formData
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   group:
 *                     type: string
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
    const { user, formData } = req.body;
    console.log('Dados recebidos:', req.body);

    if (!formData?.schema || !formData?.uischema) {
      return res.status(400).json({
        success: false,
        message: 'Schema e UISchema são obrigatórios',
      });
    }

    const formRepository = AppDataSource.getRepository(Form);

    const newForm = formRepository.create({
      user,
      formData: {
        schema: formData.schema,
        uischema: formData.uischema,
        data: formData.data || {},
      },
    });

    const savedForm = await formRepository.save(newForm);

    // Buscar o formulário salvo para confirmar os dados
    const retrievedForm = await formRepository.findOne({ where: { id: savedForm.id } });

    res.status(201).json({
      success: true,
      message: 'Formulário enviado com sucesso',
      data: retrievedForm,
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
