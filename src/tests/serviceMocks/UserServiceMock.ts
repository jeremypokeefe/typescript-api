import { User } from '../../entities/User';
import {  IUserService } from '../../services/UserService';

export class UserServiceMock implements IUserService {
  public async createUser(user: User) {
    return new Promise<User>((resolve) => {
      return resolve(new User('FIRST', 'LAST', 'test@test.com'));
    });
  }
}
