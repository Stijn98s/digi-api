import { arrayProp, GetModelForClassOptions, instanceMethod, InstanceType, prop, Ref, Typegoose } from 'typegoose';
import { ApiModelProperty , ApiModelPropertyOptional} from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, Min } from 'class-validator';
import { IModel } from '../bases/IModel';
import { Organism } from './organism';
import * as bcrypt from 'bcryptjs';
import { IPlayer } from './IPlayer';
import { Type } from 'class-transformer';

const userSchemaOptions = {
  schemaOptions: {
    toJSON: { virtuals: true }, toObject:
      {
        virtuals: true, transform: (doc, ret) => {
          delete ret._id;
          delete ret.password;
        },
      },
    timestamps: true,

  },
};

export class Player extends Typegoose implements IModel, IPlayer {

  @ApiModelPropertyOptional({ readOnly: true })
  id: string;

  getModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.getModelForClass(t, { ...options, ...userSchemaOptions });
  }

  setModelForClass<T>(t: T, options?: GetModelForClassOptions) {
    return super.setModelForClass(t, { ...options, ...userSchemaOptions });
  }

  @IsNotEmpty()
  @IsString()
  @IsOptional()

  @ApiModelPropertyOptional()
  @prop({ unique: true, required: true })
  name: string;


  @IsNotEmpty()
  @IsString()
  @IsOptional()

  @ApiModelPropertyOptional()
  @prop({ required: true , default: "/assets/img/profilepictures/1.png"})
  image: string;

  @IsNotEmpty()
  @IsOptional()

  @IsNumber()
  @Min(0)
  @ApiModelPropertyOptional()
  @prop({ required: true, default: 0, min: 0 })
  points: number;

  @IsOptional()
  @IsArray()
  @arrayProp({ itemsRef: Organism })
  @ApiModelPropertyOptional({ isArray: true, type: Organism, readOnly: true })
  entities?: Array<Ref<Organism>>;

  @ApiModelPropertyOptional({readOnly: true})
  @prop({ required: true })
  password: string;

  role?: string;
  @IsOptional()
  @IsArray()
  @arrayProp({ itemsRef: Player })
  @ApiModelPropertyOptional({ isArray: true, type: Player, readOnly: true })
  friends?: Array<Ref<Player>>;

  @prop({ required: true, default: false })
  @ApiModelPropertyOptional({ readOnly: true})
  deleted: boolean;

  @Type(() => Date)
  @ApiModelPropertyOptional({readOnly: true, type: String})
  updatedAt: string;

  @instanceMethod
  isValidPassword(this: InstanceType<Player>, password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  static async hash(pass: string) {
    return await bcrypt.hash(pass, 8);
  }
}
