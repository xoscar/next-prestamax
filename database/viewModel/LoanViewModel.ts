import { ObjectId } from 'mongodb';
import { ISerializedClient } from '../interfaces/IClient';
import { ISerializedLoan } from '../interfaces/ILoan';
import Client from '../models/Client';
import Loan from '../models/Loan';
import ClientService from '../services/ClientService';
import SearchService, { Query } from '../services/SearchService';

export type LoanResult = ISerializedLoan & {
  client: ISerializedClient;
};

export type ExtraQuery = {
  client_id?: ObjectId;
  finished?: boolean;
};

export default class LoanViewModel {
  static buildQuery({ finished, clientId }: { finished?: string; clientId?: string }): ExtraQuery {
    const query: ExtraQuery = {};

    if (finished) query.finished = finished === 'true';
    if (clientId) query.client_id = new ObjectId(clientId);

    return query;
  }

  static async getClientForLoan(loan: Loan): Promise<Client> {
    const client = await ClientService.getClientById(loan.client_id?.toString() as string);

    return client;
  }

  static async searchLoans(userId: ObjectId, query: Query): Promise<Array<LoanResult>> {
    const extraQuery = this.buildQuery(query);

    const loanList = await SearchService.runQuery<Loan, ExtraQuery>(
      Loan,
      userId,
      query,
      extraQuery,
    );

    return Promise.all(
      loanList.map(async (loan) => {
        const client = await this.getClientForLoan(loan);

        return {
          ...loan.serialize(),
          client: client.serialize(),
        };
      }),
    );
  }
}
