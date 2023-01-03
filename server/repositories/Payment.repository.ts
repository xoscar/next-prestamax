import Client from '../../models/Client.model';
import Loan, { TPartialLoan } from '../../models/Loan.model';
import Payment, { TPartialPayment } from '../../models/Payment.model';
import LoanRepository from './Loan.repository';

const PaymentRepository = () => ({
  findPayment(loan: Loan, paymentId: string) {
    return loan.payments.find(({ id }) => paymentId === id);
  },

  async getPayment(userId: string, loanId: string, paymentId: string): Promise<Payment> {
    const loan = await LoanRepository.getLoan(userId, loanId);

    const payment = this.findPayment(loan, paymentId);

    return payment || Promise.reject(['Payment not found']);
  },
  async createPayment(client: Client, loanId: string, values: TPartialPayment): Promise<Payment> {
    const loan = await LoanRepository.getLoan(client.userId, loanId);

    const errors = Payment.validate(values, loan.getCurrentBalance());
    if (!!errors.length) return Promise.reject(errors);

    const payment = Payment(values);
    loan.payments = [...loan.payments, payment];

    await LoanRepository.update({
      where: {
        id: loan.id,
      },
      data: {
        finished: loan.getCurrentBalance() <= 0,
        payments: {
          push: payment,
        },
      },
    });

    return payment;
  },
  async updatePayment(
    client: Client,
    loanId: string,
    paymentId: string,
    values: TPartialLoan,
  ): Promise<Payment> {
    const loan = await LoanRepository.getLoan(client.userId, loanId);

    const errors = Payment.validate(values, loan.getCurrentBalance());
    if (!!errors.length) return Promise.reject(errors);

    const payment = this.findPayment(loan, paymentId);
    const { amount, created } = values;

    if (!payment) return Promise.reject(['Payment not found.']);

    const updatedPayment = Payment({
      ...payment,
      amount,
      created,
    });

    loan.payments = [...loan.payments, payment];

    await LoanRepository.update({
      where: {
        id: loan.id,
      },
      data: {
        finished: loan.getCurrentBalance() <= 0,
        payments: {
          updateMany: {
            where: {
              id: payment.id,
            },
            data: updatedPayment,
          },
        },
      },
    });

    return updatedPayment;
  },
  async deletePayment(client: Client, loanId: string, paymentId: string): Promise<void> {
    const loan = await LoanRepository.getLoan(client.userId, loanId);
    const payment = this.findPayment(loan, paymentId);
    if (!payment) return Promise.reject(['Payment not found.']);

    const currentBalance = loan.getCurrentBalance() + payment.amount;

    await LoanRepository.update({
      where: {
        id: loan.id,
      },
      data: {
        finished: currentBalance <= 0,
        payments: {
          deleteMany: {
            where: {
              id: paymentId,
            },
          },
        },
      },
    });
  },
});

export default PaymentRepository();
