import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Form } from '../models/Form';
import { Submission } from '../models/Submission';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  NODE_ENV = 'development',
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: NODE_ENV === 'development',
  logging: NODE_ENV === 'development',
  entities: [User, Form, Submission],
  subscribers: [],
  migrations: [],
  ssl: NODE_ENV === 'production',
  extra: {
    max: 20,
    connectionTimeoutMillis: 5000,
  },
});
