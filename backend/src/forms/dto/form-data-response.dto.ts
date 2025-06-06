import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class FormDataResponseDto {
    @IsNotEmpty({ message: 'O ID do formulário é obrigatório' })
    id: number;

    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    formName: string;

    @IsObject()
    @IsNotEmpty()
    data: Record<string, any>;

    @IsString()
    @IsNotEmpty()
    schema: string;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    updatedAt: Date;
} 