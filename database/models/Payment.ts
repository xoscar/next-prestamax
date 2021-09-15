import { isEmpty } from 'lodash';
import validator from 'validator';
import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { IRawPayment, ISerializedPayment } from '../interfaces/IPayment';

export default class Payment {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column('number')
  amount: number;

  @Column('date')
  created: Date;

  constructor(rawPayment: IRawPayment) {
    const { amount, created, _id } = rawPayment || {};

    this.id = _id;
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
    const { amount, created, id } = this;

    return {
      id,
      amount,
      created,
    };
  }
}
