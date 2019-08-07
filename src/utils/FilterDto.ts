import { IsOptional, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { extractFilterVals } from './stringManipulators';
import { FilterParamValidator } from './FilterParamValidator';
import * as mongoose from 'mongoose';

export class FilterDto {

  @IsOptional()
  @Validate(FilterParamValidator)
  @Transform(extractFilterVals)
  // tslint:disable-next-line:max-line-length
  @ApiModelProperty({ type: [String], required: false, description: 'pass in field:value field is a field on the model, value is string contained in the property of the model' })
  filter?: any;

  get regexQuery() {
    if (!this.filter) { return {}; }
    const outObj = {};
    Object.assign(outObj, this.filter);
    Object.keys(outObj).forEach(el => {
      if (outObj[el] === 'null' || outObj[el] === '' || outObj[el] === null) {
        outObj[el] = null;
      } else {
        if (outObj[el].match(/^[0-9a-fA-F]{24}$/)) {
          outObj[el] = new mongoose.Types.ObjectId(outObj[el]);
        } else {
          outObj[el] = RegExp(outObj[el]);
        }
      }
    });
    return outObj;
  }
}
