import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { Player } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiBearerAuth, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { PlayerPageDto } from './playerPageDto';
import { PlayersRepository } from './players.repository';
import { Roles, User } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('players')
@ApiUseTags('Players')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard(), RolesGuard)
export class PlayersController implements ControllerInterface<Player> {
  constructor(private repository: PlayersRepository) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: PlayerPageDto })
  get(@Query() queryDto: QueryDto): Promise<PlayerPageDto> {

    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: Player })
  getOne(@Param('id') id: string): Promise<Player> {
    return this.repository.get(id);
  }

  @Post()
  create(@Body() entity: Player): Promise<Player> {
    return this.repository.create(entity);
  }

  @Roles('user')
  @Put('/me')
  editSelf(@Body() entity: Player, @User() { name }) {
    return this.repository.edit(name, entity);
  }


  @Put('/:id')
  edit(@Param('id') id: string, @Body() entity: Player): Promise<Player> {
    return this.repository.edit(id, entity);
  }

  @Roles('user')
  @Get('/:id/friends')
  async getFriends(@Param('id') id: string) {
    const player = await this.repository.get(id);

    return await Promise.all(player.friends.map(async (element) => {
      const query = new QueryDto();
      query.filter = { _id: element.toString() };
      const response = await this.repository.find(query);
      return response.data[0];
    }));
  }


  @Roles('user')
  @Post('/:id/friends/:friend')
  async addFriend(@Param('id') id: string, @Param('friend') friend: string) {
    const player = await this.repository.get(id);
    const playerfriend = await this.repository.get(friend);

    // @ts-ignore
    player.friends.push(playerfriend.id);
    player.friends = player.friends
      .filter((value, index, array) => {
        return array.map(value1 => value1.toString()).indexOf(value.toString()) === index;
      });

    return this.repository.edit(id, player);
  }


  @Delete('/:id/friends/:friend')
  async removeFriend(@Param('id') id: string, @Param('friend') friend: string) {
    const player = await this.repository.get(id);
    const playerfriend = await this.repository.get(friend);

    player.friends = player.friends.filter((value, index, array) => {
      return value.toString() !== playerfriend.id.toString();
    });
    return this.repository.edit(id, player);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.repository.delete(id);
  }
}
