import { createConnection } from 'typeorm';
import { User } from '../entities/User';

export async function getDbConnection() {
  const DATABASE_HOST = process.env.DATABASE_HOST;
  const DATABASE_USER = process.env.DATABASE_USER;
  const DATABASE_PORT = Number(process.env.DATABASE_PORT);
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_DB = process.env.DATABASE_DB;
  const LOGGGING = process.env.NODE_ENV !== 'production' || false;

  const entities = [
    User,
  ];

  const conn = await createConnection({
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities,
    logging: LOGGGING,
    synchronize: false,
  });

  return conn;
}
