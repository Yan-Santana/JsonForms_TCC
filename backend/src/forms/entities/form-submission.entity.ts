import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class FormSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  formName: string;

  @Column('jsonb')
  formData: any;

  @Column('jsonb', { nullable: true })
  schema: any;

  @Column('jsonb', { nullable: true })
  uiSchema: any;

  @Column({ type: 'double precision', default: 0 })
  totalTimeSpent: number;

  @Column({ type: 'double precision', default: 0 })
  firstAttemptTime: number;

  @Column({ default: 0 })
  errorCount: number;

  @Column({ default: 0 })
  codeResets: number;

  @Column({ type: 'jsonb', nullable: true })
  errorDetails: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  submittedAt: Date;
}
