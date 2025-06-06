import { IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';

export class CreateFormDataDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty({ message: 'O nome do formulário é obrigatório' })
  formName: string;

  @IsObject()
  @IsNotEmpty({ message: 'Os dados do formulário são obrigatórios' })
  data: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  schema: string;
} 