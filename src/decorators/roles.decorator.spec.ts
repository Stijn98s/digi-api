import { Roles } from './roles.decorator';

describe('roles decorator', () => {
  it('should reflect', () => {
    class Dummy {
      @Roles('admin')
      method() {
        //
      }
    }
    const dummy = new Dummy();
    expect(dummy).toBeDefined();
  });
});
