import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthUserRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
