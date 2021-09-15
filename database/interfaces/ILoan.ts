import { ObjectID } from 'typeorm';
import { IRawPayment, ISerializedPayment } from './IPayment';

export interface IRawLoan {
  id?: ObjectID;
  client_id?: ObjectID;
  user_id: ObjectID;
  number_id: number;
  amount: number;
  weekly_payment: number;
  file: string;
  description: string;
  finished_date: Date;
  created: Date;
  updated: Date;
  finished: boolean;
  visible: boolean;
  weeks: number;
  expired_date: Date;
  search: Array<string>;
  payments: [IRawPayment];
}

export interface ISerializedLoan {
  id?: ObjectID;
  client_id?: ObjectID;
  number_id: number;
  amount: number;
  description: string;
  weekly_payment: number;
  created: Date;
  updated: Date;
  finished: boolean;
  finished_date: Date;
  visible: boolean;
  weeks: number;
  expired_date: Date;
  expired: boolean;
  current_week: number;
  current_balance: number;
  last_payment?: Date;
  payments: Array<ISerializedPayment>;
}
