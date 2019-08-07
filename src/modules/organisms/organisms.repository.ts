import { BaseRepository } from '../../bases/baseRepository';
import { Organism } from '../../models';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import organisms from '../../utils/seedData/organisms';

@Injectable()
export class OrganismsRepository extends BaseRepository<Organism> implements OnApplicationBootstrap {
  constructor(@InjectModel(Organism) model: ModelType<Organism>, private configService: ConfigService) {
    super(model);
  }

  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      await this.bulkUpsert(organisms as Organism[]);
    }
  }
}
