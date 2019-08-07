import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tag } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { TagsRepository } from './tags.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypegooseModule.forFeature(Tag), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TagsController],
  providers: [TagsRepository],
  exports: [TagsRepository],
})
export class TagsModule {}
