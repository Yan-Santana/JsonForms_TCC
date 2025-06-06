import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('forms')
export class Form {
  @ApiProperty({ description: 'ID do formulário' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Título do formulário' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Descrição do formulário' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Schema do formulário em JSON' })
  @Column('jsonb')
  schema: any;

  @ApiProperty({ description: 'Dados do formulário em JSON' })
  @Column('jsonb', { nullable: true })
  data: any;

  @ApiProperty({ description: 'ID do usuário criador' })
  @Column()
  userId: number;

  @ApiProperty({ description: 'ID do grupo do formulário' })
  @Column()
  groupId: number;

  @ApiProperty({ description: 'Tempo gasto no formulário' })
  @Column({ type: 'bigint', default: 0 })
  time: number;

  @ManyToOne(() => User)
  user: User;

  @ApiProperty({ description: 'Data de criação do formulário' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização do formulário' })
  @UpdateDateColumn()
  updatedAt: Date;
} 