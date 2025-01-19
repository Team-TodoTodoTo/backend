import { Knex } from 'knex';

export const Category = {
  tableName: 'users',
  columns: {
    id: { type: 'increments', primary: true },
    title: { type: 'string', length: 50, notNull: true },
    todoId: { type: 'integer', notNull: true },
    createdAt: { type: 'dateTime', notNull: true, default: 'now()' },
    updatedAt: { type: 'dateTime', notNull: true, default: 'now()' },
  },
};

export async function createCategoriesTable(knex: Knex) {
  if (!(await knex.schema.hasTable(Category.tableName))) {
    await knex.schema.createTable(Category.tableName, table => {
      table.increments('id').primary();
      table.integer('todoId').notNullable().references('id').inTable('todos').onDelete('CASCADE');
      table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
  }
}
