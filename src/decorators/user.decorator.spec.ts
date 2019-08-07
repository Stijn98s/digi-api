import { User } from './user.decorator';

describe('user decorator', () => {

  it('should reflect', () => {
    class Dummy {
      method(@User() user  ) {
        return user;
      }
    }

    const dummy = new Dummy();
    expect(dummy).toBeDefined();
  });
});
