import dotenv from 'dotenv';
import { knex } from 'knex';

dotenv.config();

const database = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
  pool: { min: 0, max: 10 },
});

export default database;
