import Router from 'koa-router';
import TodoController from '../controller/TodoController';

const todoRouter = new Router({ prefix: '/todos' });

todoRouter.post('/', TodoController.createTodo);
todoRouter.put('/:todoId', TodoController.updateTodo);
todoRouter.get('/day', TodoController.getByDay);
todoRouter.get('/week', TodoController.getByWeek);
todoRouter.get('/month', TodoController.getByMonth);
todoRouter.delete('/:todoId', TodoController.deleteTodo);

export default todoRouter;
