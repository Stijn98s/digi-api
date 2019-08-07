import { BaseRepository } from '../../bases/baseRepository';
import { Player } from '../../models';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import players from '../../utils/seedData/players';

@Injectable()
export class PlayersRepository extends BaseRepository<Player> implements OnApplicationBootstrap {

  constructor(@InjectModel(Player) model: ModelType<Player>, private configService: ConfigService) {
    super(model);
  }

  async findByLocalName(name: string) {
    return await this.model.findOne({ name }).exec();
  }

  async getNewItemsbyName(name: string){
    const tour = await this.model.findOne({ name }).populate({
      path: 'friends',
    }).exec();
    if (!tour) {throw new NotFoundException(); }
    return tour.toObject().friends;
  }

  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      await this.bulkUpsert(players as Player[]);
    }
  }
}
