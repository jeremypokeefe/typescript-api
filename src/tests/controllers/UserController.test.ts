import "reflect-metadata";

import { Container } from "inversify";
import {
    cleanUpMetadata,
    interfaces,
    InversifyExpressServer,
    TYPE
} from "inversify-express-utils";
import supertest from "supertest";
import { AuthProvider } from "../../middleware/authProvider";
import { ValidateToken } from "../../middleware/validateToken";
import { IAuthenticationRepository } from "../../repositories/AuthenticationRepository";
import { IUserRepository } from "../../repositories/UserRepository";
import { TYPES } from "../../types";
import { AuthenticationRepositoryMock } from "../repositoryMocks/AuthenticationRepositoryMock";
import { UserRepositoryMock } from "../repositoryMocks/UserRepositoryMock";
import { UserServiceMock } from "../serviceMocks/UserServiceMock";

import { UserController } from "../../controllers/UserController";
import { IUserService } from "../../services/UserService";

describe("contollers/UserController", () => {
  let container: Container;
  let server: InversifyExpressServer;
  const _authenticationRepository = new AuthenticationRepositoryMock();

  beforeEach(done => {
    cleanUpMetadata();

    container = new Container();
    container
            .bind<IAuthenticationRepository>(TYPES.IAuthenticationRepository)
            .toConstantValue(new AuthenticationRepositoryMock());
    container
            .bind<IUserRepository>(TYPES.IUserRepository)
            .toConstantValue(new UserRepositoryMock());
    container
            .bind<IUserService>(TYPES.IUserService)
            .toConstantValue(new UserServiceMock());
    container.bind<ValidateToken>(TYPES.ValidateToken).to(ValidateToken);
    container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(UserController)
            .whenTargetNamed("UserController");
    done();
  });

  it('should @httpGet("/api/v2/users") all Users[]', done => {
    server = new InversifyExpressServer(
            container,
            null,
            null,
            null,
            AuthProvider
        );

    supertest(server.build())
      .get("/api/v2/users")
      .set("Authorization", `Bearer ${_authenticationRepository.signToken()}`)
      .then(response => {
        expect(response.body).toEqual([]);
        done();
      });
  });
});
