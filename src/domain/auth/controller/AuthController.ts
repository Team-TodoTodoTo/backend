import { Context } from 'koa';
import { SignUpDto } from '../dto/SignUpDto';
import AuthService from '../service/AuthService';
import { LoginDto } from '../dto/LoginDto';

class AuthController {
  static async signUp(ctx: Context) {
    const { email, password, nickname } = ctx.request.body as SignUpDto;

    const response = await AuthService.signUp({ email, password, nickname });

    ctx.status = 201;
    ctx.body = { id: response };
  }

  static async login(ctx: Context) {
    const { email, password } = ctx.request.body as LoginDto;

    const response = await AuthService.login({ email, password });

    ctx.status = 200;
    ctx.body = response;
  }
}

export default AuthController;
