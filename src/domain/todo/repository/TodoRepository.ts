import database from '../../../global/database';
import { CreateTodoDto, UpdateTodoDto } from '../dto/TodoDto';
import { Todo } from '../entity/Todo';

class TodoRepository {
  static async createTodo({ todo, categoryId, date }: CreateTodoDto, userId: number): Promise<Todo> {
    const [insertedId] = await database(Todo.tableName).insert({
      todo,
      categoryId,
      date,
      userId,
      isCompleted: false,
      createdAt: database.fn.now(),
      updatedAt: database.fn.now(),
    });

    const createdTodo = await database(Todo.tableName).where('id', insertedId).first();
    return createdTodo;
  }

  static async updateTodo(todoId: number, { todo, categoryId, date }: UpdateTodoDto, userId: number): Promise<Todo> {
    await database(Todo.tableName).where('id', todoId).update({
      todo,
      categoryId,
      date,
      userId,
      updatedAt: database.fn.now(),
    });

    const updatedTodo = await database(Todo.tableName).where('id', todoId).first();
    return updatedTodo;
  }

  static async getByDay(date: string, userId: number): Promise<Todo[]> {
    return database(Todo.tableName).where({ date, userId }).select('*');
  }

  static async getByDateRange(startDate: string, endDate: string, userId: number): Promise<Todo[]> {
    return database(Todo.tableName).whereBetween('date', [startDate, endDate]).andWhere('userId', userId).select('*');
  }

  static async delete(todoId: number, userId: number): Promise<void> {
    await database(Todo.tableName).where({ id: todoId, userId }).delete();
  }
}

export default TodoRepository;
