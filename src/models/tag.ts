import { GetModelForClassOptions, prop, Typegoose } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches } from 'class-validator';
import { IModel } from '../bases/IModel';
import globalSchemaSettings from './globalSchemaSettings';
import { ITag } from './ITag';
import { Type } from 'class-transformer';

export class Tag extends Typegoose implements IModel, ITag {

  @ApiModelProperty({ readOnly: true })
  id: string;

  getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, { ...options, ...globalSchemaSettings });
  }

  setModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.setModelForClass(t, {...options, ...globalSchemaSettings});
  }

  @ApiModelProperty({required: true})
  @prop({ unique: true, required: true })
  @IsString()
  @Matches(/^[^/]+$/)
  name: string;

  @ApiModelProperty({required: true})
  @prop({ required: true })
  @IsString()
  description: string;

  @ApiModelProperty({required: true})
  @prop({ required: true })
  @IsNumber()
  points: number;

  @ApiModelProperty({required: true})
  @prop({ required: true })
  @IsString()
  color: string;

  @prop({ required: true, default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelProperty({readOnly: true, type: String})
  updatedAt: string;

  @ApiModelProperty({required: true})
  @prop({ required: true })
  @IsString()
  image: string;
}
