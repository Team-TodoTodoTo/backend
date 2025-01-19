import Router from 'koa-router';
import CategoryController from '../controller/CategoryController';

const categoryRouter = new Router({ prefix: '/categories' });

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.put('/:categoryId', CategoryController.updateCategory);
categoryRouter.delete('/:categoryId', CategoryController.deleteCategory);
categoryRouter.get('/', CategoryController.getCategories);

export default categoryRouter;
