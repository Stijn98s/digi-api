import { Module } from '@nestjs/common';
import { CatchZonesController } from './catchzone.controller';
import { CatchZone, Area } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { CatchZonesRepository } from './catchzone.repository';
import { PassportModule } from '@nestjs/passport';
import { AreasModule } from '../area/area.module';
import { AreasRepository } from '../area/area.repository';

@Module({
  // tslint:disable-next-line:max-line-length
  imports: [TypegooseModule.forFeature(CatchZone), PassportModule.register({ defaultStrategy: 'jwt' }), AreasModule],
  controllers: [CatchZonesController],
  providers: [CatchZonesRepository, AreasRepository],
  exports: [CatchZonesRepository],
})
export class CatchZonesModule {}
