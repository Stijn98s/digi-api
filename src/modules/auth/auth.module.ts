import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PlayersModule, UsersModule } from '..';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PlayerLocalStrategy } from './player.local.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthConfigService } from '../../config/auth-config.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PlayersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PlayerLocalStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {
}
