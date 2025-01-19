import { Knex } from 'knex';

export interface Todo {
  id: number;
  todo: string;
  categoryId: number;
  date: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const Todo = {
  tableName: 'todos',
  columns: {
    id: { type: 'increments', primary: true },
    todo: { type: 'string', length: 255, notNull: true },
    categoryId: { type: 'integer', notNull: false },
    date: { type: 'date', notNull: true },
    userId: { type: 'integer', notNull: true },
    isCompleted: { type: 'boolean', notNull: true, default: false },
    createdAt: { type: 'dateTime', notNull: true, default: 'now()' },
    updatedAt: { type: 'dateTime', notNull: true, default: 'now()' },
  },
};

export async function createTodosTable(knex: Knex) {
  if (!(await knex.schema.hasTable(Todo.tableName))) {
    await knex.schema.createTable(Todo.tableName, table => {
      table.increments('id').primary();
      table.string('todo', 255).notNullable();
      table.integer('categoryId').nullable().references('id').inTable('categories').onDelete('CASCADE');
      table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.date('date').notNullable();
      table.boolean('isCompleted').notNullable().defaultTo(false);
      table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
  }
}
