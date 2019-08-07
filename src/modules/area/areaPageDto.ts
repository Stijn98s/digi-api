import { Area } from '../../models/area';
import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class AreaPageDto extends PageDto<Area> {
  @ApiModelProperty({ type: [Area] })
  data: Area[];
}
