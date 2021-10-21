import { isEmpty } from 'lodash';
import validator from 'validator';
import { Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IRawPayment, ISerializedPayment } from '../interfaces/IPayment';

export default class Payment {
  @ObjectIdColumn()
  _id?: ObjectId;

  @ObjectIdColumn()
  id?: ObjectId;

  @Column('number')
  amount: number;

  @Column('date')
  created: Date;

  constructor(rawPayment: IRawPayment) {
    const { amount, created, _id } = rawPayment || {};

    this._id = _id || new ObjectId();
    this.amount = amount;
    this.created = created || new Date();
  }

  static validateData(values: IRawPayment, currentBalance: number): Array<string> {
    const errors = [];
    if (isEmpty(values)) errors.push('Invalid request.');

    const { amount } = values;

    if (!amount || !validator.isNumeric(`${amount}`)) {
      errors.push('La cantidad del pago debe de ser numerica.');
    }

    if (currentBalance - amount < 0)
      errors.push('El abono es mayor a la cantidad del saldo del prestamo');
    if (!currentBalance) errors.push('El prestamo ya fue saldado.');

    return errors;
  }

  serialize(): ISerializedPayment {
    const { amount, created, _id } = this;

    return {
      id: _id,
      amount,
      created,
    };
  }
}
