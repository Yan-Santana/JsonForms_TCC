import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: ['Grupo A', 'Grupo B'],
    default: 'Grupo A',
  })
  group!: string;

  @Column({ default: 0 })
  totalSubmissions!: number;

  @Column({ default: 0 })
  schemaEdits!: number;

  @Column({ default: 0 })
  uiSchemaEdits!: number;

  @Column({ type: 'bigint', default: 0 })
  totalTimeSpent!: number; // em milissegundos

  @Column({ default: 0 })
  errorCount!: number;

  @Column({ default: 0 })
  resetCount!: number;

  @Column({ type: 'bigint', nullable: true })
  firstAttemptTime!: number; // em milissegundos

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
