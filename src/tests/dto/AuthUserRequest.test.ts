import { Validator } from 'class-validator';
import { AuthUserRequest } from '../../dto/AuthUserRequest';

const validator = new Validator();

describe('dto/AuthUserRequest', () => {
  it('should validate an AuthUser successfully', async () => {
    const authUser = new AuthUserRequest(
      'test@test.com',
      'password',
    );
    const errors = await validator.validate(authUser);
    expect(errors).toEqual([]);
  });
});
