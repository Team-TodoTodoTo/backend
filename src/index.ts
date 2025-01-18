import Koa, { Context } from 'koa';
import database from './global/database';

const app = new Koa();

async function checkDatabaseConnection() {
  try {
    await database.raw('SELECT 1');
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.use((ctx: Context) => {
  ctx.body = 'Hello World';
});

app.listen(4000, async () => {
  console.log('Server is running at http://localhost:4000');
  await checkDatabaseConnection();
});
