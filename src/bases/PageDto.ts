import { ApiModelProperty } from '@nestjs/swagger';

export class PageDto<T> {

  constructor(results, page, pageSize, count) {
    this.data = results;
    this.page = page;
    this.pageSize = pageSize;

    this.pageCount = Math.ceil(count / pageSize);

  }

  data: T[];

  @ApiModelProperty()
  filter: {};

  @ApiModelProperty()
  pageSize: number;

  @ApiModelProperty()
  page: number;

  @ApiModelProperty()
  pageCount: number;
}
