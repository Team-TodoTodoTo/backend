import Router from 'koa-router';
import AuthController from '../controller/AuthController';

const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/login', AuthController.login);

export default authRouter;
