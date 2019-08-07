import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { PlayersRepository } from './players.repository';

describe('PlayersService', () => {
  let service: PlayersService;
  let mockRepo: { create: any; };

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService, {provide: PlayersRepository, useValue: mockRepo}],
    }).compile();

    service = module.get(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create', async () => {
    await service.createLocal('geordi');
    expect(mockRepo.create). toBeCalledTimes(1);
  });
});
