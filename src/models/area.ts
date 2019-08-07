import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { GetModelForClassOptions, prop, Typegoose } from 'typegoose';
import { IModel } from '../bases/IModel';
import globalSchemaSettings from './globalSchemaSettings';
import { IArea } from './IArea';
import { Type } from 'class-transformer';

export class Area extends Typegoose implements IModel, IArea {

  getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, { ...options, ...globalSchemaSettings });
  }

  setModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.setModelForClass(t, {...options, ...globalSchemaSettings});
  }

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({required: true})
  @prop({ unique: true, required: true })
  name: string;

  @ApiModelPropertyOptional({readOnly: true})
  @IsNotEmpty()
  @IsNumber()
  @prop()
  lat1: number = 0;

  @ApiModelPropertyOptional({readOnly: true})
  @IsNotEmpty()
  @IsNumber()
  @prop()
  lon1: number = 0;

  @ApiModelPropertyOptional({readOnly: true})
  @IsNotEmpty()
  @IsNumber()
  @prop()
  lat2: number = 0;

  @ApiModelPropertyOptional({readOnly: true})
  @IsNotEmpty()
  @IsNumber()
  @prop()
  lon2: number = 0;

  @prop({ required: true, default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelProperty({readOnly: true, type: String})
  updatedAt: string;

}
