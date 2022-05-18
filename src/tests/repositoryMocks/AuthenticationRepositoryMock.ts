import jsonwebtoken from "jsonwebtoken";
import { User } from "../../entities/User";
import { IAuthenticationRepository } from "../../repositories/AuthenticationRepository";

export class AuthenticationRepositoryMock implements IAuthenticationRepository {
  public signToken(user: User = new User("FIRST", "LAST", "test@test.com")) {
    user.id = "id";

    return jsonwebtoken.sign(
      { user },
      "Kd9bJNvok3tNZgMGSoFiRtIUJhHGz6Db474EgowUJ8jI545rdE5q05aTJMM0W4H",
      {
        audience: "api.domain.com",
        expiresIn: "8h",
        issuer: "api.domain.com",
        jwtid: "123" //
      }
    );
  }

  public verifyToken(token: string) {
    try {
      return jsonwebtoken.verify(
        token,
        "Kd9bJNvok3tNZgMGSoFiRtIUJhHGz6Db474EgowUJ8jI545rdE5q05aTJMM0W4H"
      );
    } catch (e) {
      throw e;
    }
  }

  public decodeToken(token: string) {
    try {
      return jsonwebtoken.decode(token, { json: true });
    } catch (e) {
      throw e;
    }
  }
}
