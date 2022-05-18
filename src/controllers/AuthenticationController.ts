import { Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  interfaces,
  requestBody,
  response
} from "inversify-express-utils";
import { AuthUserResponse } from "../dto/AuthUserResponse";
import { AuthUserRequest } from "../dto/AuthUserRequest";
import validateDto from "../middleware/validateDto";
import { IAuthenticationRepository } from "../repositories/AuthenticationRepository";
import { IUserRepository } from "../repositories/UserRepository";
import { TYPES } from "../types";
import { HTTP401Error } from "../utils/httpErrors";

@controller("/api/v2/auth")
export class AuthenticationController implements interfaces.Controller {
  private readonly _userRepository: IUserRepository;
  private readonly _authenticationRepository: IAuthenticationRepository;

  public constructor(
    @inject(TYPES.IUserRepository) userRepository: IUserRepository,
    @inject(TYPES.IAuthenticationRepository)
    authenticationRepository: IAuthenticationRepository
  ) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
  }

  /**
   * @api {get} /api/v2/auth/login
   * @apiGroup Auth
   * @apiDescription Authenticate a user
   *
   * @apiParam (dto/AuthUserRequest) {string} email User's email
   * @apiParam (dto/AuthUserRequest) {string} password User's password
   *
   * @apiSuccess (dto/AuthUserResponse) {uuid}   user:id User's id
   * @apiSuccess (dto/AuthUserResponse) {string} user:firstName User's first name
   * @apiSuccess (dto/AuthUserResponse) {string} user:lastName User's last name
   * @apiSuccess (dto/AuthUserResponse) {string} user:email User's email
   * @apiSuccess (dto/AuthUserResponse) {string} token Jwt access token
   * @apiError HTTP401Error Access Denied
   */
  @httpPost("/login", validateDto(AuthUserRequest))
  public async login(
    @response() res: Response,
    @requestBody() authUser: AuthUserRequest
  ) {
    let user = await this._userRepository.getByEmail(authUser.email);

    if (!user) {
      throw new HTTP401Error(
        "Login failed. Please check your email and password"
      );
    }

    const isValid = await user.validatePassword(authUser.password);
    if (!isValid) {
      throw new HTTP401Error(
        "Login failed. Please check your email and password"
      );
    }

    user = user.sanitize();

    const token = this._authenticationRepository.signToken(user);

    res.send(new AuthUserResponse(user, token));
  }
}
