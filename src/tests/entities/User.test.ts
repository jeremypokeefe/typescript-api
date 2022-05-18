import { Validator } from 'class-validator';
import { User } from '../../entities/User';

const validator = new Validator();

describe('entities/User', () => {
  it('should validate a User', async () => {
    const user = new User('FIRST', 'LAST', 'test@test.com');

    const errors = await validator.validate(user);
    expect(errors).toEqual([]);
  });

  it('should fail validation of a User', async () => {
    const user = new User('FIRST', 'LAST', 'test.com');

    const errors = await validator.validate(user);
    expect(errors).toHaveLength(1);
  });

  it('should sanitize() a User', () => {
    const user = new User('FIRST', 'LAST', 'test@test.com');
    user.password = 'TEST_PASSWORD';
    user.sanitize();
    expect(user.password).toEqual('');
  });
});
