import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email do usuário', example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  @IsString()
  name: string;
} 