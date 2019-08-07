import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { Player } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { PlayersRepository } from './players.repository';
import { PassportModule } from '@nestjs/passport';
import { PlayersService } from '../players/players.service';

@Module({
  imports: [TypegooseModule.forFeature(Player), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PlayersController],
  providers: [PlayersRepository, PlayersService],
  exports: [PlayersRepository, PlayersService],
})
export class PlayersModule {}
