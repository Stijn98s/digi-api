import { Organism } from './organism';
import { Player } from './player';

describe('Player Class', () => {
  const PlayerModel = new Player().getModelForClass(Player);
  const player = new PlayerModel();
  it('should be defined', () => {
    expect(player).toBeDefined();
  });
  it('name should be set', () => {
    player.name = 'test';
    expect(player.name).toBe('test');
  });
  it('coins should be set', () => {
    player.points = 10;
    expect(player.points).toBe(10);
  });
  it('organism should be set', () => {
    const organism = new Organism();
    player.entities[0] = organism;
    expect(player.entities[0]).toBe(organism);
  });
  it('deleted should be false', () => {
    expect(player.deleted).toBe(false);
  });
//   it('badge should be set', () => {
//     const badge = new Badge();
//     player.badges[0] = badge;
//     expect(player.badges[0]).toBe(badge);
//   });
});
