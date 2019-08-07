import { BaseRepository } from '../../bases/baseRepository';
import { Tag } from '../../models/tag';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import tags from '../../utils/seedData/tags';

@Injectable()
export class TagsRepository extends BaseRepository<Tag> implements OnApplicationBootstrap {

  constructor(@InjectModel(Tag) model: ModelType<Tag>, private configService: ConfigService) {
    super(model);
  }

  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      await this.bulkUpsert(tags as Tag[]);
    }
  }
}
