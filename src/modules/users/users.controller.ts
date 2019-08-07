import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { ControllerInterface } from '../../bases/controller.interface';
import { User } from '../../models';
import { QueryDto } from '../../utils/QueryDto';
import { ApiOkResponse, ApiUseTags, ApiBearerAuth, ApiConflictResponse, ApiProduces } from '@nestjs/swagger';
import { UserPageDto } from './user-page-dto';
import { UsersRepository } from './users.repository';
import { Roles } from '../../decorators';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JWTDto } from '../auth/JWTDto';
import { SignUpDto } from '../auth/signUpDto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
@ApiUseTags('Users')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController{
  constructor(private repository: UsersRepository, private userService: UsersService) {
  }

  @Get()
  @ApiOkResponse({ description: 'OK', type: UserPageDto })
  get(@Query() queryDto: QueryDto): Promise<UserPageDto> {
    return this.repository.find(queryDto);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'OK', type: User })
  getOne(@Param('id') id: string): Promise<User> {
    return this.repository.get(id);
  }



  @Put('/:id')
  edit(@Param('id') id: string, @Body() entity: User): Promise<User> {
    return this.repository.edit(id, entity);
  }

  @ApiProduces('application/json')
  @ApiOkResponse({ description: 'OK', type: User })
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  async create(@Body() {name,password}: SignUpDto) {
    return await this.userService.createLocal(name, password);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.repository.delete(id);
  }

}
