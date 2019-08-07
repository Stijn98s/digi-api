import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: new ConfigService(`.env/${process.env.NODE_ENV}.env`),
      }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail', () => {
     expect(() => {const servcice = new ConfigService(`.env/fail.env`); }).toThrow();
  });

  it('should have the correct client credentials', () => {
    expect(service.facebookClientId).toMatch('facebookclient');
    expect(service.facebookClientSecret).toMatch('facebookclientsecret');
    expect(service.googleClientId).toMatch('googleclient');
    expect(service.googleClientSecret).toMatch('googleclientsecret');
  });

  it('should have a correct env variables', () => {
    expect(service.secretKey).toMatch('secretkey');
    expect(service.port).toBe(3000);
    expect(service.certificate).toMatch('./fullchain.pem');
    expect(service.isApiAuthEnabled).toBe(true);
    expect(service.isSSLEnabled).toBe(false);
    expect(service.privateKey).toMatch('./privkey.pem');
  });

  it('should have a correct mongo url', () => {
    // @ts-ignore
    expect(service.mongoUrl).toMatch(global.__MONGO_URI__);
  });
});
