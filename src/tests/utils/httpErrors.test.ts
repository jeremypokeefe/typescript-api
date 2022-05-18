import {
  HTTP400Error,
  HTTP401Error,
  HTTP404Error,
} from '../../utils/httpErrors';

describe('utils/httpErrors', () => {
  it('should return correct HTTP400Error', () => {
    const error = new HTTP400Error('TEST MESSAGE');
    expect(error.message).toEqual('TEST MESSAGE');
    expect(error.statusCode).toEqual(400);
  });

  it('should return correct HTTP404Error', () => {
    const error = new HTTP404Error('TEST MESSAGE');
    expect(error.message).toEqual('TEST MESSAGE');
    expect(error.statusCode).toEqual(404);
  });

  it('should return correct HTTP401Error', () => {
    const error = new HTTP401Error('TEST MESSAGE');
    expect(error.message).toEqual('TEST MESSAGE');
    expect(error.statusCode).toEqual(401);
  });
});
