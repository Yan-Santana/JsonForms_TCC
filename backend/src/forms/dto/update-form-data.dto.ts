import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDataDto } from './create-form-data.dto';

export class UpdateFormDataDto extends PartialType(CreateFormDataDto) {} 