import { getMongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import Loan from '../models/Loan';
import DatabaseConnection from '../utils/DatabaseConnection';
import { IRawLoan } from '../interfaces/ILoan';
import Counter from '../models/Counter';
import Client from '../models/Client';

export type LoanQuery = {
  finished: boolean;
  clientId: string;
};

export default class LoanService extends DatabaseConnection {
  static loanRepository = getMongoRepository(Loan);
  static counterRepository = getMongoRepository(Counter);

  static async getLoan(userId: string, loanId: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      user_id: new ObjectId(userId),
      _id: new ObjectId(loanId),
    });

    return loan || Promise.reject(['Loan not found.']);
  }

  static async getLoans({ finished = true, clientId }: LoanQuery): Promise<Array<Loan>> {
    return this.loanRepository.find({
      finished,
      client_id: new ObjectId(clientId),
    });
  }

  static async createLoan(client: Client, values: IRawLoan): Promise<Loan> {
    const errors = Loan.validateData(values, client.id);

    if (errors.length) return Promise.reject(errors);

    const counter = (await this.counterRepository.findOne({ name: 'loans' })) || new Counter();

    const loan = new Loan(values);
    loan.client_id = new ObjectId(client.id);
    loan.user_id = new ObjectId(client.user_id);
    loan.number_id = counter.count;
    loan.setSearch(client);

    counter.count = counter.count + 1;
    await this.counterRepository.save(counter);

    return this.loanRepository.save(loan);
  }

  static async updateLoan(client: Client, loanId: string, values: IRawLoan): Promise<Loan> {
    const errors = Loan.validateData(values, client.id);

    if (errors.length) return Promise.reject(errors);

    const loan = await this.getLoan(client.user_id?.toString() as string, loanId);

    loan.update(values);

    await this.loanRepository.save(loan);

    return loan;
  }

  static async deleteLoan(userId: string, loanId: string): Promise<void> {
    await this.loanRepository.deleteOne({
      _id: new ObjectId(loanId),
      user_id: new ObjectId(userId),
    });
  }

  static async deleteClientLoans(userId: string, clientId: string): Promise<void> {
    await this.loanRepository.deleteMany({
      user_id: new ObjectId(userId),
      client_id: new ObjectId(clientId),
    });
  }
}
