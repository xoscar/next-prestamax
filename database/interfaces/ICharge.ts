import { ObjectId } from 'mongodb';

export interface IRawCharge {
  _id?: ObjectId;
  id: ObjectId;
  amount: number;
  description: string;
  paid: boolean;
  created: string;
  paid_date?: string;
  expiration_date: string;
  client_id?: ObjectId;
  user_id?: ObjectId;
}

export interface ISerializedCharge {
  id?: ObjectId;
  amount: number;
  description: string;
  paid: boolean;
  created: Date;
  paid_date?: Date;
  expiration_date: Date;
}
