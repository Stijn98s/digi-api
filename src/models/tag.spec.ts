import { Tag } from './tag';

describe('Tag Class', () => {
  const Tagmodel = new Tag().getModelForClass(Tag);
  const tag = new Tagmodel();

  it('should be defined', () => {
    expect(tag).toBeDefined();
  });

  it('badge name should be set', () => {
    tag.name = 'test';
    expect(tag.name).toBe('test');
  });

  it('badge description should be set', () => {
    tag.description = 'test';
    expect(tag.description).toBe('test');
  });

  it('badge point should be set', () => {
    tag.points = 10;
    expect(tag.points).toBe(10);
  });

  it('badge image should be set', () => {
    tag.image = 'test';
    expect(tag.image).toBe('test');
  });

  it('deleted should be false', () => {
    expect(tag.deleted).toBe(false);
  });
});
