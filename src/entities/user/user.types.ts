import {Role} from './permissions';

export type UserData = {
  id: number;
  name: string;
  email: string;
  role_id: Role;
  is_new_customer: boolean;
  two_factor_paired: boolean;
};
