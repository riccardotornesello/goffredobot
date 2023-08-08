import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Sound } from './entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Sound],
  migrations: [],
  subscribers: [],
});
