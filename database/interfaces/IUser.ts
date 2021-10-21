import { ObjectId } from 'mongodb';

export interface IRawUser {
  id?: ObjectId;
  username: string;
  password: string;
  name: string;
  token: string;
  role: string;
}

export interface ISerializedUser {
  id?: ObjectId;
  username: string;
  name: string;
  role: string;
}
