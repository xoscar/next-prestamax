import { ObjectID } from 'typeorm';

export interface IRawCharge {
  _id?: ObjectID;
  id: ObjectID;
  amount: number;
  description: string;
  paid: boolean;
  created: Date;
  paid_date?: Date;
  expiration_date: Date;
  client_id?: ObjectID;
  user_id?: ObjectID;
}

export interface ISerializedCharge {
  id?: ObjectID;
  amount: number;
  description: string;
  paid: boolean;
  created: Date;
  paid_date?: Date;
  expiration_date: Date;
}
