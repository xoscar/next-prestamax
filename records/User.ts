import { Record } from 'immutable';

export type UserType = {
  id: string;
  name: string;
  username: string;
  role: string;
  jwt: string;
};

const defaultValues = {
  id: '',
  name: '',
  username: '',
  role: '',
  jwt: '',
};

class User extends Record<UserType>(defaultValues) {
  static createFromRaw(rawUser: UserType): User {
    return new this(rawUser);
  }
}

export default User;
