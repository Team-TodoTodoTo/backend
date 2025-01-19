import database from '../../../global/database';
import { CreateTodoDto, UpdateTodoDto } from '../dto/TodoDto';
import { Todo } from '../entity/Todo';

class TodoRepository {
  static async createTodo({ todo, categoryId, date }: CreateTodoDto): Promise<Todo> {
    const [insertedId] = await database(Todo.tableName).insert({
      todo,
      categoryId,
      date,
      isCompleted: false,
      createdAt: database.fn.now(),
      updatedAt: database.fn.now(),
    });

    const createdTodo = await database(Todo.tableName).where('id', insertedId).first();
    return createdTodo;
  }

  static async updateTodo(todoId: number, { todo, categoryId, date }: UpdateTodoDto): Promise<Todo> {
    await database(Todo.tableName).where('id', todoId).update({
      todo,
      categoryId,
      date,
      updatedAt: database.fn.now(),
    });

    const updatedTodo = await database(Todo.tableName).where('id', todoId).first();
    return updatedTodo;
  }

  static async getByDay(date: string): Promise<Todo[]> {
    return database(Todo.tableName).where({ date }).select('*');
  }

  static async getByDateRange(startDate: string, endDate: string): Promise<Todo[]> {
    return database(Todo.tableName).whereBetween('date', [startDate, endDate]).select('*');
  }

  static async delete(todoId: number): Promise<void> {
    await database(Todo.tableName).where('id', todoId).del();
  }
}

export default TodoRepository;
