import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { CatchZonesModule, TagsModule , OrganismsModule, PlayersModule, UsersModule, AreasModule, AuthModule } from './modules';
import { FetchCacheModule } from './modules/fetch-cache/fetch-cache.module';

@Module({
  imports: [TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri:  config.mongoUrl,
      useNewUrlParser: true,
      connectTimeoutMS: 20000,
    }),
    inject: [ConfigService],
  }),  ConfigModule, TagsModule, OrganismsModule, AreasModule, UsersModule,  PlayersModule, AuthModule, FetchCacheModule, CatchZonesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
