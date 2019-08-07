import { CatchZone } from '../../models/catchzone';
import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class CatchZonePageDto extends PageDto<CatchZone> {
  @ApiModelProperty({ type: [CatchZone] })
  data: CatchZone[];
}
