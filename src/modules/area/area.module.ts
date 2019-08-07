import { Module } from '@nestjs/common';
import { AreasController } from './area.controller';
import { Area } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { AreasRepository } from './area.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypegooseModule.forFeature(Area), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AreasController],
  providers: [AreasRepository],
  exports: [AreasRepository],
})
export class AreasModule {}
