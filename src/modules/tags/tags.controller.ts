import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { Tag } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiOkResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { TagPageDto } from './tagPageDto';
import { TagsRepository } from './tags.repository';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
@ApiUseTags('Tags')
@ApiBearerAuth()
@Roles('admin', 'user')
@UseGuards(AuthGuard(), RolesGuard)
export class TagsController implements ControllerInterface<Tag> {
  constructor(private repository: TagsRepository) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: TagPageDto })
  get(@Query() queryDto: QueryDto): Promise<TagPageDto> {

    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: Tag })
  getOne(@Param('id') id: string): Promise<Tag> {
    return this.repository.get(id);
  }

  @Post()
  create(@Body() entity: Tag): Promise<Tag> {
    return this.repository.create(entity);
  }

  @Put('/:id')
  edit(@Param('id') id: string, @Body() entity: Tag): Promise<Tag> {
    return this.repository.edit(id, entity);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.repository.delete(id);
  }

}
