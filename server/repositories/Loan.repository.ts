import Loan, { TPartialLoan } from '../../models/Loan.model';
import prisma from '../utils/PrismaClient';
import Client from '../../models/Client.model';
import { PrismaClient, Loan as PrismaLoan } from '@prisma/client';
import CountRepository from './Count.repository';
import { TSearchRepository } from '../types/Search.types';
import { addWeeks, endOfWeek } from 'date-fns';

export type LoanQuery = {
  finished: boolean;
  clientId: string;
};

export type LoanRepository = PrismaClient['loan'] &
  TSearchRepository<Loan> & {
    getLoan(userId: string, loanId: string): Promise<Loan>;
    getLoans(query: LoanQuery): Promise<Array<Loan>>;
    createLoan(client: Client, values: TPartialLoan): Promise<Loan>;
    updateLoan(client: Client, loanId: string, values: TPartialLoan): Promise<Loan>;
    deleteLoan(loanId: string): Promise<void>;
    deleteClientLoans(userId: string, clientId: string): Promise<void>;
  };

const LoanRepository = (): LoanRepository => ({
  ...prisma.loan,
  async getLoan(userId, loanId) {
    const rawLoan = await this.findFirst({
      where: {
        userId,
        id: loanId,
      },
      include: {
        client: true,
      },
    });

    return rawLoan ? Loan(rawLoan) : Promise.reject(['Loan not found.']);
  },
  async getLoans({ finished = true, clientId }: LoanQuery): Promise<Array<Loan>> {
    const rawLoanList = await this.findMany({
      where: {
        finished,
        clientId,
      },
      include: {
        client: true,
      },
    });

    return rawLoanList.map((rawLoan) => Loan(rawLoan));
  },
  async createLoan(client, values) {
    const errors = Loan.validate(values, client.id);
    if (errors.length) return Promise.reject(errors);

    const { amount = 0, weeks = 0, weeklyPayment = 0 } = values;
    const count = await CountRepository.getNext('loans');
    const expiredDate = addWeeks(new Date(), weeks);

    const rawLoan = await this.create({
      data: {
        v: 0,
        clientName: client.name,
        expiredDate,
        updated: new Date(),
        visible: true,
        amount,
        weeks,
        weeklyPayment,
        created: new Date(),
        client: {
          connect: {
            id: client.id,
          },
        },
        userId: client.userId,
        numberId: count,
        finished: false,
      },
    });

    return Loan(rawLoan);
  },
  async updateLoan(client, loanId, values) {
    const errors = Loan.validate(values, client.id);
    if (errors.length) return Promise.reject(errors);
    const loan = await this.getLoan(client.userId, loanId);

    const {
      created = new Date(),
      weeks = 0,
      weeklyPayment = 0,
      amount = 0,
      description = '',
    } = values;
    loan.amount = amount;

    const newDate = new Date(created);
    const expiredDate = addWeeks(endOfWeek(newDate), weeks);

    const rawLoan = await this.update({
      where: { id: loanId },
      data: {
        created: newDate,
        expiredDate,
        amount,
        weeks,
        weeklyPayment,
        description,
        finished: loan.getCurrentBalance() <= 0,
      },
    });

    return Loan(rawLoan);
  },
  async deleteLoan(loanId) {
    await this.delete({
      where: {
        id: loanId,
      },
    });
  },
  async deleteClientLoans(userId, clientId) {
    await this.deleteMany({
      where: {
        userId,
        clientId,
      },
    });
  },

  async search(userId, { take, skip, search }, { finished, clientId } = {}) {
    const loanList = await this.findMany({
      where: {
        userId,
        finished: finished === 'true',
        clientId: clientId ? String(clientId) : undefined,
        client: {
          OR: [
            {
              clientId: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              surname: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      },
      take,
      skip,
      orderBy: { created: 'desc' },
      include: {
        client: true,
      },
    });

    return (loanList as unknown as PrismaLoan[]).map((rawClient) => Loan(rawClient));
  },
});

export default LoanRepository();
