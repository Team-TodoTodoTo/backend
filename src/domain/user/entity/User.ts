import { Knex } from 'knex';

export const User = {
  tableName: 'users',
  columns: {
    id: { type: 'increments', primary: true },
    email: { type: 'string', length: 255, notNull: true, unique: true },
    password: { type: 'string', length: 255, notNull: true },
    nickname: { type: 'string', length: 50, notNull: true, unique: true },
    createdAt: { type: 'dateTime', notNull: true, default: 'now()' },
    updatedAt: { type: 'dateTime', notNull: true, default: 'now()' },
  },
};

export async function createUsersTable(knex: Knex) {
  if (!(await knex.schema.hasTable(User.tableName))) {
    await knex.schema.createTable(User.tableName, table => {
      table.increments('id').primary();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('nickname', 50).notNullable().unique();
      table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
  }
}
