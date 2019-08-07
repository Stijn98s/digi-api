import { Organism } from './organism';

describe('Organism Class', () => {
  const OrganismModel = new Organism().getModelForClass(Organism);
  const organism = new OrganismModel();

  it('should be defined', () => {
    expect(organism).toBeDefined();
  });

  it('name should be set', () => {
    organism.name = 'test';
    expect(organism.name).toBe('test');
  });

  it('description should be set', () => {
    organism.description = 'test description';
    expect(organism.description).toBe('test description');
  });

  it('image should be set', () => {
    organism.image = 'test';
    expect(organism.image).toBe('test');
  });

  it('deleted should be false', () => {
    expect(organism.deleted).toBe(false);
  });
});
