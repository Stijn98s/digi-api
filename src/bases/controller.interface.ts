import { Typegoose } from 'typegoose';
import { QueryDto } from '../utils/QueryDto';
import { PageDto } from './PageDto';

export interface ControllerInterface<T extends Typegoose> {

  get(queryDto: QueryDto): Promise<PageDto<T>>;

  getOne(id: string): Promise<T>;

  create(model: T): Promise<T>;

  edit(id: string, model: T): Promise<T>;

  destroy(id: string): Promise<{ ok?: number; n?: number }>;
}
