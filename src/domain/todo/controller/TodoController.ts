import { Context } from 'koa';
import TodoService from '../service/TodoService';
import { CreateTodoDto, UpdateTodoDto } from '../dto/TodoDto';

class TodoController {
  static async createTodo(ctx: Context) {
    const { todo, categoryId, date } = ctx.request.body as CreateTodoDto;
    const userId = ctx.state.userId;

    const response = await TodoService.create({ todo, categoryId, date }, userId);
    ctx.status = 201;
    ctx.body = response;
  }

  static async updateTodo(ctx: Context) {
    const { todoId } = ctx.params;
    const userId = ctx.state.userId;
    const { todo, categoryId, date, isCompleted } = ctx.request.body as UpdateTodoDto;
    const response = await TodoService.update(Number(todoId), { todo, categoryId, date, isCompleted }, userId);
    ctx.status = 200;
    ctx.body = response;
  }

  static async getByDay(ctx: Context) {
    const { date } = ctx.query;
    const userId = ctx.state.userId;
    const response = await TodoService.getByDay(date as string, userId);
    ctx.status = 200;
    ctx.body = response;
  }

  static async getByWeek(ctx: Context) {
    const { startDate, endDate } = ctx.query;
    const userId = ctx.state.userId;
    const response = await TodoService.getByWeek(startDate as string, endDate as string, userId);
    ctx.status = 200;
    ctx.body = response;
  }

  static async getByMonth(ctx: Context) {
    const { startDate, endDate } = ctx.query;
    const userId = ctx.state.userId;
    const response = await TodoService.getByMonth(startDate as string, endDate as string, userId);
    ctx.status = 200;
    ctx.body = response;
  }

  static async deleteTodo(ctx: Context) {
    const { todoId } = ctx.params;
    const userId = ctx.state.userId;
    await TodoService.delete(Number(todoId), userId);
    ctx.status = 204;
    ctx.body = { message: '할 일이 삭제되었습니다.' };
  }
}

export default TodoController;
