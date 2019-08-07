import { Organism } from '../../models';
import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class OrganismPageDto extends PageDto<Organism> {
  @ApiModelProperty({ type: [Organism] })
  data: Organism[];
}
