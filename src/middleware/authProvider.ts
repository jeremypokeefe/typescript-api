import { Request } from "express";
import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { IDecodedToken } from "../dto/IDecodedToken";
import { Principal } from "../dto/Principal";
import { IAuthenticationRepository } from "../repositories/AuthenticationRepository";
import { TYPES } from "../types";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @inject(TYPES.IAuthenticationRepository)
  private readonly _authenticationRepository!: IAuthenticationRepository;

  public async getUser(req: Request): Promise<interfaces.Principal> {
    try {
      let token = req.headers.authorization as string;

      if (!token) {
        return new Principal();
      }

      token = token.slice(7, token.length);

      const decodedToken = this._authenticationRepository.verifyToken(
              token
          ) as IDecodedToken;

      if (!decodedToken) {
        return new Principal();
      }

      return new Principal({
        authenticated: decodedToken.authenticated,
        userId: decodedToken.userId,
        permissions: decodedToken.permissions || []
      });
    } catch (e) {
      return new Principal({
        authenticated: false
      });
    }
  }
}
