import { ObjectID } from 'typeorm';

export interface IRawUser {
  id?: ObjectID;
  username: string;
  password: string;
  name: string;
  token: string;
  role: string;
}

export interface ISerializedUser {
  id?: ObjectID;
  username: string;
  name: string;
  role: string;
}
