import validator from 'validator';
import { isEmpty } from 'lodash';
import PrismaClient from '@prisma/client';

type User = PrismaClient.User & {
  jwt: string;
};
export type TPartialUser = Partial<User>;

const User = ({
  id = '',
  password = '',
  username = '',
  v = 0,
  token = '',
  role = '',
  jwt = '',
}: TPartialUser = {}): User => ({
  id,
  password,
  username,
  v,
  token,
  role,
  jwt,
});

User.validateSignup = (query: TPartialUser = {}): Array<string> => {
  const errors = [];
  const { username, password } = query || {};
  if (isEmpty(query)) errors.push('Emtpy request');

  if (!username || !validator.isAlphanumeric(username) || username.length < 4)
    errors.push('Not a valid username.');

  if (!password || password.length < 6) errors.push('Not a valid password.');
  return errors;
};

User.validateLogin = (username: string, password: string): Array<string> => {
  const errors = [];

  if (!username) errors.push('El usuario no puede estar vacío.');

  if (!password) errors.push('La contraseña no puede estar vacía.');
  return errors;
};

export default User;
