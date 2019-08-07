import { prop, Typegoose, Ref, arrayProp, pre, GetModelForClassOptions } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Tag } from './tag';
import globalSchemaSettings from './globalSchemaSettings';
import { IModel } from '../bases/IModel';
import { IOrganism } from 'src/models';
import { Type } from 'class-transformer';

const autoPopulate = function(next) {
  this.populate('tags');
  next();
};

@pre<Organism>('find', autoPopulate)
@pre<Organism>('findOne', autoPopulate)
export class Organism extends Typegoose implements IModel, IOrganism {

  getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, { ...options, ...globalSchemaSettings });
  }

  setModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.setModelForClass(t, {...options, ...globalSchemaSettings});
  }

  @IsNotEmpty()
  @IsString()
  @prop({ unique: true, required: true })
  @ApiModelProperty({required: true})
  name: string;

  @IsNotEmpty()
  @IsString()
  @prop({ required: true })
  @ApiModelProperty({required: true})
  description: string;

  @IsNotEmpty()
  @IsString()
  @prop({ required: true })
  @ApiModelProperty({required: true})
  image: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({isArray: true, type: Tag})
  @arrayProp({ itemsRef: Tag })
  tags?: Array<Ref<Tag>>;

  @prop({ default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelProperty({readOnly: true, type: String})
  updatedAt: string;

}
