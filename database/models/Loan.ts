import { addWeeks, differenceInWeeks, endOfWeek, isAfter, isValid } from 'date-fns';
import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import validator from 'validator';
import { IRawLoan, ISerializedLoan } from '../interfaces/ILoan';
import { IRawPayment } from '../interfaces/IPayment';
import Client from './Client';
import Payment from './Payment';

@Entity('loans')
export default class Loan {
  @ObjectIdColumn()
  _id?: ObjectId;

  @ObjectIdColumn()
  id?: ObjectId;

  @Column('string')
  user_id?: ObjectId;

  @Column('string')
  client_id?: ObjectId;

  @Column('number')
  number_id: number;

  @Column('number')
  amount: number;

  @Column('number')
  weekly_payment: number;

  @Column('number')
  weeks: number;

  @Column('string')
  file: string;

  @Column('string')
  description: string;

  @Column('date')
  finished_date: Date;

  @Column('date')
  expired_date: Date;

  @Column('date')
  created: Date;

  @Column('date')
  updated: Date;

  @Column('boolean')
  finished: boolean;

  @Column('visible')
  visible: boolean;

  @Column('array')
  payments: Array<IRawPayment>;

  @Column('array')
  search?: Array<string | number>;

  constructor(rawLoan: IRawLoan) {
    const {
      id,
      client_id,
      user_id,
      created,
      updated,
      number_id,
      amount,
      weekly_payment,
      weeks,
      file,
      description,
      finished_date,
      expired_date,
      finished,
      visible,
      payments = [],
      search,
      _id,
    } = rawLoan || {};

    const expiredDate = addWeeks(endOfWeek(created), weeks);
    const finishedDate = !finished_date && finished ? new Date() : finished_date;

    this._id = _id;
    this.id = id;
    this.client_id = client_id;
    this.user_id = user_id;
    this.created = created || new Date();
    this.updated = updated || new Date();
    this.number_id = number_id;
    this.amount = amount;
    this.weekly_payment = weekly_payment;
    this.weeks = weeks;
    this.file = file;
    this.description = description;
    this.finished_date = finishedDate;
    this.expired_date = expired_date || expiredDate;
    this.finished = finished;
    this.visible = visible;

    this.payments = payments;
    this.search = search;
  }

  update({ amount, weeks, weekly_payment, description, created }: IRawLoan): void {
    const newDate = created || this.created;
    const expiredDate = addWeeks(endOfWeek(newDate), weeks);
    this.amount = amount;
    this.weekly_payment = weekly_payment;
    this.weeks = weeks;
    this.description = description;
    this.created = newDate;
    this.expired_date = expiredDate;
    this.updated = new Date();
    this.finished = this.currentBalance <= 0;
  }

  setSearch(client: Client): void {
    const { name, surname, client_id: clientId } = client;

    this.search = [`${name} ${surname}`, clientId, this.number_id];
  }

  getPayments(): Array<Payment> {
    return this.payments.map((payment) => new Payment(payment));
  }

  get expired(): boolean {
    return isAfter(Date.now(), this.expired_date) && !this.finished;
  }

  get currentWeek(): number {
    return differenceInWeeks(Date.now(), this.created) + 1;
  }

  get currentBalance(): number {
    return this.payments.reduce((total, { amount }) => total - amount, this.amount);
  }

  get lastPayment(): Date | undefined {
    const [{ created = undefined } = {}] = this.payments.sort((a, b) =>
      isAfter(a.created, b.created) ? -1 : 1,
    );

    return created;
  }

  serialize(): ISerializedLoan {
    const {
      _id,
      client_id,
      number_id,
      amount,
      description,
      weekly_payment,
      created,
      updated,
      finished,
      finished_date,
      visible,
      weeks,
      expired_date,
    } = this;

    return {
      id: _id,
      client_id,
      number_id,
      amount,
      description,
      weekly_payment,
      created,
      updated,
      finished,
      finished_date,
      visible,
      weeks,
      expired_date,
      expired: this.expired,
      current_week: this.currentWeek,
      current_balance: this.currentBalance,
      last_payment: this.lastPayment,
      payments: this.getPayments().map((payment) => payment.serialize()),
    };
  }

  static validateData(values: IRawLoan, clientId?: ObjectId): Array<string> {
    const errors = [];
    if (!values) errors.push('query', 'Invalid request.');
    const { amount, weeks, weekly_payment, created } = values;

    if (!amount || !validator.isNumeric(`${amount}`))
      errors.push('amount', 'La cantidad debe ser numerica.');

    if (!weekly_payment || !validator.isNumeric(`${weekly_payment}`))
      errors.push('weekly_payment', 'El pago semanal debe de ser numerico.');

    if (!weeks || !validator.isNumeric(`${weeks}`))
      errors.push('weeks', 'El numero de semanas debe de ser numerico.');

    if (!clientId || !validator.isMongoId(`${clientId}`))
      errors.push('client_id', 'El n??mero de identificaci??n del cliente es invalido.');

    if (created && isValid(created)) errors.push('created', 'La fecha de creaci??n no es v??lida.');

    if (!!errors.length) {
      if (weeks < 0 && weeks > 60)
        errors.push('weeks', 'El n??mero de semanas debe ser entre 1 y 60');
      if (amount <= weeks)
        errors.push(
          'amount',
          'El n??mero de semanas debe de ser menor al de la cantidad total del prestamo.',
        );

      if (amount <= weekly_payment)
        errors.push(
          'amount',
          'El pago semanal debe de ser menor a la cantidad total del prestamo.',
        );
    }

    return errors;
  }
}
