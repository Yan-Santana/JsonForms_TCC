import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Form } from './Form';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('jsonb')
  data!: any;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Form, (form) => form.id)
  form!: Form;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
