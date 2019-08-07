import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfigService } from './auth-config.service';
import { ConfigModule } from '../config/config.module';

describe('AuthConfigService', () => {
  let service: AuthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfigService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
