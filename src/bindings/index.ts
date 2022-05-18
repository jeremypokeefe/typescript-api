import { AsyncContainerModule } from "inversify";
import { getCustomRepository } from "typeorm";
import { getDbConnection } from "../db";
import { ValidateToken } from "../middleware/validateToken";

import {
  AuthenticationRepository,
  IAuthenticationRepository
} from "../repositories/AuthenticationRepository";
import {
  IUserRepository,
  UserRepository
} from "../repositories/UserRepository";

import { IUserService, UserService } from "../services/UserService";

import { TYPES } from "../types";

export const bindings = new AsyncContainerModule(async bind => {
  await getDbConnection();
  await require("../controllers/UserController");
  await require("../controllers/AuthenticationController");

  bind<IUserRepository>(TYPES.IUserRepository)
    .toDynamicValue(() => {
      return getCustomRepository(UserRepository);
    })
    .inRequestScope();

  bind<IAuthenticationRepository>(TYPES.IAuthenticationRepository)
    .toDynamicValue(() => {
      return new AuthenticationRepository();
    })
    .inRequestScope();

  bind<IUserService>(TYPES.IUserService)
    .toDynamicValue(() => {
      return new UserService();
    })
    .inRequestScope();

  bind<ValidateToken>(TYPES.ValidateToken).to(ValidateToken);
});
