import { Role } from './role';
import { LocalUserSchema } from './localUserSchema';

export interface IUser {
  id: string;
  name: string;
  role: Role;
  local: LocalUserSchema;
}
