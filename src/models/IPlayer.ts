import { Ref } from 'typegoose';
import { Organism } from './organism';

export interface IPlayer {
  name: string;
  points: number;
  entities?: Array<Ref<Organism>>;
  password: string;
}
