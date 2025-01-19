import Router from 'koa-router';
import CategoryController from '../controller/CategoryController';
import { authMiddleware } from '../../../global/AuthMiddleware';

const categoryRouter = new Router({ prefix: '/categories' });

categoryRouter.post('/', authMiddleware, CategoryController.createCategory);
categoryRouter.put('/:categoryId', authMiddleware, CategoryController.updateCategory);
categoryRouter.delete('/:categoryId', authMiddleware, CategoryController.deleteCategory);
categoryRouter.get('/', authMiddleware, CategoryController.getCategories);

export default categoryRouter;
