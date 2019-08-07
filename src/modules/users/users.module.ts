import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { User } from '../../models';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypegooseModule.forFeature(User), PassportModule.register({ defaultStrategy: 'jwt' }), forwardRef(() => AuthModule)],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
