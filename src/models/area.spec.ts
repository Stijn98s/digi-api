import { Area } from './area';

describe('CatchZone Class', () => {
  const area = new Area();

  it('should be defined', () => {
    expect(area).toBeDefined();
  });

  it('name should be set', () => {
    area.name = 'test';
    expect(area.name).toBe('test');
  });

  it('lat1 should be set', () => {
    area.lat1 = 51.111;
    expect(area.lat1).toBe(51.111);
  });

  it('lon should be set', () => {
    area.lon1 = 51.111;
    expect(area.lon1).toBe(51.111);
  });

  it('lat1 should be set', () => {
    area.lat2 = 51.111;
    expect(area.lat2).toBe(51.111);
  });

  it('lon should be set', () => {
    area.lon2 = 51.111;
    expect(area.lon2).toBe(51.111);
  });

  it('deleted should be false', () => {
    expect(area.deleted).toBeUndefined();
  });
});
