import {
    NextFunction,
    Request,
    Response,
} from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { IAuthenticationRepository } from '../repositories/AuthenticationRepository';
import { TYPES } from '../types';
import { HTTP401Error } from '../utils/httpErrors';

@injectable()
export class ValidateToken extends BaseMiddleware {
  @inject(TYPES.IAuthenticationRepository) private readonly _authenticationRepository!: IAuthenticationRepository;

  public handler(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization as string;

      if (!token) {
        throw new HTTP401Error('You do not have access to this resource.');
      }
      token = token.slice(7, token.length);

      this._authenticationRepository.verifyToken(token);

      next();

    } catch (e) {
      throw new HTTP401Error('You do not have access to this resource.');
    }
  }
}
