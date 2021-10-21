import { ObjectId } from 'mongodb';

export interface IRawPayment {
  _id?: ObjectId;
  amount: number;
  created: Date;
}

export interface ISerializedPayment {
  id?: ObjectId;
  amount: number;
  created: Date;
}
