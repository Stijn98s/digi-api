import { ApiModelProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateDto {
  @ApiModelProperty({ format: 'date', type: 'string' })
  @IsDateString()
  date: string;

  get dateObject() {
    return new Date(this.date);
  }
}


