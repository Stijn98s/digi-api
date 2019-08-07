import { AreasRepository } from '../area/area.repository';
import { Area, CatchZone, Organism, Player, Tag } from '../../models';
import { PlayersRepository } from '../players/players.repository';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { CatchZonesRepository } from '../catchzones/catchzone.repository';
import { AuthGuard } from '@nestjs/passport';
import { DateDto } from './date.dto';
import { FilterDto } from '../../utils/FilterDto';
import { OrganismsRepository } from '../organisms/organisms.repository';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { TagsRepository } from '../tags/tags.repository';


@Roles('admin', 'user')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiUseTags('incremental')
@Controller('incremental')
export class FetchCacheController {
  constructor(
    private organisms: OrganismsRepository,
    private catchZones: CatchZonesRepository,
    private tags: TagsRepository,
    private areas: AreasRepository,
    private players: PlayersRepository,
  ) {
  }

  @ApiOkResponse({ isArray: true, type: Organism })
  @Get('/organism')
  async getOrganisms(@Query() date: DateDto, @Query() filterDto: FilterDto) {
    return await this.organisms.getNewItems(date.dateObject, filterDto);
  }

  @ApiOkResponse({ isArray: true, type: CatchZone })
  @Get('/catchzone')
  async getCatchZones(@Query() date: DateDto, @Query() filterDto: FilterDto) {
    return await this.catchZones.getNewItems(date.dateObject, filterDto);
  }

  @ApiOkResponse({ isArray: true, type: Tag })
  @Get('/tag')
  async getTags(@Query() date: DateDto, @Query() filterDto: FilterDto) {
    return await this.tags.getNewItems(date.dateObject, filterDto);
  }

  @ApiOkResponse({ isArray: true, type: Player })
  @Get('/players')
  async getPlayers(@Req() { user: { name } }) {
    return await this.players.getNewItemsbyName(name);
  }

  @ApiOkResponse({ isArray: true, type: Area })
  @Get('/area')
  async getRoutes(@Query() date: DateDto, @Query() filterDto: FilterDto) {
    return await this.areas.getNewItems(date.dateObject, filterDto);
  }
}
