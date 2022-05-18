import { Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  requestBody,
  response
} from "inversify-express-utils";
import { User } from "../entities/User";
import validateDto from "../middleware/validateDto";
import { IUserRepository } from "../repositories/UserRepository";
import { IUserService } from "../services/UserService";
import { TYPES } from "../types";
import { HTTP404Error } from "../utils/httpErrors";

@controller("/api/v2/users", TYPES.ValidateToken)
export class UserController implements interfaces.Controller {
  private readonly _userRepository: IUserRepository;
  private readonly _userService: IUserService;

  public constructor(
    @inject(TYPES.IUserRepository) userRepository: IUserRepository,
    @inject(TYPES.IUserService) userService: IUserService
  ) {
    // super();
    this._userRepository = userRepository;
    this._userService = userService;
  }

  /**
   * @api {get} /api/v2/users
   * @apiGroup Users
   * @apiDescription Get an array of Users
   * @apiSuccess {entities/User[]} User[] Array of Users
   * @apiError HTTP401Error Access Denied
   */
  @httpGet("/")
  public async get(@response() res: Response) {
    try {
      return res.send(await this._userRepository.get());
      // eslint-disable-next-line prettier/prettier
    } catch (e: any) {
      res.send(e.message);
    }
  }

  /**
   * @api {get} /api/v2/users/profile
   * @apiGroup Users
   * @apiDescription Gets the current user's profile
   * @apiSuccess (entities/User) {uuid}   user:id User's id
   * @apiSuccess (entities/User) {string} user:firstName User's first name
   * @apiSuccess (entities/User) {string} user:lastName User's last name
   * @apiSuccess (entities/User) {string} user:email User's email
   * @apiError HTTP401Error Access Denied
   */
  // @httpGet("/profile")
  // public async profile(@response() res: Response) {
  //   const { user: contextUser } = this.httpContext.user.details;
  //   const user = await this._userRepository.getById(contextUser.id);
  //   if (!user) {
  //     throw new HTTP404Error("User profile not found.");
  //   }
  //   return res.send(user);
  // }

  /**
   * @api {post} /api/v2/users
   * @apiGroup Users
   * @apiDescription Creates a user
   * @apiSuccess (entities/User) {uuid}   user:id User's id
   * @apiSuccess (entities/User) {string} user:firstName User's first name
   * @apiSuccess (entities/User) {string} user:lastName User's last name
   * @apiSuccess (entities/User) {string} user:email User's email
   * @apiSuccess (entities/User) {string} user:password User's password
   * @apiError HTTP401Error Access Denied
   */
  @httpPost("/", validateDto(User))
  public async post(@response() res: Response, @requestBody() user: User) {
    const result = await this._userService.createUser(user);
    return res.send(result);
  }
}
