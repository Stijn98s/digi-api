import { Module } from '@nestjs/common';
import { OrganismsController } from './organisms.controller';
import { Organism } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrganismsRepository } from './organisms.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypegooseModule.forFeature(Organism), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrganismsController],
  providers: [OrganismsRepository],
  exports: [OrganismsRepository],
})
export class OrganismsModule {}
