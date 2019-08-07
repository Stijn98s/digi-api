import { InstanceType, Typegoose } from 'typegoose';
import { PageDto } from './PageDto';
import { QueryDto } from '../utils/QueryDto';
import { IModel } from './IModel';
import * as mongoose from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { FilterDto } from '../utils/FilterDto';

export class BaseRepository<T extends Typegoose | IModel> {
  constructor(
    protected readonly model: mongoose.Model<InstanceType<T>> & T,
    private keyName = 'name',
  ) {}

  async get(id: string): Promise<T> {
    return (await this.getModel(id)).toObject();
  }

  async edit(id: string, entity: T): Promise<T> {
    const query: any = {};
    query[this.keyName] = id;
    delete entity[this.keyName];
    const returnEntity = await this.model.updateOne(query, entity).exec();
    if (returnEntity.n !== 1) {
      throw new NotFoundException();
    }
    return entity;
  }

  async create(entity: T): Promise<T> {
    try {
      const document1 = await new this.model(entity).save();
      return document1.toObject();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('key is already in use');
      }
      throw e;
    }
  }

  async delete(id: string) {
    const query: any = {};
    query[this.keyName] = id;
    return await this.model
      .updateOne(query, { $set: { deleted: true } })
      .exec();
  }

  async find({
    page,
    pageSize,
    include,
    selectorString,
    regexQuery,
  }: QueryDto): Promise<PageDto<T>> {
    const query = this.model
      .find(regexQuery)
      .where('deleted')
      .equals(false)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    if (include && include.length > 0) {
      query.select(selectorString);
    }
    const count = await this.model.find(regexQuery).where('deleted').equals(false).countDocuments(regexQuery).exec();
    const results = (await query.exec()).map(el => el.toObject());
    return new PageDto(results, page, pageSize, count);
  }

  async getNewItems(date: Date, filterDto: FilterDto): Promise<T[]> {
    const query = await this.model.find(Object.assign({updatedAt: { $gt: date }}, filterDto.filter));
    return await query.map(el => el.toObject());
  }

  async bulkUpsert(entities: T[]) {
    for (const entity of entities) {
      const query = {};
      query[this.keyName] = entity[this.keyName];
      const newEntity = new this.model(entity);
      await this.model.findOneAndUpdate(query, newEntity, { upsert: true });
    }
  }

  protected async getModel(id: string) {
    const query: any = {};
    query[this.keyName] = id;
    const instance = await this.model
      .findOne(query)
      .where('deleted')
      .equals(false)
      .exec();
    if (instance == null) {
      throw new NotFoundException();
    }
    return instance;
  }
}
