import TodoRepository from '../repository/TodoRepository';
import { CreateTodoDto, UpdateTodoDto } from '../dto/TodoDto';

class TodoService {
  static async create(createTodoDto: CreateTodoDto) {
    return await TodoRepository.createTodo(createTodoDto);
  }

  static async update(todoId: number, updateTodoDto: UpdateTodoDto) {
    return await TodoRepository.updateTodo(todoId, updateTodoDto);
  }

  static async getByDay(date: string) {
    return await TodoRepository.getByDay(date);
  }

  static async getByWeek(startDate: string, endDate: string) {
    return await TodoRepository.getByDateRange(startDate, endDate);
  }

  static async getByMonth(startDate: string, endDate: string) {
    return await TodoRepository.getByDateRange(startDate, endDate);
  }

  static async delete(todoId: number) {
    await TodoRepository.delete(todoId);
  }
}

export default TodoService;
