import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserGroup {
  GROUP_A = 'Grupo A',
  GROUP_B = 'Grupo B',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.GROUP_A,
  })
  @ApiProperty({ enum: UserGroup })
  groupId: UserGroup;

  @ApiProperty({ description: 'Tempo total gasto pelo usuário' })
  @Column({ type: 'double precision', default: 0 })
  totalTimeSpent: number;

  @ApiProperty({ description: 'Tempo da primeira tentativa' })
  @Column({ type: 'double precision', default: 0 })
  firstAttemptTime: number;

  @ApiProperty({ description: 'Número de erros de código' })
  @Column({ default: 0 })
  codeErrors: number;

  @ApiProperty({ description: 'Número de erros de formulário' })
  @Column({ default: 0 })
  formErrors: number;

  @ApiProperty({ description: 'Total de submissões' })
  @Column({ default: 0 })
  totalSubmissions: number;

  @ApiProperty({ description: 'Total de edições de schema' })
  @Column({ default: 0 })
  schemaEdits: number;

  @ApiProperty({ description: 'Total de edições de UI schema' })
  @Column({ default: 0 })
  uiSchemaEdits: number;

  @ApiProperty({ description: 'Total de erros' })
  @Column({ default: 0 })
  errorCount: number;

  @ApiProperty({ description: 'Total de resets de código' })
  @Column({ default: 0 })
  codeResets: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
