import dotenv from 'dotenv';
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { success: false, message: '인증 토큰이 필요합니다.' };
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { success: false, message: '유효하지 않은 토큰 형식입니다.' };
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

  ctx.state.userId = decoded.id;

  await next();
};
