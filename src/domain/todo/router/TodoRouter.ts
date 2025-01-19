import Router from 'koa-router';
import TodoController from '../controller/TodoController';
import { authMiddleware } from '../../../global/AuthMiddleware';

const todoRouter = new Router({ prefix: '/todos' });

todoRouter.post('/', authMiddleware, TodoController.createTodo);
todoRouter.put('/:todoId', authMiddleware, TodoController.updateTodo);
todoRouter.get('/day', authMiddleware, TodoController.getByDay);
todoRouter.get('/week', authMiddleware, TodoController.getByWeek);
todoRouter.get('/month', authMiddleware, TodoController.getByMonth);
todoRouter.delete('/:todoId', authMiddleware, TodoController.deleteTodo);

export default todoRouter;
