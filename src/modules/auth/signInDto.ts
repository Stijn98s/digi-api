import { ApiModelProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  password: string;

}
