import { GetModelForClassOptions, instanceMethod, InstanceType, ModelType, prop, staticMethod, Typegoose } from 'typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocalUserSchema } from './localUserSchema';
import * as bcrypt from 'bcryptjs';
import { Role } from './role';
import { IsString, ValidateNested } from 'class-validator';
import { IUser } from './IUser';
import { Type } from 'class-transformer';

const userSchemaOptions = {
  schemaOptions: {
    toJSON: { virtuals: true }, toObject:
    {
      virtuals: true, transform: (doc, ret) => {
        delete ret._id;
        delete ret.local.password;
      },
    },
  },
};

export class User extends Typegoose implements IUser {

  @ApiModelProperty({ readOnly: true })
  id: string;

  getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, { ...options, ...userSchemaOptions });
  }

  setModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.setModelForClass(t, {...options, ...userSchemaOptions});
  }

  @prop({ required: true, unique: true })
  @ApiModelProperty({ required: false, readOnly: true })
  name: string;

  @IsString()
  @ApiModelProperty({ enum: Role })
  @prop({ required: true, default: Role.USER, enum: Role })
  role: Role;

  @ValidateNested()
  @ApiModelProperty()
  @Type(() => LocalUserSchema)
  @prop()
  local: LocalUserSchema;

  @instanceMethod
  isValidPassword(this: InstanceType<User>, password: string) {
    return bcrypt.compareSync(password, this.local.password);
  }

  @instanceMethod
  public setPass(this: InstanceType<User>, password) {
    this.local.password = bcrypt.hashSync(password);
  }

  @staticMethod
  static async findByLocalName(this: ModelType<User> & typeof User, name: string) {
    return await this.findOne({ 'local.name': name }).exec();
  }

  @prop({ default: false })
  @ApiModelProperty({ required: true, readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelProperty({readOnly: true, type: String})
  updatedAt: string;
}
