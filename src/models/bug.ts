import { prop, Typegoose } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { IModel } from '../bases/IModel';
import { IBug } from './IBug';

export class Bug extends Typegoose implements IModel, IBug {
  @Matches(/^[^/]+$/)
  @IsString()
  @prop({ unique: true, required: true })
  @ApiModelProperty({ required: true })
  name: string;

  @IsString()
  @prop({ required: true })
  @ApiModelProperty({ required: true })
  description: string;

  @prop({ required: true, default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;
}
