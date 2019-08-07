import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class AppSignUpDto {

  @IsNotEmpty()
  @ApiModelProperty({
    required: true,
    example: 'Gertje',
  })
  name: string;
}
