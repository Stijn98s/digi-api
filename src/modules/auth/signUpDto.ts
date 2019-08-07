import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {

  @IsNotEmpty()
  @ApiModelProperty({
    required: true,
  })
  name: string;

  @ApiModelProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
  })
  @MinLength(6)
  @MaxLength(20)
  password: string;

}
