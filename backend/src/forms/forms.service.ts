import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormSubmission } from './entities/form-submission.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FormSubmission)
    private formSubmissionRepository: Repository<FormSubmission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<FormSubmission[]> {
    return this.formSubmissionRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<FormSubmission> {
    const submission = await this.formSubmissionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!submission) {
      throw new NotFoundException(`Submissão com ID ${id} não encontrada`);
    }
    return submission;
  }

  async findByUser(userId: number): Promise<FormSubmission[]> {
    return this.formSubmissionRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async submitForm(formData: any) {
    const submission = this.formSubmissionRepository.create({
      userId: formData.userId,
      formName: formData.formData.name,
      formData: formData.formData,
      schema: formData.schema,
      uiSchema: formData.uiSchema,
      totalTimeSpent: formData.metrics.totalTimeSpent,
      firstAttemptTime: formData.metrics.firstAttemptTime,
      errorCount: formData.metrics.errorCount || 0,
      codeResets: formData.metrics.codeResets || 0,
      errorDetails: formData.metrics.errorDetails,
      submittedAt: new Date(),
    });

    const user = await this.userRepository.findOne({ where: { id: formData.userId } });
    if (user) {
      user.totalSubmissions = (user.totalSubmissions || 0) + 1;
      user.totalTimeSpent = Math.max(user.totalTimeSpent || 0, formData.metrics.totalTimeSpent);
      user.errorCount = (user.errorCount || 0) + (formData.metrics.errorCount || 0);
      user.codeResets = (user.codeResets || 0) + (formData.metrics.codeResets || 0);
      await this.userRepository.save(user);
    }

    return this.formSubmissionRepository.save(submission);
  }

  async updateSchema(userId: number, formName: string, schemaData: any) {
    const submission = await this.formSubmissionRepository.findOne({
      where: { userId, formName },
    });

    if (submission) {
      submission.schema = schemaData.schema;
      submission.uiSchema = schemaData.uiSchema;
      await this.formSubmissionRepository.save(submission);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.schemaEdits = (user.schemaEdits || 0) + 1;
      await this.userRepository.save(user);
    }
  }
}
