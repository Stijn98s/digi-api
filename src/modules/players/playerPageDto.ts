import { Player } from '../../models/player';
import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class PlayerPageDto extends PageDto<Player> {
  @ApiModelProperty({ type: [Player] })
  data: Player[];
}
