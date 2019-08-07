import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { Organism } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiOkResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrganismPageDto } from './organismPageDto';
import { OrganismsRepository } from './organisms.repository';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('organisms')
@ApiUseTags('Organisms')
@ApiBearerAuth()
@Roles('admin', 'user')
@UseGuards(AuthGuard(), RolesGuard)
export class OrganismsController implements ControllerInterface<Organism> {
  constructor(private repository: OrganismsRepository) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: OrganismPageDto })
  get(@Query() queryDto: QueryDto): Promise<OrganismPageDto> {

    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: Organism })
  getOne(@Param('id') id: string): Promise<Organism> {
    return this.repository.get(id);
  }

  @Post()
  create(@Body() entity: Organism): Promise<Organism> {
    return this.repository.create(entity);
  }

  @Put('/:id')
  edit(@Param('id') id: string, @Body() entity: Organism): Promise<Organism> {
    return this.repository.edit(id, entity);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.repository.delete(id);
  }

}
