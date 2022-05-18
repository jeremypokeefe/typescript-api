import { Connection, getConnection } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export interface IUserService {
  createUser(user: User): Promise<User | undefined>;
}

export class UserService implements IUserService {
  private readonly _connection: Connection;

  public constructor() {
    this._connection = getConnection();
  }

  public async createUser(user: User) {
    return await this._connection.transaction(async entityManager => {
      // Get custome repo from entity manager for transactions
      const _userRepository = await entityManager.getCustomRepository(UserRepository);
      const createdUser = await _userRepository.createUser(user);

      return await _userRepository.getById(createdUser.id);
    });
  }
}
