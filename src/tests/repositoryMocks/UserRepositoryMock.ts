import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/UserRepository";

export class UserRepositoryMock implements IUserRepository {
  public async get() {
    return new Promise<User[]>(resolve => {
      const u: User[] = [];
      return resolve(u);
    });
  }

  public async getById(id: string) {
    return new Promise<User>(resolve => {
      const user = new User("FIRST", "LAST", "test@test.com");
      user.id = id;
      return resolve(user);
    });
  }

  public async getByEmail(email: string) {
    return new Promise<User>(resolve => {
      return resolve(new User("FIRST", "LAST", "test@test.com"));
    });
  }

  public async createUser(user: User) {
    return new Promise<User>(resolve => {
      return resolve(new User("FIRST", "LAST", "test@test.com"));
    });
  }
}
