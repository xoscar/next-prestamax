import { Record } from 'immutable';

export type RawLoanType = {
  id: string;
  client_id: string;
  number_id: number;
  amount: number;
  description: string;
  weekly_payment: number;
  created: string;
  updated: string;
  finished: boolean;
  finished_date: string;
  visible: boolean;
  weeks: number;
  expired_date: string;
  expired: boolean;
  current_week: number;
  current_balance: number;
  last_payment: string;
  payments: Array<string>;
};

export type LoanType = {
  id: string;
  client_id: string;
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
  last_payment: Date;
  paymentList: Array<string>;
};

const defaultValues = {
  id: '',
  client_id: '',
  description: '',
  number_id: 0,
  amount: 0,
  weekly_payment: 0,
  weeks: 0,
  current_week: 0,
  current_balance: 0,
  finished: false,
  visible: true,
  expired: false,
  created: new Date(),
  updated: new Date(),
  finished_date: new Date(),
  expired_date: new Date(),
  last_payment: new Date(),
  paymentList: [],
};

export type FormDataLoanType = {
  amount: number;
  weekly_payment: number;
  weeks: number;
  description: string;
};

class Loan extends Record<LoanType>(defaultValues) {
  static createFromRaw(rawLoan: RawLoanType): Loan {
    const { created, updated, finished_date, expired_date, last_payment, payments } = rawLoan;

    return new this({
      ...rawLoan,
      paymentList: payments,
      created: new Date(created),
      updated: new Date(updated),
      finished_date: new Date(finished_date),
      expired_date: new Date(expired_date),
      last_payment: new Date(last_payment),
    });
  }
}

export default Loan;
