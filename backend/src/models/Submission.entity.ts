import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';
import { Form } from './Form.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id!: number;

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
