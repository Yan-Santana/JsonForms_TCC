import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Form } from '../../forms/entities/form.entity';

@Entity('submissions')
export class Submission {
  @ApiProperty({ description: 'ID da submissão' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Dados da submissão em JSON' })
  @Column('jsonb')
  data: any;

  @ApiProperty({ description: 'Usuário que fez a submissão' })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ description: 'Formulário submetido' })
  @ManyToOne(() => Form)
  form: Form;

  @ApiProperty({ description: 'Data de criação da submissão' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização da submissão' })
  @UpdateDateColumn()
  updatedAt: Date;
} 