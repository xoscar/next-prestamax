import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { IRawUser, ISerializedUser } from '../interfaces/IUser';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column('string')
  name: string;

  @Column('string')
  username: string;

  @Column('string')
  password: string;

  @Column('string')
  token: string;

  @Column('string')
  role: string;

  constructor(rawUser: IRawUser) {
    const { name, username, role, password, token } = rawUser || {};

    this.name = name;
    this.username = username;
    this.role = role;
    this.password = password;
    this.token = token;
  }

  static validateSignUp(query: IRawUser): Array<string> {
    const errors = [];
    const { username, password } = query || {};
    if (isEmpty(query)) errors.push('Emtpy request');

    if (!username || !validator.isAlphanumeric(username) || username.length < 4)
      errors.push('Not a valid username.');

    if (!password || password.length < 6) errors.push('Not a valid password.');
    return errors;
  }

  static validateLogIn(query: IRawUser): Array<string> {
    const errors = [];
    const { username, password } = query || {};

    if (isEmpty(query)) errors.push('Emtpy request');

    if (!username) errors.push('El usuario no puede estar vacío.');

    if (!password) errors.push('La contraseña no puede estar vacía.');
    return errors;
  }

  serialize(): ISerializedUser {
    return {
      username: this.username,
      name: this.name,
      role: this.role,
    };
  }
}
