import { getMongoRepository, ObjectID as TypeObjectID } from 'typeorm';
import { ObjectID } from 'mongodb';
import Loan from '../models/Loan';
import DatabaseConnection from '../utils/DatabaseConnection';
import { IRawLoan } from '../interfaces/ILoan';
import Counter from '../models/Counter';
import Client from '../models/Client';

export type LoanQuery = {
  finished: boolean;
  clientId: TypeObjectID;
};

export default class LoanService extends DatabaseConnection {
  static loanRepository = getMongoRepository(Loan);
  static counterRepository = getMongoRepository(Counter);

  static async getLoan(userId: TypeObjectID, loanId: TypeObjectID): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      user_id: new ObjectID(userId),
      _id: new ObjectID(loanId),
    });

    return loan || Promise.reject(['Loan not found.']);
  }

  static async getLoans({ finished = true, clientId }: LoanQuery): Promise<Array<Loan>> {
    return this.loanRepository.find({
      finished,
      client_id: new ObjectID(clientId),
    });
  }

  static async createLoan(client: Client, values: IRawLoan): Promise<Loan> {
    const errors = Loan.validateData(values, client.id);

    if (errors.length) return Promise.reject(errors);

    const counter = (await this.counterRepository.findOne({ name: 'loans' })) || new Counter();

    const loan = new Loan(values);
    loan.client_id = new ObjectID(client.id);
    loan.user_id = new ObjectID(client.user_id);
    loan.number_id = counter.count;
    loan.setSearch(client);

    counter.count = counter.count + 1;
    await this.counterRepository.save(counter);

    return this.loanRepository.save(loan);
  }

  static async updateLoan(client: Client, loanId: TypeObjectID, values: IRawLoan): Promise<Loan> {
    const errors = Loan.validateData(values, client.id);

    if (errors.length) return Promise.reject(errors);

    const loan = await this.getLoan(client.user_id as TypeObjectID, loanId);

    loan.update(values);

    await this.loanRepository.save(loan);

    return loan;
  }

  static async deleteLoan(userId: TypeObjectID, loanId: TypeObjectID): Promise<void> {
    await this.loanRepository.deleteOne({
      _id: new ObjectID(loanId),
      user_id: new ObjectID(userId),
    });
  }

  static async deleteClientLoans(userId: TypeObjectID, clientId: TypeObjectID): Promise<void> {
    await this.loanRepository.deleteMany({
      user_id: new ObjectID(userId),
      client_id: new ObjectID(clientId),
    });
  }
}
