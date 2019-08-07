import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { extractIncludeVals } from './stringManipulators';
import { FilterDto } from './FilterDto';

export class QueryDto extends FilterDto {

  @IsOptional()
  @IsNumber()
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false, default: 1 })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(value => Number(value))
  @ApiModelProperty({ required: false, default: 20 })
  pageSize?: number = 20;

  @IsOptional()
  @IsString({ each: true })
  @Transform(extractIncludeVals)
  @ApiModelProperty({ type: [String], required: false })
  include?: string[];

  get selectorString() {
    if (!this.include) { return null; }
    return this.include.join(' ');
  }
}
