import Loan, { FormDataLoanType, RawLoanType } from '../../records/Loan';
import AuthenticatedClient from '../AuthenticatedClient';

const { get } = AuthenticatedClient<FormDataLoanType, RawLoanType>('/api/loans');

type LoansClientType = {
  get(parameters: { search: string; pageNumber: number; pageSize: number }): Promise<Array<Loan>>;
};

const LoansClient: LoansClientType = {
  async get({ search, pageNumber, pageSize }) {
    const { json: loanList } = await get<Array<RawLoanType>>({
      queryParams: { search, pageNumber, pageSize },
    });

    return loanList.map((rawLoan) => Loan.createFromRaw(rawLoan));
  },
};

export default LoansClient;
