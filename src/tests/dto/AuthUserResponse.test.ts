import { AuthUserResponse } from "../../dto/AuthUserResponse";
import { User } from "../../entities/User";

describe("dto/AuthUserRequest", () => {
  it("should validate an AuthUser successfully", async () => {
    const authUserResponse = new AuthUserResponse(
      new User("FIRST", "LAST", "test@test.com"),
      "TOKEN"
    );

    expect(authUserResponse).toHaveProperty("user");
    expect(authUserResponse).toHaveProperty("token");
  });
});
