import { ApiModelProperty } from '@nestjs/swagger';

export class JWTDto {
  @ApiModelProperty()
  public jwt: string;

  constructor(jwt) {
    this.jwt = jwt;
  }
}
