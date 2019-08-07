import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { setupDbForTest } from './test-scripts/seeder';
import { ValidationPipe } from '@nestjs/common';
import { OrganismPageDto } from '../src/modules/organisms/organismPageDto';

// @ts-ignore
const dbURL = global.__MONGO_URI__;

describe('AppController (e2e)', () => {
  let app;
  let token;

  beforeAll(async () => {
    const connection = await mongoose.connect(dbURL, { useNewUrlParser: true });
    await setupDbForTest(connection);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
    await app.init();

    token = (await request(app.getHttpServer())
      .post('/auth/local')
      .send({ name: 'geordi', password: 'password'})).body.jwt;
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
    await app.init();
  });

  it('/organisms (GET) default length', () => {
    return request(app.getHttpServer())
      .get('/organisms') .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect((res: {body: OrganismPageDto}) => {
        expect(res.body.data.length).toEqual(1);
      });
  });

  it('/organisms (GET) include specific fielf', () => {
    return request(app.getHttpServer())
      .get('/organisms?include=name')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect((res: {body: OrganismPageDto}) => {
        expect(res.body.data.length).toEqual(1);
      });
  });

  it('/organisms (GET) filter', () => {
    return request(app.getHttpServer())
      .get('/organisms?filter=name:bloobie')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect((res: {body: OrganismPageDto}) => {
        expect(res.body.data.length).toEqual(1);
      });
  });

  it('/organisms (GET) null filter', () => {
    return request(app.getHttpServer())
      .get('/organisms?filter=name:null')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect((res: {body: OrganismPageDto}) => {
        expect(res.body.data.length).toEqual(0);
      });
  });

  it('/organisms/thijn (GET) undefined', () => {
    return request(app.getHttpServer())
      .get('/organisms/thijn') .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('/organisms/thijn (GET) undefined', () => {
    return request(app.getHttpServer())
      .put('/organisms/thijn') .set('Authorization', 'Bearer ' + token)
      .send({ name: 'zzzzzzzzzz', description: 'zzzzzzz', image: 'sdfasfdlkasdlfkasfd' })
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('/organisms (POST) ', async () => {
    return await request(app.getHttpServer())
      .post('/organisms') .set('Authorization', 'Bearer ' + token)
      .send({ name: 'zzzzzzzzzz', description: 'zzzzzzz', image: 'sdfasfdlkasdlfkasfd' })
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(res => {
        expect(res.body.name).toEqual('zzzzzzzzzz');
        expect(res.body.description).toEqual('zzzzzzz');
        expect(res.body.image).toEqual('sdfasfdlkasdlfkasfd');
      });
  });

  it('/organisms/zzzzzzzzzz (PUT) ', async () => {
    return await request(app.getHttpServer())
      .put('/organisms/zzzzzzzzzz') .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .send({ name: 'one', description: 'zzzzz', image: 'sdfasfdlkasdlfkasfd' })
      .expect(200);
  });

  it('/organisms/zzzzzzzzzz (POST) conflict ', async () => {
    return await request(app.getHttpServer())
      .post('/organisms') .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .send({ name: 'bloobie', description: 'zzzzz', image: 'sdfasfdlkasdlfkasfd' })
      .expect(409);
  });

  it('/organisms/zzzzzzzzzz (DELETE) ', () => {
    return request(app.getHttpServer())
      .delete('/organisms/zzzzzzzzzz') .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .set('Accept', 'application/json')
      .expect(200);
  });

  it('debug test', () => {
    return expect('life').toEqual('life');
  });

  afterAll(async () => {
    app.get(mongoose.disconnect());
  });
});
