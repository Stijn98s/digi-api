import { CatchZone } from './catchzone';

describe('CatchZone Class', () => {
  const catchzone = new CatchZone();

  it('should be defined', () => {
    expect(catchzone).toBeDefined();
  });

  it('name should be set', () => {
    catchzone.name = 'test';
    expect(catchzone.name).toBe('test');
  });

  it('lat should be set', () => {
    catchzone.lat = 51.111;
    expect(catchzone.lat).toBe(51.111);
  });

  it('lon should be set', () => {
    catchzone.lon = 51.111;
    expect(catchzone.lon).toBe(51.111);
  });

  it('radius should be set', () => {
    catchzone.radius = 50;
    expect(catchzone.radius).toBe(50);
  });

  it('deleted should be false', () => {
    expect(catchzone.deleted).toBeUndefined();
  });
});
