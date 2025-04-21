import { Request, Response } from 'express';
import { Form } from '../models/Form.entity';
import { Submission } from '../models/Submission.entity';
import { User } from '../models/User.entity';
import { validate } from 'jsonschema';
import { AppDataSource } from '../config/database';

export const submitForm = async (req: Request, res: Response) => {
  try {
    const { user, formData } = req.body;

    // Verificar se o usuário existe
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { id: user.id } });

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Validar schema e uischema
    if (!formData.schema || typeof formData.schema !== 'object') {
      return res.status(400).json({ message: 'Schema inválido' });
    }

    if (!formData.uischema || typeof formData.uischema !== 'object') {
      return res.status(400).json({ message: 'UISchema inválido' });
    }

    // Validar os dados contra o schema
    const validation = validate(formData.data, formData.schema);
    if (!validation.valid) {
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: validation.errors.map((error: any) => error.stack),
      });
    }

    // Criar novo formulário
    const formRepository = AppDataSource.getRepository(Form);
    const newForm = formRepository.create({
      schema: formData.schema,
      uischema: formData.uischema,
      user: existingUser,
    });
    await formRepository.save(newForm);

    // Criar nova submissão
    const submissionRepository = AppDataSource.getRepository(Submission);
    const newSubmission = submissionRepository.create({
      data: formData.data,
      user: existingUser,
      form: newForm,
    });
    await submissionRepository.save(newSubmission);

    // Atualizar contadores do usuário
    existingUser.totalSubmissions += 1;
    await userRepository.save(existingUser);

    return res.status(200).json({
      message: 'Formulário submetido com sucesso',
      formId: newForm.id,
      submissionId: newSubmission.id,
    });
  } catch (error) {
    console.error('Erro ao submeter formulário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
