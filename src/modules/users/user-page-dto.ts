import { User } from '../../models';
import { PageDto } from '../../bases/PageDto';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserPageDto extends PageDto<User> {
  @ApiModelProperty({ type: [User] })
  data: User[];
}
