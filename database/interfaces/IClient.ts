import { ObjectId } from 'mongodb';

export interface IRawClient {
  id?: ObjectId;
  user_id: ObjectId;
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
  id?: ObjectId;
  user_id?: ObjectId;
  name: string;
  surname: string;
  created: Date;
  updated: Date;
  address: string;
  phone: string;
  client_id: string;
}
