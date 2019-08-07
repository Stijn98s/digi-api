import { ApiModelProperty } from '@nestjs/swagger';

export class NewPlayerDto {

  @ApiModelProperty({ readOnly: true })
  pass: string;

  @ApiModelProperty({ readOnly: true })
  name: string;

  @ApiModelProperty({ readOnly: true })
  jwt: string;
  role?: string;

  constructor(name: string, pass: string) {
    this.name = name;
    this.pass = pass;
  }

}
