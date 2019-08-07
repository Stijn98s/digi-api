import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { InstanceType } from 'typegoose';
import { User } from '../../models/user';
import { BaseRepository } from '../../bases/baseRepository';
import * as mongoose from 'mongoose';
import { ConfigService } from '../../config/config.service';
import { LocalUserSchema, Role } from '../../models';

@Injectable()
export class UsersRepository extends BaseRepository<User> implements OnApplicationBootstrap {

  constructor(@InjectModel(User) private usermodel: mongoose.Model<InstanceType<User>> & User & typeof User, private configService: ConfigService) {
    super(usermodel, 'name');
  }

  findByLocalName(name: string) {
    return this.usermodel.findByLocalName(name);
  }

  async edit(id: string, entity: User){
    let findOne = await this.getModel(id);
    findOne.role = entity.role;
    findOne.setPass(entity.local.password);

    await findOne.save();
    return findOne.toObject();
  }


  async onApplicationBootstrap() {
    if (this.configService.isDevelopment) {
      let user = await this.usermodel.findOne({'name': 'seedUser'}).exec();
      if(!user){
        const user = new this.usermodel({});
        user.name = 'seedUser';
        user.role = Role.ADMIN;
        user.local = new LocalUserSchema('string', 'string');
        user.save();
      }
    }
  }


}
