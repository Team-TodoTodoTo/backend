import { SignUpDto } from '../dto/SignUpDto';
import UserRepository from '../../user/repository/UserRepository';
import bcrypt from 'bcrypt';

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
}

export default AuthService;
