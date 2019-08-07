import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PlayersRepository } from '../players/players.repository';

describe('PlayerService', () => {
  let service: PlayerService;
  let mockRepo: { create: any; };

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService, {provide: PlayersRepository, useValue: mockRepo}],
    }).compile();

    service = module.get(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create', async () => {
    await service.createLocal('geordi');
    expect(mockRepo.create). toBeCalledTimes(1);
  });
});
