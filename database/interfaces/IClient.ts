import { ObjectID } from 'typeorm';

export interface IRawClient {
  id?: ObjectID;
  user_id: ObjectID;
  client_id: string;
  name: string;
  surname: string;
  created: Date;
  updated: Date;
  address: string;
  phone: string;
  search: Array<string>;
}

export interface ISerializedClient {
  id?: ObjectID;
  user_id?: ObjectID;
  name: string;
  surname: string;
  created: Date;
  updated: Date;
  address: string;
  phone: string;
  client_id: string;
}
