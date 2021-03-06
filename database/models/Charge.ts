import isAfter from 'date-fns/isAfter';
import { ObjectId } from 'mongodb';
import { isEmpty } from 'lodash';
import validator from 'validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IRawCharge, ISerializedCharge } from '../interfaces/ICharge';
import isValid from 'date-fns/isValid';

@Entity('charges')
export default class Charge {
  @ObjectIdColumn()
  _id?: ObjectId;

  @ObjectIdColumn()
  id: ObjectId;

  @Column('number')
  amount: number;

  @Column('string')
  description: string;

  @Column('boolean')
  paid: boolean;

  @Column('date')
  created: Date;

  @Column('date')
  paid_date?: Date;

  @Column('date')
  expiration_date: Date;

  @Column('string')
  client_id?: ObjectId;

  @Column('string')
  user_id?: ObjectId;

  constructor(rawCharge: IRawCharge) {
    const {
      amount,
      _id,
      id,
      description,
      created,
      paid,
      paid_date,
      expiration_date,
      client_id,
      user_id,
    } = rawCharge || {};

    this._id = _id;
    this.id = id;
    this.amount = amount;
    this.created = new Date(created);
    this.description = description;
    this.paid = !!paid;
    this.paid_date = paid_date ? new Date(paid_date) : undefined;
    this.expiration_date = new Date(expiration_date);
    this.client_id = client_id;
    this.user_id = user_id;
  }

  get expired(): boolean {
    return isAfter(Date.now(), this.expiration_date) && !this.paid;
  }

  static validateData(clientId: ObjectId, values: IRawCharge): Array<string> {
    const errors = [];
    if (isEmpty(values)) errors.push('Invalid request.');
    const { amount, created } = values;

    if (!amount || !validator.isNumeric(`${amount}`)) errors.push('La cantidad debe ser numerica.');
    if (!clientId || !validator.isMongoId(`${clientId}`))
      errors.push('El número de identificación del cliente es invalido.');
    if (created && isValid(created)) errors.push('La fecha de creación no es válida.');

    return errors;
  }

  serialize(): ISerializedCharge {
    const { _id, expiration_date, amount, created, description, paid_date, paid } = this;

    return {
      id: _id,
      expiration_date,
      amount,
      created,
      description,
      paid_date,
      paid,
    };
  }
}
