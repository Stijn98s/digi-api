import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';

@Injectable()
export class PlayerLocalStrategy extends PassportStrategy(Strategy, 'applocal') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any, name: string, password: string, done: { (arg0: any, arg1: User |boolean) }) {

    try {
      const jwt: string = await this.authService.getLocalPlayer(name, password);
      return {
        jwt,
      };
    } catch (err) {
      return done(err, false);
    }
  }
}
