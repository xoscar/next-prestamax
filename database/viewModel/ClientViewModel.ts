import isAfter from 'date-fns/isAfter';
import { ObjectID } from 'typeorm';
import { ISerializedClient } from '../interfaces/IClient';
import Client from '../models/Client';
import ChargeService from '../services/ChargeService';
import LoanService from '../services/LoanService';
import SearchService, { Query } from '../services/SearchService';

export type ClientStats = {
  active_loans: number;
  active_charges: number;
  loans_debt: number;
  total_debt: number;
  expired_loans: boolean;
  last_loan?: Date;
  last_payment?: Date;
};

export type ClientResult = ISerializedClient & {
  stats: ClientStats;
};

export default class ClientViewModel {
  static async searchClients(userId: ObjectID, query: Query): Promise<Array<ClientResult>> {
    const clientList = await SearchService.runQuery<Client>(Client, userId, query);

    return Promise.all(
      clientList.map(async (client): Promise<ClientResult> => {
        const { id } = client;
        const clientId = id as ObjectID;
        const [finishedLoanList, activeLoanList, activeCharges] = await Promise.all([
          LoanService.getLoans({ finished: true, clientId }),
          LoanService.getLoans({ finished: false, clientId }),
          ChargeService.getCharges({ paid: false, clientId }),
        ]);

        const activeLoanDebt = activeLoanList.reduce(
          (total, loan) => loan.currentBalance + total,
          0,
        );

        const activeChargesDebt = activeCharges.reduce((total, loan) => loan.amount + total, 0);

        const [{ created = undefined } = {}] = finishedLoanList
          .concat(activeLoanList)
          .sort((a, b) => (isAfter(a.created, b.created) ? -1 : 1));

        const [lastPayedLoan] = finishedLoanList
          .concat(activeLoanList)
          .sort((a, b) =>
            a.lastPayment && b.lastPayment && isAfter(a.lastPayment, b.lastPayment) ? -1 : 1,
          );

        const stats: ClientStats = {
          active_loans: activeLoanList.length,
          active_charges: activeCharges.length,
          loans_debt: activeLoanDebt,
          total_debt: activeLoanDebt + activeChargesDebt,
          last_loan: created,
          expired_loans: !!activeLoanList.find((loan) => loan.expired),
          last_payment: lastPayedLoan?.lastPayment,
        };

        return {
          ...client.serialize(),
          stats,
        };
      }),
    );
  }
}
