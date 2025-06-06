import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class FormError {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  errorType: string;

  @Column()
  formName: string;

  @CreateDateColumn()
  timestamp: Date;
} 