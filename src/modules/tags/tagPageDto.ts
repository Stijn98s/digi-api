import { Tag } from '../../models/tag';


import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class TagPageDto extends PageDto<Tag> {
  @ApiModelProperty({ type: [Tag] })
  data: Tag[];
}
