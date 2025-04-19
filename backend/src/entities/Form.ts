import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  user!: {
    id: number;
    name: string;
    email: string;
    group: string;
  };

  @Column('json')
  formData!: {
    schema: any;
    uischema: any;
    data: any;
  };

  @CreateDateColumn()
  createdAt!: Date;
}
