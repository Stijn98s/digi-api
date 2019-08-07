import { BaseRepository } from '../../bases/baseRepository';
import { CatchZone } from '../../models/catchzone';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import catchzones from '../../utils/seedData/catchzones';
import { FilterDto } from '../../utils/FilterDto';

@Injectable()
export class CatchZonesRepository extends BaseRepository<CatchZone> implements OnApplicationBootstrap {

  constructor(@InjectModel(CatchZone) model: ModelType<CatchZone>, private configService: ConfigService) {
    super(model);
  }

  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      await this.bulkUpsert(catchzones as CatchZone[]);
    }
  }

  async getNewItems(date: Date, filterDto: FilterDto): Promise<CatchZone[]> {
    const catchZones = await super.getNewItems(date, filterDto);
    return catchZones.filter(value => value.area);
  }
}
