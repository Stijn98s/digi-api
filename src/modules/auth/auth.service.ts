import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../config/config.service';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from './signUpDto';
import { PlayersService } from '../players/players.service';
import { PlayersRepository } from '../players/players.repository';
import { UsersService } from '../users/users.service';
import { AppSignUpDto } from './app.signup.dtto';

@Injectable()
export class AuthService {

  constructor(private playerService: PlayersService, private configService: ConfigService,
              private playerRepository: PlayersRepository, private userService: UsersService, private userRepository: UsersRepository) {
  }

  async getLocalUser(name: string, password: string): Promise<string> {
    const user = await this.userRepository.findByLocalName(name);
    if (user && user.isValidPassword(password)) {
      return this.getJWT(user);
    }
    throw new UnauthorizedException('Combination user/password invalid');
  }

  private getJWT({ name, role}: {name, role?}) {
    const payload = {
      name,
      role,
    };
    return sign(payload, this.configService.secretKey, { expiresIn: this.configService.issueTime });
  }

  async getLocalPlayer(name: string, password: string): Promise<string> {
    const user = await this.playerRepository.findByLocalName(name);
    if (user && user.isValidPassword(password)) {
      user.role = 'user';
      return this.getJWT(user);
    }
    throw new UnauthorizedException('Combination user/password invalid');
  }

  async registerApp({ name }: AppSignUpDto) {
    const user = await this.playerRepository.findByLocalName(name);
    if (user) {
      throw new ConflictException('Name already in use');
    }
    const newUser = await this.playerService.createLocal(name);
    newUser.role = 'user';
    newUser.jwt = this.getJWT(newUser);
    return newUser;
  }

  async registerAndGetJWT({ name, password }: SignUpDto): Promise<any> {
    const user = await this.userRepository.findByLocalName(name);
    if (user) {
      throw new ConflictException('Name already in use');
    }
    const newUser = await this.userService.createLocal(name, password);
    return this.getJWT(newUser);
  }

}
