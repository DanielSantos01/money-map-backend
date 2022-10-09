import { ConnectionOptions } from 'typeorm';
import { DatabaseConnection } from './DataBaseConnection';
import 'dotenv/config';
import { User, Costs } from '../../src/models';

const dbEntities = [User, Costs];

const options: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_TEST_HOST,
  port: Number(process.env.DATABASE_TEST_PORT),
  username: process.env.DATABASE_TEST_USER,
  password: process.env.DATABASE_TEST_PASSWORD,
  database: process.env.DATABASE_TEST_DB,
  logging: false,
  synchronize: true,
  entities: dbEntities,
  cli: { entitiesDir: '../src/models' },
};

const connection = new DatabaseConnection(options);

export { connection };