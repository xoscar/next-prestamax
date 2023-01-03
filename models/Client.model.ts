import PrismaClient from '@prisma/client';
import { isAfter } from 'date-fns';
import Charge from './Charge.model';
import Loan from './Loan.model';

export type TClientStats = {
  activeLoans: number;
  activeCharges: number;
  loansDebt: number;
  totalDebt: number;
  expiredLoansCount: number;
  lastLoan?: Date;
  lastPayment?: Date;
};

type Client = PrismaClient.Client & {
  loans: Loan[];
  charges: Charge[];
};
export type TPartialClient = Partial<
  PrismaClient.Client & {
    loans: PrismaClient.Loan[];
    charges: PrismaClient.Charge[];
  }
>;

const Client = ({
  id = '',
  v = 0,
  name = '',
  surname = '',
  address = '',
  phone = '',
  created = new Date(),
  updated = new Date(),
  userId = '',
  search = [],
  clientId = '',
  id_ = '',
  loans = [],
  charges = [],
}: TPartialClient = {}): Client => ({
  id,
  id_,
  clientId,
  v,
  name,
  surname,
  address,
  phone,
  created: new Date(created),
  updated: new Date(updated),
  userId,
  search,
  loans: loans.map((loan) => Loan(loan)),
  charges: charges.map((charge) => Charge(charge)),
});

Client.getStats = (client: Client): TClientStats => {
  const finishedLoanList = client.loans.filter((loan) => loan.finished);
  const activeLoanList = client.loans.filter((loan) => !loan.finished);
  const activeCharges = client.charges.filter((charge) => !charge.paid);

  const activeLoanDebt = activeLoanList.reduce(
    (total, loan) => loan.getCurrentBalance() + total,
    0,
  );

  const activeChargesDebt = activeCharges.reduce((total, loan) => loan.amount + total, 0);

  const [{ created = undefined } = {}] = finishedLoanList
    .concat(activeLoanList)
    .sort((a, b) => (isAfter(a.created, b.created) ? -1 : 1));

  const [lastPayedLoan] = finishedLoanList.concat(activeLoanList).sort((a, b) => {
    const aLastPayment = a.lastPayment;
    const bLastPayment = b.lastPayment;

    return aLastPayment && bLastPayment && isAfter(aLastPayment, bLastPayment) ? -1 : 1;
  });

  return {
    activeLoans: activeLoanList.length,
    activeCharges: activeCharges.length,
    loansDebt: activeLoanDebt,
    totalDebt: activeLoanDebt + activeChargesDebt,
    lastLoan: created,
    expiredLoansCount: activeLoanList.filter((loan) => loan.isExpired).length,
    lastPayment: lastPayedLoan?.lastPayment,
  };
};

Client.validate = ({ name, surname, address, phone }: TPartialClient = {}): Array<string> => {
  const errors = [];

  if (!name) errors.push('El nombre ingresado no es válido.');
  if (!surname) errors.push('El apellido ingresado no es válido.');
  if (!address) errors.push('La dirección ingresada no es válida.');
  if (!phone) errors.push('El teléfono ingresado no es válido.');

  return errors;
};

export default Client;
