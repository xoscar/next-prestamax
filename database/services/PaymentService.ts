import { getMongoRepository, ObjectID as TypeObjectID } from 'typeorm';
import Loan from '../models/Loan';
import DatabaseConnection from '../utils/DatabaseConnection';
import { IRawLoan } from '../interfaces/ILoan';
import Payment from '../models/Payment';
import { IRawPayment } from '../interfaces/IPayment';
import LoanService from './LoanService';

export type LoanQuery = {
  finished: boolean;
  clientId: TypeObjectID;
};

export default class PaymentService extends DatabaseConnection {
  static loanRepository = getMongoRepository(Loan);

  static async getPayment(
    userId: TypeObjectID,
    loanId: TypeObjectID,
    paymentId: TypeObjectID,
  ): Promise<Payment> {
    const { payments } = await LoanService.getLoan(userId, loanId);

    const payment = payments.find(({ id }) => paymentId === id);

    return payment || Promise.reject(['Payment not found']);
  }

  static async createPayment(
    userId: TypeObjectID,
    loanId: TypeObjectID,
    values: IRawPayment,
  ): Promise<Payment> {
    const loan = await LoanService.getLoan(userId, loanId);

    const errors = Payment.validateData(values, loan.currentBalance);

    if (!!errors.length) return Promise.reject(errors);

    const payment = new Payment(values);

    loan.payments = [...loan.payments, payment];
    loan.finished = !!loan.currentBalance;
    loan.updated = new Date();

    await this.loanRepository.save(loan);

    return payment;
  }

  static async updatePayment(
    userId: TypeObjectID,
    loanId: TypeObjectID,
    paymentId: TypeObjectID,
    values: IRawLoan,
  ): Promise<Payment> {
    const loan = await LoanService.getLoan(userId, loanId);

    const errors = Payment.validateData(values, loan.currentBalance);

    if (!!errors.length) return Promise.reject(errors);

    const payment = loan.payments.find(({ id }) => id === paymentId);
    const { amount, created } = values;

    if (!payment) return Promise.reject(['Payment not found.']);

    payment.amount = amount;
    payment.created = created || payment.created;

    loan.payments = loan.payments.filter(({ id }) => id !== paymentId).concat([payment]);

    await this.loanRepository.save(loan);

    return payment;
  }

  static async deletePayment(
    userId: TypeObjectID,
    loanId: TypeObjectID,
    paymentId: TypeObjectID,
  ): Promise<void> {
    const loan = await LoanService.getLoan(userId, loanId);

    loan.payments = loan.payments.filter(({ id }) => id !== paymentId);

    await this.loanRepository.save(loan);
  }
}
