import { Knex } from 'knex';

export const Category = {
  tableName: 'categories',
  columns: {
    id: { type: 'increments', primary: true },
    title: { type: 'string', length: 50, notNull: true },
    userId: { type: 'integer', notNull: true },
    createdAt: { type: 'dateTime', notNull: true, default: 'now()' },
    updatedAt: { type: 'dateTime', notNull: true, default: 'now()' },
  },
};

export async function createCategoriesTable(knex: Knex) {
  if (!(await knex.schema.hasTable(Category.tableName))) {
    await knex.schema.createTable(Category.tableName, table => {
      table.increments('id').primary();
      table.string('title', 50).notNullable();
      table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
  }
}
