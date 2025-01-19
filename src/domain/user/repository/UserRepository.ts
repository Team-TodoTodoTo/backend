import { SignUpDto } from '../../auth/dto/SignUpDto';
import { User } from '../entity/User';
import database from '../../../global/database';

class UserRepository {
  static async createUser({ email, password, nickname }: SignUpDto) {
    const [insertedId] = await database(User.tableName).insert({
      email,
      password,
      nickname,
      createdAt: database.fn.now(),
      updatedAt: database.fn.now(),
    });
    return insertedId;
  }

  static async findByEmail(email: string) {
    return database(User.tableName).where({ email }).first();
  }

  static async findByNickname(nickname: string) {
    return database(User.tableName).where({ nickname }).first();
  }
}

export default UserRepository;
