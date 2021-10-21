import { ObjectId } from 'mongodb';
export interface IRawCounter {
  id?: ObjectId;
  count: number;
  name: string;
}

export interface ISerializedCounter {
  id?: ObjectId;
  count: number;
  name: string;
}
