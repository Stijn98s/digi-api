import { Bug } from './bug';

describe('Bug Class', () => {
  const Bugmodel = new Bug().getModelForClass(Bug);
  const bug = new Bugmodel();

  it('should be defined', () => {
    expect(bug).toBeDefined();
  });

  it('badge name should be set', () => {
    bug.name = 'test';
    expect(bug.name).toBe('test');
  });

  it('badge description should be set', () => {
    bug.description = 'test';
    expect(bug.description).toBe('test');
  });

  it('deleted should be false', () => {
      expect(bug.deleted).toBe(false);
  });
});
