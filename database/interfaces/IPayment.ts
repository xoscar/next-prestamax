import { ObjectID } from 'typeorm';

export interface IRawPayment {
  _id?: ObjectID;
  amount: number;
  created: Date;
}

export interface ISerializedPayment {
  id?: ObjectID;
  amount: number;
  created: Date;
}
