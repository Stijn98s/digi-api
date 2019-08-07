import { BaseRepository } from '../../bases/baseRepository';
import { Area } from '../../models/area';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';
import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import areas from '../../utils/seedData/areas';
import { QueryDto } from '../../utils/QueryDto';

@Injectable()
export class AreasRepository extends BaseRepository<Area> implements OnApplicationBootstrap {

  constructor(@InjectModel(Area) model: ModelType<Area>, private configService: ConfigService) {
    super(model);
  }

  async recalculateArea(id, catchzones) {
    const query = new QueryDto();
    query.filter = { _id: id };
    const result = await this.find(query);
    const area = result.data[0];

    const lat = [];
    const lon = [];

    catchzones.data.forEach((element) => {
      lat.push(element.lat);
      lon.push(element.lon);
    });

    if (lat.length > 0) {
      area.lat1 = Math.max(...lat);
      area.lon1 = Math.max(...lon);
      area.lat2 = Math.min(...lat);
      area.lon2 = Math.min(...lon);
    } else {
      area.lat1 = 0;
      area.lon1 = 0;
      area.lat2 = 0;
      area.lon2 = 0;
    }

    await this.edit(area.name, area);
  }

  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      await this.bulkUpsert(areas as Area[]);
    }
  }
}
