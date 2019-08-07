import { Injectable } from '@nestjs/common';
import {JwtOptionsFactory, JwtModuleOptions} from '@nestjs/jwt';
import { ConfigService } from './config.service';

@Injectable()
export class AuthConfigService implements JwtOptionsFactory {

  constructor(private configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secretOrPrivateKey: this.configService.secretKey,
      signOptions: {
        expiresIn: 3600,
      },
    };
  }

}
