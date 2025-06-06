import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FormSubmission } from './entities/form-submission.entity';

@Controller('forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(): Promise<FormSubmission[]> {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FormSubmission> {
    return this.formsService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<FormSubmission[]> {
    return this.formsService.findByUser(+userId);
  }

  @Post('submit')
  submitForm(@Body() formData: any): Promise<FormSubmission> {
    return this.formsService.submitForm(formData);
  }

  @Post('schema')
  updateSchema(@Body() schemaData: any): Promise<void> {
    return this.formsService.updateSchema(schemaData.userId, schemaData.formName, schemaData);
  }
}
