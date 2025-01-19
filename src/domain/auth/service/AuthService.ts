import { SignUpDto } from '../dto/SignUpDto';
import UserRepository from '../../user/repository/UserRepository';
import bcrypt from 'bcrypt';
import { LoginDto } from '../dto/LoginDto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
  static async signUp(signUpDto: SignUpDto) {
    const { email, password, nickname } = signUpDto;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('이미 사용중인 이메일입니다.');
    }

    const existingNickname = await UserRepository.findByNickname(nickname);
    if (existingNickname) {
      throw new Error('이미 사용중인 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await UserRepository.createUser({ email, password: hashedPassword, nickname });
  }

  static async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    return { id: user.id, accessToken: token };
  }
}

export default AuthService;
