import Loan, { FormDataLoanType, RawLoanType } from '../../records/Loan';
import AuthenticatedClient from '../AuthenticatedClient';

const { get } = AuthenticatedClient<FormDataLoanType, RawLoanType>('/api/loans');
const { post, put, getOne, remove } = AuthenticatedClient<FormDataLoanType, RawLoanType>(
  '/api/clients/{{clientId}}/loans',
);

type LoansClientType = {
  get(parameters: {
    search: string;
    pageNumber: number;
    pageSize: number;
    clientId?: string;
    finished?: boolean;
  }): Promise<Array<Loan>>;
  getOne(clientId: string, loanId: string): Promise<Loan>;
  create(clientId: string, values: FormDataLoanType): Promise<Loan>;
  update(clientId: string, loanId: string, values: FormDataLoanType): Promise<Loan>;
  remove(clientId: string, loanId: string): Promise<void>;
};

const LoansClient: LoansClientType = {
  async get({ search, pageNumber, pageSize, clientId = '', finished }) {
    const { json: loanList } = await get<Array<RawLoanType>>({
      queryParams: { search, pageNumber, pageSize, clientId, finished },
    });

    return loanList.map((rawLoan) => Loan.createFromRaw(rawLoan));
  },
  async getOne(clientId, loanId) {
    const { json: rawLoan } = await getOne({
      pathParameters: { clientId },
      id: loanId,
    });

    return Loan.createFromRaw(rawLoan);
  },
  async create(clientId, values) {
    const { json: rawLoan } = await post({
      body: values,
      pathParameters: { clientId },
    });

    return Loan.createFromRaw(rawLoan);
  },
  async update(clientId, loanId, values) {
    const { json: rawLoan } = await put({
      body: values,
      id: loanId,
      pathParameters: { clientId },
    });

    return Loan.createFromRaw(rawLoan);
  },
  async remove(clientId, loanId) {
    await remove({
      id: loanId,
      pathParameters: { clientId },
    });

    return;
  },
};

export default LoansClient;
