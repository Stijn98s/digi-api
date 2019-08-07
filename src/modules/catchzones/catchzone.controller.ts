import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, forwardRef, Inject, Logger } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { CatchZone } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiOkResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CatchZonePageDto } from './catchzonePageDto';
import { CatchZonesRepository } from './catchzone.repository';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { AreasRepository } from '../area/area.repository';

@Controller('catchzones')
@ApiUseTags('Catchzones')
@ApiBearerAuth()
@Roles('admin', 'user')
@UseGuards(AuthGuard(), RolesGuard)
export class CatchZonesController implements ControllerInterface<CatchZone> {
  constructor(private repository: CatchZonesRepository, private arearepository: AreasRepository) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: CatchZonePageDto })
  get(@Query() queryDto: QueryDto): Promise<CatchZonePageDto> {
    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: CatchZone })
  getOne(@Param('id') id: string): Promise<CatchZone> {
    return this.repository.get(id);
  }


  @ApiOkResponse({ description: 'OK', type: CatchZone })
  @Post()
  async create(@Body() entity: CatchZone): Promise<CatchZone> {
    const result = this.repository.create(entity);

    const query = new QueryDto();
    query.filter = { area: entity.area.toString() };

    const catchzones = await this.repository.find(query);
    await this.arearepository.recalculateArea(entity.area.toString(), catchzones);

    return result;
  }

  @ApiOkResponse({ description: 'OK', type: CatchZone })
  @Put('/:id')
  async edit(@Param('id') id: string, @Body() entity: CatchZone): Promise<CatchZone> {
    const result = this.repository.edit(id, entity);

    const query = new QueryDto();
    query.filter = { area: entity.area.toString() };

    const catchzones = await this.repository.find(query);
    await this.arearepository.recalculateArea(entity.area.toString(), catchzones);

    return result;
  }

  @Delete('/:id')
  async destroy(@Param('id') id: string) {
    const catchzone = await this.repository.get(id);
    const result = this.repository.delete(id);

    const query = new QueryDto();
    // @ts-ignore
    query.filter = { area: catchzone.area.toString() };

    const catchzones = await this.repository.find(query);
    // @ts-ignore
    await this.arearepository.recalculateArea(catchzone.area.toString(), catchzones);

    return result;
  }

}
