import Koa, { Context } from 'koa';
import database from './global/database';
import authRouter from './domain/auth/router/AuthRouter';
import bodyParser from 'koa-bodyparser';
import todoRouter from './domain/todo/router/TodoRouter';
import categoryRouter from './domain/categoty/router/CategoryRouter';

const app = new Koa();

async function checkDatabaseConnection() {
  try {
    await database.raw('SELECT 1');
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.use(bodyParser());

app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(todoRouter.routes()).use(todoRouter.allowedMethods());
app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods());

app.use((ctx: Context) => {
  ctx.body = 'Hello World';
});

app.listen(4000, async () => {
  console.log('Server is running at http://localhost:4000');
  await checkDatabaseConnection();
});
