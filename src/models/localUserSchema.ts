import { prop } from 'typegoose';
import * as bcrypt from 'bcryptjs';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LocalUserSchema {
  constructor(name?: string, password?: string) {
    if (name !== undefined && password !== undefined) {
      this.name = name;
      this.password = bcrypt.hashSync(password);
    }
  }

  @IsString()
  @ApiModelProperty()
  @prop()
  name: string;

  @MinLength(6)
  @IsString()
  @ApiModelProperty()
  @prop()
  password: string;

}
