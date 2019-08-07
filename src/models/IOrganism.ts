import { IModel } from '../bases/IModel';

export interface IOrganism extends IModel {
  name: string;
  description: string;
  image: string;
}
