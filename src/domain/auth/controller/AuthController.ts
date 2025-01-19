import { Context } from 'koa';
import { SignUpDto } from '../dto/SignUpDto';
import AuthService from '../service/AuthService';

class AuthController {
  static async signUp(ctx: Context) {
    const { email, password, nickname } = ctx.request.body as SignUpDto;

    const response = await AuthService.signUp({ email, password, nickname });

    ctx.status = 201;
    ctx.body = { id: response };
  }
}

export default AuthController;
