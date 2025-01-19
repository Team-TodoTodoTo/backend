import TodoRepository from '../repository/TodoRepository';
import { CreateTodoDto, UpdateTodoDto } from '../dto/TodoDto';

class TodoService {
  static async create(createTodoDto: CreateTodoDto, userId: number) {
    return await TodoRepository.createTodo(createTodoDto, userId);
  }

  static async update(todoId: number, updateTodoDto: UpdateTodoDto, userId: number) {
    return await TodoRepository.updateTodo(todoId, updateTodoDto, userId);
  }

  static async getByDay(date: string, userId: number) {
    return await TodoRepository.getByDay(date, userId);
  }

  static async getByWeek(startDate: string, endDate: string, userId: number) {
    return await TodoRepository.getByDateRange(startDate, endDate, userId);
  }

  static async getByMonth(startDate: string, endDate: string, userId: number) {
    return await TodoRepository.getByDateRange(startDate, endDate, userId);
  }

  static async delete(todoId: number, userId: number) {
    await TodoRepository.delete(todoId, userId);
  }
}

export default TodoService;
