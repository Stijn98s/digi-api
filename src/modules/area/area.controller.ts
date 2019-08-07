import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { Area } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiOkResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AreaPageDto } from './areaPageDto';
import { AreasRepository } from './area.repository';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('areas')
@ApiUseTags('Areas')
@ApiBearerAuth()
@Roles('admin', 'user')
@UseGuards(AuthGuard(), RolesGuard)
export class AreasController implements ControllerInterface<Area> {
  constructor(private repository: AreasRepository) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: AreaPageDto })
  get(@Query() queryDto: QueryDto): Promise<AreaPageDto> {
    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: Area })
  getOne(@Param('id') id: string): Promise<Area> {
    return this.repository.get(id);
  }

  @ApiOkResponse({ description: 'OK', type: Area })
  @Post()
  create(@Body() entity: Area): Promise<Area> {
    return this.repository.create(entity);
  }

  @ApiOkResponse({ description: 'OK', type: Area })
  @Put('/:id')
  edit(@Param('id') id: string, @Body() entity: Area): Promise<Area> {
    return this.repository.edit(id, entity);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.repository.delete(id);
  }

}
