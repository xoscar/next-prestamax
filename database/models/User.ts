import { Entity, ObjectIdColumn, Column } from 'typeorm';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { IRawUser, ISerializedUser } from '../interfaces/IUser';
import { ObjectId } from 'mongodb';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id?: ObjectId;

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
    const { id, name, username, role, password, token } = rawUser || {};

    this.id = id;
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
      id: this.id,
      username: this.username,
      name: this.name,
      role: this.role,
    };
  }
}
