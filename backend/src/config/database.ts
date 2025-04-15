import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Form } from '../models/Form';
import { Submission } from '../models/Submission';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [User, Form, Submission],
  subscribers: [],
  migrations: [],
});
