import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';
import { UserGroup } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Arthur Pé Tenaz' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'usuario@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserGroup, example: UserGroup.GROUP_A })
  @IsEnum(UserGroup)
  groupId: UserGroup;
} 