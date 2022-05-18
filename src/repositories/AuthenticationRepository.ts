import jsonwebtoken from 'jsonwebtoken';
import { User } from '../entities/User';

export interface IAuthenticationRepository {
  signToken(user: User): string;
  verifyToken(token: string): string | object;
  decodeToken(token: string): any;
}

export class AuthenticationRepository implements IAuthenticationRepository {
  public signToken (user: User) {
    return jsonwebtoken.sign({ user }, process.env.AUTH_SECRET! , {
      audience: process.env.AUTH_AUDIENCE,
      expiresIn: process.env.AUTH_EXPIRES_IN,
      issuer: process.env.AUTH_ISSUER,
      jwtid: `${ process.env.AUTH_AUDIENCE }`,
    });
  }

  public verifyToken (token: string) {
    try {
      return jsonwebtoken.verify(token, process.env.AUTH_SECRET!);
    } catch (e) {
      throw (e);
    }
  }

  public decodeToken (token: string) {
    try {
      return jsonwebtoken.decode(token, { json: true });
    } catch (e) {
      throw (e);
    }
  }
}
