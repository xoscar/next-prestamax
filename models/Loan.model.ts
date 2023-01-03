import { differenceInWeeks, isAfter } from 'date-fns';
import validator from 'validator';
import Client from './Client.model';
import Payment from './Payment.model';

import PrismaClient from '@prisma/client';
import { LoanStatus } from '../constants/Common.constants';

export type TPartialLoan = Partial<
  PrismaClient.Loan & {
    client: PrismaClient.Client;
  }
>;

type Loan = PrismaClient.Loan & {
  isExpired: boolean;
  payments: Array<Payment>;
  lastPayment?: Date;
  client: Client;
  status: LoanStatus;
  setSearch(client: Client): Loan;
  getCurrentWeek(): number;
  getCurrentBalance(): number;
};

const Loan = ({
  id = '',
  clientId = '',
  userId = '',
  numberId = 0,
  amount = 0,
  weeklyPayment = 0,
  weeks = 0,
  file = '',
  description = '',
  finishedDate,
  expiredDate = new Date(),
  created = new Date(),
  updated = new Date(),
  finished = false,
  visible = false,
  payments = [],
  search = [],
  clientName = '',
  clientIdentifier = '',
  v = 0,
  client = Client(),
}: TPartialLoan = {}): Loan => {
  const paymentList = payments.map((payment) => Payment(payment));
  const [{ created: lastPayment = undefined } = {}] = paymentList.sort((a, b) =>
    isAfter(a.created, b.created) ? -1 : 1,
  );
  const isExpired = isAfter(Date.now(), new Date(expiredDate)) && !finished;

  console.log('@@@>', finished);

  const status =
    (isExpired && LoanStatus.EXPIRED) || (finished && LoanStatus.FINISHED) || LoanStatus.ACTIVE;

  return {
    id,
    clientId,
    userId,
    numberId,
    amount,
    weeklyPayment,
    weeks,
    file,
    description,
    finished,
    visible,
    payments: paymentList,
    search,
    clientName,
    clientIdentifier,
    created: new Date(created),
    updated: new Date(updated),
    finishedDate: finishedDate ? new Date() : null,
    expiredDate: new Date(expiredDate),
    lastPayment,
    v,
    client: Client(client),
    status,
    isExpired,
    setSearch({ name, surname, clientId }) {
      return {
        ...this,
        search: [`${name} ${surname}`, clientId, this.numberId.toString()],
      };
    },
    getCurrentWeek() {
      return differenceInWeeks(Date.now(), this.created) + 1;
    },
    getCurrentBalance() {
      return this.payments.reduce((total, { amount }) => total - amount, this.amount);
    },
  };
};

Loan.validate = (values: TPartialLoan, clientId?: string): Array<string> => {
  const errors = [];
  if (!values) errors.push('query', 'Invalid request.');
  const { amount = 0, weeks = 0, weeklyPayment = 0, created } = values;

  if (!amount || !validator.isNumeric(`${amount}`))
    errors.push('amount', 'La cantidad debe ser numerica.');

  if (!weeklyPayment || !validator.isNumeric(`${weeklyPayment}`))
    errors.push('weekly_payment', 'El pago semanal debe de ser numerico.');

  if (!weeks || !validator.isNumeric(`${weeks}`))
    errors.push('weeks', 'El numero de semanas debe de ser numerico.');

  if (!clientId || !validator.isMongoId(`${clientId}`))
    errors.push('client_id', 'El número de identificación del cliente es invalido.');

  if (!created) errors.push('created', 'La fecha de creación no es válida.');

  if (!!errors.length) {
    if (weeks < 0 && weeks > 60) errors.push('weeks', 'El número de semanas debe ser entre 1 y 60');
    if (amount <= weeks)
      errors.push(
        'amount',
        'El número de semanas debe de ser menor al de la cantidad total del prestamo.',
      );

    if (amount <= weeklyPayment)
      errors.push('amount', 'El pago semanal debe de ser menor a la cantidad total del prestamo.');
  }

  return errors;
};

export default Loan;
