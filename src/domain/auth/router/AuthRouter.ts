import Router from 'koa-router';
import AuthController from '../controller/AuthController';

const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/signup', AuthController.signUp);

export default authRouter;
