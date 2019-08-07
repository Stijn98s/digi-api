import { Injectable } from '@nestjs/common';
import { Player, User } from '../../models';
import { NewPlayerDto } from '../users/newPlayerDto';
import { PlayersRepository } from '../players/players.repository';
import * as randomstring from 'randomstring';

@Injectable()
export class PlayerService {
  constructor(private playerRepository: PlayersRepository){

  }


  async createLocal(name: string) {

    const pass: string = randomstring.generate(32).toString();
    const newUser = new Player();
    newUser.name = name;
    newUser.password = await Player.hash(pass);
    await this.playerRepository.create(newUser);
    return new NewPlayerDto(name, pass);
  }
}
