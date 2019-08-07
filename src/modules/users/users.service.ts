import { Injectable } from '@nestjs/common';
import { User } from '../../models/user';
import { UsersRepository } from './users.repository';
import { LocalUserSchema } from '../../models/localUserSchema';
import { Role } from '../../models';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createLocal(name: string, password: any) {
    const newUser = new User();
    newUser.name = name;
    newUser.role = Role.ADMIN;
    newUser.local = new LocalUserSchema(name, password);
    return await this.userRepository.create(newUser);
  }
}
