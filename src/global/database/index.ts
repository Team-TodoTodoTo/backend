import dotenv from 'dotenv';
import { knex } from 'knex';
import { createUsersTable } from '../../domain/user/entity/User';
import { createTodosTable } from '../../domain/todo/entity/Todo';
import { createCategoriesTable } from '../../domain/categoty/entity/Categoty';

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

(async () => {
  try {
    await createUsersTable(database);
    await createTodosTable(database);
    await createCategoriesTable(database);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
})();

export default database;
