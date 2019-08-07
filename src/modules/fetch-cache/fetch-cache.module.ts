import { Module } from '@nestjs/common';
import { FetchCacheController } from './fetch-cache.controller';
import { CatchZonesModule } from '..';
import { OrganismsModule, AreasModule, TagsModule, PlayersModule } from '..';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [FetchCacheController],
  imports: [CatchZonesModule, OrganismsModule, TagsModule, AreasModule, PlayersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class FetchCacheModule {}
