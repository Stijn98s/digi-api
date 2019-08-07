import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as https from 'https';
import express = require('express');
import { ConfigService } from './config/config.service';
import * as fs from 'fs';
import { MongooseValidationFilter } from './exception-filters';
import { ValidationPipe } from '@nestjs/common';
import { MongoErrorFilter } from './exception-filters/mongo-error-filter';

import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FetchCacheModule } from './modules/fetch-cache/fetch-cache.module';
import { AuthModule, PlayersModule } from './modules';

const whitelist = ['http://localhost:8080', 'http://192.168.2.12:8100', 'http://localhost', 'http://localhost:8100', 'http://localhost:3000', 'http://localhost:4200', 'https://megain.xyz:4000', 'ionic://localhost', 'https://megain.xyz:3000', 'http://megain.xyz:4002', 'http://megain.xyz:3002', 'http://digicatch.nl', 'http://192.168.20.2:8100'];


declare const module: any;

async function bootstrap() {

  const instance = express();

  instance.options('*', cors());

  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error(origin + ' Not allowed by CORS'));
      }
    },
  };

  instance.use(cors(corsOptions));
  const app = await NestFactory.create(AppModule,  new ExpressAdapter(instance));
  const configService: ConfigService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setTitle('Digicatch')
    // TODO fetch this from the configservice
    .setSchemes(configService.schema)
    .setVersion('1.0')
    .build();
  app.useGlobalFilters(new MongooseValidationFilter(), new MongoErrorFilter());
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  instance.get('/api/swagger.json', (req, res) => {
    res.json(document);
  });

  instance.get('/api/app.json', (req, res) => {
    res.json(appDocument);
  });

  const document = SwaggerModule.createDocument(app, options);
  const appDocument = SwaggerModule.createDocument(app, options, {include: [FetchCacheModule, AuthModule, PlayersModule]});

  SwaggerModule.setup('api', app, document);
  if (configService.isSSLEnabled) {
    console.log('ssl is enabled');
    const httpsOptions = {
      key: fs.readFileSync(configService.privateKey),
      cert: fs.readFileSync(configService.certificate),
    };
    await app.init();
    await https.createServer(httpsOptions, instance).listen(3000);
  } else {
    await app.listen(3000);
  }
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
