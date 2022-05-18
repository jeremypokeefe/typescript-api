import { User } from "../entities/User";

export class AuthUserResponse {
  public user!: User;
  public token!: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }
}
