import { IsNotEmpty, IsString, IsOptional, IsArray, Min, Max, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { GetModelForClassOptions, prop, Typegoose, arrayProp, Ref, pre } from 'typegoose';
import { IModel } from '../bases/IModel';
import globalSchemaSettings from './globalSchemaSettings';
import { ICatchZone } from './ICatchZone';
import { Organism } from './organism';
import { Area } from './area';
import { Type } from 'class-transformer';

const autoPopulate = function(next) {
  this.populate('organisms');
  next();
};

@pre<CatchZone>('find', autoPopulate)
@pre<CatchZone>('findOne', autoPopulate)
export class CatchZone extends Typegoose implements IModel, ICatchZone {

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

  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty({ required: true })
  @prop({ required: true })
  lon: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty({ required: true })
  @prop({ required: true })
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  @prop({ required: true, min: 1, max: 100})
  @ApiModelProperty({ required: true})
  radius: number;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({isArray: true, type: Organism})
  @arrayProp({ itemsRef: Organism })
  organisms?: Array<Ref<Organism>>;

  @IsOptional()
  @ApiModelProperty({type: Area})
  @prop({ ref: Area })
  area?: Ref<Area>;

  @prop({ required: true, default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelProperty({readOnly: true, type: String})
  updatedAt: string;

}
