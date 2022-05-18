import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { User } from '../entities/User';

export interface IUserRepository  {
  get(): Promise<User[]> ;
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  createUser(user: User): Promise<User>;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository  {

  public async get() {
    const users = await this.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
    return users;
  }

  public async getById(id: string) {
    const user = await this.findOne({
      where: {
        id,
      },
      select: ['id', 'firstName', 'lastName', 'email'],
    });
    return user;
  }

  public async getByEmail(email: string) {
    return await this.findOne({
      where: {
        email,
      },
      select: ['id', 'firstName', 'lastName', 'email', 'password'],
    });
  }

  public async createUser(user: User) {
    const result = await this.createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();

    user.id = result.identifiers[0].id;
    return user;
  }
}
