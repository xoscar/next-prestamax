import { ObjectID } from 'typeorm';

export interface IRawCounter {
  id?: ObjectID;
  count: number;
  name: string;
}

export interface ISerializedCounter {
  id?: ObjectID;
  count: number;
  name: string;
}
